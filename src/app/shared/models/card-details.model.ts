import { Player } from "../../classes/player/player.class";
import { ConfigurationKeyShowInCard } from "./configuration-key-card.type";
import { PlayerModel } from "./player-model";

export interface CardDetail {
    player: Player<PlayerModel>;
    configuration: ConfigurationKeyShowInCard[];
    header: string;
    subHeader?: string;
  }