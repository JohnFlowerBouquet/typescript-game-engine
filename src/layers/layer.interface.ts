import Camera from "../Camera";

export type Layer = (context: CanvasRenderingContext2D, camera: Camera) => void;