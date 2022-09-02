import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { AddEnvironmentComponent } from 'src/app/dialogs/add-environment/add-environment.component';
import { DataService } from 'src/app/services/data.service';
import { department } from './../../services/offerings.service';

@Component({
  selector: 'app-environments',
  templateUrl: './environments.component.html',
  styleUrls: ['./environments.component.scss']
})
export class EnvironmentsComponent implements OnInit {

  envData: any = [];
  department = department;
  key: any = this.route.snapshot.paramMap.get('id');

  constructor(
    public dialog: MatDialog,
    private data: DataService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.data.apiRequest('/getenvadmin', { "adminid_fld": this.key })
    .subscribe((res: any) => {
        this.envData = res.payload;
    });

    console.log(this.key)
  }

  getDepartmentName(code: string) {
    return this.department.find(x => x.depCode === code)?.depName;
  }

  addEnvironment(data: any){
    const dialogRef = this.dialog.open(AddEnvironmentComponent, {
      width: '700px',
      data: {
        key: data
      }
    });

    dialogRef.afterClosed().subscribe((data)=>{
      if(data?.data){
        this.envData.push(data?.data);
      }
    })
  }
  
  external(id: any) {
    this.router.navigate([`/candidates/${id}`])
  }
}