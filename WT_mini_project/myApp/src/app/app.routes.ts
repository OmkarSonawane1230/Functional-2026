import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { BookAppointmentComponent } from './book/book-appointment.component';
import { AppointmentsComponent } from './appointments/appointments.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'doctors', component: DoctorsComponent },
  { path: 'book', component: BookAppointmentComponent },
  { path: 'appointments', component: AppointmentsComponent },
  { path: '**', redirectTo: '' }
];
