import { Component } from '@angular/core';
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../models/reservation';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent {

  reservations: Reservation[] = [];

  constructor(private reservationService: ReservationService) {
    this.reservationService.getReservations().subscribe(res => this.reservations = res);
  }

  deleteReservation(index: number): void {
    this.reservationService.deleteReservation(this.reservations[index]._id);
    this.reservationService.getReservations().subscribe(res => this.reservations = res);
  }
}
