//icon盒子的padding
const ICON_BOX_PADDING = 0;

//icon盒子的宽度
const ICON_HEIGHT = 20;

const ROTATE_ICON =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA70lEQVQ4T7XTL0vDURTG8c80aJVhEWx2u2AyTYNonmAwGi2Cgth8AWNBgzYZLKmwMJhYLL4Io9hFDP7hyJ2My+/nlLHTzj3P/d5znntvxYhRGXG/sQGWsI1nfGIGD7hI+U/jRR0c4QmneE/KSRxgFruDY+eAFSwjIEVxgkc0+8UccIcaXkoAE7hJmm/JIKCKM2wMuZku1vCWA6bQwvoQQAer+MgBkfdS8TWDzGMTDVyVjRB7trCIvQwQa3VMo43bMhPDk2MsYD85HtoAXOMch79dY78WRsaJc9hJD+oS8R4iAn5f5MG/v8bY/sKfO/kCL2skEWR80iIAAAAASUVORK5CYII=";
const DEL_ICON =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABIUlEQVRYR+3VPUvEQBSF4WdLsRdBQQsrURErC/31CtoJfiDICooigr22cnEDYdGdO5tgmqQJITNz3jn3zpmJgZ/JwPpGgNGB0YGsAzt4w2fy2K5iHY+l8RmAXdzhFad4Kiy6jTNsYh+3i8ZnAFZwjXChBNEWn+IAX10BYn7YeYmtBRBt8Wcc472PEjRrhKXnf0DMi5/MQEv61VH8G0SINDWPnafFY2KmB+Z30YYIwXiiNNXiywLEvIC4mL3jeynxrgBNP/w7wKAlyDRh6vg1jVXThNljGAEUiVnMgJoeqA2iNETGgdoojtMRwA847COK93CTuAeassadEcEUEHGR3fdxFxzhBR/FbP0ZsIYNXJXGZ0pQWqPT/xFgdGB0YHAHvgG1jEwhcd+TtgAAAABJRU5ErkJggg==";
const SCALE_ICON =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABJElEQVRYR+3UPS8EURTG8d82GolE0NArlT6ARqEiChrRKXTUWqUtJSpCQoNKlEqlL6CloJB4aVRyky2QnZk7szOzzb3NFPPkPP/z3HNux5BPZ8j+EkBKICVQJYExnCF8s84D9vFatOZVAXYKCq9iGvN4zNNWAShqaglXeMItttsEWMY5NrGASawMCjCOb3wVtB7ML7CGaxzVBXCKF+zmAPw3D9LaAEI3AWArA6CfeWsAWeatAOSZNw4QBu0Y672B63c7jc1AMD/prddNzmB2MYGNQdfw9xDGmgfPUYzgrS6Au8jOi17KP/9jnuJDLGImIvZS5kEcAzCLezzjssDhAO9lKGIAQr0p7GEup/hnbys+mgAoU7OUNjaBUkXLiBNASiAl8AO7pD8h3UM4owAAAABJRU5ErkJggg==";
export default class Sprite {
  constructor(props) {
    // 每一个sprite都有一个唯一的id
    this.id = Date.now() + Math.floor(Math.random() * 10);

    this.pos = props.pos; // 在canvas中的位置
    this.size = props.size; // sprite的当前大小
    this.baseSize = props.size; // sprite的初始化大小
    this.minSize = props.minSize; // sprite缩放时允许的最小size
    this.maxSize = props.maxSize; // sprite缩放时允许的最大size

    // 中心点坐标
    this.center = [
      props.pos[0] + props.size[0] / 2,
      props.pos[1] + props.size[1] / 2,
    ];

    this.delIcon = null;
    this.scaleIcon = null;
    this.rotateIcon = null;

    // 四个顶点的坐标,顺序为：左上，右上，左下，右下
    this.coordinate = this.setCoordinate(this.pos, this.size);

    this.rotateAngle = 0; // 累计旋转的角度
    this.rotateAngleDir = 0; // 每次旋转角度

    this.scalePercent = 1; // 缩放比例
    this.init();
  }

