import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { confirmPasswordValidator } from '../validators/confirm-password.validator';
import { Role } from '../models/role';

@Component({
  selector: 'app-role-request',
  templateUrl: './role-request.component.html',
  styleUrls: ['./role-request.component.css']
})
export class RoleRequestComponent {

  role: FormControl;
  roles: Role[] = []

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private api: AuthService,
    private _snackBar: MatSnackBar
  ){
    this.role = this.formBuilder.control(0)
  }

  ngOnInit(): void {
    this.api.getRoles().subscribe(r => {
      this.roles = r;
    })
  }

  requestRole() {
    this.api.requestNewRole(Number(this.role.value)).subscribe(r => {
      this._snackBar.open("Rolle søknaden din er sent til vurdering", "Okay", {
        duration: 3000
      });
      this.role.reset();
    })
  }

}
