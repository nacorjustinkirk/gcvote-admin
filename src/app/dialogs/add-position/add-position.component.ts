import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { department, type } from './../../services/offerings.service';
import { DataService } from 'src/app/services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Route, Router } from '@angular/router';

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
    private snackBar: MatSnackBar,
    private route: Router
  ) {
    this.positionForm = this.formBuilder.group({
      positionname: new FormControl('', [Validators.required]),
      positioncode: new FormControl('', [Validators.required]),
      department: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      numVote: new FormControl('', [Validators.required]),
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
      numOfVotes_fld: this.positionForm.value.numVote,
      postype_fld: this.positionForm.value.type,
    }

    this.data.apiRequest('/addposition', data)
    .subscribe((res: any) => {
      if (res.status.remarks === 'success') {
        this.snackBar.open(res.status.message, '', {
          duration: 3000,
        });
        this.dialogRef.close();
        setTimeout(() => {
          this.route.navigate(['/candidates', this.fetch.envid])
          .then(() => {
            window.location.reload();
          });
        }, 2000);
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
  numOfVotes_fld: number,
  posdept_fld: string
}
