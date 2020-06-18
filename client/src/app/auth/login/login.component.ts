import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { AuthService } from '../../shared/services/auth.service';
import { MaterialService } from '../../shared/classes/material.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })

    this.route.queryParams.subscribe((params: Params) => {
      if (params['registered']) {
        MaterialService.toast('Теперь вы можете зайти в систему используя свои данные');
      } else if (params['accessDenied']) {
        MaterialService.toast('Для начала авторизуйтесь в системе');
      } else if (params['sessionFailed']) {
        MaterialService.toast('Пожалуйста войдите в систему заново');
      } else if (params['accessAdminDenied']) {
        MaterialService.toast('У Вас нет прав доступа! Необходимо авторизоваться как Администратор');
      }
    })
  }

  onSubmit() {
    this.form.disable()

    this.auth.login(this.form.value).subscribe(
      () => this.router.navigate(['/products']),
      error => {
        MaterialService.toast(error.error.message)
        this.form.enable()
      }
    )
  }

}
