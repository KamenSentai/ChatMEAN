import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserModel } from '../../models/user.model';
import { MessageModel } from '../../models/message.model';

@Injectable({
  providedIn: 'root'
})

export class MessagesService {
  private apiUrl: String = `http://localhost:9876/api`;

  constructor(private HttpClient: HttpClient) { }

  public create(data: MessageModel): Promise<any> {
    return this.service(data, '/messages/create');
  }

  public read(data: UserModel): Promise<any> {
    return this.service(data, '/messages/read');
  }

  private service(data: any, route: string): Promise<any> {
    let header = new HttpHeaders();
    header.append('Content-type', 'application/json');

    return this.HttpClient.post(`${this.apiUrl}${route}`, data, { headers: header })
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
