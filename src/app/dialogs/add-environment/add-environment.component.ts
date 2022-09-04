import { Router } from '@angular/router';
import { Component, Inject, OnInit } from '@angular/core';
import { department } from './../../services/offerings.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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

  // Image 
  url: string = '';
  fileName: string = 'Insert Organization Logo';
  files: any = '';

  constructor(public formBuilder: FormBuilder, private data: DataService, public dialog: MatDialog, public snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public fetch: any, private route: Router, public dialogRef: MatDialogRef<AddEnvironmentComponent>) {
    this.envForm = this.formBuilder.group({
      envname: new FormControl('', [Validators.required]),
      envdate: new FormControl('', [Validators.required]),
      envdept: new FormControl('', [Validators.required]),
      base64: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void { }

  getImage(data: any) {
    if (data.target.files.length > 0) {
      this.files = data.target.files[0];
      if (this.checkImageFileSize(this.files)) {
        if (this.checkImageFileType(this.files)) {
          var img = new Image();
          img.src = window.URL.createObjectURL(this.files);
          img.onload = () => {
            if (img.width === img.height) {
              var reader = new FileReader();
              reader.readAsDataURL(this.files);
              reader.onload = (event: any) => {
                this.envForm.patchValue({
                  base64: event.target.result
                })
                this.url = this.envForm.value.base64;
              }
              this.fileName = '';
            } else {
              this.fileName = 'Oops! Remember that your image must be 2x2';
              this.url = '';
            }
          }
        } else {
          this.fileName = 'Uploaded image must be jpeg or png';
          this.url = '';
        }
      } else {
        this.fileName = 'We only avail free hosting, so your image must be less than 2MB';
        this.url = '';
      }
    }
  }

  checkImageFileSize(file: File): boolean {
    if (file.size > 2000000) {
        return false;
    } else {
        return true;
    }
  }

  checkImageFileType(file: File): boolean {
    if (file.type === 'image/png' || file.type === 'image/jpeg') {
        return true;
    } else {
        return false;
    }
  }

  add() {
    const data: Environment = {
      envid_fld: this.generateEnvironmentCode(),
      adminid_fld: this.fetch.key,
      envname_fld: this.envForm.value.envname,
      envdate_fld: this.envForm.value.envdate,
      envdept_fld: this.envForm.value.envdept,
      date_created: new Date().toISOString(),
      view_fld: true,
    }

    this.data.apiRequest('/addenv', {
      stud_no: sessionStorage.getItem('username'),
      signature: sessionStorage.getItem('raw'),
      payload: data,
    })
    .subscribe((res: any) => {
      if (res.status.remarks === 'success') {
        this.data.apiRequest('/uploadimg', {
          stud_no: sessionStorage.getItem('username'),
          signature: sessionStorage.getItem('raw'),
          payload: {
            'id': data.envid_fld,
            'img': this.envForm.value.base64,
          }
        })
        .subscribe((res: any) => {
          // console.log(res);
        });
        this.dialogRef.close({ data: data });
        this.snackBar.open(res.status.message, '', {
          duration: 5000,
        });
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
  view_fld: boolean;
}