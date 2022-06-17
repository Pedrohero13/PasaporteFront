import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  userLogin :any | null = null
  token: string = ""  
  constructor(private userService: UsersService, private router: Router) { 
    
  }
  ngOnInit(): void {
    this.userService.getUserToken(this.userService.getToken()).subscribe(user =>{
      this.userLogin = user
    })  
  } 
 
  

  
  
}
