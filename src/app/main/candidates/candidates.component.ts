import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CandidateDetailsComponent } from 'src/app/dialogs/candidate-details/candidate-details.component';

import { AddCandidateComponent } from 'src/app/dialogs/add-candidate/add-candidate.component';
import { EditPositionComponent } from 'src/app/dialogs/edit-position/edit-position.component';
import { AddPositionComponent } from 'src/app/dialogs/add-position/add-position.component';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss']
})
export class CandidatesComponent implements OnInit {

  gridColumns = 5;

  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  addCandidate() {
    const dialogRef = this.dialog.open(AddCandidateComponent, {
      width: '600px',
    });
  }

  addPosition () {
    const dialogRef = this.dialog.open(AddPositionComponent, {
      width: '600px',
    });
  }

  editPosition () {
    const dialogRef = this.dialog.open(EditPositionComponent, {
      width: '600px',
    });
  }

  candidateDetails(){
    const dialogRef = this.dialog.open(CandidateDetailsComponent, {
      width: '600px',
    });
  }

  
}
