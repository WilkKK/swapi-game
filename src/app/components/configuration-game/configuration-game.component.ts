import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { GamePlayer, GameType } from '@swapi/shared/enums';

@Component({
  selector: 'app-configuration-game',
  standalone: true,
  imports: [MatRadioModule, FormsModule],
  templateUrl: './configuration-game.component.html',
  styleUrl: './configuration-game.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderConfigurationGameComponent {

  @Input() isOptionDisable: boolean = false;
  @Output() gameTypeChange: EventEmitter<GameType> = new EventEmitter();
  @Output() gamePlayerChange: EventEmitter<GamePlayer> = new EventEmitter();

  type: GameType = GameType.PERSON;
  playerType: GamePlayer = GamePlayer.SINGLE;
  GameType = GameType;
  GamePlayer = GamePlayer;
 
  typeChanged($event: GameType) {
    this.gameTypeChange.emit($event)
  }

  playerTypeChanged($event: GamePlayer){
    this.gamePlayerChange.emit($event);
  }

}
