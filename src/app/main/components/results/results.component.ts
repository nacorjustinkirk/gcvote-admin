import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent {

  gridColumns = 5;

  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }
}
