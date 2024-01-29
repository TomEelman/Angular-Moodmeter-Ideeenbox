import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentSectieComponent } from './comment-sectie.component';

describe('CommentSectieComponent', () => {
  let component: CommentSectieComponent;
  let fixture: ComponentFixture<CommentSectieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommentSectieComponent]
    });
    fixture = TestBed.createComponent(CommentSectieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
