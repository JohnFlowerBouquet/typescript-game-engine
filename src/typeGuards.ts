export function isMouseEvent(value: unknown): value is MouseEvent {
    return (value as MouseEvent).buttons !== undefined;
}