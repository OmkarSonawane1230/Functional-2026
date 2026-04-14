import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DoctorService, Doctor } from '../services/doctor.service';
import { PageHeaderComponent } from '../shared/page-header.component';

@Component({
  selector: 'app-doctors',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, PageHeaderComponent],
  templateUrl: './doctors.component.html'
})
export class DoctorsComponent implements OnInit {
  doctors: Doctor[] = [];
  specializations: string[] = [];
  searchText = '';
  selectedSpec = '';
  selectedStatus = '';

  constructor(private doctorService: DoctorService) {}

  ngOnInit(): void {
    this.doctors = this.doctorService.getDoctors();
    this.specializations = this.doctorService.getSpecializations();
  }

  get filteredDoctors(): Doctor[] {
    const s = this.searchText.toLowerCase();
    return this.doctors.filter(d => 
      (!s || d.name.toLowerCase().includes(s) || d.specialization.toLowerCase().includes(s)) &&
      (!this.selectedSpec || d.specialization === this.selectedSpec) &&
      (!this.selectedStatus || d.status === this.selectedStatus)
    );
  }

  get filteredCount(): number {
    return this.filteredDoctors.length;
  }

  clearFilters(): void {
    this.searchText = '';
    this.selectedSpec = '';
    this.selectedStatus = '';
  }
}