  setCoordinate(pos, size) {
    return [
      [pos[0], pos[1]],
      [pos[0] + size[0], pos[1]],
      [pos[0], pos[1] + size[1]],
      [pos[0] + size[0], pos[1] + size[1]],
    ];
  }

  setIconCoordinate(point) {
    return [
      [point[0] - ICON_HEIGHT / 2, point[1] - ICON_HEIGHT / 2],
      [point[0] + ICON_HEIGHT / 2, point[1] - ICON_HEIGHT / 2],
      [point[0] - ICON_HEIGHT / 2, point[1] + ICON_HEIGHT / 2],
      [point[0] + ICON_HEIGHT / 2, point[1] + ICON_HEIGHT / 2],
    ];
  }

  updateCoordinateByRotate() {
    const angle = this.rotateAngleDir;
    this.updateItemCoordinateByRotate(this, this.center, angle);
    this.updateItemCoordinateByRotate(this.delIcon, this.center, angle);
    this.updateItemCoordinateByRotate(this.scaleIcon, this.center, angle);
    this.updateItemCoordinateByRotate(this.rotateIcon, this.center, angle);
    this.rotateAngleDir = 0;
  }

  updateItemCoordinateByScale(sprite, center, scale) {
    const [centerX, centerY] = center;
    const coordinateVector = sprite.coordinate.map((point) => {
      return [point[0] - centerX, point[1] - centerY];
    });
    const newCoordinateVector = coordinateVector.map((vector) => {
      const [x, y] = vector;
      const newX = x * scale;
      const newY = y * scale;
      return [newX, newY];
    });
    sprite.coordinate = newCoordinateVector.map((vector) => {
      return [vector[0] + centerX, vector[1] + centerY];
    });
  }

  getIconCenter(iconCoordinate) {
    const point1 = iconCoordinate[0];
    const point4 = iconCoordinate[3];
    const x = (point1[0] + point4[0]) / 2;
    const y = (point1[1] + point4[1]) / 2;
    return [x, y];
  }

  getIconCoordinateByIconCenter(center) {
    const [x, y] = center;
    return [
      [x - ICON_HEIGHT / 2, y - ICON_HEIGHT / 2],
      [x + ICON_HEIGHT / 2, y - ICON_HEIGHT / 2],
      [x - ICON_HEIGHT / 2, y + ICON_HEIGHT / 2],
      [x + ICON_HEIGHT / 2, y + ICON_HEIGHT / 2],
    ];
  }

  updateCoordinateByScale() {
    const scale = this.size[0] / this.baseSize[0];

    // 左上角旋转按钮
    const [rotateCenterX, rotateCenterY] = this.getIconCenter(
      this.rotateIcon.coordinate
    );
    const rotateVector = [
      rotateCenterX - this.center[0],
      rotateCenterY - this.center[1],
    ];
    const rotateVectorNew = [rotateVector[0] * scale, rotateVector[1] * scale];
    const rotateIconCenter = [
      rotateVectorNew[0] + this.center[0],
      rotateVectorNew[1] + this.center[1],
    ];
    this.rotateIcon.coordinate =
      this.getIconCoordinateByIconCenter(rotateIconCenter);

    // 右上角缩放按钮
    const [scaleCenterX, scaleCenterY] = this.getIconCenter(
      this.scaleIcon.coordinate
    );
    const scaleVector = [
      scaleCenterX - this.center[0],
      scaleCenterY - this.center[1],
    ];
    const scaleVectorNew = [scaleVector[0] * scale, scaleVector[1] * scale];
    const scaleIconCenter = [
      scaleVectorNew[0] + this.center[0],
      scaleVectorNew[1] + this.center[1],
    ];
    this.scaleIcon.coordinate =
      this.getIconCoordinateByIconCenter(scaleIconCenter);

    // 左下角删除按钮
    const [delCenterX, delCenterY] = this.getIconCenter(
      this.delIcon.coordinate
    );
    const delVector = [
      delCenterX - this.center[0],
      delCenterY - this.center[1],
    ];
    const delVectorNew = [delVector[0] * scale, delVector[1] * scale];
    const delIconCenter = [
      delVectorNew[0] + this.center[0],
      delVectorNew[1] + this.center[1],
    ];
    this.delIcon.coordinate = this.getIconCoordinateByIconCenter(delIconCenter);

    this.updateItemCoordinateByScale(this, this.center, scale);

    this.baseSize = this.size.slice(0);
  }

