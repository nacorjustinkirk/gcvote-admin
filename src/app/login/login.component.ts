import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
 
  gcvote: string = 'assets/gcvote.png';
  loginForm: FormGroup;
  message: any;

  constructor(private data: DataService, private session: SessionService, private route: Router, private formBuilder: FormBuilder) {
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
          this.session.encodeData(res.response.payload);
          this.session.encodeData(res.response.token);
          this.route.navigate(['main/students']);
        } else {
          this.message = res.status.message;
        }
      }
    )   
  }

}
