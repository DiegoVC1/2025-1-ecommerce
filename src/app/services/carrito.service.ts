import { Injectable, signal } from '@angular/core';

export interface ItemCarrito {
  album: string;
  artista: string;
  imagen: string;
  cantidad: number;
  precio: number;
}

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private claveLS = 'carrito_discos';
  private carrito: ItemCarrito[] = [];
  private datosUsuario: any = null;

  totalItemsSignal = signal(0); // Nuevo signal reactivo

  constructor() {
    this.cargarCarrito();
    this.cargarDatosUsuario();
  }

  private cargarCarrito(): void {
    const data = localStorage.getItem(this.claveLS);
    this.carrito = data ? JSON.parse(data) : [];
    this.actualizarSignal(); // Inicializar signal
  }

  public guardarCarrito(): void {
    localStorage.setItem(this.claveLS, JSON.stringify(this.carrito));
    this.actualizarSignal();
  }

  obtenerCarrito(): ItemCarrito[] {
    return this.carrito;
  }

  agregarItem(album: any): void {
    const precio = Number(album.precio);
    const cantidad = Number(album.cantidad);

    if (isNaN(precio) || isNaN(cantidad) || cantidad <= 0) {
      console.error('Precio o cantidad inválidos');
      return;
    }

    const existente = this.carrito.find(item => item.album === album.album);
    if (existente) {
      existente.cantidad += cantidad;
    } else {
      this.carrito.push({
        album: album.album,
        artista: album.artista,
        imagen: album.imagen,
        cantidad,
        precio
      });
    }

    this.guardarCarrito();
  }

  actualizarItem(album: string, nuevaCantidad: number): void {
    const item = this.carrito.find(i => i.album === album);
    if (item) {
      item.cantidad = nuevaCantidad;
      if (item.cantidad <= 0) {
        this.eliminarItem(album);
      }
      this.guardarCarrito();
    }
  }

  eliminarItem(album: string): void {
    this.carrito = this.carrito.filter(i => i.album !== album);
    this.guardarCarrito();
  }

  vaciarCarrito(): void {
    this.carrito = [];
    localStorage.removeItem(this.claveLS);
    this.actualizarSignal();
  }

  total(): number {
    return this.carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  }

  totalItems(): number {
    return this.carrito.reduce((acc, item) => acc + item.cantidad, 0);
  }

  private actualizarSignal(): void {
    this.totalItemsSignal.set(this.totalItems());
  }

  // Usuario y resumen: sin cambios
  guardarResumenCarrito(): void {
    localStorage.setItem('resumenCarrito', JSON.stringify(this.carrito));
  }

  obtenerResumenCarrito(): ItemCarrito[] {
    const data = localStorage.getItem('resumenCarrito');
    return data ? JSON.parse(data) : [];
  }

  guardarDatosUsuario(datos: any): void {
    this.datosUsuario = datos;
    localStorage.setItem('datosUsuario', JSON.stringify(datos));
  }

  private cargarDatosUsuario(): void {
    const data = localStorage.getItem('datosUsuario');
    this.datosUsuario = data ? JSON.parse(data) : null;
  }

  obtenerDatosUsuario() {
    return this.datosUsuario;
  }
}
