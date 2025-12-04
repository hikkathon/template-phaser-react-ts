import { GameObjects } from 'phaser';
import { SCENE_KEYS } from '../constants/scenes';
import { EventBus } from '../core/event-bus';
import { scaleUtils } from '../utils/scale-utils';
import { BaseScene } from './BaseScene';

export class MainMenu extends BaseScene {
  background: GameObjects.Image;
  logo: GameObjects.Image;
  title: GameObjects.Text;
  logoTween: Phaser.Tweens.Tween | null = null;

  private checked: boolean;

  logoCallback: ((p: { x: number; y: number }) => void) | null = null;

  constructor() {
    super(SCENE_KEYS.MAIN_MENU);
  }

  create(): void {
    this.background = this.add.image(0, 0, 'background');

    this.logo = this.add.image(0, 0, 'logo').setDepth(100);

    this.title = this.add
      .text(0, 0, 'Main Menu', {
        fontFamily: 'Verdana, sans-serif',
        fontSize: 38,
        color: '#ffffff',
        stroke: '#000000',
        align: 'center',
      })
      .setOrigin(0.5)
      .setDepth(100);

    super.create();

    EventBus.emit('current-scene-ready', this);
    EventBus.on('toggle-movement-mode', this.toggleMovementMode);
  }

  toggleMovementMode = (checked: boolean) => {
    this.checked = checked;

    const tweenExists = !!this.logoTween;

    if (checked) {
      if (tweenExists) {
        this.logoTween?.resume();
      } else {
        this.moveLogoTween(this.logoCallback ?? (() => {}));
      }
    } else {
      this.logoTween?.pause();
    }
  };

  // Переопределяем метод для конкретной логики этой сцены
  override refreshLayout(): void {
    if (!this.background || !this.logo || !this.title) return;

    // --- ФОН ---
    this.setBackgroundCover(this.background);

    // --- ЛОГИКА ПЕРЕКЛЮЧЕНИЯ (ПОРТРЕТ / ЛАНДШАФТ) ---
    if (scaleUtils.isPortrait()) {
      // Портрет
      this.logo.setPosition(this.centerX, scaleUtils.getRelativeY(246)).setScale(this._scale * 1.6);

      this.title
        .setPosition(this.centerX, scaleUtils.getRelativeY(300))
        .setFontSize(128 * this._scale);
    } else {
      // Ландшафт
      this.logo.setPosition(scaleUtils.currentWidth * 0.4, this.centerY).setScale(this._scale);

      this.title
        .setPosition(scaleUtils.currentWidth * 0.7, this.centerY)
        .setFontSize(48 * this._scale);
    }

    if (this.checked) {
      this.restartLogoTween();
    }
  }

  changeScene(): void {
    if (this.logoTween) {
      this.logoTween.stop();
      this.logoTween = null;
    }

    this.scene.start(SCENE_KEYS.GAME);
  }

  moveLogoTween(callback: ({ x, y }: { x: number; y: number }) => void) {
    const tween = this.logoTween;

    this.logoCallback = callback;

    const relativeOffset = scaleUtils.getRelativeY(10);

    if (tween) {
      if (tween.isPlaying()) tween.pause();
      else tween.play();

      return;
    }

    this.logoTween = this.tweens.add({
      targets: this.logo,
      y: { value: `+=${relativeOffset}`, duration: 1500, ease: 'Sine.easeInOut' },
      yoyo: true,
      repeat: -1,
      onUpdate: () => {
        if (callback) {
          callback({
            x: Math.floor(this.logo.x),
            y: Math.floor(this.logo.y),
          });
        }
      },
    });
  }

  restartLogoTween(): void {
    const tween = this.logoTween;

    if (!tween) return;

    const wasPlaying = tween.isPlaying();

    tween.stop();
    tween.remove();
    this.logoTween = null;

    this.moveLogoTween(this.logoCallback ?? (() => {}));

    if (!wasPlaying && this.logoTween) {
      tween.pause();
    }
  }
}
