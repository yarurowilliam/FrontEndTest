import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DetallesVentasComponent } from './components/ventas/nuestras-ventas/detalles-ventas/detalles-ventas.component';
import { NuestrasVentasComponent } from './components/ventas/nuestras-ventas/nuestras-ventas.component';
import { NuevoProductoComponent } from './components/dashboard/productos/nuevo-producto/nuevo-producto.component';
import { ProductoComponent } from './components/dashboard/productos/producto/producto.component';
import { ProductosComponent } from './components/dashboard/productos/productos.component';
import { CajaComponent } from './components/ventas/caja/caja.component';
import { NuevoClienteComponent } from './components/ventas/cliente/nuevo-cliente/nuevo-cliente.component';
import { VentasComponent } from './components/ventas/ventas.component';
//Guards
import { AuthGuard } from './helpers/auth.guard';
import { GestionarCompraComponent } from './components/dashboard/productos/gestionar-compra/gestionar-compra.component';
import { DetalleGestionComponent } from './components/dashboard/productos/gestionar-compra/detalle-gestion/detalle-gestion.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { ClientesComponent } from './components/dashboard/clientes/clientes.component';
import { DetalleClienteComponent } from './components/dashboard/clientes/detalle-cliente/detalle-cliente.component';

const routes: Routes = [
  { path:'',redirectTo: '/ventas' , pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard],data: { role: 'ADMINISTRADOR' } ,children: [
    { path: '', component: ProductosComponent},
    { path: 'verArticulo/:referencia', component: ProductoComponent},
    { path: 'nuevoArticulo', component: NuevoProductoComponent},
    { path: 'gestionarCompra', component: GestionarCompraComponent},
    { path: 'detalleCompra/:referencia', component: DetalleGestionComponent},
    { path: 'reportes', component: ReportesComponent },
    { path: 'gestionClientes', component: ClientesComponent},
    { path: 'gestionarCliente/:identificacion', component:DetalleClienteComponent}
  ]},
  { path: 'ventas', component: VentasComponent, canActivate:[AuthGuard], children: [
    { path: '', component: CajaComponent },
    { path: 'nuevoCliente', component: NuevoClienteComponent },
    { path: 'listaVentas', component: NuestrasVentasComponent },
    { path: 'verDetallesVenta/:id', component: DetallesVentasComponent }
  ]},
  { path: '**', redirectTo: '/inicio', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
