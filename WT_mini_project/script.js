const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, 'myApp/src/app');
const stylesDest = path.join(__dirname, 'myApp/src/styles.css');
const stylesSrc = path.join(__dirname, 'styles.css');
const indexSrc = path.join(__dirname, 'index.html');
const myAppIndex = path.join(__dirname, 'myApp/src/index.html');

// Read views
const readView = name => fs.readFileSync(path.join(__dirname, 'views', name), 'utf-8');

// App routes
const routesTs = `
import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { DoctorsComponent } from './doctors.component';
import { BookAppointmentComponent } from './book-appointment.component';
import { AppointmentsComponent } from './appointments.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'doctors', component: DoctorsComponent },
  { path: 'book', component: BookAppointmentComponent },
  { path: 'appointments', component: AppointmentsComponent },
  { path: '**', redirectTo: '' }
];
`;
fs.writeFileSync(path.join(appDir, 'app.routes.ts'), routesTs);

// Doctor Service
const doctorServiceTs = `
import { Injectable } from '@angular/core';

export interface Doctor {
  id: number;
  name: string;
  specialization: string;
  experience: string;
  availableDays: string;
  availableTime: string;
  status: string;
  initials: string;
}

@Injectable({ providedIn: 'root' })
export class DoctorService {
  private doctors: Doctor[] = [
    { id: 1, name: 'Dr. Ananya Sharma', specialization: 'Cardiologist', experience: '12 years', availableDays: 'Mon, Wed, Fri', availableTime: '09:00 AM – 01:00 PM', status: 'available', initials: 'AS' },
    { id: 2, name: 'Dr. Rajesh Kumar', specialization: 'Neurologist', experience: '10 years', availableDays: 'Tue, Thu, Sat', availableTime: '10:00 AM – 02:00 PM', status: 'available', initials: 'RK' },
    { id: 3, name: 'Dr. Priya Nair', specialization: 'Pediatrician', experience: '8 years', availableDays: 'Mon, Tue, Wed', availableTime: '08:00 AM – 12:00 PM', status: 'available', initials: 'PN' },
    { id: 4, name: 'Dr. Suresh Mehta', specialization: 'Orthopedist', experience: '15 years', availableDays: 'Wed, Thu, Fri', availableTime: '11:00 AM – 03:00 PM', status: 'busy', initials: 'SM' },
    { id: 5, name: 'Dr. Kavita Reddy', specialization: 'Dermatologist', experience: '9 years', availableDays: 'Mon, Thu, Sat', availableTime: '09:00 AM – 01:00 PM', status: 'available', initials: 'KR' },
    { id: 6, name: 'Dr. Arun Pillai', specialization: 'Gastroenterologist', experience: '11 years', availableDays: 'Tue, Fri, Sat', availableTime: '10:00 AM – 02:00 PM', status: 'available', initials: 'AP' },
    { id: 7, name: 'Dr. Meena Joshi', specialization: 'Gynecologist', experience: '13 years', availableDays: 'Mon, Wed, Sat', availableTime: '08:00 AM – 12:00 PM', status: 'available', initials: 'MJ' },
    { id: 8, name: 'Dr. Vivek Rao', specialization: 'Ophthalmologist', experience: '7 years', availableDays: 'Tue, Thu, Fri', availableTime: '09:00 AM – 01:00 PM', status: 'busy', initials: 'VR' },
    { id: 9, name: 'Dr. Shalini Gupta', specialization: 'Psychiatrist', experience: '10 years', availableDays: 'Mon, Tue, Fri', availableTime: '02:00 PM – 06:00 PM', status: 'available', initials: 'SG' },
    { id: 10, name: 'Dr. Nikhil Verma', specialization: 'General Physician', experience: '6 years', availableDays: 'Mon–Sat', availableTime: '08:00 AM – 06:00 PM', status: 'available', initials: 'NV' }
  ];

  getDoctors(): Doctor[] { return this.doctors; }
  getDoctorById(id: number | string): Doctor | undefined {
    return this.doctors.find(d => d.id === parseInt(id as string, 10));
  }
  getSpecializations(): string[] {
    return Array.from(new Set(this.doctors.map(d => d.specialization))).sort();
  }
}
`;
fs.writeFileSync(path.join(appDir, 'doctor.service.ts'), doctorServiceTs);

