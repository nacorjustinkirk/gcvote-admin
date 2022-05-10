import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEnvironmentComponent } from 'src/app/dialogs/add-environment/add-environment.component';
import { EnvironmentDetailsComponent } from 'src/app/dialogs/environment-details/environment-details.component';

@Component({
  selector: 'app-environments',
  templateUrl: './environments.component.html',
  styleUrls: ['./environments.component.scss']
})
export class EnvironmentsComponent {

  gridColumns = 5;

  constructor(
    public dialog: MatDialog,
  ) { }

  addEnvironment(){
    const dialogRef = this.dialog.open(AddEnvironmentComponent, {
      width: '600px',
    });
  }

  environmentDetails(){
    const dialogRef = this.dialog.open(EnvironmentDetailsComponent, {
      width: '600px',
    });
  }
}