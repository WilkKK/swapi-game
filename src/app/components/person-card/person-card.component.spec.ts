import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonCardComponent } from './person-card.component';

describe('PersonCardComponent', () => {
  let component: PersonCardComponent;
  let fixture: ComponentFixture<PersonCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonCardComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PersonCardComponent);
    component = fixture.componentInstance;
    component.person = { 
      height: "180",
      mass: null,
      hairColor: "none",
      birthYear: "unknown",
      gender: "male",
      created: "2024-02-24T02:37:28.101Z",
      edited: "2024-02-24T02:37:28.101Z",
      name: "Bib Fortuna",
      description: "A person within the Star Wars universe",
      skinColor: "fair",
      eyeColor: "blue-gray"
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should show '-' becouse mass is null ", () => {
    const massValue = fixture.debugElement.nativeElement.querySelectorAll("#personMass b")[1].innerHTML;
    expect(massValue).toEqual("-");
  });

  it("should show mass value if not null", () => {
    component.person = {
      height: "180",
      mass: 100,
      hairColor: "none",
      birthYear: "unknown",
      gender: "male",
      created: "2024-02-24T02:37:28.101Z",
      edited: "2024-02-24T02:37:28.101Z",
      name: "Bib Fortuna",
      description: "A person within the Star Wars universe",
      skinColor: "fair",
      eyeColor: "blue-gray"
    }
    fixture.detectChanges();
    const massValue = fixture.debugElement.nativeElement.querySelectorAll("#personMass b")[1].innerHTML;
    expect(massValue).toEqual("100");
  });
});
