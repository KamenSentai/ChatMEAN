import { Component } from '@angular/core';
import { UserModel } from './models/user.model';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  template: `
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styleUrls: ['./app.component.scss'],
  providers: [AuthService]
})

export class AppComponent {
  public formData: UserModel;

  constructor(private AuthService: AuthService) {
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
