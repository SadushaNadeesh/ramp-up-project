import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportDataComponent } from './export-data.component';

describe('ExportDataComponent', () => {
  let component: ExportDataComponent;
  let fixture: ComponentFixture<ExportDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExportDataComponent ],
      imports: [
        HttpClientModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
