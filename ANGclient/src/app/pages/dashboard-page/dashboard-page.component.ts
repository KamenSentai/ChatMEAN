import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from '../../models/user.model';
import { CookieModel } from '../../models/cookie.model';
import { AuthService } from '../../services/auth/auth.service';
import { UsersService } from '../../services/users/users.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  providers: [AuthService, UsersService]
})

export class DashboardPageComponent implements OnInit {
  private cookieData: CookieModel;
  public userData: UserModel;
  public usersData: Array<UserModel>;
  public currentIndex: Number;

  constructor(
    private router: Router,
    private AuthService: AuthService,
    private UsersService: UsersService
  ) {
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
  }

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

  ngOnInit() {
    const cookieValue = this.getCookie('ChatMEAN');
    this.cookieData.name = 'ChatMEAN';
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
    .catch(apiResponse => console.error(apiResponse));

    // Fetch all users
    this.UsersService.fetch()
    .then(apiResponse => this.usersData = apiResponse.data)
    .then(() => {
      const user = this.usersData.find(user => user.email === this.userData.email);
      const indexUser = this.usersData.indexOf(user);
      this.usersData.splice(indexUser, 1);
    })
    .catch(apiResponse => console.error(apiResponse));
  }

  public selectUser(index: Number) {
    this.currentIndex = index;
  }
}
