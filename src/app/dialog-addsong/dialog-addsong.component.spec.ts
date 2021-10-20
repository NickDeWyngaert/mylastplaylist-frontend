import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddsongComponent } from './dialog-addsong.component';

describe('DialogAddsongComponent', () => {
  let component: DialogAddsongComponent;
  let fixture: ComponentFixture<DialogAddsongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddsongComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddsongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
