import { Injectable } from "@angular/core"; 
import { Pessoa } from "./models/pessoa.model"; 
import { Observable, catchError, throwError } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

@Injectable()
export class PessoasService {

  private url: string = "http://localhost:3000/pessoas"

  constructor(private http: HttpClient) {}

  public retornarTodos(): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(this.url).pipe(
        catchError(this.handleError)
    )
  }

  public returnarUm(id: number): Observable<void> {
    return this.http.get<void>(this.url + `/${id}`).pipe(
        catchError(this.handleError)
    )
   }



   public post(pessoa: Pessoa): Observable <void> {
   return this.http.post<void>(this.url, pessoa).pipe(
        catchError(this.handleError)
    )
   }

   public put(pessoa: Pessoa): Observable <Pessoa>{
    return this.http.put<Pessoa>(`${this.url}/${pessoa.id}`, pessoa).pipe(
         catchError(this.handleError)
     )
 }

   public delete(id: number): Observable<void> {
    return this.http.delete<void>(this.url + `/${id}`).pipe(
        catchError(this.handleError)
    )
}

  private handleError(ex: HttpErrorResponse) {
    console.log(ex);

    return throwError(ex)
  }
}