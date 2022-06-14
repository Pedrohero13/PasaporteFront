import { Component, OnInit } from '@angular/core';


import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-crear-cuenta',
  templateUrl: './crear-cuenta.component.html',
  styleUrls: ['./crear-cuenta.component.css']
})
export class CrearCuentaComponent implements OnInit {
  email: string = "";
  password: string = "";
  confirmPassword: string = "";
  name: string = ""
  first_surname: string = ""
  second_surname: string = ""

  country: string = "Mexico"
  state: string = "Veracruz"
  default_office: string = "Xapala"
  born_country: string = "Mexico"
  nationality: string = "Mexicana"
  telephone: string = "12345678"
  optional_telephone: string = "12345678"

  constructor(private userService: UsersService, public router: Router) { }

  ngOnInit(): void {

  }

  register() {
    const user = {
      email: this.email,
      password: this.password,
      name: this.name,
      first_surname: this.first_surname,
      second_surname: this.second_surname,
      country: this.country,
      state: this.state,
      default_office: this.default_office,
      born_country: this.born_country,
      nationality: this.nationality,
      telephone: this.telephone,
      optional_telephone: this.optional_telephone



    };

    this.userService.register(user).subscribe(data => {
      const user = { email: this.email, password: this.password };
      this.userService.login(user).subscribe(data => {
        this.userService.setToken(data.token);
        this.router.navigateByUrl('/');
      });
    });
  }

}
