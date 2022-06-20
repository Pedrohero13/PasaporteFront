import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';


import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = "";
  password: string = "";
  checkSeleccionado: boolean = false
  constructor(private userService: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.userService.SignOff()
  }
  login() {
    const user = { email: this.email, password: this.password };
    this.userService.login(user).subscribe(data => {
      this.userService.setToken(data.user.id);

      timer(1000).subscribe(x => { this.router.navigateByUrl('/'); })

      Swal.fire({
        position: 'top-right',
        icon: 'success',
        title: 'Inicio de Sesion como: '+ data.user.curp,
        showConfirmButton: false,
        timer: 1000
      })


    },
      error => {
        console.log(error);
      });

  }
  onChange(event: any) {
    if (!this.checkSeleccionado) {
      this.checkSeleccionado = true
      this.conditions()
    }
    else {
      this.checkSeleccionado = false
    }

  }

  conditions() {
    Swal.fire({
      title: '<strong>Terminos y condiciones</strong>',
      icon: 'info',
      html:
        '<p style ="text-align: left; font-size: 3vmin;">Este es el único sitio autorizado y completamente gratuito para la programación de citas en las oficinas consulares ' +
        'de México en el extranjero. Se exhorta a evitar los fraudes y no realizar pagos ni depósitos a ninguna persona o establecimiento para la obtención de citas o por ' +
        'algún servicio consular como pasaporte, matrícula consular, visa, entre otros.</p>'
        + '<p style ="text-align: left; font-size: 3vmin;">' +
        ' La obtención de citas es completamente gratuita y dependerá de la disponibilidad de espacios en la oficina consular donde deseas realizar tú trámite.' +
        'Debido a las precauciones sanitarias que se aplican diariamente en las oficinas consulares, para poder ingresar el día de tu cita deberás cumplir con el siguiente protocolo:</p>' +
        '<ul>' +

        '<li style ="text-align: left; font-size: 3vmin;"> Se tomará la temperatura antes del ingreso.</li>' +
        '<li style ="text-align: left; font-size: 3vmin;"> Portar cubrebocas durante tu estancia al interior de la oficina. </li>' +
        '<li style ="text-align: left; font-size: 3vmin;"> Usar gel antibacterial al ingresar a la oficina. </li>' +
        '<li style ="text-align: left; font-size: 3vmin;"> Mantener una distancia de al menos 1.5 metros con otras personas. </li>' +

        '</ul>'
      ,
      showConfirmButton: false,
      showCloseButton: true,
      width: '62em'
    })

  }
}
