import { HttpClient } from '@angular/common/http';
import { outputAst } from '@angular/compiler';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router, TitleStrategy } from '@angular/router';
import { ApiService } from 'src/app/Services/api.service';
import { employee } from '../employee.modal';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  @Input() employeeList: employee[]
  @Output() myOutput: EventEmitter<string>;


  constructor(private router: Router, private api: ApiService) {
    this.myOutput = new EventEmitter();
    this.employeeList = [];
  }

  ngOnInit(): void {
    // this.GetApiData();
  }
  deleteRow(employeeId: any) {
    var delBtn = confirm(' Do you want to delete ?');
    this.api.DeleteData(employeeId).subscribe(res => {
      this.GetApiData();
    })

  }
  displayDetails(data: any) {
    console.log(data, 'sssssss')
    this.router.navigate(['employee', 'employee-detail'], { queryParams: data });
  }

  EditData(employee:employee) {
    //  this.myOutput.emit(data);
    this.router.navigate(['employee/edit', employee.id]);
  }

  public GetApiData(): void {
    this.api.GetData().subscribe((employee: employee[]) => {
      console.log(employee);
      this.employeeList = employee;

    })
  }

}