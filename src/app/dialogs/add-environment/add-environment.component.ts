import { Router } from '@angular/router';
import { Component, Inject, OnInit } from '@angular/core';
import { department } from './../../services/offerings.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-environment',
  templateUrl: './add-environment.component.html',
  styleUrls: ['./add-environment.component.scss']
})
export class AddEnvironmentComponent implements OnInit {

  envForm: FormGroup
  department = department;
  clickedButton: boolean = false;

  constructor(public formBuilder: FormBuilder, private data: DataService, public dialog: MatDialog, public snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public fetch: any, private route: Router) {
    this.envForm = this.formBuilder.group({
      envname: new FormControl('', [Validators.required]),
      envdate: new FormControl('', [Validators.required]),
      envdept: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    console.log(this.generateEnvironmentCode());
  }

  add() {
    const data: Environment = {
      envid_fld: this.generateEnvironmentCode(),
      adminid_fld: this.fetch.key,
      envname_fld: this.envForm.value.envname,
      envdate_fld: this.envForm.value.envdate,
      envdept_fld: this.envForm.value.envdept,
      date_created: new Date().toISOString(),
      archived: 0,
    }

    this.data.apiRequest('/addenv', data)
    .subscribe((res: any) => {
      if (res.status.remarks === 'success') {
        this.snackBar.open(res.status.message, '', {
          duration: 5000,
        });
        this.dialog.closeAll();
        setTimeout(() => {  
          this.route.navigate([`main/environments/${this.fetch.key}`])
          .then(() => {
            window.location.reload();
          });
        }, 2000);
      } else {
        this.snackBar.open(res.status.message, '', {
          duration: 5000,
        });
        this.dialog.closeAll();
      }
    });
  }

  generateEnvironmentCode() {
    let letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let numbers = '0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    for (let i = 0; i < 6; i++) {
      code += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }
    return code;
  }

}

interface Environment {
  envid_fld: string;
  adminid_fld: number;
  envname_fld: string;
  envdate_fld: string;
  envdept_fld: string;
  date_created: string;
  archived: number;
}