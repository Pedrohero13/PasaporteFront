import { Component, OnInit } from '@angular/core';
import { UserAPI } from 'src/app/user-api';
import { UserLogin } from 'src/app/userLogin';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userLogin: any = null
  constructor(private userService: UsersService, private router: Router) { }
  token : string = ""
  ngOnInit(): void {
    this.getUserLogeed()
  }
  getUserLogeed(){
    this.token = this.userService.getToken();
    if(this.token){
      this.userService.getUserToken(this.token).subscribe(user => {
        console.log(user)
        this.userLogin = user

      });
    }
    else{
      this.router.navigateByUrl('/login');
    }
  }

}
