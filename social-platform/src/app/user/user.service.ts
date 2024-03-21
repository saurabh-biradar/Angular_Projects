import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users = [{ id: 1, name: "John Doe" }, { id: 2, name: "Maria Doe" }]
  constructor() { }
  getUsers() {
    return this.users;
  }
}
