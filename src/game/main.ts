import { Game } from 'phaser';
import { config } from './core/config';

const StartGame = (parent: string): Game => {
  return new Game({ ...config, parent });
};

export default StartGame;
