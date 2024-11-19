import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { jwtDecode, JwtPayload } from "jwt-decode";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ButtonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  texts = {
    title: 'MedSync',
    paragraph: 'Bienvenido a MedSync. Inicie sesión o regístrese para disfrutar de la experiencia de nuestro servicio de monitoreo de ritmo cardiaco.',
    recoverPassword: 'Olvidé mi contraseña',
  }
  inputs = [
    { id: 'email', label: 'Correo', type: 'email' },
    { id: 'password', label: 'Contraseña', type: 'password' }
  ];

  buttons = [
    { id: 'button1', label: 'Iniciar Sesión' },
    { id: 'button2', label: 'Registrarse' }
  ];

  signInForm = signal<FormGroup>(
    new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    })
  )

  constructor(private authenticationService: AuthenticationService, private router: Router) {}
  
  async submitForm() {
    if (this.signInForm().valid) {
      const formValue = this.signInForm().value;

      try {
        // Llamar al método signIn del servicio con los datos del formulario
        const response = await this.authenticationService.signIn({
          email: formValue.email,
          password: formValue.password,
        }).then((response) => {
          const decoded = jwtDecode<JwtPayload>(response.token) as { id: number; role: string; sub: string; iat: number; exp: number };;
          localStorage.setItem('authToken', response.token);
          localStorage.setItem('userId', decoded.id.toString());
        }).finally(() => {
          // Navegar a la página principal
          this.router.navigate(['/home']);
        });
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
        // Puedes mostrar un mensaje de error al usuario aquí
      }
    } else {
      console.log('Formulario inválido');
    }
  }
}
