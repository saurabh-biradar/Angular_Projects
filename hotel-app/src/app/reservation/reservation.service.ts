import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUri: string = "http://localhost:8080/";

  //CRUD Operations
  constructor(private http: HttpClient) {
  }

  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.apiUri + "reservations");
  }

  getReservation(id: string): Observable<Reservation> {
    return this.http.get<Reservation>(this.apiUri + "reservation/" + id);
  }

  addReservation(reservation: Reservation): void {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post(this.apiUri + "reservations", reservation, { headers })
      .subscribe(res => console.log(res));
  }

  deleteReservation(id: string): void {
    this.http.delete<void>(this.apiUri + "reservation/" + id)
      .subscribe(res => console.log(res));
  }

  updateReservation(updatedReservation: Reservation): void {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.put<void>(this.apiUri + "reservation/" + updatedReservation._id, updatedReservation)
      .subscribe(res => console.log(res));
  }
}
