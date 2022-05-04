import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, tap } from 'rxjs';
import { Curso } from './curso';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private readonly API = `${environment.API}cursos`

  constructor(private httpClient: HttpClient) { }

  listaCursos() {
    return this.httpClient.get<Curso[]>(this.API)
    .pipe(
      delay(2000),
      tap(console.log)
    )
  }
}

