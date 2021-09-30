import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableRowDetailComponent } from './table-row-detail.component';

describe('TableRowDetailComponent', () => {
  let component: TableRowDetailComponent;
  let fixture: ComponentFixture<TableRowDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableRowDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableRowDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
