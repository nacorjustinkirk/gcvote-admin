import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from './../../services/data.service';
import { department } from './../../services/offerings.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-candidate',
  templateUrl: './add-candidate.component.html',
  styleUrls: ['./add-candidate.component.scss']
})
export class AddCandidateComponent implements OnInit {

  candidateForm: FormGroup
  clickedButton: boolean = false;
  department = department;

  studno: any = '';
  validCandidate: any = '';
  resultValue: any = '';
  ccsClassValidator: any = '';
  messageValidator: any = '';

  constructor(private formBuilder: FormBuilder, private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) private fetch: any, private data: DataService, private snackBar: MatSnackBar, private route: Router) {
    this.candidateForm = this.formBuilder.group({
      studno: new FormControl('', [Validators.required]),
      party: new FormControl('', [Validators.required]),
      department: new FormControl('', [Validators.required]),
      base64: new FormControl('', [Validators.required]),
    });
  }

  url = '';
  fileName: string = 'Insert 2x2 picture';
  files: any = '';

  ngOnInit(): void {
  }

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
                this.candidateForm.patchValue({
                  base64: event.target.result
                })
                this.url = this.candidateForm.value.base64;
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

  search(event: any) {
    if (event.target.value.length === 9) {
      setTimeout(() => {
        this.data.apiRequest('/getstudent', { studno_fld: event.target.value })
        .subscribe((res: any) => {
          if (res.status.remarks === 'success') {
          
            this.resultValue = `Candidate Name: ${res.payload[0].studfname_fld} ${res.payload[0].studlname_fld} `
            this.ccsClassValidator = 'valid-candidate';
          } else {
            this.resultValue = `Candidate not found!`
            this.ccsClassValidator = 'invalid-candidate';
          }
          this.validCandidate = res.status.remarks;
        })
      }, 2000)
    }
  }

  add() {
    const data: Candidate = {
      envid_fld: this.fetch.envid,
      posid_fld: this.fetch.pos,
      studno_fld: this.candidateForm.value.studno,
      partylist_fld: this.candidateForm.value.party,
      candidatedept_fld: this.candidateForm.value.department,
    }

    this.data.apiRequest('/addcandidate', data)
    .subscribe((res: any) => {
      if (res.status.remarks === 'success') {
        this.data.apiRequest('/uploadimg', {
          'id': this.candidateForm.value.studno,
          'img': this.candidateForm.value.base64,
        })
        .subscribe((res: any) => {
          // console.log(res);
        });
        this.snackBar.open(res.status.message, '', {
          duration: 5000,
        });
        setTimeout(() => {
          this.route.navigate(['/candidates', this.fetch.envid])
          .then(() => {
            window.location.reload();
          });
        }, 2000);
        this.dialog.closeAll();
      } else {
        this.snackBar.open(res.status.message, '', {
          duration: 5000,
        });
        this.dialog.closeAll();
      }
    });
  }
}

interface Candidate {
  envid_fld: any;
  posid_fld: any;
  studno_fld: number;
  partylist_fld: string;
  candidatedept_fld: string
}
