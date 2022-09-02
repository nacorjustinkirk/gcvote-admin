import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { AddCandidateComponent } from 'src/app/dialogs/add-candidate/add-candidate.component';
import { AddPositionComponent } from 'src/app/dialogs/add-position/add-position.component';
import { DeleteEnvironmentComponent } from 'src/app/dialogs/delete-environment/delete-environment.component';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss']
})
export class CandidatesComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private data: DataService,
    public snackBar: MatSnackBar
  ) { }

  id = this.route.snapshot.paramMap.get('id');
  positionData: any = [];
  candidateData: any = [];
  isChecked: boolean = false;
  message = '';

  ngOnInit(): void {
    // setInterval(() => {
      this.data.apiRequest('/getposition', { "envid_fld": this.id })
      .subscribe((res: any) => {
        if (res.status.remarks === 'success') {
          this.positionData = res.payload;
        } 
      });
      this.data.apiRequest('/getcandidate', { "envid_fld": this.id })
      .subscribe((res: any) => {
        if (res.status.remarks === 'success') {
          this.candidateData = res.payload;
        } 
      });
    // }, 500)
  }

  updateVisibility() {
    this.data.apiRequest('/updatestatus', { "view_fld": this.isChecked, "envid_fld": this.id })
    .subscribe((res: any) => {
      if (res.status.remarks === 'success') {
        this.snackBar.open(res.status.message, '', {
          duration: 5000,
        });
      } else {
        this.snackBar.open(res.status.message, '', {
          duration: 5000,
        });
      }
    });
  }

  addCandidate(id: any, posid: any) {
    this.dialog.open(AddCandidateComponent, {
      width: '600px',
      data: {
        envid: id,
        pos: posid
      }
    });
  }

  addPosition (id: any) {
    const dialogRef = this.dialog.open(AddPositionComponent, {
      width: '800px',
      data: {
        envid: id
      }
    });

    dialogRef.afterClosed().subscribe((data)=>{
      if(data?.data){
        this.positionData.push(data?.data);
      }
    })
  }

  deleteEnvironment() {
    this.dialog.open(DeleteEnvironmentComponent, {
      width: '600px',
      data: this.id,
    })
  }

  deleteCandidate(id: any, studno: any, index: any) {
    this.data.apiRequest('/deletecandidate', { "candidateid_fld": id })
    .subscribe((res: any) => {
      if (res.status.remarks === 'success') {
        this.data.apiRequest('/deleteimg', { "id": studno })
          .subscribe((res: any) => {
            console.log(res);
          });
        this.candidateData.splice(index, 1);
        this.snackBar.open(res.status.message, '', {
          duration: 5000,
        });
        // this.dialog.closeAll();
        // setTimeout(() => {  
        //   this.router.navigate([`/candidates/${this.id}`])
        //   .then(() => {
        //     window.location.reload();
        //   });
        // }, 2000);
      } else {
        this.snackBar.open(res.status.message, '', {
          duration: 5000,
        });
        this.dialog.closeAll();
      }
    })
  }

  deletePosition(id: any, index: any) {
    this.data.apiRequest('/deleteposition', { "posid_fld": id })
    .subscribe((res: any) => {
      if (res.status.remarks === 'success') {
        this.snackBar.open(res.status.message, '', {
          duration: 5000,
        });

        this.positionData.splice(index, 1);
      } else {
        this.snackBar.open(res.status.message, '', {
          duration: 5000,
        });
        this.dialog.closeAll();
      }
    })
  }
}
