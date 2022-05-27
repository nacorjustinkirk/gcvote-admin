import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { department, type } from './../../services/offerings.service';
import {  } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-position',
  templateUrl: './add-position.component.html',
  styleUrls: ['./add-position.component.scss']
})
export class AddPositionComponent implements OnInit {

  positionForm: FormGroup;
  department = department;
  type = type;
  clickedButton: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<AddPositionComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public fetch: any,
    private data: DataService,
    private snackBar: MatSnackBar
  ) {
    this.positionForm = this.formBuilder.group({
      positionname: new FormControl('', [Validators.required]),
      positioncode: new FormControl('', [Validators.required]),
      department: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
  }

  add() { 
    const data: Position = {
      envid_fld: this.fetch.envid,
      posname_fld: this.positionForm.value.positionname,
      poscode_fld: this.positionForm.value.positioncode,
      posdept_fld: this.positionForm.value.department,
      postype_fld: this.positionForm.value.type,
    }

    this.data.apiRequest('/addposition', data)
    .subscribe((res: any) => {
      if (res.status.remarks === 'success') {
        this.snackBar.open(res.status.message, '', {
          duration: 5000,
        });
        this.dialogRef.close();
      } else {
        this.snackBar.open(res.status.message, '', {
          duration: 5000,
        });
        this.dialogRef.close();
      }
    });
  }

  closeDialog(){
    this.dialogRef.close();
  }

}

interface Position {
  envid_fld: any,
  posname_fld: string,
  poscode_fld: string,
  postype_fld: string,
  posdept_fld: string
}
