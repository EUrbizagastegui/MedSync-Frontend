import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'app-main-navbar',
  standalone: true,
  imports: [ToolbarModule, ButtonModule],
  templateUrl: './main-navbar.component.html',
  styleUrl: './main-navbar.component.css'
})
export class MainNavbarComponent {
  string = 'string2';

  options = [
    { label: 'Cuenta',id: 'Cuenta', icon: 'pi pi-cog', url: '/profile' },
    { label: 'Historial', id: 'Historial', icon: 'pi pi-history', url: '/daily-history' },
  ];

  constructor(private router: Router) {}

  // Función que redirige a la ruta especificada
  navigateTo(url: string) {
    this.router.navigate([url]);
  }
}
