import { Component } from '@angular/core';

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
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  constructor() { }

}
