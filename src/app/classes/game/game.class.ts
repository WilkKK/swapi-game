import { GamePlayer, GameType } from "@swapi/shared/enums";
import { Player } from "../player/player.class";

export class Game<T> {
  isStarted: boolean = false;
  isRoundStarted: boolean = false;
  isFinish: boolean = false;
  currentRound: number = 1;
  winnerRoundName: null | string = null;
  winnerName: null | string = null;
  players: Array<Player<T>>;
  maxRound: number;
  gameIsOn: boolean = false;
  private _propertiesToIndicateWinner: keyof T;
  private _type: GameType;
  private _player: GamePlayer;


  constructor(type: GameType, player: GamePlayer, players: Player<T>[], propertiesToIndicateWinner: keyof T, maxRound: number = 5) {
    this._type = type;
    this._player = player;
    this.maxRound = maxRound
    this.players = players;
    this._propertiesToIndicateWinner = propertiesToIndicateWinner;
  }

  public get type(): GameType {
    return this._type;
  }
  public get player(): GamePlayer {
    return this._player;
  }

  public setWinnerName(): void {
    if (this.players.some(player => !player.details)) return;
    const sortedPlayers = this.sortPlayersByProperty();
    const isDraw = this.checkDraw(sortedPlayers);
    this.winnerRoundName = isDraw ? null : sortedPlayers[0].name;
    this.isRoundStarted = false;
    this.setPoints();
    this.continueGame();
  }

  private sortPlayersByProperty(): Player<T>[] {
    return [...this.players].sort((a, b) => (b.details![this._propertiesToIndicateWinner] as number) - (a.details![this._propertiesToIndicateWinner] as number));
  }

  private checkDraw(sortedPlayers: Player<T>[]): boolean {
    return sortedPlayers.filter(player => player.details![this._propertiesToIndicateWinner] === sortedPlayers[0].details![this._propertiesToIndicateWinner]).length > 1;
  }


  private continueGame(): void {
    if (this.currentRound >= this.maxRound || this.player === GamePlayer.SINGLE) {
      this.endGame();
    }
  }

  private endGame(): void {
    this.isFinish = true;
    this.isStarted = false;
    const sortedPlayersByPoints = this.sortPlayersByPoints();
    const isDraw = this.checkDrawByPoints(sortedPlayersByPoints);

    this.winnerName = isDraw ? null : sortedPlayersByPoints[0].name;
  }

  private sortPlayersByPoints(): Player<T>[] {
    return [...this.players].sort((a, b) => b.currentPoint - a.currentPoint);
  }

  private checkDrawByPoints(sortedPlayers: Player<T>[]): boolean {
    return sortedPlayers.filter(player => player.currentPoint === sortedPlayers[0].currentPoint).length > 1;
  }

  private setPoints(): void {
    const winner = this.players.find(player => player.name === this.winnerRoundName);
    winner ? winner.currentPoint++ : this.players.forEach(player => player.currentPoint++);
  }

}
