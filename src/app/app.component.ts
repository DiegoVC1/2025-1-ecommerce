import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';  // Asegúrate de importar RouterOutlet
import { HeaderComponent } from './header/header.component';// Asegúrate de que HeaderComponent está bien importado
import { FooterComponent } from './footer/footer.component';// Asegúrate de que FooterComponent está bien importado

@Component({
  selector: 'app-root',
  standalone: true,  // Esto es importante si usas Standalone Components
  imports: [RouterOutlet, HeaderComponent, FooterComponent,],  // Asegúrate de que todos los componentes estén en el array
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ecommerce';  // Añadido para que coincida con el test
}