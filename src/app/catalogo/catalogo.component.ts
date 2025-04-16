import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../services/carrito.service';

interface Album {
  pais: string;
  album: string;
  artista: string;
  anio: number;
  precio: string;
  imagen: string;
  cantidad: number;
  audio: string;
}

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {
  albums: Album[] = [];
  audio: HTMLAudioElement | null = null; // La propiedad de audio ahora está correctamente inicializada
  isAudioPlaying: boolean = false;  // Variable para verificar si el audio está en reproducción
  currentAudio: string = '';  // Para llevar el seguimiento del audio actual

  constructor(private carritoService: CarritoService) {}

  ngOnInit() {
    this.audio = new Audio(); 
    this.albums = [
      { pais: 'uk', album: 'The Dark Side Of The Moon', artista: 'Pink Floyd', anio: 1973, precio: '$300', imagen: 'side.jpg', cantidad: 0, audio: 'time.mp3'},
      { pais: 'usa', album: 'By The Way', artista: 'Red Hot Chili Peppers', anio: 2002, precio: '$200', imagen: 'way.jpg', cantidad: 0, audio: 'dosed.mp3' },
      { pais: 'francia', album: 'Discovery', artista: 'Daft Punk', anio: 2001, precio: '$283', imagen: 'discovery.jpeg', cantidad: 0, audio: 'mtime.mp3' },
      { pais: 'mexico', album: 'El Nervio Del Volcán', artista: 'Caifanes', anio: 1994, precio: '$233', imagen: 'nervio.jpeg', cantidad: 0, audio: 'afuera.mp3' },
      { pais: 'australia', album: 'Currents', artista: 'Tame Impala', anio: 2015, precio: '$250', imagen: 'currents.jpeg', cantidad: 0, audio: 'less.mp3' },
      { pais: 'canada', album: 'Starboy', artista: 'The Weeknd', anio: 2016, precio: '$217', imagen: 'starboy.jpg', cantidad: 0, audio: 'starboy.mp3' },
      { pais: 'noruega', album: 'The Gods We Can Touch', artista: 'Aurora', anio: 2022, precio: '$167', imagen: 'gods.jpg', cantidad: 0, audio: 'cure.mp3' },
      { pais: 'korea', album: 'Born Pink', artista: ' BLACKPINK', anio: 2022, precio: '$183', imagen: 'pink.jpg', cantidad: 0, audio: 'venom.mp3' },
      { pais: 'irlanda', album: 'The Joshua Tree', artista: 'U2', anio: 1987, precio: '$317', imagen: 'joshua.jpeg', cantidad: 0 , audio: 'bullet.mp3'},
      { pais: 'argentina', album: 'Canción Animal', artista: 'Soda Stereo', anio: 1990, precio: '$267', imagen: 'cancion.jpg', cantidad: 0 , audio: 'musica.mp3'}
    ];

    this.cargarCantidadesDesdeLocalStorage();
  }


  private claveCantidadesLS = 'catalogo_cantidades';

  cargarCantidadesDesdeLocalStorage() {
    const datos = localStorage.getItem(this.claveCantidadesLS);
    if (datos) {
      const cantidadesGuardadas = JSON.parse(datos);
      this.albums.forEach(album => {
        const cantidad = cantidadesGuardadas[album.album];
        if (cantidad !== undefined) {
          album.cantidad = cantidad;
        }
      });
    }
  }

  guardarCantidadesEnLocalStorage() {
    const cantidades: { [key: string]: number } = {};
    this.albums.forEach(album => {
      cantidades[album.album] = album.cantidad;
    });
    localStorage.setItem(this.claveCantidadesLS, JSON.stringify(cantidades));
  }

  incrementarCantidad(album: Album) {
    album.cantidad++;
    this.guardarCantidadesEnLocalStorage();
  }

  decrementarCantidad(album: Album) {
    if (album.cantidad > 0) {
      album.cantidad--;
      this.guardarCantidadesEnLocalStorage();
    }
  }

  agregarAlCarrito(album: Album) {
    if (album.cantidad > 0) {
      const precio = Number(album.precio.replace('$', '').trim());
      this.carritoService.agregarItem({
        album: album.album,
        artista: album.artista,
        imagen: album.imagen,
        cantidad: album.cantidad,
        precio: precio
      });

      // Reiniciar contador en el catálogo
      album.cantidad = 0;
      this.guardarCantidadesEnLocalStorage();
    }
  }

  probarAudio(nombreArchivo: string) {
    // Detener el audio actual antes de reproducir el nuevo
    this.detenerAudio();
  
    // Cargar el nuevo archivo de audio
    this.audio!.src = 'assets/audio/' + nombreArchivo;
    this.audio!.load();
    this.audio!.currentTime = 0; // Reiniciar tiempo
    this.audio!.volume = 0; // Empezar el volumen en 0
  
    // Iniciar la reproducción del nuevo audio con fade-in
    this.audio!.play().then(() => {
      let fadeInInterval = setInterval(() => {
        if (this.audio!.volume < 0.3) {
          this.audio!.volume = Math.min(this.audio!.volume + 0.05, 0.3);
        } else {
          clearInterval(fadeInInterval);
        }
      }, 100);
    }).catch(err => {
      console.warn('No se pudo reproducir el audio:', err);
    });
  }

  // Detener el audio con fade-out
  detenerAudio() {
    if (this.audio) {
      // Detener el audio actual correctamente
      this.audio.pause();  
      this.audio.currentTime = 0;
      this.audio.volume = 0; // Establecer volumen a 0 inmediatamente antes de reproducir el nuevo audio
      this.isAudioPlaying = false;
  
      // Realizar fade-out si es necesario
      let fadeOutInterval = setInterval(() => {
        if (this.audio!.volume > 0) {
          this.audio!.volume -= 0.05; // Reducir el volumen gradualmente
        } else {
          clearInterval(fadeOutInterval);  // Detener el fade-out
        }
      }, 100);
    }
  }
  

}
