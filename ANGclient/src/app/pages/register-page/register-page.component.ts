import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../models/user.model';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styles: [],
  providers: [AuthService]
})

export class RegisterPageComponent implements OnInit {
  public formData: UserModel;
  public passwordConfirmed: String;

  constructor(private AuthService: AuthService) {
    this.formData = {
      firstname: undefined,
      lastname: undefined,
      email: undefined,
      password: undefined
    }

    this.passwordConfirmed = undefined;
  }

  ngOnInit() { }

  private capitalizeFirstLetter(string: String) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  public preview(event: Event) {
    event.preventDefault();
    this.formSubmit(this.formData);
  }

  public formSubmit(data: UserModel): void {
    const formData: UserModel = this.formData;
    const nameRegex: RegExp = new RegExp(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð .'-]+$/u);
    const emailRegex: RegExp = new RegExp(/^([a-zA-Z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/);
    let error: Boolean = false;

    for (let key in formData) {
      if (!formData[key]) {
        console.log(`Data ${key} is missing`);
        error = true;
      }
    }

    if (!error) {
      if (!nameRegex.test(formData.firstname)) {
        console.log('First name invalid');
        error = true;
      }

      if (!nameRegex.test(formData.lastname)) {
        console.log('Last name invalid');
        error = true;
      }

      if (!emailRegex.test(formData.email)) {
        console.log('Mail invalid');
        error = true;
      }

      if (!this.passwordConfirmed) {
        console.log('Password must be confirmed');
        error = true;
      }

      if (formData.password.length < 8) {
        console.log('Password must contain at least 8 characters');
        error = true;
      }

      if (formData.password !== this.passwordConfirmed) {
        console.log('Passwords different');
        error = true;
      }

      if (!error) {
        formData.firstname = this.capitalizeFirstLetter(formData.firstname);
        formData.lastname = this.capitalizeFirstLetter(formData.lastname);

        console.log(formData);
        this.AuthService.register(this.formData)
        .then(apiRespnse => console.log(apiRespnse))
        .catch(apiRespnse => console.error(apiRespnse));
      }
    }
  }
}
