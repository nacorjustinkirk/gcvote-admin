import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { department } from '../data/offerings';

// types.d.ts

// @ts-ignore
import * as html2pdf from 'html2pdf.js'
// declare let html2pdf: any;

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
  votes: any = [];
  voteData: any = new Array();

  department = department;
  id = this.route.snapshot.paramMap.get('id');

  ngOnInit(): void {
    this.data.apiRequest('/getenv', { 
      stud_no: sessionStorage.getItem('username'),
      signature: sessionStorage.getItem('raw'),
      payload: {
        "envid_fld": this.id 
      }
    })
    .subscribe((res: any) => {
        if (res.payload.length > 0) {
          this.envData = res.payload[0];
        }
    });
    this.data.apiRequest('/getposition', { 
      stud_no: sessionStorage.getItem('username'),
      signature: sessionStorage.getItem('raw'),
      payload: {
        "envid_fld": this.id 
      }
    })
    .subscribe((res: any) => {
      if (res.status.remarks == 'success') {
        this.positionData = res.payload;
      } 
    });
    this.data.apiRequest('/getvotes', { 
      stud_no: sessionStorage.getItem('username'),
      signature: sessionStorage.getItem('raw'),
      payload: {
        "envid_fld": this.id 
      }
     })
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
    this.data.apiRequest('/getcandidate', { 
      stud_no: sessionStorage.getItem('username'),
      signature: sessionStorage.getItem('raw'),
      payload: {
        "envid_fld": this.id 
      }
     })
      .subscribe((res: any) => {
        if (res.status.remarks == 'success') {
          let temp: any = [];

          for (var i = 0; i < res.payload.length; i++) {
            var votes: Count = {
              studno_fld: res.payload[i].studno_fld,
              posid_fld: res.payload[i].posid_fld,
              candidateid_fld: res.payload[i].candidateid_fld,
              studfname_fld: res.payload[i].studfname_fld,
              studlname_fld: res.payload[i].studlname_fld,
              partylist_fld: res.payload[i].partylist_fld,
              numOfVotes: this.countNumberOfVotes(res.payload[i].candidateid_fld),
            }

            temp.push(votes);
          }

          temp.sort((a: any, b: any) => {
            return b.numOfVotes - a.numOfVotes;
          })

          temp.forEach((e: any) => {
            this.candidateData.push(e);
          });
        } 
    });
    this.data.apiRequest('/getstudent', { 
      stud_no: sessionStorage.getItem('username'),
      signature: sessionStorage.getItem('raw'),
      payload: {
        "studno_fld": null
      }
    })
    .subscribe((res: any) => {
      if (res.status.remarks == 'success') {
        this.studentData = res.payload;
      }
    });
  }

  getDepartmentName(code: string) {
    return this.department.find(x => x.depCode === code)?.depName;
  }

  toLocaleDate() {
    return new Date().toDateString().split(' ').slice(1).join(' '); 
  }

  showDate(date: any) {
    return new Date(date).toDateString().split(' ').slice(1).join(' '); 
  }

  toLocaleTime() {
    return new Date().toLocaleTimeString();
  }

  getPositionNameById(posid: any): string {
    return this.positionData.find((x: any) => x.posid_fld === posid)?.posname_fld;
  }

  countNumberOfVotes(candidate: any) {
    var count = 0;
    for (let i = 0; i < this.voteData.length; i++) {
      for (let j = 0; j < this.voteData[i].length; j++) {
        if (this.voteData[i][j]['candidateid_fld'] == candidate) {
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

    let total = (getVoteSize / getStudentSize) * 100;

    return total.toFixed(2);
  }

  countStudentsPerDepartment() {
    let count = 0;
    for (let i = 0; i < this.studentData.length; i++) {
      if (this.studentData[i].studdept_fld == this.envData.envdept_fld || this.envData.envdept_fld == 'ALL') {
        count++;
      }
    }
    return count;
  }
  
  onExport() {
    
    var opt = {
      margin: 0,
      filename: `GordonCollege-${this.envData.envname_fld}-Election-Return-${this.toLocaleDate()}-${this.toLocaleTime()}.pdf`,
      image: { type: 'jpeg', quality: 1.0 },
      html2canvas: { dpi: 75, scale: 2, letterRendering: true},
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    const element = document.getElementById('element-to-export');
    
    // New Promise-based usage:
    html2pdf()
      .from(element)
      .set(opt)
      .toPdf()
      .get('pdf').then(function (pdf: any) {
        var totalPages = pdf.internal.getNumberOfPages();

          for (let i = 1; i <= totalPages; i++) {
            pdf.setPage(i);
            pdf.setFontSize(8);
            pdf.text('Page ' + i + ' of ' + totalPages, pdf.internal.pageSize.getWidth()+10, 
            pdf.internal.pageSize.getHeight()+10, "right");
          } 
      }).save();

    
  }

}


interface Count {
  studno_fld: number;
  posid_fld: number;
  candidateid_fld: number;
  studfname_fld: string;
  studlname_fld: string;
  partylist_fld: string;
  numOfVotes: number;
}

