import { Component } from '@angular/core';
import { SwapiService } from '../../services/swapi.service';
import { forkJoin } from 'rxjs';
import { GameType } from '../../models/game-type.enum';
import { PersonCardComponent } from '../../components/person-card/person-card.component';
import { StarshipCardComponent } from '../../components/starship-card/starship-card.component';
import { PersonModel } from '../../models/person.model';
import { NgFor, NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { StarshipModel } from '../../models/starship.model';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { GamePlayer } from '../../models/game-player.enum';
import { Game } from '../../classes/game/game.class';
import { Player } from '../../classes/player/player.class';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [PersonCardComponent, StarshipCardComponent, NgIf, NgFor, NgSwitch, NgSwitchCase, MatButtonModule, MatProgressSpinnerModule, MatRadioModule, FormsModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {

  constructor(private swapiService: SwapiService) { }
  GameType = GameType;
  GamePlayer = GamePlayer;
  type: GameType = GameType.PERSON;
  playerType: GamePlayer = GamePlayer.SINGLE;
  game!: Game<PersonModel> | Game<StarshipModel> | null;

  startGame() {
    if (this.type === GameType.PERSON) {
      const players = [new Player<PersonModel>("Player 1"), new Player<PersonModel>("Player 2")];
      this.game = new Game<PersonModel>(this.type, this.playerType, players, "mass");
    } else {
      const players = [new Player<StarshipModel>("Player 1"), new Player<StarshipModel>("Player 2")];
      this.game = new Game<StarshipModel>(this.type, this.playerType, players, "crew");
    }
    this.game.isStared = true;
    this.playGame();
  }

  playNextRound() {
    this.game!.courentRound++;
    this.playGame();
  }

  get getPlayers(): Array<Player<PersonModel> | Player<StarshipModel>> {
    return this.game?.players ?? [];
  }

  getStarshipPlayers(player: Player<PersonModel> | Player<StarshipModel>): StarshipModel {
    return player?.details as StarshipModel;
  }
  getPersonPlayers(player: Player<PersonModel> | Player<StarshipModel>): PersonModel {
    return player?.details as PersonModel
  }

  gameTypeChange(value: GameType) {
    this.type = value;
    this.game = null;
  }

  gamePlayerChange(value: GamePlayer) {
    this.playerType = value;
    this.game = null;
  }

  gameIsInit(): boolean {
    return !!this.game;
  }

  gameIsOn(): boolean {
    return this.gameIsInit() && !!this.game?.isStared && this.playerType === GamePlayer.DOUBLE;
  }

  roundIsOn(): boolean {
    return this.gameIsInit() && !!this.game?.isRoundStarted && this.playerType === GamePlayer.DOUBLE;
  }

  winnerExist(roundWinner: boolean = false): boolean {
    const gameWinnerExist = !!this.game?.winnerName;
    const roundWinnerExist = !!this.game?.winnerRoundName
    return this.gameIsInit() && (roundWinner ? roundWinnerExist : gameWinnerExist);
  }

  private playGame() {
    if (this.type === GameType.PERSON) {
      forkJoin({
        firstPerson: this.swapiService.getPerson(),
        secoundPerson: this.swapiService.getPerson()
      }).subscribe(result => this.setPlayers(result.firstPerson, result.secoundPerson))
    } else {
      forkJoin({
        firstStarship: this.swapiService.getStarships(),
        secoundStarship: this.swapiService.getStarships()
      }).subscribe(result => this.setPlayers(result.firstStarship, result.secoundStarship))
    }
  }

  private setPlayers(firstPlayer: PersonModel | StarshipModel, secoundPlayer: PersonModel | StarshipModel) {
    if (this.game) {
      this.game.players[0].details = firstPlayer
      this.game.players[1].details = secoundPlayer
      this.game.setWinnerName();
    }
  }

}
