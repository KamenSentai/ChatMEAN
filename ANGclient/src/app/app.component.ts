import { Component } from '@angular/core';
import { UserModel } from './models/user.model';
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
  styleUrls: ['./app.component.scss'],
  providers: [AuthService]
})

export class AppComponent {
  public title: String;
  public formData: UserModel;

  constructor(private AuthService: AuthService) {
    this.title = 'Hello Angular';
    this.formData = {
      firstname: undefined,
      lastname: undefined,
      email: undefined,
      password: undefined
    }
  }

  public formSubmit(data: UserModel): void {
    this.AuthService.register(this.formData)
    .then(apiRespnse => console.log(apiRespnse))
    .catch(apiRespnse => console.error(apiRespnse));
  }
}
