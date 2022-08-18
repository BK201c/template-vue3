interface Props {
  position: number[]; // 在canvas中的位置
  size: number[]; // sprite的当前大小
  minSize?: number[]; // sprite缩放时允许的最小size
  maxSize?: number[]; // sprite缩放时允许的最大size
}
export class Sprite {
  private id: number | string;
  private center: number[];
  private initSize: number[];
  private currentSize: number[];
  private delIcon: any;
  private scaleIcon: any;
  private rotateIcon: any;
  private boundingBox: number[][];
  private rotateAngle: number = 0;
  private rotateAngleDir: number = 0;
  private scalePercent: number = 1; // 缩放比例

  constructor(props: Props) {
    this.id = Date.now() + Math.floor(Math.random() * 10);
    this.currentSize = props.size;
    this.initSize = props.size;
    this.center = this.getCenter(props);
    this.boundingBox = this.setBondingBox(props.position, props.size);
  }

  private getCenter(props: Props) {
    return [
      props.position[0] + props.size[0] / 2,
      props.position[1] + props.size[1] / 2,
    ];
  }

  // 设置四个顶点的初始化坐标
  setBondingBox(position: number[], size: number[]): number[][] {
    return [[]];
  }

  // 根据旋转角度更新sprite的所有部分的顶点坐标
  updateCoordinateByRotate(): void {}

  // 根据旋转角度更新顶点坐标
  updateItemCoordinateByRotate(target, center, angle): void {}

  // 根据缩放比例更新顶点坐标
  updateItemCoordinateByScale(sprite, center, scale): void {}

  // 根据按钮icon的顶点坐标获取icon中心点坐标
  getIconCenter(iconCoordinate) {}

  // 根据按钮icon的中心点坐标获取icon的顶点坐标
  getIconCoordinateByIconCenter(center) {}

  // 根据缩放比更新顶点坐标
  updateCoordinateByScale(): void {}

  // 画出该sprite
  draw(ctx: any) {}

  // 画出该sprite对应的按钮icon
  drawIcon(ctx: any, icon: any) {}

  // 对sprite进行初始化
  init() {}

  // 初始化删除按钮，左下角
  initDelIcon() {}

  // 初始化缩放按钮，右上角
  initScaleIcon() {}

  // 初始化旋转按钮，左上角
  initRotateIcon() {}

  // 重置icon的位置与大小
  resetIconPos() {}

  // 根据移动的距离重置sprite所有部分的位置
  resetPos(dirX, dirY) {}

  // 根据触摸点移动的距离计算缩放比，并重置sprite的尺寸
  resetSize(dir) {}

  // 设置sprite的旋转角度
  setRotateAngle(angleDir) {}
}
