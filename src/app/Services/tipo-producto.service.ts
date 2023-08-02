import { Injectable } from '@angular/core';

import { HttpClient} from '@angular/common/http'
import { environment } from 'src/environments/enviroment';
import {Observable} from 'rxjs'
import { TipoProducto } from '../Interfaces/tipo-producto';


@Injectable({
  providedIn: 'root'
})
export class TipoProductoService {

 private endpoint = environment.endPoint;
 private apiUrl:string = this.endpoint + 'tipoproducto/'

  constructor(private http:HttpClient) { }

getList():Observable<TipoProducto[]>
{
  return this.http.get<TipoProducto[]>(`${this.apiUrl}lista`);

}}
