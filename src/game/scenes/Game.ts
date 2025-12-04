import { ASSET_KEYS } from '../constants/assets';
import { GameEvents } from '../constants/events';
import { SCENE_KEYS } from '../constants/scenes';
import { EventBus } from '../core/event-bus';
import { BaseScene } from './BaseScene';

export class Game extends BaseScene {
  camera: Phaser.Cameras.Scene2D.Camera;
  background: Phaser.GameObjects.Image;
  gameText: Phaser.GameObjects.Text;

  constructor() {
    super(SCENE_KEYS.GAME);
  }

  create(): void {
    this.camera = this.cameras.main;
    this.camera.setBackgroundColor(0x00ff00);

    this.background = this.add.image(0, 0, ASSET_KEYS.BACKGROUND);
    this.background.setAlpha(0.5);

    this.gameText = this.add
      .text(0, 0, 'Make something fun!\nand share it with us:\nsupport@phaser.io', {
        fontFamily: 'Verdana, sans-serif',
        fontSize: 38,
        color: '#ffffff',
        stroke: '#000000',
        align: 'center',
      })
      .setOrigin(0.5)
      .setDepth(100);

    super.create();

    EventBus.emit(GameEvents.SCENE.READY, this);
  }

  changeScene(): void {
    this.scene.start(SCENE_KEYS.GAME_OVER);
  }

  override refreshLayout(): void {
    if (!this.background || !this.gameText) return;

    this.setBackgroundCover(this.background);

    this.gameText.setPosition(this.centerX, this.centerY).setFontSize(64 * this._scale);
  }
}
