import { Component } from '@angular/core';
import { SwapiService } from '../../core/services/http/swapi.service';
import { forkJoin } from 'rxjs';
import { GameType } from '../../shared/enums/game-type.enum';
import { PersonModel } from '../../models/person.model';
import { NgFor, NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { StarshipModel } from '../../models/starship.model';
import { GamePlayer } from '../../shared/enums/game-player.enum';
import { Game } from '../../classes/game/game.class';
import { Player } from '../../classes/player/player.class';
import { HeaderConfigurationGameComponent } from '../configuration-game/configuration-game.component';
import { PlayerModel } from '../../shared/models/player-model';
import { TypeCardGameComponent } from '../type-card-game/type-card-game.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [NgIf, NgFor, NgSwitch, NgSwitchCase, MatButtonModule, MatProgressSpinnerModule,
     HeaderConfigurationGameComponent, TypeCardGameComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {

  GameType = GameType;
  GamePlayer = GamePlayer;
  type: GameType = GameType.PERSON;
  playerType: GamePlayer = GamePlayer.SINGLE;
  game!: Game<PersonModel> | Game<StarshipModel> | null;
  isWinnerGame: boolean = false;
  isWinnerRound: boolean = false;
  gameIsOn: boolean = false;
  roundIsOn: boolean = true;


  constructor(private swapiService: SwapiService) { }

  startGame(): void {
    this.initializePlayers();
    this.playGame();
  }

  playNextRound() {
    if (!this.game) return;
    this.game.currentRound++;
    this.playGame();
  }

  gameTypeChange(value: GameType) {
    this.type = value;
    this.resetGame();
  }

  gamePlayerChange(value: GamePlayer) {
    this.playerType = value;
    this.resetGame();
  }

  private initializePlayers(): void {
      if (this.type === GameType.PERSON) {
       const personPlayers =  [new Player<PersonModel>("Player 1"), new Player<PersonModel>("Player 2")];
      this.game = new Game<PersonModel>(this.type, this.playerType, personPlayers, "mass");
    } else {
       const starshipPlayers = [new Player<StarshipModel>("Player 1"), new Player<StarshipModel>("Player 2")];
      this.game = new Game<StarshipModel>(this.type, this.playerType, starshipPlayers, "crew");
    }
    this.game.isStarted = true;
  }

  private playGame(): void {
    if (!this.game) return;

    const { first, second } = this.type === GameType.PERSON
      ? { first: this.swapiService.getPerson(), second: this.swapiService.getPerson() }
      : { first: this.swapiService.getStarships(), second: this.swapiService.getStarships() };

    forkJoin({ first, second }).subscribe(result => this.setPlayers(result.first, result.second));
  }

  private resetGame(): void {
    this.game = null;
    this.gameIsOn = false;
    this.roundIsOn = true;
    this.isWinnerGame = false;
    this.isWinnerRound = false;
  }

  private winnerExist(checkRoundWinner: boolean = false): boolean {
    if (!this.game) return false;
    return checkRoundWinner ? !!this.game.winnerRoundName : !!this.game.winnerName;
  }

  private setPlayers(firstPlayer: PlayerModel, secoundPlayer: PlayerModel) {
    if (this.game) {
      this.game.players[0].details = firstPlayer
      this.game.players[1].details = secoundPlayer
      if (this.game?.type === GameType.PERSON) {
        const game = this.game as Game<PersonModel>;
        game.players = [...game.players];
      } else if (this.game?.type === GameType.STARSHIPS) {
        const game = this.game as Game<StarshipModel>;
        game.players = [...game.players];
      }

      this.game.setWinnerName();
      this.updateGameState();
    }
  }

  private updateGameState(): void {
    if (!this.game) return;
    this.gameIsOn = this.game.isStarted && this.playerType === GamePlayer.DOUBLE;
    this.roundIsOn = this.game.isRoundStarted && this.playerType === GamePlayer.DOUBLE;
    this.isWinnerGame = this.winnerExist();
    this.isWinnerRound = this.winnerExist(true);
  }

}
