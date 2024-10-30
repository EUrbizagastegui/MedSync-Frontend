import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainNavbarComponent } from '../../components/main-navbar/main-navbar.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, MainNavbarComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {

}
