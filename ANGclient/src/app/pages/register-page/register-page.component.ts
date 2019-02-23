import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  public submitFailure: Boolean = false;
  public passwordConfirmed: String;
  public passwordLength: Number;
  public messages: { [id: string]: string };
  public messagesError: { [id: string]: string };
  public messagesMissing: { [id: string]: string };
  public errors: { [id: string]: boolean };

  /**
   * @param router
   * @param AuthService
   */
  constructor(private router: Router, private AuthService: AuthService) {
    this.formData = {
      firstname: undefined,
      lastname: undefined,
      email: undefined,
      password: undefined
    }

    this.passwordConfirmed = undefined;
    this.passwordLength = 8;

    this.messages = {
      firstname: undefined,
      lastname: undefined,
      email: undefined,
      password: undefined,
      passwordConfirmed: undefined
    };

    this.messagesError = {
      firstname: "Le prénom est invalide.",
      lastname: "Le nom est invalide.",
      email: "L'email est invalide.",
      password: `Le mot de passe doit contenir au moins ${this.passwordLength} caractères.`,
      passwordConfirmed: "Les mots de passe ne correspondent pas."
    };

    this.messagesMissing = {
      firstname: "Le prénom est manquant.",
      lastname: "Le nom est manquant.",
      email: "L'email est manquant.",
      password: "Le mot de passe est manquant.",
      passwordConfirmed: "Le mot de passe doit être confirmé.",
    };

    this.errors = {
      firstname: false,
      lastname: false,
      email: false,
      password: false,
      passwordConfirmed: false
    };
  }

  ngOnInit() { }

  /**
   * @param string
   */
  private capitalizeFirstLetter(string: String) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  /**
   * @param event
   */
  public preview(event: Event) {
    event.preventDefault();
    this.formSubmit(this.formData);
  }

  /**
   * @param data
   */
  public formSubmit(data: UserModel): void {
    const formData: UserModel = data || this.formData;
    const nameRegex: RegExp = new RegExp(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð .'-]+$/u);
    const emailRegex: RegExp = new RegExp(/^([a-zA-Z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/);
    let error: Boolean = false;

    // Reinit errors
    for (let key in this.errors) this.errors[key] = false;

    // Check if missing
    for (let key in formData) {
      if (!formData[key]) {
        this.messages[key] = this.messagesMissing[key];
        this.errors[key] = true;
      }
    }

    // Check if missing
    if (!this.passwordConfirmed) {
      this.messages.passwordConfirmed = this.messagesMissing.passwordConfirmed;
      this.errors.passwordConfirmed = true;
    }

    // Check if error
    if (!this.errors.firstname && !nameRegex.test(formData.firstname)) {
      this.errors.firstname = true;
      this.messages.firstname = this.messagesError.firstname;
    }

    // Check if error
    if (!this.errors.lastname && !nameRegex.test(formData.lastname)) {
      this.errors.lastname = true;
      this.messages.lastname = this.messagesError.lastname;
    }

    // Check if error
    if (!this.errors.email && !emailRegex.test(formData.email)) {
      this.errors.email = true;
      this.messages.email = this.messagesError.email;
    }

    // Check if error
    if (!this.errors.password && formData.password.length < this.passwordLength) {
      this.errors.password = true;
      this.messages.password = this.messagesError.password;
    }

    // Check if error
    if (!this.errors.passwordConfirmed && formData.password !== this.passwordConfirmed) {
      this.errors.passwordConfirmed = true;
      this.messages.passwordConfirmed = this.messagesError.passwordConfirmed;
    }

    // Check if any error
    for (let key in this.errors) {
      if (this.errors[key]) {
        error = true;
        break;
      }
    }

    // Test register
    if (!error) {
      // Capitalize names
      formData.firstname = this.capitalizeFirstLetter(formData.firstname);
      formData.lastname = this.capitalizeFirstLetter(formData.lastname);

      this.AuthService.register(formData)
      .then(apiResponse => {
        // Redirect
        if (apiResponse.success) {
          this.AuthService.login(formData)
          .then(apiResponse => {
            // Redirect
            if (apiResponse.success) this.router.navigate(['/dashboard']);
            // No account match
            else this.submitFailure = true;
          })
          .catch(apiResponse => console.error(apiResponse));
        }
        // Log user already exists
        else this.submitFailure = true;
      })
      .catch(apiResponse => console.error(apiResponse));
    }
  }
}
