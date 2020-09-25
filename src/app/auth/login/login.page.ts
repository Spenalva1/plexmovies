import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() { }

  async onLogin(email, password) {
    try {
      const user = await this.authService.login(email.value, password.value);
      if (user) {
        email.value = ""
        password.value = ""
        this.redirectUser(this.authService.isEmailVerified(user));
      }
    } catch (error) {
      console.log('Error->', error);
    }
  }

  redirectUser(isVerified: boolean) {
    if (isVerified) {
      this.router.navigate(['movies']);
    } else {
      this.router.navigate(['verify-email']);
    }
  }
}
