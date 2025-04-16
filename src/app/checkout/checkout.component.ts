import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CarritoService } from '../services/carrito.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  imports: [FormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
regresarCatalogo() {
throw new Error('Method not implemented.');
}
  nombre: string = '';
  direccion: string = '';
  tarjeta: string = '';
  vencimiento: string = '';
  cvv: string = '';

  constructor(private router: Router, private carritoService: CarritoService) {}

  colocarPedido() {
    const datosUsuario = {
      nombre: this.nombre,
      direccion: this.direccion,
      tarjeta: this.tarjeta,
      vencimiento: this.vencimiento,
      cvv: this.cvv
    };

    this.carritoService.guardarDatosUsuario(datosUsuario);
    this.carritoService.guardarResumenCarrito();
    this.carritoService.vaciarCarrito();
    this.router.navigate(['/resumen']);
  }
}