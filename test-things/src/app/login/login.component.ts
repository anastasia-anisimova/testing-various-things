import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "./auth.service";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup = this.createForm();

  constructor(private readonly fb: FormBuilder, private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  login(): void {
    this.authService.login(this.form.get('login').value, this.form.get('password').value)
      .pipe(
        tap(() => console.log('success auth')))
      .subscribe();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

}
