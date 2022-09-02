import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { department } from '../data/offerings';

@Component({
  selector: 'app-votes',
  templateUrl: './votes.component.html',
  styleUrls: ['./votes.component.scss']
})
export class VotesComponent implements OnInit {

  constructor(private data: DataService, private route: ActivatedRoute) { }

  envData: any = [];
  positionData: any = [];
  candidateData: any = [];
  studentData: any = [];
  votes: any = []
  voteData: any = new Array();

  department = department;
  id = this.route.snapshot.paramMap.get('id');

  ngOnInit(): void {
    this.data.apiRequest('/getenv', { "envid_fld": this.id })
    .subscribe((res: any) => {
        if (res.payload.length > 0) {
          this.envData = res.payload[0];
        }
    });
    this.data.apiRequest('/getposition', { "envid_fld": this.id })
      .subscribe((res: any) => {
        if (res.status.remarks == 'success') {
          this.positionData = res.payload;
        } 
      });
    this.data.apiRequest('/getcandidate', { "envid_fld": this.id })
      .subscribe((res: any) => {
        if (res.status.remarks == 'success') {
          this.candidateData = res.payload;
        } 
    });
    this.data.apiRequest('/getstudent', { "studno_fld": null })
      .subscribe((res: any) => {
        if (res.status.remarks == 'success') {
          this.studentData = res.payload;
        }
    });
    
      this.data.apiRequest('/getvotes', { "envid_fld": this.id })
      .subscribe((res: any) => {
        if (res.status.remarks == 'success') {
            this.votes = res.payload;

            for (let i = 0; i < this.votes.length; i++) {
              var data = atob(res.payload[i].votedata_fld);
              var obj = JSON.parse(data);
              this.voteData.push(obj);
            }
          }
      });
  }

  getDepartmentName(code: string) {
    return this.department.find(x => x.depCode === code)?.depName;
  }

  toLocaleDate() {
    return new Date().toDateString().split(' ').slice(1).join(' '); 
  }

  toLocaleTime() {
    return new Date().toLocaleTimeString();
  }

  // countNumberOfVotes(candidate: any) {
  //   var count = 0;
  //   for (let i = 0; i < this.voteData.length; i++) {
  //     console.log(this.voteData[i][i]['candidate']);
  //   }
  //   return count;
  // }

  countNumberOfVotes(candidate: any) {
    var count = 0;
    for (let i = 0; i < this.voteData.length; i++) {
      for (let j = 0; j < this.voteData[i].length; j++) {
        if (this.voteData[i][j]['candidate'] == candidate) {
          count++;
        }
      }
    }
    return count;
  }


  // sortCandidateByNumberOfVotes() {
  //   this.candidateData.sort((a: any, b: any) => {
  //     return this.countNumberOfVotes(b.candidatename_fld) - this.countNumberOfVotes(a.candidatename_fld);
  //   });
  // }


  calculateElectionReturns(data: any) {
    let getStudentSize = data;
    let getVoteSize = this.votes.length;

    return (getVoteSize / getStudentSize) * 100;
  }

  countStudentsPerDepartment() {
    let count = 0;
    for (let i = 0; i < this.studentData.length; i++) {
      if (this.studentData[i].studdept_fld == this.envData.envdept_fld) {
        count++;
      }
    }
    return count;
  }

}
