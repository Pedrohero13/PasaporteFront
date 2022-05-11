import { Component, OnInit } from '@angular/core';
import { CitaComponent } from '../cita/cita.component';
@Component({
  selector: 'app-oficina',
  templateUrl: './oficina.component.html',
  styleUrls: ['./oficina.component.css']
})
export class OficinaComponent implements OnInit {
  
  constructor(private cita: CitaComponent) { }

  ngOnInit(): void {

  }
  cambiar (activetab:any){
    this.cita.cambiar(activetab);
  }
  

}
