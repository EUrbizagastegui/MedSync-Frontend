import {Component, OnInit} from '@angular/core';
import {Button} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {PaginatorModule} from 'primeng/paginator';
import {InputGroupAddonModule} from 'primeng/inputgroupaddon';
import {InputGroupModule} from 'primeng/inputgroup';
import {InputTextModule} from 'primeng/inputtext';
import {ToastModule} from 'primeng/toast';
import {ImageModule} from 'primeng/image';
import {PatientService} from '../../../services/patient/patient.service';
import {MessageService} from 'primeng/api';
import {CarerService} from '../../../services/carer/carer.service';

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
  providers: [MessageService],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  displayDialog: boolean = false;
  displayDialog1: boolean = false;

  constructor(private patientService: PatientService, private messageService: MessageService) {
  }

  ngOnInit() {
    this.loadPatientData();
  }

  information = {
    id: '5',
    name: '',
    lastName: '',
    weight: '',
    disease: '',
    phoneNumber: '',
    email: '',
    profilePictureUrl: ''
    //image: 'https://b2472105.smushcdn.com/2472105/wp-content/uploads/2023/01/Perfil-Profesional-_63-819x1024.jpg?lossy=1&strip=1&webp=1'
  }

  contactData = {
    name: '' ,
    lastName: '',
    phoneNumber: '',
    profilePictureUrl: '',
  }

  texts = {
    button1: 'Editar Perfil',
    button2: 'Contacto de Emergencia',
    button3: 'Cerrar Sesión',
    btSave: 'Guardar',
    btCancel: 'Cancelar'
  }

  loadPatientData() {
    this.patientService.getPatient(this.information.id).subscribe({
      next: (data) => {
        this.information = { ...this.information, ...data };
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo cargar la información del paciente'
        });
        console.error(err);
      }
    });
  }

  openDialog() {
    this.displayDialog = true;
  }

  saveEdit() {
    const updatedProfile = {
      disease: this.information.disease,
      weight: this.information.weight,
      profilePictureUrl: this.information.profilePictureUrl,
      phoneNumber: this.information.phoneNumber
    };

    this.patientService.updatePatient(this.information.id, updatedProfile).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Perfil actualizado correctamente'
        });
        this.displayDialog = false;  // Cerrar el diálogo
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo actualizar el perfil'
        });
        console.error(err);
      }
    });
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
