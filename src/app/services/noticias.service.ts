import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NewTopHeadLines } from "../interfaces/index";
import { environment } from '../../environments/environment.prod';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

const headers = new HttpHeaders({
  'X-Api-Key': apiKey
});


@Injectable({
  providedIn: 'root'
})
export class NoticiasService {
  headLinesPages = 0;
  pagesCategorias = 0;
  categoriaActual = '';

  constructor(private http: HttpClient) { }

  private ejecutarQuery<T>(query: string) {
    query = apiUrl + query

    return this.http.get<T>(query, { headers })
  }

  getTopHeadLines() {
    this.headLinesPages++;
    return this.ejecutarQuery<NewTopHeadLines>(`/top-headlines?country=co&page=${this.headLinesPages}`);
  }

  getTopHeadLinesCategoria(categoria: string) {
    if (this.categoriaActual === categoria) {
      this.pagesCategorias++;
    } else {
      this.pagesCategorias = 1;
      this.categoriaActual = categoria;
    }
    return this.ejecutarQuery<NewTopHeadLines>(`/top-headlines?country=co&category=${categoria}&page=${this.pagesCategorias}`);
  }

}
