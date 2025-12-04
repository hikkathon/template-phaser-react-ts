import { Scene } from 'phaser';
import { ASSET_KEYS } from '../constants/assets';
import { SCENE_KEYS } from '../constants/scenes';

export class Preloader extends Scene {
  constructor() {
    super(SCENE_KEYS.PRELOAD);
  }

  init(): void {
    const { width, height } = this.scale;

    const barWidth = width * 0.5;
    const barHeight = 32;

    // Рамка прогресс-бара
    this.add.rectangle(width / 2, height / 2, barWidth, barHeight).setStrokeStyle(2, 0xffffff);

    const bar = this.add
      .rectangle(width / 2 - barWidth / 2, height / 2, 0, barHeight - 4, 0xffffff)
      .setOrigin(0, 0.5);

    this.load.on('progress', (progress: number) => {
      bar.width = (barWidth - 4) * progress;
    });
  }

  preload(): void {
    //  Load the assets for the game - Replace with your own assets
    this.load.setPath('assets');

    this.load.image(ASSET_KEYS.LOGO, 'logo.png');
    this.load.image('star', 'star.png');
  }

  create(): void {
    //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
    //  For example, you can define global animations here, so we can use them in other scenes.

    //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
    this.scene.start(SCENE_KEYS.MAIN_MENU);
  }
}
