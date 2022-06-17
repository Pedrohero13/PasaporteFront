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
  CURP : string = ""
  checkSeleccionado: boolean = false

  constructor(private userService: UsersService, public router: Router) { }

  ngOnInit(): void {

  }

  register() {
    const user = {
      email: this.email,
      password: this.password,
      curp : this.CURP 



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
    }else{
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


}
