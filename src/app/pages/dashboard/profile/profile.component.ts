import { Component } from '@angular/core';
import {Button} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {PaginatorModule} from 'primeng/paginator';
import {InputGroupAddonModule} from 'primeng/inputgroupaddon';
import {InputGroupModule} from 'primeng/inputgroup';
import {InputTextModule} from 'primeng/inputtext';
import {ToastModule} from 'primeng/toast';
import {ImageModule} from 'primeng/image';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    Button,
    DialogModule,
    PaginatorModule,
    InputGroupAddonModule,
    InputGroupModule,
    InputTextModule,
    ToastModule,
    ImageModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  displayDialog: boolean = false;
  displayDialog1: boolean = false;

  information = {
    names: 'Esteban',
    surnames: 'Pasco',
    address: 'Av. Siempreviva 772',
    telephone: '912345678',
    email: 'estebfer@gmail.com',
    image: 'https://b2472105.smushcdn.com/2472105/wp-content/uploads/2023/01/Perfil-Profesional-_63-819x1024.jpg?lossy=1&strip=1&webp=1'
  }

  contactData = {
    names: '' ,
    firstSurname: '',
    secondSurname: '',
    telephone: '',
    email: '',
  }

  texts = {
    button1: 'Editar Perfil',
    button2: 'Contacto de Emergencia',
    button3: 'Cerrar Sesión',
    btSave: 'Guardar',
    btCancel: 'Cancelar'
  }

  openDialog() {
    this.displayDialog = true;
  }

  saveEdit() {
    this.displayDialog = false;
  }

  cancelEdit() {
    this.displayDialog = false;
  }

  openDialogContact(){
    this.displayDialog1 = true;
  }

  saveContact() {
    this.displayDialog1 = false;
  }

  cancelContact() {
    this.displayDialog1 = false;
  }

  logout() {

  }
}
