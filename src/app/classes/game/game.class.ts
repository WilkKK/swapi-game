import { GamePlayer } from "../../models/game-player.enum";
import { GameType } from "../../models/game-type.enum";
import { Player } from "../player/player.class";

export class Game<T> {
    isStared: boolean;
    isRoundStarted: boolean = false;
    isFinish: boolean;
    courentRound: number = 1;
    winnerRoundName: null | string = null;
    winnerName: null | string = null;
    players: Player<T>[];
    maxRound: number;
    private _propertiesToIndicateWinner: keyof T;
    private _type: GameType;
    private _player: GamePlayer;

  
    constructor(type: GameType, player: GamePlayer, players: Player<T>[], propertiesToIndicateWinner: keyof T,  maxRound: number = 5) {
      this._type = type;
      this._player = player;
      this.maxRound = maxRound
      this.players = players;
      this.isStared = false;
      this.isFinish = false;
      this._propertiesToIndicateWinner = propertiesToIndicateWinner;
    }
  
    public get type(): GameType {
        return this._type;
    }
    public get player(): GamePlayer {
        return this._player;
    }
    public setWinnerName(): void {
        const sortedPlayers = [...this.players].sort((a, b) => {
            if (a.details![this._propertiesToIndicateWinner]> b.details![this._propertiesToIndicateWinner]) return -1;
            if (a.details![this._propertiesToIndicateWinner]< b.details![this._propertiesToIndicateWinner]) return 1;
            return 0;
        });
        const isDraw = sortedPlayers.filter(item => sortedPlayers[0].details![this._propertiesToIndicateWinner] === item.details![this._propertiesToIndicateWinner]);
        this.winnerRoundName = isDraw.length > 1 ? null : sortedPlayers[0].name;
        this.isRoundStarted = false;
        this.setPoints()
        this.continueGame();
    }

    private continueGame(): void {
      if(this.player === GamePlayer.SINGLE){
       this.isFinish = true;
       this.isStared = false; 
       this.winnerName = this.winnerRoundName;
     } else {
       if(this.courentRound >= this.maxRound){
         this.isFinish = true;
         this.isStared = false; 
         const sortedPlayersByPoints = [...this.players].sort((a, b) => {
           if (a.currentPoint> b.currentPoint) return -1;
           if (a.currentPoint< b.currentPoint) return 1;
           return 0;
       });
       const isDraw = sortedPlayersByPoints.filter(item => sortedPlayersByPoints[0].currentPoint === item.currentPoint);
       this.winnerName = isDraw.length > 1 ? null : sortedPlayersByPoints[0].name;
       
       }
     }
   }

    private setPoints(){
        const winner = this.players.find(item => item.name === this.winnerRoundName);
        if(winner){
            winner.currentPoint++;
        } else {
            this.players.map(player => player.currentPoint++)
        }
    }   
  }
