import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DoctorService, Doctor } from '../services/doctor.service';
import { AppointmentService } from '../services/appointment.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  totalAppointments = 0;
  totalDoctors = 0;
  availableDoctors = 0;
  featuredDoctors: Doctor[] = [];

  constructor(
    private doctorService: DoctorService,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit(): void {
    const all = this.doctorService.getDoctors();
    this.totalAppointments = this.appointmentService.count();
    this.totalDoctors = all.length;
    this.availableDoctors = all.filter(d => d.status === 'available').length;
    this.featuredDoctors = all.slice(0, 4);
  }
}
