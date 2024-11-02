import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

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

  constructor(private router: Router) {}
  
  submitForm() {
    if (this.signInForm().valid) {
      console.log("Form válido");
      this.router.navigate(['/home']);
    } else {
      console.log("Form inválido");
    }
  }
}
