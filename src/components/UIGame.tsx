import React from 'react';

interface UIContainerProps {
  onChangeScene: () => void;
  onMoveSprite: () => void;
  onAddSprite: () => void;
  canMoveSprite: boolean;
  spritePosition: { x: number; y: number };
}

export const UIGame: React.FC<UIContainerProps> = ({
  onChangeScene,
  onMoveSprite,
  onAddSprite,
  canMoveSprite,
  spritePosition,
}) => {
  return (
    <div id="ui-container">
      <div>
        <button className="button" onClick={onChangeScene}>
          Change Scene
        </button>
      </div>
      <div>
        <button 
          disabled={canMoveSprite} 
          className="button" 
          onClick={onMoveSprite}
        >
          Toggle Movement
        </button>
      </div>
      <div className="spritePosition">
        Sprite Position:
        <pre>{`{\n  x: ${spritePosition.x}\n  y: ${spritePosition.y}\n}`}</pre>
      </div>
      <div>
        <button className="button" onClick={onAddSprite}>
          Add New Sprite
        </button>
      </div>
    </div>
  );
};