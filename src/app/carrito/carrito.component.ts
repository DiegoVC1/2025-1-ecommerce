import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../services/carrito.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-carrito',
  imports: [RouterModule],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  carrito: any[] = [];

  constructor(private carritoService: CarritoService) {}

  ngOnInit(): void {
    this.carrito = this.carritoService.obtenerCarrito();
  }

  total(): number {
    // Aseguramos que el precio y la cantidad sean números válidos
    return this.carrito.reduce((acc, item) => {
      const precio = Number(item.precio);
      const cantidad = Number(item.cantidad);
      // Si hay un NaN, no lo sumamos
      return acc + (isNaN(precio) || isNaN(cantidad) ? 0 : precio * cantidad);
    }, 0);
  }

  actualizarCantidad(album: string, cantidad: number): void {
    this.carritoService.actualizarItem(album, cantidad);
    this.carrito = this.carritoService.obtenerCarrito(); // Actualizar la vista
  }

  eliminarItem(album: string): void {
    this.carritoService.eliminarItem(album);
    this.carrito = this.carritoService.obtenerCarrito(); // Actualizar la vista
  }
}
