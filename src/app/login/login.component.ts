import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
 
  loginForm: FormGroup;
  message: any;
  hide = true

  constructor(
    private data: DataService, 
    private session: SessionService, 
    private route: Router, 
    public dialog: MatDialog,
    private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      admin_email: new FormControl('', [Validators.required,Validators.maxLength(50)]),
      admin_password: new FormControl('', [Validators.required,Validators.maxLength(50)]),
    })
  }

  ngOnInit(): void {
  }

  login() {
    this.data.apiRequest('/loginadmin', this.loginForm.value).subscribe(
      (res: any) => {
        if (res.status.remarks == 'success') {
          this.session.uploadToSession(res.payload);
          this.route.navigate(['main/dashboard'])
          .then(() => {
            window.location.reload();
          });
        } else {
          this.message = res.status.message;
        }
      }
    )   
  }
}