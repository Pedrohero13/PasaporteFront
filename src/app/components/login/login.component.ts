import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';  
 

import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string="";
  password: string="";
  
  constructor(private userService: UsersService, private router: Router) { }

  ngOnInit(): void {
  }
  login() {
    const user = {email: this.email, password: this.password};
    this.userService.login(user).subscribe( data => {
      this.userService.setToken(data.user.id);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Login exitoso',
        showConfirmButton: false,
        timer: 1000
      })
      
      this.router.navigateByUrl('/');
    },
    error => {
      console.log(error);
    });
    
  }

 
}
