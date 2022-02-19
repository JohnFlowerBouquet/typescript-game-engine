import Entity from "../Entity";
import TileResolver, { TileWithIndex } from "../TileResolver";

export type TileCollisionHandler = (entity: Entity, match: TileWithIndex, tileResolver: TileResolver) => void;
