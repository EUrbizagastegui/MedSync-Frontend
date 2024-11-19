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
import {NgIf} from '@angular/common';

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
    ImageModule,
    NgIf
  ],
  providers: [MessageService],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  displayDialog: boolean = false;
  displayDialog1: boolean = false;
  displayDialog2: boolean = false;
  userId: number = +localStorage.getItem('userId')!;
  userRole: string = localStorage.getItem('userRole')!;

  isPatient: boolean = false;
  isCarer: boolean = false;

  constructor(
    private patientService: PatientService,
    private messageService: MessageService,
    private carerService: CarerService,
  ) {}

  ngOnInit() {
    this.isPatient = this.userRole === 'PATIENT';
    this.isCarer = this.userRole === 'CARER';

    if (this.isPatient) {
      this.loadPatientData();
      this.loadCarerData();
    } else if (this.isCarer) {
      this.loadCarerProfile();
    }
  }

  information = {
    id: this.userId,
    name: '',
    lastName: '',
    weight: '',
    disease: '',
    phoneNumber: '',
    email: '',
    profilePictureUrl: ''
  };

  contactData = {
    id: '',
    name: '',
    lastName: '',
    phoneNumber: '',
    profilePictureUrl: ''
  };

  texts = {
    button1: 'Editar Perfil',
    button2: 'Contacto de Emergencia',
    button3: 'Cerrar Sesión',
    btSave: 'Guardar',
    btCancel: 'Cancelar'
  };

  loadPatientData() {
    this.patientService.getPatient(this.userId.toString()).subscribe({
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

  loadCarerData() {
    this.patientService.getPatientCarer(this.userId.toString()).subscribe({
      next: (data) => {
        console.log('Datos del cuidador:', data);
        this.contactData = { ...this.contactData, ...data };
      },
      error: (err) => {
        this.messageService.add({
          severity: 'warn',
          summary: 'Advertencia',
          detail: 'El paciente no tiene un cuidador asignado'
        });
        console.error('Error al cargar datos del cuidador:', err);
      }
    });
  }

  loadCarerProfile() {
    this.carerService.getCarerById(this.userId).subscribe({
      next: (data) => {
        this.contactData = { ...this.contactData, ...data };
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo cargar la información del cuidador'
        });
        console.error(err);
      }
    });
  }


  openDialog() {
    this.displayDialog = true;
  }

  saveEdit() {
    if (this.isPatient) {
      const updatedProfile = {
        disease: this.information.disease,
        weight: this.information.weight,
        profilePictureUrl: this.information.profilePictureUrl,
        phoneNumber: this.information.phoneNumber
      };

      this.patientService.updatePatient(this.userId.toString(), updatedProfile).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Perfil actualizado correctamente'
          });
          this.displayDialog = false;
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
    } else if (this.isCarer) {
      const updatedProfileCarer = {
        phoneNumber: this.contactData.phoneNumber,
        profilePictureUrl: this.contactData.profilePictureUrl
      }

      this.carerService.updateCarer(this.userId, updatedProfileCarer).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Perfil actualizado correctamente'
          });
          this.displayDialog2 = false;
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
    }
  }

  cancelEdit() {
    this.displayDialog = false;
  }

  cancelEditCarer() {
    this.displayDialog2 = false;
  }

  openDialogContact() {
    this.displayDialog1 = true;
  }

  openDialogContact2() {
    this.displayDialog2 = true;
  }

  saveContact() {
    this.patientService.updatePatientCarer(this.userId.toString(), {
      patientId: this.information.id,
      carerId: this.contactData.id
    }).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Cuidador asignado correctamente al paciente'
        });
        this.displayDialog1 = false;
        this.loadCarerData(); // Refrescar datos del cuidador
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo asignar el cuidador al paciente'
        });
        console.error(err);
      }
    });
  }

  cancelContact() {
    this.displayDialog1 = false;
  }

  logout() {
    localStorage.removeItem('userId');
    window.location.href = '/login';
  }
}
