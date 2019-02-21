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
  public cookieData: CookieModel;

  constructor(private router: Router, private AuthService: AuthService) {
    this.cookieData = {
      name: undefined,
      value: undefined
    };
  }

  private getCookie(cname) {
    const name = cname + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1);
      if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
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
      if (apiResponse.success && this.router.url !== '/dashboard') this.router.navigate(['/dashboard']);
      else if (this.router.url === '/dashboard') this.router.navigate(['/']);
    })
    .catch(apiResponse => console.error(apiResponse));
  }
}
