import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { DoctorService, Doctor } from '../services/doctor.service';
import { AppointmentService, Appointment } from '../services/appointment.service';
import { PageHeaderComponent } from '../shared/page-header.component';
import { AppAlertComponent } from '../shared/app-alert.component';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, PageHeaderComponent, AppAlertComponent],
  templateUrl: './appointments.component.html'
})
export class AppointmentsComponent implements OnInit {
  timeSlots: string[] = [
    '08:00 AM','08:30 AM','09:00 AM','09:30 AM','10:00 AM','10:30 AM',
    '11:00 AM','11:30 AM','12:00 PM','12:30 PM','01:00 PM','01:30 PM',
    '02:00 PM','02:30 PM','03:00 PM','03:30 PM','04:00 PM','04:30 PM','05:00 PM','05:30 PM'
  ];

  appointments: Appointment[] = [];
  doctors: Doctor[] = [];
  availableDoctors: Doctor[] = [];
  
  searchText = '';
  filterDoctor = '';
  todayStr = '';
  
  successMsg = '';
  confirmDelete: string | null = null;
  
  editMode = false;
  editAppt: Appointment | null = null;
  editError = '';
  editSubmitted = false;

  constructor(
    private doctorService: DoctorService,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit(): void {
    this.todayStr = new Date().toISOString().split('T')[0];
    this.reload();
    this.doctors = this.doctorService.getDoctors();
    this.availableDoctors = this.doctors.filter(d => d.status === 'available');
  }

  private reload(): void {
    this.appointments = this.appointmentService.getAll();
  }

  get filteredAppointments(): Appointment[] {
    const s = this.searchText.toLowerCase();
    return this.appointments.filter(a => {
      const matchSearch = !s || a.patientName.toLowerCase().includes(s) || (a.id && a.id.toLowerCase().includes(s)) || (a.doctorName && a.doctorName.toLowerCase().includes(s));
      const matchDoctor = !this.filterDoctor || a.doctorName === this.filterDoctor;
      return matchSearch && matchDoctor;
    });
  }

  get filteredCount(): number {
    return this.filteredAppointments.length;
  }

  clearFilters(): void {
    this.searchText = '';
    this.filterDoctor = '';
  }

  private flash(msg: string): void {
    this.successMsg = msg;
    setTimeout(() => {
      this.successMsg = '';
    }, 3000);
  }

  deleteAppointment(id: string): void {
    this.confirmDelete = id;
  }

  cancelDelete(): void {
    this.confirmDelete = null;
  }

  confirmDeleteAppt(): void {
    if (this.confirmDelete) {
      this.appointmentService.remove(this.confirmDelete);
      this.confirmDelete = null;
      this.reload();
      this.flash('Appointment deleted.');
    }
  }

  isPastDate(date?: string): boolean {
    return !!(date && new Date(date) < new Date(this.todayStr));
  }

  editAppointment(appt: Appointment): void {
    this.editAppt = JSON.parse(JSON.stringify(appt));
    this.editMode = true;
    this.editError = '';
    this.editSubmitted = false;
    setTimeout(() => {
      const el = document.getElementById('edit-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  }

  cancelEdit(): void {
    this.editMode = false;
    this.editAppt = null;
  }

  onEditDoctorChange(): void {
    if (this.editAppt && this.editAppt.doctorId) {
      const d = this.doctorService.getDoctorById(this.editAppt.doctorId);
      if (d) {
        this.editAppt.doctorName = d.name;
        this.editAppt.doctorSpec = d.specialization;
      }
    }
  }

  saveEdit(form: NgForm): void {
    this.editSubmitted = true;
    this.editError = '';
    
    if (form.invalid || (this.editAppt && this.isPastDate(this.editAppt.date))) {
      this.editError = 'Please fix the errors before saving.';
      return;
    }
    
    if (this.editAppt) {
      this.appointmentService.update(this.editAppt);
      this.reload();
      this.editMode = false;
      this.editAppt = null;
      window.scrollTo(0, 0);
      this.flash('Appointment updated.');
    }
  }
}
