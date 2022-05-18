import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-candidate',
  templateUrl: './add-candidate.component.html',
  styleUrls: ['./add-candidate.component.scss']
})
export class AddCandidateComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<AddCandidateComponent>,
  ) { }

  ngOnInit(): void {
  }

  addCandidate() {
    
  }

  closeDialog(){
    this.dialogRef.close();
  }
}
