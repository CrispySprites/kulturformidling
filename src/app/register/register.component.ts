import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { confirmPasswordValidator } from '../validators/confirm-password.validator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: FormGroup;
  errorMessage: string = "";

  hide = true;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private api: AuthService,
    private _snackBar: MatSnackBar
  ){
    this.user = this.formBuilder.group({
      name: new FormControl(''),
      email: new FormControl('' , Validators.email),
      phone: new FormControl(''),
      password: new FormControl('', Validators.minLength(8)),
      confirmPassword: new FormControl('', [confirmPasswordValidator, Validators.minLength(8)]),
    }, {
      validators: this.password.bind(this)
    });
  }

  password(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordNotMatch: true };
  }

  register(){
    console.log(this.user)
    if(this.user.valid){
      this.api.register(this.user.value).subscribe(r => {
        if(r.error !== undefined) {
          console.log(r.error)
          this.errorMessage = r.error;
        }
        else {
          this._snackBar.open("Ny brukar oppretta", "Okay", {
            duration: 3000
          });
          this.router.navigate(['../Logg-inn']);
        }
      })
    }
  }

}
