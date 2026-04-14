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

@Injectable({
  providedIn: 'root'
})
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
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.KEY, JSON.stringify(list));
    }
  }

  private genId(list: Appointment[]): string {
    if (!list.length) return 'APT-0001';
    const max = Math.max(...list.map(a => parseInt(a.id!.replace('APT-', ''), 10)));
    return 'APT-' + String(max + 1).padStart(4, '0');
  }

  getAll(): Appointment[] {
    return this.load();
  }

  count(): number {
    return this.load().length;
  }

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
    if (i !== -1) {
      list[i] = updated;
      this.save(list);
      return true;
    }
    return false;
  }

  remove(id: string) {
    this.save(this.load().filter(a => a.id !== id));
  }
}
