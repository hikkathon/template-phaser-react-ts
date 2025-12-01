import { Button } from './ui/button';
import { Card } from './ui/card';
import { Label } from './ui/label';
import { Switch } from './ui/switch';

interface UIContainerProps {
  onChangeScene: () => void;
  isMovementModeActive: boolean;
  onAddSprite: () => void;
  onToggleMovementMode: (checked: boolean) => void;
  spritePosition: { x: number; y: number };
  canMoveSprite: boolean;
}

export const UIGame: React.FC<UIContainerProps> = ({
  onChangeScene,
  isMovementModeActive,
  onAddSprite,
  onToggleMovementMode,
  spritePosition,
  canMoveSprite,
}) => {
  return (
    <div id="ui-container">
      <div className="flex flex-wrap items-center flex-row p-2">
        <Button variant="outline" onClick={onChangeScene}>
          Change Scene
        </Button>
      </div>
      <div className="flex flex-wrap items-center flex-row p-2 gap-2">
        <Switch
          disabled={canMoveSprite}
          checked={isMovementModeActive}
          onCheckedChange={onToggleMovementMode}
          id="airplane-mode"
        />
        <Label htmlFor="airplane-mode">Movement Mode</Label>
      </div>
      <div className="flex flex-col items-start p-2 gap-2">
        <Label htmlFor="airplane-mode">Sprite Position:</Label>
        <Card className="p-2">
          <pre>{`x: ${spritePosition.x} y: ${spritePosition.y}`}</pre>
        </Card>
      </div>
      <div className="flex flex-wrap items-center flex-row p-2">
        <Button variant="outline" onClick={onAddSprite}>
          Add New Sprite
        </Button>
      </div>
    </div>
  );
};
