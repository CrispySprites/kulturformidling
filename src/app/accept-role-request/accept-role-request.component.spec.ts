import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptRoleRequestComponent } from './accept-role-request.component';

describe('AcceptRoleRequestComponent', () => {
  let component: AcceptRoleRequestComponent;
  let fixture: ComponentFixture<AcceptRoleRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcceptRoleRequestComponent]
    });
    fixture = TestBed.createComponent(AcceptRoleRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
