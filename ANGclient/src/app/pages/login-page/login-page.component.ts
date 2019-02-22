import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from '../../models/user.model';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: [],
  providers: [AuthService]
})

export class LoginPageComponent implements OnInit {
  public formData: UserModel;
  public submitFailure: Boolean = false;

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

    // Log in
    this.AuthService.login(formData)
    .then(apiResponse => {
      // Redirect
      if (apiResponse.success) this.router.navigate(['/dashboard']);
      // No account match
      else this.submitFailure = true;
    })
    .catch(apiResponse => console.error(apiResponse));
  }
}
