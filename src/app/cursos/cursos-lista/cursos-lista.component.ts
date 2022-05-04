import { CursosService } from './../cursos.service';
import { Component, OnInit } from '@angular/core';
import { Curso } from '../curso';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss']
})
export class CursosListaComponent implements OnInit {

  cursos!: Curso []

  constructor(private cursosService: CursosService) { }

  ngOnInit(): void {
    this.cursosService.listaCursos().subscribe(dados => this.cursos = dados)
  }

}
