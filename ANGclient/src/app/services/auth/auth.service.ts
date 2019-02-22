import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { UserModel } from 'src/app/models/user.model';
import { CookieModel } from 'src/app/models/cookie.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiUrl: String = `http://localhost:9876/api`;

  constructor(private HttpClient: HttpClient) { }

  public register(data: UserModel): Promise<any> {
    let header = new HttpHeaders();
    header.append('Content-type', 'application/json');

    return this.HttpClient.post(`${this.apiUrl}/user`, data, { headers: header })
    .toPromise()
    .then(this.getData)
    .catch(this.handleError);
  }

  public login(data: UserModel): Promise<any> {
    let header = new HttpHeaders();
    header.append('Content-type', 'application/json');

    return this.HttpClient.post(`${this.apiUrl}/auth/login`, data, { headers: header })
    .toPromise()
    .then(this.getData)
    .catch(this.handleError);
  }

  public cookie(data: CookieModel): Promise<any> {
    let header = new HttpHeaders();
    header.append('Content-type', 'application/json');

    return this.HttpClient.post(`${this.apiUrl}/auth/cookie`, data, { headers: header })
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
