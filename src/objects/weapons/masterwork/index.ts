import { List } from "immutable";
import { MasterworkGreatword } from "./greatsword.item";
import { Choose } from "../../../types/random";

export const MasterworkWeapon = (level) => Choose(List.of( 
    MasterworkGreatword(level),
), 1).first();