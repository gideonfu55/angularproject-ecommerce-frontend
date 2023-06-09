import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberPageComponent } from './member-page.component';

describe('MemberPageComponent', () => {
  let component: MemberPageComponent;
  let fixture: ComponentFixture<MemberPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MemberPageComponent]
    });
    fixture = TestBed.createComponent(MemberPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
