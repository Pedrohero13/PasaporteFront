import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cita',
  templateUrl: './cita.component.html',
  styleUrls: ['./cita.component.css']
})
export class CitaComponent implements OnInit {
  activeTab = 'oficina';
  constructor() { }

  ngOnInit(): void {
  }
  cambiar(activeTab:any){
    this.activeTab = activeTab;
  }
  
}
