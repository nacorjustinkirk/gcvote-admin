import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-position',
  templateUrl: './add-position.component.html',
  styleUrls: ['./add-position.component.scss']
})
export class AddPositionComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<AddPositionComponent>,
  ) { }

  ngOnInit(): void {
  }

  addPosition() { 
  }

  closeDialog(){
    this.dialogRef.close();
  }

}
