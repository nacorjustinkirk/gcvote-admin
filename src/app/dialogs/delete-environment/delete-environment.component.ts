import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from 'src/app/services/data.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-delete-environment',
  templateUrl: './delete-environment.component.html',
  styleUrls: ['./delete-environment.component.scss']
})
export class DeleteEnvironmentComponent implements OnInit {

  envForm: FormGroup
  clickedButton: boolean = false;

  constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar, private dialog: MatDialog, private data: DataService, @Inject(MAT_DIALOG_DATA) public fetch: any, private location:Location) {
    this.envForm = this.formBuilder.group({
      code: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
  }

  delete() {
    if(this.fetch != this.envForm.value.code) {
      this.snackBar.open('Invalid Code', '', {
        duration: 2000,
      });
    } else {
    this.data.apiRequest('/deleteenv', { 
        stud_no: sessionStorage.getItem('username'),
        signature: sessionStorage.getItem('raw'),
        payload: {
          "envid_fld": this.fetch 
        }
      })
      .subscribe((res: any) => {
        if (res.status.remarks === 'success') {
          this.data.apiRequest('/deleteimg', { 
            stud_no: sessionStorage.getItem('username'),
            signature: sessionStorage.getItem('raw'),
            payload: {
              "id": this.fetch
            }
          })
          .subscribe((res: any) => {
            // console.log(res);
          });
          this.dialog.closeAll();
          this.snackBar.open(res.status.message, '', {
            duration: 3000,
          })
          setTimeout(() => {  
            // window.close();
            this.location.back()
          }, 3000);
        } else {
          this.snackBar.open(res.status.message, '', {
            duration: 5000,
          });
          this.dialog.closeAll();
      }});
    }
  }

}
