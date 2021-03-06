import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from '../../models/user.model';
import { CookieModel } from '../../models/cookie.model';
import { MessageModel } from '../../models/message.model';
import { AuthService } from '../../services/auth/auth.service';
import { UsersService } from '../../services/users/users.service';
import { MessagesService } from '../../services/messages/messages.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  providers: [AuthService, UsersService, MessagesService]
})

export class DashboardPageComponent implements OnInit {
  private cookieName: String
  private cookieData: CookieModel;
  public userData: UserModel;
  public usersData: Array<UserModel>;
  public currentIndex: number;
  private message: MessageModel;
  public messages: Array<MessageModel>;
  public messagesWithContact: Array<Array<MessageModel>>;
  public loaded: Boolean;

  /**
   * @param router
   * @param AuthService
   * @param UsersService
   * @param MessagesService
   */
  constructor(
    private router: Router,
    private AuthService: AuthService,
    private UsersService: UsersService,
    private MessagesService: MessagesService
  ) {
    this.cookieName = 'ChatMEAN';

    this.cookieData = {
      name: undefined,
      value: undefined
    };

    this.userData = {
      firstname: '',
      lastname: '',
      email: '',
      password: undefined
    };

    this.usersData = [{
      firstname: '',
      lastname: '',
      email: '',
      password: undefined
    }];

    this.currentIndex = 0;

    this.message = {
      from: this.userData.email,
      to: this.usersData[this.currentIndex].email,
      value: undefined,
      date: undefined
    };

    this.messages = [{
      from: this.userData.email,
      to: this.usersData[this.currentIndex].email,
      value: undefined,
      date: undefined
    }];

    this.messagesWithContact = [[{
      from: this.userData.email,
      to: this.usersData[this.currentIndex].email,
      value: undefined,
      date: undefined
    }]];

    this.loaded = false;
  }

  /**
   * @param cookieName
   */
  private getCookie(cookieName: String) {
    const name: string = cookieName + '=';
    const decodedCookie: string = decodeURIComponent(document.cookie);
    const cookies: Array<string> = decodedCookie.split(';');

    for (let cookie of cookies) {
      while (cookie.charAt(0) == ' ') cookie = cookie.substring(1);
      if (cookie.indexOf(name) == 0) return cookie.substring(name.length, cookie.length);
    }

    return '';
  }

  /**
   * @param name
   */
  private deleteCookie = (name: String): void => {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  };

  ngOnInit() {
    const cookieValue = this.getCookie(this.cookieName);
    this.cookieData.name = this.cookieName;
    this.cookieData.value = cookieValue;

    // Send cookie
    this.AuthService.cookie(this.cookieData)
    .then(apiResponse => {
      if (apiResponse.success) {
        // Get user data
        for (let key in this.userData) this.userData[key] = apiResponse.data[key];
      }
      else if (this.router.url === '/dashboard') this.router.navigate(['/']);
    })
    .then(() => { this.message.from = this.userData.email })
    .then(() => {
      // Fetch all messages
      this.MessagesService.read(this.userData)
      .then(apiResponse => this.messages = apiResponse.data)
      .catch(apiResponse => console.error(apiResponse));
    })
    .then(() => {
      // Fetch all users
      this.UsersService.fetch()
      .then(apiResponse => this.usersData = apiResponse.data)
      .then(() => {
        const user = this.usersData.find(user => user.email === this.userData.email);
        const indexUser = this.usersData.indexOf(user);
        this.usersData.splice(indexUser, 1);
      })
      .then(() => { this.message.to = this.usersData[this.currentIndex].email })
      .then(() => { this.loaded = true })
      .catch(apiResponse => console.error(apiResponse));
    })
    .catch(apiResponse => console.error(apiResponse));
  }

  /**
   * @param index
   */
  public selectUser(index: number): void {
    this.currentIndex = index;
    this.message.to = this.usersData[this.currentIndex].email;
  }

  /**
   * @param event
   * @param message
   */
  public sendMessage(event: Event, message: String) {
    event.preventDefault();

    this.message.value = message;
    this.message.date = new Date();

    this.MessagesService.create(this.message)
    .then(apiResponse => console.log(apiResponse))
    .catch(apiResponse => console.error(apiResponse));

    message = '';

    this.ngOnInit();
  }

  /**
   * @param index
   */
  public displayLastMessage(index: number) {
    let messagesWithContact: Array<MessageModel> = [];
    const contactEmail: String = this.usersData[index].email

    for (const message of this.messages) {
      if (message.from === contactEmail || message.to === contactEmail) messagesWithContact.push(message);
    }

    messagesWithContact.sort((a, b) => {
      const dateA: any = new Date(a.date);
      const dateB: any = new Date(b.date);
      return dateA - dateB;
    });

    const lastIndex: number = messagesWithContact.length - 1;
    let who: string = '';

    if (messagesWithContact[lastIndex]) {
      if (messagesWithContact[lastIndex].from === this.userData.email) who = 'Vous : ';
      else who = `${this.usersData[index].firstname} : `;

      this.messagesWithContact[index] = messagesWithContact;
    }

    return messagesWithContact[lastIndex] ? who + messagesWithContact[lastIndex].value : '';
  }

  /**
   * @return void
   */
  public logout(): void {
    this.deleteCookie(this.cookieName);
  }
}
