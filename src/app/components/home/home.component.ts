import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppointmentService } from 'src/app/services/appointment.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  arratAux : any;
  appointmentsList = new Array();
  
  userLogin: any | null = null;
  token : string = ""
  constructor(private userService: UsersService, private router: Router, private apointmentService: AppointmentService) { }
  
  ngOnInit(): void {
    this.getUserLogeed()
    
  }
  getUserLogeed(){
    this.token = this.userService.getToken();
    if(this.token){
      this.userService.getUserToken(this.token).subscribe(user => {
        this.userLogin = user
        this.getapointmentsStatusTrue()
      });
      
    }
    else{
      this.router.navigateByUrl('/login');
    }
  }

  getapointmentsStatusTrue(){

    this.apointmentService.getApointments(this.token).subscribe(data=>{
      this.arratAux = data;

      this.arratAux.map((elemento : any) =>{
        const dataTable  = {
          id: elemento.id,
          office: elemento.office,
          date: elemento.date,
          time: elemento.time,
          status: elemento.status? "Activa":"Desactivada",
          papeport: elemento.office_paperwork?  elemento.office_paperwork:"Pasaporte" ,
          name: elemento.name
        }

        this.appointmentsList.push(dataTable)
      })
    })
  }
  

  

}
