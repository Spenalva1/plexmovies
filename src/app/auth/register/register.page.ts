import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() { }

  async onRegister(email, password, passwordConfirm) {
    try {
      const user = await this.authService.register(email.value, password.value, passwordConfirm.value);
      if (user) {
        this.router.navigate(['verify-email']);
      }
    } catch (error) {
      console.log('Error->', error);
    }
  }

}
