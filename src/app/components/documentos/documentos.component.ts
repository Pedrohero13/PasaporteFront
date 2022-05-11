import { Component, OnInit } from '@angular/core';
import { CitaComponent } from '../cita/cita.component';

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.css']
})
export class DocumentosComponent implements OnInit {

  constructor(private cita: CitaComponent) { }

  ngOnInit(): void {
  }
  cambiar (activetab:any){
    this.cita.cambiar(activetab);
  }
}
