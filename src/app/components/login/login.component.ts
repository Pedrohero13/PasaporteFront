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
    }
    else {
      this.checkSeleccionado = false
    }

  }


}
