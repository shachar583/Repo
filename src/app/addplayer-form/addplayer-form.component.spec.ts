import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlayerFormComponent } from './addplayer-form.component';

describe('AddPlayerFormComponent', () => {
  let component: AddPlayerFormComponent;
  let fixture: ComponentFixture<AddPlayerFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPlayerFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPlayerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
