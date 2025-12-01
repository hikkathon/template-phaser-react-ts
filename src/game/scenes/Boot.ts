import { scaleUtils } from '@/utils/ScaleUtils';
import { BaseScene } from './BaseScene';

export class Boot extends BaseScene {
  constructor() {
    super('Boot');
  }

  preload(): void {
    scaleUtils.init(this.game, 1280, 720);

    //  The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
    //  The smaller the file size of the assets, the better, as the Boot Scene itself has no preloader.

    this.load.image('background', 'assets/bg.png');
  }

  create(): void {
    super.create();

    this.scene.start('Preloader');
  }
}
