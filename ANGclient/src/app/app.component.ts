import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieModel } from './models/cookie.model';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  template: `
    <header>
      <img src="assets/images/logo.svg" alt="logo" class="logo" />
    </header>
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  providers: [AuthService]
})

export class AppComponent {
  private cookieData: CookieModel;

  constructor(private router: Router, private AuthService: AuthService) {
    this.cookieData = {
      name: undefined,
      value: undefined
    };
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
        if (this.router.url !== '/dashboard') this.router.navigate(['/dashboard']);
      }
      else if (this.router.url === '/dashboard') this.router.navigate(['/']);
    })
    .catch(apiResponse => console.error(apiResponse));
  }
}
