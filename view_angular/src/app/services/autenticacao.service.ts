import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { Observable} from 'rxjs';
import { ILogin } from '../interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  api = environment.api;
  private endpoint = 'auth';

  constructor( private httpClient: HttpClient ) {  }

  autenticar(login: ILogin): Observable<ILogin> {
    return this.httpClient.post<ILogin>(`${this.api}/${this.endpoint}/`, login);
  }

}

