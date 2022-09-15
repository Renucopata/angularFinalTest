import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService} from "../../services/auth.service";


@Component({
  selector: 'app-sigin',
  templateUrl: './sigin.component.html',
  styleUrls: ['./sigin.component.scss'],
})
export class SiginComponent implements OnInit {
  formR!: FormGroup;
  requerido = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.formR = this.formBuilder.group({
      correo: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  ngOnInit(): void {}

  onCreate() {
    console.log(this.formR.value);
    if (this.formR.valid) {
      this.authService
        .createUser({
          email: this.formR.value.correo,
          password: this.formR.value.password,
          returnSecureToken: true,
        })
        .subscribe((res: any) => {
          console.log('CREATE USER: ', res);
          this.router.navigate(['/login']);
        });
    } else {
      this.requerido = true;
    }
  }
}
