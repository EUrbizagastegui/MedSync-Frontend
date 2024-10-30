import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  texts = {
    title: 'MedSync',
    paragraph: 'Bienvenido a MedSync. Inicie sesión o regístrese para disfrutar de la experiencia de nuestro servicio de monitoreo de ritmo cardiaco.',
    button1: 'Iniciar sesión',
    button2: 'Registrarse',
    recoverPassword: 'Olvidé mi contraseña',
  }
  inputs = {
    email: 'Correo',
    password: 'Contraseña'
  }
}
