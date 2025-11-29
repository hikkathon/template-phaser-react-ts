import { EventBus } from '../EventBus';
import { BaseScene } from './BaseScene';

export class GameOver extends BaseScene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    gameOverText : Phaser.GameObjects.Text;

    constructor () {
        super('GameOver');
    }

    create (): void {
        this.camera = this.cameras.main
        this.camera.setBackgroundColor(0xff0000);

        this.background = this.add.image(0, 0, 'background');
        this.background.setAlpha(0.5);

        this.gameOverText = this.add.text(512, 384, 'Game Over', {
            fontFamily: 'Verdana, sans-serif', fontSize: 64, color: '#ffffff',
            stroke: '#000000', strokeThickness: 4,
            align: 'center'
        }).setOrigin(0.5).setDepth(100);
        
        super.create();

        EventBus.emit('current-scene-ready', this);
    }

    changeScene (): void {
        this.scene.start('MainMenu');
    }

    override refreshLayout (): void {
        if (!this.background || !this.gameOverText) return;

        this.setBackgroundCover(this.background);        

        this.gameOverText.setPosition(this.centerX, this.centerY)
                         .setFontSize(64 * this._scale);
    }
}
