import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomStatusCellRendererComponent } from './custom-status-cell-renderer.component';

describe('CustomStatusCellRendererComponent', () => {
  let component: CustomStatusCellRendererComponent;
  let fixture: ComponentFixture<CustomStatusCellRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomStatusCellRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomStatusCellRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
