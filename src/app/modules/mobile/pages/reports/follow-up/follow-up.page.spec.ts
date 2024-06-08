import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FollowUpPage } from './follow-up.page';

describe('FollowUpPage', () => {
  let component: FollowUpPage;
  let fixture: ComponentFixture<FollowUpPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FollowUpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
