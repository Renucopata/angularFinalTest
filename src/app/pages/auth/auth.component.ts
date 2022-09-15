import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  title = 'test';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    /*if(this.authService.verifyLogged()){
      this.router.navigate(['home'])
    }*/
  }

  onLogin(form: any) {
    console.log(form.value);

    if (form.valid) {
      this.authService
        .login({
          email: form.value.name,
          password: form.value.pass,
          returnSecureToken: true,
        })
        .subscribe((res) => {
          console.log('RESPONSE: ', res);
          this.router.navigate(['home']);
        });
    }
  }
}
