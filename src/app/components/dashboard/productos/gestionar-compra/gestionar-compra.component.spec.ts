import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarCompraComponent } from './gestionar-compra.component';

describe('GestionarCompraComponent', () => {
  let component: GestionarCompraComponent;
  let fixture: ComponentFixture<GestionarCompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionarCompraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionarCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
