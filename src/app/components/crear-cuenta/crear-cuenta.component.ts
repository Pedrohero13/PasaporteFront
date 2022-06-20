import { Component, OnInit } from '@angular/core';


import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-cuenta',
  templateUrl: './crear-cuenta.component.html',
  styleUrls: ['./crear-cuenta.component.css']
})
export class CrearCuentaComponent implements OnInit {
  email: string = "";
  password: string = "";
  confirmPassword: string = "";
  CURP: string = ""
  checkSeleccionado: boolean = false

  constructor(private userService: UsersService, public router: Router) { }

  ngOnInit(): void {

  }

  register() {
    const user = {
      email: this.email,
      password: this.password,
      curp: this.CURP



    };
    if (this.validatePassword()) {
      this.userService.register(user).subscribe(data => {
        const user = { email: this.email, password: this.password };
        this.userService.login(user).subscribe(data => {
          timer(1000).subscribe(x => { this.router.navigateByUrl('/'); })
          this.userService.setToken(data.user.id);
          Swal.fire({
            position: 'top-right',
            icon: 'success',
            title: 'Inicio de Sesion como: ' + data.user.curp,
            showConfirmButton: false,
            timer: 1000
          })

        });
      }, error => {
        Swal.fire({
          icon: 'error',
          title: 'Ocurrio un error al registrarse verifique los datos ingresados:',
          showConfirmButton: true,

        })
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Las contraseñas no coinciden',
        showConfirmButton: true,

      })
    }

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
  validatePassword() {
    if (this.password != this.confirmPassword) {
      return false;
    } else {
      return true;
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
