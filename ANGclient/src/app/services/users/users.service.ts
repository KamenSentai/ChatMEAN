import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  private apiUrl: String = `http://localhost:9876/api`;

  constructor(private HttpClient: HttpClient) { }

  public fetch(): Promise<any> {
    let header = new HttpHeaders();
    header.append('Content-type', 'application/json');

    return this.HttpClient.post(`${this.apiUrl}/users`, { headers: header })
    .toPromise()
    .then(this.getData)
    .catch(this.handleError);
  }

  private getData(response: any) {
    return Promise.resolve(response || {});
  }

  private handleError(error: any) {
    return Promise.reject(error);
  }
}
