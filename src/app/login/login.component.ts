import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
 
  loginForm: FormGroup;
  message: any;
  hide = true
  checked: boolean = false;

  constructor(
    private data: DataService, 
    private session: SessionService, 
    private route: Router, 
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
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
          this.route.navigate(['main/news'])
          .then(() => {
            this.snackBar.open(res.status.message, '', {
              duration: 5000,
            });
          });
        } else {
          // this.message = res.status.message;
          this.snackBar.open(res.status.message, '', {
            duration: 3000,
          });
          this.checked = false;
        }
      }
    )   
  }
}