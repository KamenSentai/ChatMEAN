import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageModel } from '../../models/message.model';

@Injectable({
  providedIn: 'root'
})

export class MessagesService {
  private apiUrl: String = `http://localhost:9876/api`;

  constructor(private HttpClient: HttpClient) { }

  public create(data: MessageModel): Promise<any> {
    let header = new HttpHeaders();
    header.append('Content-type', 'application/json');

    return this.HttpClient.post(`${this.apiUrl}/messages/create`, data, { headers: header })
    .toPromise()
    .then(this.getData)
    .catch(this.handleError);
  }

  public read(): Promise<any> {
    let header = new HttpHeaders();
    header.append('Content-type', 'application/json');

    return this.HttpClient.post(`${this.apiUrl}/messages/read`, { headers: header })
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
