import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timer,Subscription } from 'rxjs';
import { AppointmentService } from 'src/app/services/appointment.service';
import { UsersService } from 'src/app/services/users.service';
import { IMqttMessage, MqttService } from 'ngx-mqtt';
import Swal from 'sweetalert2';
import { timingSafeEqual } from 'crypto';

@Component({
  selector: 'app-cita',
  templateUrl: './cita.component.html',
  styleUrls: ['./cita.component.css']
})
export class CitaComponent implements OnInit {
  private subscription: Subscription | null = null
  topicname: string = "nombre_imagen";
  msg: any;
  isConnected: boolean = false;

  userLogin: any | null = null;
  token: string = ""

  activeTab = 'oficina';

  fileToUpload: File | null = null;
  id_user: number = 0
  curp: string = ""
  name: string = ""
  first_surname: string = ""
  second_surname: string = ""
  born_country: string = ""
  born_date: string = ""
  nationality: string = "Mexicana"
  address: string = ""
  telephone: string = ""
  optional_telephone: string = ""
  state: string = ""
  office: string = ""
  office_paperwork: string = "Pasaporte"
  identification_document: string = ""
  identification_document_url: string = ""
  nationality_document: string = ""
  nationality_document_url: string = ""
  date: string = ""
  time: string = ""
  status: boolean = true

  constructor(private apointmentService: AppointmentService, private userService: UsersService, private router: Router, private _mqttService: MqttService) { }


  ngOnInit(): void {
    this.getUserLogeed()
  }
  subscribeNewTopic(): void {
    Swal.fire({
      position: 'top-right',
      icon: 'success',
      title: 'esperando archivo',

      
      showConfirmButton: true,


    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (this.identification_document) {
        
        Swal.fire('Cargado!', '', 'success')
      } else {
        
      }
    })
    console.log('inside subscribe new topic')
    this.subscription = this._mqttService.observe(this.topicname).subscribe((message: IMqttMessage) => {
      this.msg = message;
      this.identification_document  = message.payload.toString()

      this.getImagefromApi()
      
    });
  }

  getImagefromApi (){
    this.apointmentService.getIdentityDocument(this.identification_document).subscribe(data =>{
      console.log(data)
      this.name = data.image_information.name
      this.first_surname = data.image_information.first_surname
      this.second_surname = data.image_information.second_surname
      this.address = data.image_information.street
      this.born_date = data.image_information.date_birth
      this.curp = data.image_information.curp
      this.born_country = data.image_information.suburb
       Swal.fire({
        position: 'top-right',
        icon: 'success',
        title: 'archivo cargado con exito ' + this.identification_document,
        showConfirmButton: true,
      })
      
    })
  }

  getUserLogeed() {
    this.token = this.userService.getToken();
    if (this.token) {
      this.userService.getUserToken(this.token).subscribe(user => {
        this.userLogin = user

      });

    }
    else {
      this.router.navigateByUrl('/login');
    }
  }
  changeTab(activeTab: any) {
    this.activeTab = activeTab;
    
  }

  onCreateAponitment() {
    this.id_user = parseInt(this.userService.getToken())
    this.date = (<HTMLInputElement>document.getElementById("date")).value


    const appointment = {
      name: this.name,
      first_surname: this.first_surname,
      second_surname: this.second_surname,
      born_country: this.born_country,
      born_date: this.born_date,
      nationality: this.nationality,
      address: this.address,
      telephone: this.telephone,
      optional_telephone: this.optional_telephone,
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
        icon: 'success',
        title: 'La cita a sido creada ' + data,
        showConfirmButton: false,
        timer: 1000
      })
    }
      , error => {
        Swal.fire({
          position: 'top-right',
          icon: 'error',
          title: 'error al crear nueva cita ' + error.message,
          showConfirmButton: false,
          timer: 1000
        })
      });

  }

  onUploadDocumentIdentity() {
    this.apointmentService.upLoadDocumentIdentity(this.fileToUpload).subscribe(data => {
      this.identification_document_url = data.url
      let splitted = data.url.split("/");
      this.identification_document = splitted[5]
      this.name = data.image_information.name
      this.first_surname = data.image_information.first_surname
      this.second_surname = data.image_information.second_surname
      this.address = data.image_information.street
      this.born_date = data.image_information.date_birth
      this.curp = data.image_information.curp
      this.born_country = data.image_information.suburb
      
      Swal.fire({
        position: 'top-right',
        icon: 'success',
        title: 'archivo cargado con exito ' + this.identification_document,
        showConfirmButton: false,
        timer: 1000
      })
     
    }, error => {
      Swal.fire({
        position: 'top-right',
        icon: 'error',
        title: 'error al cargar el archivo ' + error.message,
        showConfirmButton: false,
        timer: 1000
      })
    });



  }

  onUploadDocumentNacionality() {
    this.apointmentService.upLoadDocumentNacionality(this.fileToUpload).subscribe(data => {
      console.log(data)
      this.nationality_document_url = data.url
      const splitted = data.url.split("/");
      this.nationality_document = splitted[5]
      Swal.fire({
        position: 'top-right',
        icon: 'success',
        title: 'archivo cargado con exito ' + this.identification_document,
        showConfirmButton: false,
        timer: 1000
      })
    }, error => {
      Swal.fire({
        position: 'top-right',
        icon: 'error',
        title: 'error al cargar el archivo ' + error.message,
        showConfirmButton: false,
        timer: 1000
      })
    });

  }

  onFileChange(event: any) {

    if (event.target.files.length > 0) {
      let files: FileList = event.target.files;
      this.fileToUpload = files[0];

    }
  }

  onSwalConfirment() {
    Swal.fire({
      title: 'Estas seguro que deseas guardar esta cita?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      denyButtonText: `No guardar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.onCreateAponitment()
        Swal.fire('Guardado!', '', 'success')
      } else if (result.isDenied) {
        timer(1000).subscribe(x => { this.router.navigateByUrl('/'); })
        Swal.fire('No se a guardado', '', 'info')
      }
    })
  }

}
