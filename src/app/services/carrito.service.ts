import { Injectable } from '@angular/core';

export interface ItemCarrito {
  album: string;
  artista: string;
  imagen: string;
  cantidad: number;
  precio: number; // Aseguramos que el precio sea un número
}

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private claveLS = 'carrito_discos';
  private carrito: ItemCarrito[] = [];
  private datosUsuario: any = null;

  constructor() {
    this.cargarCarrito();
    this.cargarDatosUsuario();
  }

  private cargarCarrito(): void {
    const data = localStorage.getItem(this.claveLS);
    this.carrito = data ? JSON.parse(data) : [];
  }

  public guardarCarrito(): void {
    localStorage.setItem(this.claveLS, JSON.stringify(this.carrito));
  }

  obtenerCarrito(): ItemCarrito[] {
    return this.carrito;
  }

  agregarItem(album: any): void {
    const precio = Number(album.precio);
    const cantidad = Number(album.cantidad);

    // Validamos que precio y cantidad sean válidos
    if (isNaN(precio) || isNaN(cantidad) || cantidad <= 0) {
      console.error('Precio o cantidad inválidos');
      return; // No agregamos el item si los datos son inválidos
    }

    const existente = this.carrito.find(item => item.album === album.album);
    if (existente) {
      existente.cantidad += cantidad;
    } else {
      this.carrito.push({
        album: album.album,
        artista: album.artista,
        imagen: album.imagen,
        cantidad: cantidad,
        precio: precio // Aseguramos que el precio sea un número
      });
    }
    this.guardarCarrito();
  }

  actualizarItem(album: string, nuevaCantidad: number): void {
    const item = this.carrito.find(i => i.album === album);
    if (item) {
      item.cantidad = nuevaCantidad;
      if (item.cantidad <= 0) {
        this.eliminarItem(album); // Eliminar si la cantidad es 0
      }
      this.guardarCarrito();
    }
  }

  eliminarItem(album: string): void {
    this.carrito = this.carrito.filter(i => i.album !== album);
    this.guardarCarrito();
  }



  vaciarCarrito(): void {
    this.carrito = [];  // Vaciar el arreglo del carrito en memoria
    localStorage.removeItem(this.claveLS);  // Eliminar el carrito de localStorage
  }

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

  total(): number {
    return this.carrito.reduce((acc, item) => {
      const precio = Number(item.precio);
      const cantidad = Number(item.cantidad);
      return acc + (isNaN(precio) || isNaN(cantidad) ? 0 : precio * cantidad);
    }, 0);
  }

  
}
