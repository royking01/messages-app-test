import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesFormComponent } from './messages-form.component';

describe('MessagesFormComponent', () => {
  let component: MessagesFormComponent;
  let fixture: ComponentFixture<MessagesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessagesFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessagesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
