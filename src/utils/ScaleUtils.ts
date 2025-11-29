export class ScaleUtils {
    private static instance: ScaleUtils;
    private game: Phaser.Game;
    private baseWidth: number = 1280;
    private baseHeight: number = 720;

    public scaleFactor: number = 1;
    public currentWidth: number = 1280;
    public currentHeight: number = 720;
    public aspectRatio: number = 16 / 9;

    public static getInstance(): ScaleUtils {
        if (!ScaleUtils.instance) {
            ScaleUtils.instance = new ScaleUtils();
        }
        return ScaleUtils.instance;
    }

    public init(game: Phaser.Game, baseWidth: number = 1280, baseHeight: number = 720): void {
        this.game = game;
        this.baseWidth = baseWidth;
        this.baseHeight = baseHeight;
        this.aspectRatio = baseWidth / baseHeight;
        this.updateScale();
    }

    public updateScale(): void {
        const width = this.game.scale.width;
        const height = this.game.scale.height;

        this.currentWidth = width;
        this.currentHeight = height;

        // Рассчитываем масштаб для сохранения пропорций
        const scaleX = width / this.baseWidth;
        const scaleY = height / this.baseHeight;
        
        // Используем минимальный масштаб чтобы все помещалось
        this.scaleFactor = Math.min(scaleX, scaleY);
    }

    public getScale(): number {
        return this.scaleFactor;
    }

    // Относительные координаты
    public getRelativeX(x: number): number {
        return (x / this.baseWidth) * this.currentWidth;
    }

    public getRelativeY(y: number): number {
        return (y / this.baseHeight) * this.currentHeight;
    }

    // Относительные размеры
    public getRelativeSize(size: number): number {
        return size * this.scaleFactor;
    }

    // Центр экрана
    public getScreenCenterX(): number {
        return this.currentWidth / 2;
    }

    public getScreenCenterY(): number {
        return this.currentHeight / 2;
    }

    // Проверка ориентации
    public isPortrait(): boolean {
        return this.currentWidth < this.currentHeight;
    }

    public isLandscape(): boolean {
        return this.currentWidth >= this.currentHeight;
    }
}

export const scaleUtils = ScaleUtils.getInstance();