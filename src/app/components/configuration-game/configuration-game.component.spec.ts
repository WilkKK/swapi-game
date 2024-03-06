import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderConfigurationGameComponent } from './configuration-game.component';

describe('HeaderConfigurationGameComponent', () => {
  let component: HeaderConfigurationGameComponent;
  let fixture: ComponentFixture<HeaderConfigurationGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderConfigurationGameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderConfigurationGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
