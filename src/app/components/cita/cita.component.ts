import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { AppointmentService } from 'src/app/services/appointment.service';
import { UsersService } from 'src/app/services/users.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-cita',
  templateUrl: './cita.component.html',
  styleUrls: ['./cita.component.css']
})
export class CitaComponent implements OnInit {
  activeTab = 'oficina';
  fileToUpload: File | null = null;
  id_user: number = 0
  state: string = ""
  office: string = ""
  curp: string = ""
  office_paperwork: string = ""
  identification_document: string = ""
  identification_document_url: string = ""
  nationality_document: string = ""
  nationality_document_url: string = ""
  date: string = ""
  time: string = ""
  status: boolean = true

  constructor(private apointmentService: AppointmentService, private userService: UsersService, private router: Router) { }


  ngOnInit(): void {

  }

  changeTab(activeTab: any) {
    this.activeTab = activeTab;
  }
  
  onCreateAponitment() {
    this.id_user = parseInt(this.userService.getToken()) 
    this.date = (<HTMLInputElement>document.getElementById("date")).value
    

    const appointment = {
      id_user: this.id_user,
      state: this.state,
      office: this.office,
      curp: this.curp,
      office_paperwork: this.office_paperwork,
      identification_document: this.identification_document,
      identification_document_url: this.identification_document_url,
      nationality_document: this.nationality_document,
      nationality_document_url: this.nationality_document_url,
      date: this.date,
      time: this.time,
      status: true
    }
    this.apointmentService.createApointment(appointment).subscribe(data => {
      
      timer(1000).subscribe(x => { this.router.navigateByUrl('/'); })
      Swal.fire({
        position: 'top-right',
        icon:'success',
        title: 'La cita a sido creada '+ data,
        showConfirmButton: false,
        timer: 1000
      })
    }
    ,error => {
      Swal.fire({
        position: 'top-right',
        icon:'error',
        title: 'error al crear nueva cita '+ error.message,
        showConfirmButton: false,
        timer: 1000
      })
    });

  }

  onUploadDocumentIdentity(){
    this.apointmentService.upLoadDocumentIdentity(this.fileToUpload).subscribe(data =>{
      this.identification_document_url = data.url
      let splitted = data.url.split("/"); 
      this.identification_document= splitted[5]
      Swal.fire({
        position: 'top-right',
        icon: 'success',
        title: 'archivo cargado con exito '+ this.identification_document,
        showConfirmButton: false,
        timer: 1000
      })
    },error => {
      Swal.fire({
        position: 'top-right',
        icon:'error',
        title: 'error al cargar el archivo '+ error.message,
        showConfirmButton: false,
        timer: 1000
      })
    });
    

    
  }

  onUploadDocumentNacionality(){
    this.apointmentService.upLoadDocumentNacionality(this.fileToUpload).subscribe(data =>{
      console.log(data)
      this.nationality_document_url = data.url
      const splitted = data.url.split("/"); 
      this.nationality_document = splitted[5]
      Swal.fire({
        position: 'top-right',
        icon: 'success',
        title: 'archivo cargado con exito '+ this.identification_document,
        showConfirmButton: false,
        timer: 1000
      })
    },error => {
      Swal.fire({
        position: 'top-right',
        icon:'error',
        title: 'error al cargar el archivo '+ error.message,
        showConfirmButton: false,
        timer: 1000
      })
    });
    
  }

  onFileChange(event: any) {
  
    if (event.target.files.length > 0) {
      let files: FileList = event.target.files;
      this.fileToUpload  = files[0];
    }
  }
}
