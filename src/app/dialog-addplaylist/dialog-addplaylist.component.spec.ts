import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddplaylistComponent } from './dialog-addplaylist.component';

describe('DialogAddplaylistComponent', () => {
  let component: DialogAddplaylistComponent;
  let fixture: ComponentFixture<DialogAddplaylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddplaylistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddplaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
