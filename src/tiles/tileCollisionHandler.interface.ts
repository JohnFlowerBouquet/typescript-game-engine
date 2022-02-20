import Entity from "../Entity";
import { GameContext } from "../interface";
import Level from "../Level";
import TileResolver, { TileWithIndex } from "../TileResolver";

export type TileCollisionHandler = (entity: Entity, match: TileWithIndex, tileResolver: TileResolver, gameContext: GameContext, level: Level) => void;
