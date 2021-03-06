import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITrabajo } from '../models/trabajo.model';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getApi(): Observable <ITrabajo>{
    const urlApi = `http://localhost:3000/trabajos`;
    return this.http.get<ITrabajo>(urlApi);
  }

  postApi(trabajo: ITrabajo) {
    const urlApi = `http://localhost:3000/trabajos`;
    return this.http.post(urlApi, trabajo);
  }

  deleteApi(id: string) {
    const urlApi = `http://localhost:3000/trabajos/${id}`;
    return this.http.delete(urlApi);
  }

  putApi(trabajo: ITrabajo) {
    const urlApi = `http://localhost:3000/trabajos/${trabajo._id}`;
    return this.http.put(urlApi, trabajo);
  }

}
