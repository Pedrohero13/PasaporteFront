import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  userLogged :any = null
  token: string = ""  
  constructor(private userService: UsersService, private router: Router) { 
    
  }
  ngOnInit(): void {
    this.getUserLogeed()
    
  } 
   getUserLogeed(){
    this.token = this.userService.getToken();
    if(this.token){
      this.userService.getUserToken(this.token).subscribe(user => {
        console.log(user)
        this.userLogged = user
        
      });
      
    }
    else{
      this.router.navigateByUrl('/login');
    }
  }

  userSignOff(){
    this.userService.SignOff()
    this.userLogged = null
    console.log("se ejecuta el cerrar sesion")
    this.router.navigateByUrl("/login")
  }
  
}
