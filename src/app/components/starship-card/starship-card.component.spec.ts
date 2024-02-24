import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarshipCardComponent } from './starship-card.component';

describe('StarshipCardComponent', () => {
  let component: StarshipCardComponent;
  let fixture: ComponentFixture<StarshipCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StarshipCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StarshipCardComponent);
    component = fixture.componentInstance;
    component.starship = {
      model:"A/SF-01 B-wing,starfighter",
      crew: null,
      starshipClass:"Assault Starfighter",
      manufacturer:"Slayn & Korpil",
      costInCredits:"220000",
      length:"16.9","passengers":"0",
      maxAtmospheringSpeed:"950",
      hyperdriveRating:"2.0",
      mglt:"91","cargoCapacity":"45",
      created:"2020-09-17T17:55:06.604Z",
      edited:"2020-09-17T17:55:06.604Z",
      description:"A Starship"
    } 
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should show '-' becouse crew is null ", () => {
    const massValue = fixture.debugElement.nativeElement.querySelectorAll("#starshipCrew b")[1].innerHTML;
    expect(massValue).toEqual("-");
  });

  it("should show mass value if not null", () => {
    component.starship = {
      model:"A/SF-01 B-wing,starfighter",
      crew: 2,
      starshipClass:"Assault Starfighter",
      manufacturer:"Slayn & Korpil",
      costInCredits:"220000",
      length:"16.9","passengers":"0",
      maxAtmospheringSpeed:"950",
      hyperdriveRating:"2.0",
      mglt:"91","cargoCapacity":"45",
      created:"2020-09-17T17:55:06.604Z",
      edited:"2020-09-17T17:55:06.604Z",
      description:"A Starship"
    } 
    fixture.detectChanges();
    const massValue = fixture.debugElement.nativeElement.querySelectorAll("#starshipCrew b")[1].innerHTML;
    expect(massValue).toEqual("2");
  });
});
