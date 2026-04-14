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

@Injectable({
  providedIn: 'root'
})
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

  getDoctors(): Doctor[] {
    return this.doctors;
  }

  getDoctorById(id: number | string): Doctor | undefined {
    return this.doctors.find(d => d.id === parseInt(id as string, 10));
  }

  getSpecializations(): string[] {
    return Array.from(new Set(this.doctors.map(d => d.specialization))).sort();
  }
}
