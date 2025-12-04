export const GameEvents = {
  SCENE: {
    READY: 'game:scene-ready',
    CHANGED: 'game:scene-changed',
    PAUSED: 'game:scene-paused',
  },
  INPUT: {
    MOVEMENT_MODE_TOGGLE: 'input:movement-mode-toggle',
  },
  UI: {
    BUTTON_CLICK: 'ui:button-click',
  },
} as const;
