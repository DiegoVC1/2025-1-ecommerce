import { Routes } from '@angular/router';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { CarritoComponent } from './carrito/carrito.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ResumenComponent } from './resumen/resumen.component';

export const routes: Routes = [
  { path: '', component: CatalogoComponent }, // Ruta por defecto
  { path: 'catalogo', component: CatalogoComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'resumen', component: ResumenComponent },
];