  updateItemCoordinateByRotate(target, center, angle) {
    const [centerX, centerY] = center;
    const coordinateVector = target.coordinate.map((point) => {
      return [point[0] - centerX, point[1] - centerY];
    });
    const newCoordinateVector = coordinateVector.map((vector) => {
      const [x, y] = vector;
      // x2 = x1 * cos - y1 * sin;
      // y2 = x1 * sin + y1 * cos;
      const newX = x * Math.cos(angle) - y * Math.sin(angle);
      const newY = x * Math.sin(angle) + y * Math.cos(angle);
      return [newX, newY];
    });
    target.coordinate = newCoordinateVector.map((vector) => {
      return [vector[0] + centerX, vector[1] + centerY];
    });
  }

  draw(ctx) {
    const sprite = this;
    ctx.save();
    const [x, y] = sprite.pos;
    const [width, height] = sprite.size;
    ctx.beginPath();

    if (this.rotateAngle !== 0) {
      const centerX = x + width / 2;
      const centerY = y + height / 2;
      ctx.translate(centerX, centerY);
      ctx.rotate(this.rotateAngle);
      ctx.translate(-centerX, -centerY);
    }

    ctx.rect(x, y, width, height);
    ctx.fillStyle = "#f00";
    ctx.fill();
    ctx.restore();
    this.drawIcon(ctx, sprite.delIcon);
    this.drawIcon(ctx, sprite.rotateIcon);
    this.drawIcon(ctx, sprite.scaleIcon);
  }

  drawIcon(ctx, icon) {
    ctx.beginPath();
    ctx.save();
    const [x, y] = icon.pos;
    const [width, height] = icon.size;

    if (this.rotateAngle !== 0) {
      const [spriteX, spriteY] = this.pos;
      const [spriteW, spriteH] = this.size;
      const centerX = spriteX + spriteW / 2;
      const centerY = spriteY + spriteH / 2;
      ctx.translate(centerX, centerY);
      ctx.rotate(this.rotateAngle);
      ctx.translate(-centerX, -centerY);
    }

    if (icon.self) {
      ctx.drawImage(icon.self, x, y, width, height);
    } else {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = icon.url;
      img.onload = function () {
        icon.self = img;
        ctx.drawImage(img, x, y, width, height);
      };
    }
    ctx.restore();
  }

  init() {
    this.initDelIcon();
    this.initRotateIcon();
    this.initScaleIcon();
  }

  // 删除按钮，左下角
  initDelIcon() {
    const [width, height] = this.size;
    const [x, y] = this.pos;
    this.delIcon = {
      ...this.delIcon,
      pos: [
        x - ICON_BOX_PADDING - ICON_HEIGHT * 0.5,
        y + height + ICON_BOX_PADDING - ICON_HEIGHT * 0.5,
      ],
      size: [ICON_HEIGHT, ICON_HEIGHT],
      url: DEL_ICON,
      parent: this,
    };
    this.delIcon.coordinate = this.setCoordinate(
      this.delIcon.pos,
      this.delIcon.size
    );
  }

  // 缩放按钮，右上角
  initScaleIcon() {
    const [width, height] = this.size;
    const [x, y] = this.pos;
    this.scaleIcon = {
      ...this.scaleIcon,
      pos: [
        x + width + ICON_BOX_PADDING - ICON_HEIGHT * 0.5,
        y - ICON_BOX_PADDING - ICON_HEIGHT * 0.5,
      ],
      size: [ICON_HEIGHT, ICON_HEIGHT],
      url: SCALE_ICON,
      parent: this,
    };

    this.scaleIcon.coordinate = this.setCoordinate(
      this.scaleIcon.pos,
      this.scaleIcon.size
    );
  }

