import { Component } from '@angular/core';
import { Appointment } from '../models/appointment';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {
  appointments: Appointment[] = [];
  newAppointmentTitle: string = "";
  newAppointmentDate: Date = new Date();
  tempIdx: number = -1;

  ngOnInit(): void {
    let savedAppointments = localStorage.getItem("appointments");
    this.appointments = savedAppointments ? JSON.parse(savedAppointments) : [];
    this.tempIdx = -1;
  }

  addAppointment() {
    if (this.tempIdx != -1) {
      this.appointments.splice(this.tempIdx, 1);
      this.tempIdx = -1;
    }
    if (this.newAppointmentTitle.trim().length && this.newAppointmentDate) {
      let newAppointment: Appointment = {
        id: Date.now(),
        title: this.newAppointmentTitle,
        date: this.newAppointmentDate
      };
      this.appointments.push(newAppointment);
      console.log(this.appointments);
      this.newAppointmentTitle = "";
      this.newAppointmentDate = new Date();

      localStorage.setItem("appointments", JSON.stringify(this.appointments));
    }
  }

  deleteAppointment(index: number) {
    this.appointments.splice(index, 1);
    localStorage.setItem("appointments", JSON.stringify(this.appointments));
  }

  updateAppointment(index: number) {
    this.newAppointmentTitle = this.appointments[index].title;
    this.newAppointmentDate = this.appointments[index].date;
    this.tempIdx = index;
  }
}
