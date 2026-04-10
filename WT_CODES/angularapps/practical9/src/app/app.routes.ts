import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Register } from './register/register';
import { Success } from './success/success';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'success', component: Success },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
