import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../models/reservation';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent {
  reservationForm: FormGroup = new FormGroup({});
  id: string | null = "";
  constructor(private formBuilder: FormBuilder, private reservationService: ReservationService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.reservationForm = this.formBuilder.group({
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      guestName: ['', Validators.required],
      guestEmail: ['', [Validators.required, Validators.email]],
      roomNumber: ['', Validators.required]
    });

    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.id) {
      this.reservationService.getReservation(this.id).subscribe(res => {
        if (res) {
          this.reservationForm.setValue({
            checkInDate: res.checkInDate.toString().slice(0, 10),
            checkOutDate: res.checkOutDate.toString().slice(0, 10),
            guestName: res.guestName,
            guestEmail: res.guestEmail,
            roomNumber: res.roomNumber
          });
        }
      });
    }
  }

  onSubmit() {
    if (this.reservationForm.valid) {
      const reservation: Reservation = this.reservationForm.value;
      if (this.id) {
        reservation._id = this.id;
        this.reservationService.updateReservation(reservation);
      }
      else {
        this.reservationService.addReservation(reservation);
      }
      this.router.navigate(['/list']);
    }
  }
}