// Appointment Service
const appointmentServiceTs = `
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface Appointment {
  id?: string;
  patientName: string;
  age: number | string;
  gender: string;
  doctorId: string;
  doctorName?: string;
  doctorSpec?: string;
  date: string;
  time: string;
  notes?: string;
  createdAt?: string;
}

@Injectable({ providedIn: 'root' })
export class AppointmentService {
  private KEY = 'hospital_appointments';
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  private load(): Appointment[] {
    if (isPlatformBrowser(this.platformId)) {
        const r = localStorage.getItem(this.KEY);
        return r ? JSON.parse(r) : [];
    }
    return [];
  }
  private save(list: Appointment[]) {
    if (isPlatformBrowser(this.platformId)) localStorage.setItem(this.KEY, JSON.stringify(list));
  }
  private genId(list: Appointment[]): string {
    if (!list.length) return 'APT-0001';
    const max = Math.max(...list.map(a => parseInt(a.id!.replace('APT-', ''), 10)));
    return 'APT-' + String(max + 1).padStart(4, '0');
  }

  getAll(): Appointment[] { return this.load(); }
  count(): number { return this.load().length; }

  add(appt: Appointment): Appointment {
    const list = this.load();
    appt.id = this.genId(list);
    appt.createdAt = new Date().toISOString();
    list.push(appt);
    this.save(list);
    return appt;
  }

  update(updated: Appointment): boolean {
    const list = this.load();
    const i = list.findIndex(a => a.id === updated.id);
    if (i !== -1) { list[i] = updated; this.save(list); return true; }
    return false;
  }

  remove(id: string) {
    this.save(this.load().filter(a => a.id !== id));
  }
}
`;
fs.writeFileSync(path.join(appDir, 'appointment.service.ts'), appointmentServiceTs);

// Shared Components / Directives
const pageHeaderTs = `
import { Component, Input } from '@angular/core';
@Component({
  selector: 'page-header',
  standalone: true,
  template: \`
    <div class="page-head"><div class="page-head-inner"><h1>{{title}}</h1><p>{{subtitle}}</p></div></div>
  \`
})
export class PageHeaderComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
}
`;
fs.writeFileSync(path.join(appDir, 'page-header.component.ts'), pageHeaderTs);

const appAlertTs = `
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  template: \`
    <div *ngIf="message" class="alert" [ngClass]="'alert-' + type">
      <span class="material-icons">{{type === 'success' ? 'check_circle' : 'error'}}</span>
      <div>{{message}}</div>
    </div>
  \`
})
export class AppAlertComponent {
  @Input() type: string = 'info';
  @Input() message: string = '';
}
`;
fs.writeFileSync(path.join(appDir, 'app-alert.component.ts'), appAlertTs);

// Read original HTML
let homeHtml = readView('home.html');
let doctorsHtml = readView('doctors.html');
let bookHtml = readView('book.html');
let appointmentsHtml = readView('appointments.html');

// Transform HTML for Angular
// ng-repeat -> *ngFor="let item of list"
// ng-if -> *ngIf
// ng-class -> [ngClass]
// ng-model -> [(ngModel)]
// ng-click -> (click)
// {{ ... }} is natively supported. Keep track of ng-change -> (change)
// ng-submit -> (ngSubmit)
// form.name.$invalid -> form.form.invalid .. actually simpler to use Template Reference Variables and ngModel

function convertHtml(html) {
  return html
    .replace(/ng-repeat="(\w+)\s+in\s+([^"]+)"/g, '*ngFor="let $1 of $2"')
    .replace(/ng-if="([^"]+)"/g, '*ngIf="$1"')
    .replace(/href="#!\//g, 'routerLink="/') // Router links
    .replace(/ng-class="([^"]+)"/g, '[ngClass]="$1"')
    .replace(/ng-click="([^"]+)"/g, '(click)="$1"')
    .replace(/ng-model="([^"]+)"/g, '[(ngModel)]="$1"')
    .replace(/ng-change="([^"]+)"/g, '(change)="$1"')
    .replace(/ng-submit="([^"]+)"/g, '(ngSubmit)="$1"')
    .replace(/filter:doctorFilter/g, 'doctorFilter()') // We will call a function instead
    .replace(/bookForm\./g, 'bookForm.control.get(\\')
    // A quick hack for form validations, but we can do reactive forms or template-driven easier
    ;
}

// Write Home Component
const homeTs = \`
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DoctorService, Doctor } from './doctor.service';
import { AppointmentService } from './appointment.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: \`\\\${convertHtml(homeHtml).replace(/class="status-chip"\s+\\[ngClass\\]/g, 'class="status-chip" [ngClass]')} \`
})
export class HomeComponent implements OnInit {
  totalAppointments = 0;
  totalDoctors = 0;
  availableDoctors = 0;
  featuredDoctors: Doctor[] = [];

  constructor(private doctorService: DoctorService, private appointmentService: AppointmentService) {}

  ngOnInit() {
    const all = this.doctorService.getDoctors();
    this.totalAppointments = this.appointmentService.count();
    this.totalDoctors = all.length;
    this.availableDoctors = all.filter(d => d.status === 'available').length;
    this.featuredDoctors = all.slice(0, 4);
  }
}
\`;
fs.writeFileSync(path.join(appDir, 'home.component.ts'), homeTs);

// And we'll just fix up the others manually or inject them nicely

\`