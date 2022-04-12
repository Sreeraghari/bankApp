import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteinfoComponent } from './deleteinfo.component';

describe('DeleteinfoComponent', () => {
  let component: DeleteinfoComponent;
  let fixture: ComponentFixture<DeleteinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteinfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
