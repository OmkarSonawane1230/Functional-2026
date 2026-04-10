import { Injectable, signal } from '@angular/core';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users = signal<User[]>([]);

  register(user: User) {
    this.users.update(users => [...users, user]);
  }

  login(user: Pick<User, 'email' | 'password'>): boolean {
    const foundUser = this.users().find(
      u => u.email === user.email && u.password === user.password
    );
    return !!foundUser;
  }
}
