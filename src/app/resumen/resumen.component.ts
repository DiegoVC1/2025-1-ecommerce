import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../services/carrito.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resumen',
  imports: [CommonModule],
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css']
})
export class ResumenComponent implements OnInit {
  usuario: any;
  carrito: any[] = [];
  total: number = 0;
  carritoResumen: any[] = [];

  constructor(private carritoService: CarritoService, private router: Router) {}

  ngOnInit(): void {
    // Obtener los datos del usuario y el carrito desde el servicio
    this.usuario = this.carritoService.obtenerDatosUsuario();
    this.carritoResumen = this.carritoService.obtenerResumenCarrito();
    this.calcularTotal();
  }

  calcularTotal(): void {
    this.total = this.carrito.reduce((total, item) => total + (item.cantidad * item.precio), 0);
  }
  totalTemp(): number {
    return this.carritoResumen.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
  }


  regresarCatalogo(): void {
    // Vaciar el carrito y regresar al catálogo
    this.carritoService.vaciarCarrito();
    this.router.navigate(['/catalogo']);
  }

  itemsFilaCompleta() {
    const completos = Math.floor(this.carritoResumen.length / 3) * 3;
    return this.carritoResumen.slice(0, completos);
  }
  
  itemsFilaIncompleta() {
    const completos = Math.floor(this.carritoResumen.length / 3) * 3;
    return this.carritoResumen.slice(completos);
  }
  
}

