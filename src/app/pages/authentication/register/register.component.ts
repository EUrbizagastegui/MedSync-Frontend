import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CardModule, DropdownModule, ButtonModule, ToastModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [MessageService]
})
export class RegisterComponent {
  options = [
    { id: 'name', label: 'Nombre completo', type: 'input', validators: [Validators.required] },
    { id: 'lastName', label: 'Apellido paterno', type: 'input', validators: [Validators.required] },
    { id: 'email', label: 'Correo electrónico', type: 'input', validators: [Validators.required, Validators.email] },
    { id: 'password', label: 'Contraseña', type: 'input', validators: [Validators.required] },
    { id: 'role', label: 'Tipo de usuario', type: 'select', validators: [Validators.required] },
  ];

  buttons = [
    { id: 'button1', label: 'Cancelar' },
    { id: 'button2', label: 'Registrarse' }
  ];

  roleptions = [
    'CARER',
    'PATIENT'
  ];

  signUpForm = signal<FormGroup>(
    new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required])
    })
  )

  constructor(private messageService: MessageService, private authenticationService: AuthenticationService, private router: Router) { }

  showError(error: any) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: error });
  }

  async submitForm() {
    if (this.signUpForm().valid) {
      const formValue = this.signUpForm().value;

      try {
        const response = await this.authenticationService.signUp({
          email: formValue.email,
          password: formValue.password,
          name: formValue.name,
          lastname: formValue.lastName,
          role: formValue.role
        });

        localStorage.setItem('authToken', response.token);
        
        // Navegar a la página principal
        this.router.navigate(['/login']);
      } catch (error) {
        console.error('Error al registrar usuario:', error);
        this.showError('Error al registrar usuario, por favor intente de nuevo.');
      }
    } else {
      this.showError('Por favor, complete todos los campos.');
    }
  }

  surfToRoute(route: any) {
    this.router.navigate(['/' + route]);
  }
}
