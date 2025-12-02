import { IRefPhaserGame, PhaserGame } from '@/components/PhaserGame';
import { UIGame } from '@/components/UIGame';
import { MainMenu } from '@/game/scenes/MainMenu';
import '@/styles/globals.css';
import { useRef, useState } from 'react';
import { EventBus } from './game/EventBus';

export const App = (): React.ReactNode => {
  const [isMovementModeActive, setIsMovementModeActive] = useState(false);
  const [canMoveSprite, setCanMoveSprite] = useState(true);

  const phaserRef = useRef<IRefPhaserGame | null>(null);
  const [spritePosition, setSpritePosition] = useState({ x: 0, y: 0 });

  const changeScene = () => {
    if (phaserRef.current) {
      const scene = phaserRef.current.scene as MainMenu;
      if (scene) {
        scene.changeScene();
        setIsMovementModeActive(false);
        setSpritePosition({ x: 0, y: 0 });
      }
    }
  };

  const moveSprite = () => {
    if (phaserRef.current) {
      const scene = phaserRef.current.scene as MainMenu;
      if (scene && scene.scene.key === 'MainMenu') {
        scene.moveLogoTween(({ x, y }) => {
          setSpritePosition({ x, y });
        });
      }
    }
  };

  const toggleMovementMode = (checked: boolean) => {
    setIsMovementModeActive(checked);
    moveSprite();
    EventBus.emit('toggle-movement-mode', checked);
  };

  const addSprite = () => {
    if (phaserRef.current) {
      const scene = phaserRef.current.scene;
      if (scene) {
        // Add more stars
        const x = Phaser.Math.Between(64, scene.scale.width - 64);
        const y = Phaser.Math.Between(64, scene.scale.height - 64);

        const star = scene.add.sprite(x, y, 'star');

        scene.add.tween({
          targets: star,
          duration: 500 + Math.random() * 1000,
          alpha: 0,
          yoyo: true,
          repeat: -1,
        });
      }
    }
  };

  const currentScene = (scene: Phaser.Scene) => {
    setIsMovementModeActive(false);
    setCanMoveSprite(scene.scene.key !== 'MainMenu');
  };

  return (
    <div id="app">
      <PhaserGame ref={phaserRef} currentActiveScene={currentScene} />
      <UIGame
        onChangeScene={changeScene}
        onAddSprite={addSprite}
        isMovementModeActive={isMovementModeActive}
        onToggleMovementMode={toggleMovementMode}
        spritePosition={spritePosition}
        canMoveSprite={canMoveSprite}
      />
    </div>
  );
};
