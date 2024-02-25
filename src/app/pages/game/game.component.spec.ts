import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameComponent } from './game.component';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { SwapiService } from '../../services/swapi.service';
import { firstPerson } from '../../mocks/person';
import { GameType } from '../../models/game-type.enum';
import { firstStarship } from '../../mocks/starship';
import { GamePlayer } from '../../models/game-player.enum';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;
  let swapiServiceMock: any;

  beforeEach(async () => {
    swapiServiceMock = jasmine.createSpyObj("SwapiService", ["getPerson", "getStarships"]);
    swapiServiceMock.getPerson.and.returnValue(of(firstPerson))
    swapiServiceMock.getStarships.and.returnValue(of(firstStarship))

    await TestBed.configureTestingModule({
      imports: [GameComponent, HttpClientModule],
      providers: [
        { provide: SwapiService, useValue: swapiServiceMock }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should render two person cards and solution after start game', () => {
    component.gameTypeChange(GameType.PERSON);
    component.startGame()
    fixture.detectChanges();
    const appPersonCardLength = fixture.elementRef.nativeElement.querySelectorAll("app-person-card").length
    const summary = fixture.elementRef.nativeElement.querySelector("#winnerDraw")
    expect(appPersonCardLength).toEqual(2);
    expect(summary).not.toBeNull();
  });

  it('should render two starship cards and solution after start game', () => {
    component.gameTypeChange(GameType.STARSHIPS);
    component.startGame()
    fixture.detectChanges();
    const appPersonCardLength = fixture.elementRef.nativeElement.querySelectorAll("app-starship-card").length
    const summary = fixture.elementRef.nativeElement.querySelector("#winnerDraw")
    expect(appPersonCardLength).toEqual(2);
    expect(summary).not.toBeNull();
  });

  it('should enable options to change type and players after game end', () => {
    component.gameTypeChange(GameType.PERSON);
    component.gamePlayerChange(GamePlayer.SINGLE);
    component.startGame()
    fixture.detectChanges();
    const optionSelected: HTMLInputElement[] = fixture.elementRef.nativeElement.querySelectorAll("#optionSelected input[type='radio']");
    const optionPlayerType: HTMLInputElement[] = fixture.elementRef.nativeElement.querySelectorAll("#optionPlayerType input[type='radio']");
    optionSelected.forEach(item => expect(item.disabled).toBeFalse());
    optionPlayerType.forEach(item => expect(item.disabled).toBeFalse());
  });

  it('should disable options to change type and players during game is on', () => {
    component.gameTypeChange(GameType.PERSON);
    component.gamePlayerChange(GamePlayer.DOUBLE);
    component.startGame()
    fixture.detectChanges();
    const optionSelected: HTMLInputElement[] = fixture.elementRef.nativeElement.querySelectorAll("#optionSelected input[type='radio']");
    const optionPlayerType: HTMLInputElement[] = fixture.elementRef.nativeElement.querySelectorAll("#optionPlayerType input[type='radio']");
    optionSelected.forEach(item => expect(item.disabled).toBeTrue());
    optionPlayerType.forEach(item => expect(item.disabled).toBeTrue());
  });

  it('should not possible to start game button when game is on', () => {
    component.gameTypeChange(GameType.PERSON);
    component.gamePlayerChange(GamePlayer.DOUBLE);
    component.startGame()
    fixture.detectChanges();
    const playGameButton = fixture.elementRef.nativeElement.querySelector("#playGame")
    const nextRoundButton = fixture.elementRef.nativeElement.querySelector("#nextRound")
    expect(playGameButton).toBeNull();
    expect(nextRoundButton).not.toBeNull();
  });
});
