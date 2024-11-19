import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CardModule, DropdownModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  options = [
    { id: 'name', label: 'Nombre completo', type: 'input', validators: [Validators.required] },
    { id: 'lastName', label: 'Apellido paterno', type: 'input', validators: [Validators.required] },
    { id: 'email', label: 'Correo electrónico', type: 'input', validators: [Validators.required, Validators.email] },
    { id: 'password', label: 'Contraseña', type: 'input', validators: [Validators.required] },
    { id: 'role', label: 'Tipo de usuario', type: 'select', validators: [Validators.required] },
  ];

  roleptions = [
    'CARER',
    'PATIENT'
  ];

  signUpForm = signal<FormGroup>(
    new FormGroup(
      this.options.reduce((controls: Record<string, FormControl>, option) => {
        controls[option.id] = new FormControl('', option.validators);
        return controls;
      }, {})
    )
  );
}
