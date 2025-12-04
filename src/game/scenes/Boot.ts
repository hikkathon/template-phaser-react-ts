import { ASSET_KEYS } from '../constants/assets';
import { SCENE_KEYS } from '../constants/scenes';
import { scaleUtils } from '../utils/scale-utils';
import { BaseScene } from './BaseScene';

export class Boot extends BaseScene {
  constructor() {
    super(SCENE_KEYS.BOOT);
  }

  preload(): void {
    scaleUtils.init(this.game, 1280, 720);

    //  The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
    //  The smaller the file size of the assets, the better, as the Boot Scene itself has no preloader.

    this.load.image(ASSET_KEYS.BACKGROUND, 'assets/bg.png');
  }

  create(): void {
    super.create();

    this.scene.start(SCENE_KEYS.PRELOAD);
  }
}
