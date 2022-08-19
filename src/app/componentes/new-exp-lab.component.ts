import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Explaboral } from '../models/explaboral';
import { SExperienciaService } from '../servicio/sexperiencia.service';

@Component({
  selector: 'app-new-exp-lab',
  templateUrl: './new-exp-lab.component.html',
  styleUrls: ['./new-exp-lab.component.css']
})
export class NewExpLabComponent implements OnInit {
  nombreE: string = "";
  periodoE: number = 0;
  descripcionE: string = "";
  mensaje!: string;

  @Output() modalClose : EventEmitter<any> = new EventEmitter<any>();
  constructor(private s_explab: SExperienciaService, private router: Router) { }

  ngOnInit(): void {
  }

  closeModal( $event: any ) {
    this.router.navigate([{outlets: {modal: null}}]);
    this.modalClose.next($event);
  }

  onCreate(): void {
    const expe = new Explaboral(this.nombreE, this.periodoE, this.descripcionE);

    this.s_explab.create(expe).subscribe(data => {
      alert('Datos almacenados en la base de datos con éxito');
      this.router.navigate(['']);
      this.closeModal({submitted: true})
      window.location.reload();
    }, err => {
      alert('Error en la creación.');
      this.router.navigate(['']);
      window.location.reload();
    })
  }
}