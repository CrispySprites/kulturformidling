import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserRequestDto } from '../models/userDto';

@Component({
  selector: 'app-accept-role-request',
  templateUrl: './accept-role-request.component.html',
  styleUrls: ['./accept-role-request.component.css']
})
export class AcceptRoleRequestComponent {
  displayedColumns: string[] = ['userName', 'roleName', 'accept', 'deny'];

  newRoleRequests: UserRequestDto[] = []

  constructor(
    private api: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.api.getNewRoleRequests().subscribe(r => {
      this.newRoleRequests = r;
    })
  }

  accept(request: UserRequestDto) {
    this.api.acceptRoleRequest(request).subscribe(r => {
      this._snackBar.open("Rolle søknad akseptert", "Okay", {
        duration: 3000
      });
      this.api.getNewRoleRequests().subscribe(r => {
        this.newRoleRequests = r;
      })
    })
  }

  deny(request: UserRequestDto) {
    this.api.denyRoleRequest(request).subscribe(r => {
      this._snackBar.open("Rolle søknad avslått", "Okay", {
        duration: 3000
      });
      this.api.getNewRoleRequests().subscribe(r => {
        this.newRoleRequests = r;
      })
    })
  }

}
