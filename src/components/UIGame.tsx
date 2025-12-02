import { Button } from './ui/button';
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
      <div className="flex justify-between items-center flex-row gap-2 p-2">
        <Button variant="outline" onClick={onChangeScene}>
          Change Scene
        </Button>
        <Button variant="outline" onClick={onAddSprite}>
          Add New Sprite
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
      <div className="flex justify-start items-start flex-col gap-2 p-2">
        <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold ">
          Sprite Position
          <Label htmlFor="airplane-mode">{` x: ${spritePosition.x} y: ${spritePosition.y}`}</Label>
        </code>
      </div>
    </div>
  );
};
