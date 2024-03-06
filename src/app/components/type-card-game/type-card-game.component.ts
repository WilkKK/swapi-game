import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Player } from '../../classes/player/player.class';
import { PersonModel } from '../../models/person.model';
import { StarshipModel } from '../../models/starship.model';
import { GameType } from '@swapi/shared/enums';
import { CardDetail, ConfigurationKeyShowInCard, KeyOfPlayerModel, PlayerModel } from '@swapi/shared/models';
import { CamelCaseToPrettyPipe } from 'app/shared/piepes';


@Component({
  selector: 'app-type-card-game',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor, MatCardModule, CamelCaseToPrettyPipe],
  templateUrl: './type-card-game.component.html',
  styleUrls: ['./type-card-game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TypeCardGameComponent {
  @Input() isMultiPlayer: boolean = false;
  @Input({ required: true }) type!: GameType;
  private _players: Array<Player<PlayerModel>> = [];

  @Input() set players(values: Array<Player<PlayerModel>>) {
    this._players = values || [];
    this.updateCardsDetails();
  }
 
  cardsDetails: Array<CardDetail> = [];

  private personKeys: Array<keyof PersonModel> = ["name","height", "mass", "hairColor", "skinColor", "eyeColor", "birthYear", "gender", "created", "edited"]
  private starshipKeys: Array<keyof StarshipModel> = ["model", "crew", "starshipClass", "manufacturer", "costInCredits", "length", "passengers", "maxAtmospheringSpeed", "hyperdriveRating", "mglt", "cargoCapacity", "created", "edited"]

  private updateCardsDetails(): void {
    this.cardsDetails = this._players.map(player => this.mapPlayerToCardDetails(player));
  }

  private mapPlayerToCardDetails(player: Player<PlayerModel>): CardDetail {
    const configuration = this.getConfiguration(player);
    return {
      player: player,
      configuration: configuration,
      header: configuration.length > 0 ? String(configuration[0].value) : '',
      subHeader: player.details?.description || '',
    };
  }

  private getConfiguration(player: Player<PlayerModel>): ConfigurationKeyShowInCard[] {
    if (!player.details) return [];
    return this.type === GameType.PERSON ? this.getValueForCard(player.details, this.personKeys) : this.getValueForCard(player.details, this.starshipKeys);
  }

  private getValueForCard(details: PlayerModel, keys: Array<KeyOfPlayerModel>): ConfigurationKeyShowInCard[] {
    return keys.map(key => ({
      key: key,
      isBold: !['crew', 'mass'].includes(key),
      value: details[key as keyof PlayerModel] ?? '-'
    }));
  }


    
}
