import { AUTO, Scale } from 'phaser';
import { GAME_HEIGHT, GAME_WIDTH } from '../constants/game';
import { Boot } from '../scenes/Boot';
import { Game as MainGame } from '../scenes/Game';
import { GameOver } from '../scenes/GameOver';
import { MainMenu } from '../scenes/MainMenu';
import { Preloader } from '../scenes/Preloader';

//  Find out more information about the Game Config at:
//  https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
export const config: Phaser.Types.Core.GameConfig = {
  type: AUTO,
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  parent: 'game-container',
  backgroundColor: '#028af8',
  scale: {
    mode: Scale.RESIZE,
    autoCenter: Scale.NO_CENTER,
  },
  scene: [Boot, Preloader, MainMenu, MainGame, GameOver],
};
