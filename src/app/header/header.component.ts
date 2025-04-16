import { Component, computed, effect, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CarritoService } from '../services/carrito.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  carritoService = inject(CarritoService);
  totalItems = computed(() => this.carritoService.totalItemsSignal());

  animar = signal(false);

  constructor() {
    let previo = this.totalItems();

    effect(() => {
      const actual = this.totalItems();
      if (actual !== previo) {
        this.animar.set(false);
        setTimeout(() => this.animar.set(true), 0);
        previo = actual;
      }
    });
  }
}