  // 旋转按钮，左上角
  initRotateIcon() {
    const [width, height] = this.size;
    const [x, y] = this.pos;
    this.rotateIcon = {
      ...this.rotateIcon,
      pos: [
        x - ICON_BOX_PADDING - ICON_HEIGHT * 0.5,
        y - ICON_BOX_PADDING - ICON_HEIGHT * 0.5,
      ],
      size: [ICON_HEIGHT, ICON_HEIGHT],
      url: ROTATE_ICON,
      parent: this,
    };
    // const point = this.coordinate[0];
    // this.rotateIcon.coordinate = this.setIconCoordinate([point[0] - ICON_BOX_PADDING, point[1] - ICON_BOX_PADDING]);
    this.rotateIcon.coordinate = this.setCoordinate(
      this.rotateIcon.pos,
      this.rotateIcon.size
    );
  }

  // 重置icon的位置与大小
  resetIconPos() {
    const [width, height] = this.size;
    const [x, y] = this.pos;
    this.rotateIcon = {
      ...this.rotateIcon,
      pos: [
        x - ICON_BOX_PADDING - ICON_HEIGHT * 0.5,
        y - ICON_BOX_PADDING - ICON_HEIGHT * 0.5,
      ],
      size: [ICON_HEIGHT, ICON_HEIGHT],
    };
    this.scaleIcon = {
      ...this.scaleIcon,
      pos: [
        x + width + ICON_BOX_PADDING - ICON_HEIGHT * 0.5,
        y - ICON_BOX_PADDING - ICON_HEIGHT * 0.5,
      ],
      size: [ICON_HEIGHT, ICON_HEIGHT],
    };
    this.delIcon = {
      ...this.delIcon,
      pos: [
        x - ICON_BOX_PADDING - ICON_HEIGHT * 0.5,
        y + height + ICON_BOX_PADDING - ICON_HEIGHT * 0.5,
      ],
      size: [ICON_HEIGHT, ICON_HEIGHT],
    };
  }

  resetPos(dirX, dirY) {
    const [oX, oY] = this.pos;
    this.pos = [oX + dirX, oY + dirY];
    this.center = [this.center[0] + dirX, this.center[1] + dirY];

    // 更新四个顶点的坐标
    this.coordinate = this.coordinate.map((point) => {
      return [point[0] + dirX, point[1] + dirY];
    });

    if (this.delIcon) {
      const [x, y] = this.delIcon.pos;
      this.delIcon.pos = [x + dirX, y + dirY];
      this.delIcon.coordinate = this.delIcon.coordinate.map((point) => {
        return [point[0] + dirX, point[1] + dirY];
      });
    }
    if (this.scaleIcon) {
      const [x, y] = this.scaleIcon.pos;
      this.scaleIcon.pos = [x + dirX, y + dirY];
      this.scaleIcon.coordinate = this.scaleIcon.coordinate.map((point) => {
        return [point[0] + dirX, point[1] + dirY];
      });
    }
    if (this.rotateIcon) {
      const [x, y] = this.rotateIcon.pos;
      this.rotateIcon.pos = [x + dirX, y + dirY];
      this.rotateIcon.coordinate = this.rotateIcon.coordinate.map((point) => {
        return [point[0] + dirX, point[1] + dirY];
      });
    }
  }

  resetSize(dir) {
    const sprite = this;
    const [oWidth, oHeight] = sprite.size;
    this.scalePercent = (oWidth + dir) / oWidth; // 使用x轴的长度来确定缩放的比例
    const [minWidth, minHeight] = sprite.minSize;
    const [maxWidth, maxHeight] = sprite.maxSize;
    const [centerX, centerY] = sprite.center;

    let width = oWidth * this.scalePercent;
    let height = oHeight * this.scalePercent;
    width < minWidth && (width = minWidth);
    height < minHeight && (height = minHeight);
    width > maxWidth && (width = maxWidth);
    height > maxHeight && (height = maxHeight);

    const x = centerX - width / 2;
    const y = centerY - height / 2;
    sprite.pos = [x, y];
    sprite.size = [width, height];

    sprite.resetIconPos();
  }

  setRotateAngle(angleDir) {
    this.rotateAngle += angleDir;
    this.rotateAngleDir += angleDir;
  }
}
