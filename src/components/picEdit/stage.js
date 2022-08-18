export default class Stage {
  constructor(props) {
    this.canvas = props.canvas;
    this.ctx = this.canvas.getContext("2d");
    this.spriteList = [];

    const pos = this.canvas.getBoundingClientRect();
    this.canvasOffsetLeft = pos.left;
    this.canvasOffsetTop = pos.top;

    this.dragSpriteTarget = null;
    this.scaleSpriteTarget = null;
    this.rotateSpriteTarget = null;

    this.dragStartX = undefined;
    this.dragStartY = undefined;
    this.scaleStartX = undefined;
    this.scaleStartY = undefined;
    this.rotateStartX = undefined;
    this.rotateStartY = undefined;

    this.initEvent();
  }

  append(sprite) {
    this.spriteList.push(sprite);
    this.drawSprite();
  }

  initEvent() {
    this.canvas.addEventListener("touchstart", (e) => {
      this.handleTouchStart(e);
    });
    this.canvas.addEventListener("touchend", () => {
      this.handleTouchEnd();
    });
    this.canvas.addEventListener(
      "touchmove",
      (e) => {
        this.handleTouchMove(e);
        e.preventDefault();
      },
      { passive: false }
    );
  }

  handleTouchStart(e) {
    const touchEvent = this.normalizeTouchEvent(e);

    if (!touchEvent) {
      return;
    }
    let target = null;

    // 触摸在sprite上，可以拖动
    if ((target = this.getTouchSpriteTarget(touchEvent))) {
      this.initDragEvent(target, touchEvent);
      return;
    }

    // 缩放
    if ((target = this.getTouchTargetOfSprite(touchEvent, "scaleIcon"))) {
      this.initScaleEvent(target, touchEvent);
      return;
    }

    // 旋转
    if ((target = this.getTouchTargetOfSprite(touchEvent, "rotateIcon"))) {
      this.initRotateEvent(target, touchEvent);
      return;
    }

    // 删除
    if ((target = this.getTouchTargetOfSprite(touchEvent, "delIcon"))) {
      this.remove(target);
      return;
    }
  }

  handleTouchMove(e) {
    const touchEvent = this.normalizeTouchEvent(e);
    if (!touchEvent) {
      return;
    }
    const { touchX, touchY } = touchEvent;

    // 拖拽
    if (this.dragSpriteTarget) {
      this.reCalSpritePos(this.dragSpriteTarget, touchX, touchY);
      this.drawSprite();
      return;
    }

    // 缩放
    if (this.scaleSpriteTarget) {
      this.reCalSpriteSize(this.scaleSpriteTarget, touchX, touchY);
      this.drawSprite();
      return;
    }

    // 旋转
    if (this.rotateSpriteTarget) {
      this.reCalSpriteRotate(this.rotateSpriteTarget, touchX, touchY);
      this.drawSprite();
      return;
    }
  }

  handleTouchEnd() {
    if (this.rotateSpriteTarget) {
      this.rotateSpriteTarget.updateCoordinateByRotate();
    }
    if (this.scaleSpriteTarget) {
      this.scaleSpriteTarget.updateCoordinateByScale();
    }
    this.scaleSpriteTarget = null;
    this.dragSpriteTarget = null;
    this.rotateSpriteTarget = null;
  }

  // 初始化sprite的拖拽事件
  initDragEvent(sprite, { touchX, touchY }) {
    this.dragSpriteTarget = sprite;
    this.dragStartX = touchX;
    this.dragStartY = touchY;
  }

  // 初始化sprite的缩放事件
  initScaleEvent(sprite, { touchX, touchY }) {
    this.scaleSpriteTarget = sprite;
    this.scaleStartX = touchX;
    this.scaleStartY = touchY;
  }

  // 初始化sprite的旋转事件
  initRotateEvent(sprite, { touchX, touchY }) {
    this.rotateSpriteTarget = sprite;
    this.rotateStartX = touchX;
    this.rotateStartY = touchY;
  }

  // 通过触摸的坐标重新计算sprite的坐标
  reCalSpritePos(sprite, touchX, touchY) {
    const [oX, oY] = sprite.pos;
    const dirX = touchX - this.dragStartX;
    const dirY = touchY - this.dragStartY;
    sprite.resetPos(dirX, dirY);
    this.dragStartX = touchX;
    this.dragStartY = touchY;
  }

  // 通过触摸的【横】坐标重新计算sprite的大小
  reCalSpriteSize(sprite, touchX, touchY) {
    // 使用X轴方向作为缩放比例的判断标准
    const [centerX, centerY] = sprite.center;
    const startVector = [
      this.scaleStartX - centerX,
      this.scaleStartY - centerY,
    ];
    const endVector = [touchX - centerX, touchY - centerY];
    const dirVector = [touchX - this.scaleStartX, touchY - this.scaleStartY];
    const startVectorLength = Math.sqrt(
      Math.pow(startVector[0], 2) + Math.pow(startVector[1], 2)
    );
    const endVectorLength = Math.sqrt(
      Math.pow(endVector[0], 2) + Math.pow(endVector[1], 2)
    );
    const dirX = Math.abs(dirVector[0]);
    const dirY = Math.abs(dirVector[1]);
    let dir = dirX > dirY ? dirX : dirY;
    if (endVectorLength < startVectorLength) {
      dir = -dir;
    }
    sprite.resetSize(dir);
    this.scaleStartX = touchX;
    this.scaleStartY = touchY;
  }

  // 重新计算sprite的角度
  reCalSpriteRotate(sprite, touchX, touchY) {
    const [centerX, centerY] = sprite.center;
    const x1 = this.rotateStartX - centerX;
    const y1 = this.rotateStartY - centerY;
    const x2 = touchX - centerX;
    const y2 = touchY - centerY;

    // 因为sin函数
    const numerator = x1 * y2 - y1 * x2;
    const denominator =
      Math.sqrt(Math.pow(x1, 2) + Math.pow(y1, 2)) *
      Math.sqrt(Math.pow(x2, 2) + Math.pow(y2, 2));
    const sin = numerator / denominator;
    const angleDir = Math.asin(sin);

    sprite.setRotateAngle(angleDir);
    this.rotateStartX = touchX;
    this.rotateStartY = touchY;
  }

  // 返回当前touch的sprite
  getTouchSpriteTarget({ touchX, touchY }) {
    return this.spriteList.reduce((sum, sprite) => {
      // 这里一直循环到最后，保证每一次移动的都是最后插入的sprite
      if (this.checkIfTouchIn({ touchX, touchY }, sprite)) {
        sum = sprite;
      }
      return sum;
    }, null);
  }

  // 判断是否touch在了sprite中的某一部分上，返回这个sprite
  getTouchTargetOfSprite({ touchX, touchY }, part) {
    return this.spriteList.reduce((sum, sprite) => {
      if (this.checkIfTouchIn({ touchX, touchY }, sprite[part])) {
        sum = sprite;
      }
      return sum;
    }, null);
  }

  // 返回点击坐标
  normalizeTouchEvent(e) {
    const touches = [].slice.call(e.touches);
    if (touches.length > 1) {
      // 多点触摸，不做处理
      return;
    }
    const target = touches[0];
    const touchX = target.pageX - this.canvasOffsetLeft;
    const touchY = target.pageY - this.canvasOffsetTop;
    return {
      touchX,
      touchY,
    };
  }

  // 判断是否在在某个sprite中移动。当前默认所有的sprite都是长方形的。
  checkIfTouchIn({ touchX, touchY }, sprite) {
    if (!sprite) {
      return false;
    }
    const [[x1, y1], [x2, y2], [x3, y3], [x4, y4]] = sprite.coordinate;
    const v1 = [x1 - touchX, y1 - touchY];
    const v2 = [x2 - touchX, y2 - touchY];
    const v3 = [x3 - touchX, y3 - touchY];
    const v4 = [x4 - touchX, y4 - touchY];
    if (
      v1[0] * v2[1] - v2[0] * v1[1] > 0 &&
      v2[0] * v4[1] - v4[0] * v2[1] > 0 &&
      v4[0] * v3[1] - v3[0] * v4[1] > 0 &&
      v3[0] * v1[1] - v1[0] * v3[1] > 0
    ) {
      return true;
    }
    return false;
  }

  // 从场景中删除
  remove(sprite) {
    this.spriteList = this.spriteList.filter((item) => {
      return item.id !== sprite.id;
    });
    this.drawSprite();
  }

  drawSprite() {
    this.clearStage();
    this.spriteList.forEach((item) => {
      item.draw(this.ctx);
    });
  }

  clearStage() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
