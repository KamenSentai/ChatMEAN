import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../models/user.model';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: [],
  providers: [AuthService]
})

export class LoginPageComponent implements OnInit {
  public formData: UserModel;

  constructor(private router: Router, private AuthService: AuthService) {
    this.formData = {
      firstname: undefined,
      lastname: undefined,
      email: undefined,
      password: undefined
    }
  }

  ngOnInit() { }

  public preview(event: Event) {
    event.preventDefault();
    this.formSubmit(this.formData);
  }

  public formSubmit(data: UserModel): void {
    const formData: UserModel = this.formData;

    this.AuthService.login(this.formData)
    .then(apiResponse => {
      console.log(apiResponse.success);

      if (apiResponse.success) this.router.navigate(['/']);
      else console.error(apiResponse);
    })
    .catch(apiResponse => console.error(apiResponse));
  }
}
