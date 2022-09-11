import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleGestionComponent } from './detalle-gestion.component';

describe('DetalleGestionComponent', () => {
  let component: DetalleGestionComponent;
  let fixture: ComponentFixture<DetalleGestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleGestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
