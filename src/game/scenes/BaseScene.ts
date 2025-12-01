import { scaleUtils } from '@/utils/ScaleUtils';
import { GameObjects, Scene } from 'phaser';

export class BaseScene extends Scene {
  protected centerX: number = 0;
  protected centerY: number = 0;
  protected _scale: number = 1;

  constructor(key: string) {
    super(key);
  }

  create(): void {
    this.scale.on('resize', this.resize, this);

    this.events.once('shutdown', this.cleanup, this);

    this.resize();
  }

  resize(): void {
    scaleUtils.updateScale();

    this.centerX = scaleUtils.getScreenCenterX();
    this.centerY = scaleUtils.getScreenCenterY();
    this._scale = scaleUtils.getScale();

    this.refreshLayout();
  }

  refreshLayout(): void {
    // Override me in child class
  }

  protected setBackgroundCover(image: GameObjects.Image): void {
    const bgScaleX = scaleUtils.currentWidth / image.width;
    const bgScaleY = scaleUtils.currentHeight / image.height;
    const bgScale = Math.max(bgScaleX, bgScaleY);
    image.setPosition(this.centerX, this.centerY).setScale(bgScale);
  }

  private cleanup(): void {
    this.scale.off('resize', this.resize, this);
  }
}
