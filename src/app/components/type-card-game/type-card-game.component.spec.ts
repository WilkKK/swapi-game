import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeCardGameComponent } from './type-card-game.component';

describe('TypeCardGameComponent', () => {
  let component: TypeCardGameComponent;
  let fixture: ComponentFixture<TypeCardGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeCardGameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TypeCardGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
