import { PersonModel } from "../../models/person.model";
import { StarshipModel } from "../../models/starship.model";

export type PlayerModel = PersonModel | StarshipModel;

export type KeyOfPlayerModel = keyof PersonModel | keyof StarshipModel;