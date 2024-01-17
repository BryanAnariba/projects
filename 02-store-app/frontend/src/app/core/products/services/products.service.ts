import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { devEnvironments } from '../../../environments/environments.dev';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private readonly apiUrl: string = devEnvironments.apiUrl;
  
  constructor(private httpClient: HttpClient) { }
}
