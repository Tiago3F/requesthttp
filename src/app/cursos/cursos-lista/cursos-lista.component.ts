import { AlertModalService } from './../../shared/alert-modal.service';
import { AlertModalComponent } from './../../shared/alert-modal/alert-modal.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CursosService } from './../cursos.service';
import { Component, OnInit } from '@angular/core';
import { Curso } from '../curso';
import { catchError, empty, Observable, Subject, switchMap } from 'rxjs';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss']
})
export class CursosListaComponent implements OnInit {

  // cursos!: Curso []

  cursos$!: Observable<Curso[]>
  error$ = new Subject<boolean>()
  bsModalRef?: BsModalRef;


  constructor(private cursosService: CursosService,
    // private modalService: BsModalService
    private alertService: AlertModalService
  ) { }

  ngOnInit(): void {
    // this.cursosService.listaCursos().subscribe(dados => this.cursos = dados)

    this.onRefresh()
  }

  onRefresh() {
    this.cursos$ = this.cursosService.listaCursos()
      .pipe(
        // map(),
        // tap(),
        // switchMap(),
        catchError(error => {
          console.error(error)
          // this.error$.next(true)
          this.handleError()
          return empty()
        })
      )

    // this.cursosService.listaCursos()
    //   .pipe(
    //     catchError(error => empty())
    //   )
    //   .subscribe(
    //     dados => {
    //       console.log(dados)
    //     },
    //     // error => console.error(error),
    //     // () => console.log('Observable completo!')
    //   )
  }

  handleError() {
    this.alertService.showAlertDanger('Erro ao carregar cursos. Tente novamente mais tarde...')
    // this.bsModalRef = this.modalService.show(AlertModalComponent);
    // this.bsModalRef.content.type = 'danger';
    // this.bsModalRef.content.message = 'Erro ao carregar cursos. Tente novamente mais tarde...';
  }

}
