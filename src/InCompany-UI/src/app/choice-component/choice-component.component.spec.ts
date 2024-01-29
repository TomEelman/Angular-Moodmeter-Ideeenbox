import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoiceComponentComponent } from './choice-component.component';

describe('ChoiceComponentComponent', () => {
  let component: ChoiceComponentComponent;
  let fixture: ComponentFixture<ChoiceComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChoiceComponentComponent]
    });
    fixture = TestBed.createComponent(ChoiceComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
