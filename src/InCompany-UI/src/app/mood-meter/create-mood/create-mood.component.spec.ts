import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMoodComponent } from './create-mood.component';

describe('CreateMoodComponent', () => {
  let component: CreateMoodComponent;
  let fixture: ComponentFixture<CreateMoodComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateMoodComponent]
    });
    fixture = TestBed.createComponent(CreateMoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
