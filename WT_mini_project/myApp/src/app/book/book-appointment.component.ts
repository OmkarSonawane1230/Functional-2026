import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { DoctorService, Doctor } from '../services/doctor.service';
import { AppointmentService, Appointment } from '../services/appointment.service';
import { PageHeaderComponent } from '../shared/page-header.component';
import { AppAlertComponent } from '../shared/app-alert.component';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CommonModule, FormsModule, PageHeaderComponent, AppAlertComponent],
  templateUrl: './book-appointment.component.html'
})
export class BookAppointmentComponent implements OnInit {
  doctors: Doctor[] = [];
  todayStr: string = '';
  timeSlots: string[] = [
    '08:00 AM','08:30 AM','09:00 AM','09:30 AM','10:00 AM','10:30 AM',
    '11:00 AM','11:30 AM','12:00 PM','12:30 PM','01:00 PM','01:30 PM',
    '02:00 PM','02:30 PM','03:00 PM','03:30 PM','04:00 PM','04:30 PM','05:00 PM','05:30 PM'
  ];

  appointment: Appointment;
  submitted = false;
  successMsg = '';
  errorMsg = '';

  constructor(
    private doctorService: DoctorService,
    private appointmentService: AppointmentService
  ) {
    this.appointment = this.blank();
  }

  ngOnInit(): void {
    this.doctors = this.doctorService.getDoctors().filter(d => d.status === 'available');
    this.todayStr = new Date().toISOString().split('T')[0];
  }

  private blank(): Appointment {
    return { patientName: '', age: '', gender: '', doctorId: '', doctorName: '', doctorSpec: '', date: '', time: '', notes: '' };
  }

  onDoctorChange(): void {
    const d = this.doctorService.getDoctorById(this.appointment.doctorId);
    this.appointment.doctorName = d ? d.name : '';
    this.appointment.doctorSpec = d ? d.specialization : '';
  }

  isPastDate(): boolean {
    return !!(this.appointment.date && new Date(this.appointment.date) < new Date(this.todayStr));
  }

  submitForm(form: NgForm): void {
    this.submitted = true;
    this.successMsg = '';
    this.errorMsg = '';

    if (form.invalid || this.isPastDate()) {
      this.errorMsg = 'Please fix the errors above before submitting.';
      return;
    }

    const saved = this.appointmentService.add(JSON.parse(JSON.stringify(this.appointment)));
    this.successMsg = 'Appointment confirmed. Your ID is ' + saved.id + '.';
    this.appointment = this.blank();
    this.submitted = false;
    form.resetForm();
    window.scrollTo(0, 0);
  }
}
