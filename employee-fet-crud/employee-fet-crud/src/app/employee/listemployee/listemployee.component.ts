import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource, MatDialogConfig, MatDialog, PageEvent } from '@angular/material';
import { EmployeeService } from 'src/app/shared/employee.service';
import { Employee } from 'src/app/employee';
import { AddemployeeComponent } from '../addemployee/addemployee.component';
import { EditemployeeComponent } from '../editemployee/editemployee.component';



@Component({
  selector: 'app-listemployee',
  templateUrl: './listemployee.component.html',
  styleUrls: ['./listemployee.component.css']
})
export class ListemployeeComponent implements OnInit {

  constructor(public employeeservice:EmployeeService,private dialog:MatDialog) { }
employees;
editEmployee;
loadComponent
pageSize=5;
pageLength=1;
count;
searchkey:string;
displayedColumns:string[]=['empId','name','email','gender','mobileNo','dateOfJoining','Actions'];
AddemployeeComponent:any;
@ViewChild(MatSort, {static: false}) sort: MatSort;
@ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

public pageLoad(pageEvent:PageEvent){
  this.pageLength=pageEvent.pageIndex+1;
  this.pageSize=pageEvent.pageSize;
  this.loadList(this.pageLength,this.pageSize)
 
}

loadList(pageLength:number,pageSize:number){
 
  this.employeeservice.GetEmployeeRecords(this.pageLength,this.pageSize).subscribe(res=>{
    this.employees=new MatTableDataSource(res);
    console.log(this.employees);
    if(this.sort){
      this.employees.sort=this.sort;
    }
    if(this.paginator){
      this.employees.paginator=this.paginator;
    }
  },err=>{console.log(err);})
}

  ngOnInit() {
    this.loadCount();
    this.loadList(this.pageLength,this.pageSize);
  }


  onAdd(){
    const dialogconfig=new MatDialogConfig();
    dialogconfig.disableClose=true;
    dialogconfig.autoFocus=true;
    dialogconfig.width="800px";
    this.dialog.open(AddemployeeComponent,dialogconfig)
    .afterClosed().subscribe(res=>{this.loadList(this.pageLength,this.pageSize);
      this.employeeservice.initializeForm();});
  }

  onEdit(employee)
  {
  //this.loadComponent=true;
   console.log(employee.empId);
    this.employeeservice.GetEmployeeById(employee.empId).subscribe(res=>{employee=res;},err=>{console.log(err);});
 // this.populateForm(employee);
  const dialogconfig=new MatDialogConfig();
  dialogconfig.disableClose=true;
  dialogconfig.autoFocus=true;
  dialogconfig.width="800px";
  dialogconfig.data={empId:employee.empId}
  this.dialog.open(EditemployeeComponent,dialogconfig)
  .afterClosed().subscribe(res=>{this.loadCount();this.getPageSizeOptions();this.loadList(this.pageLength,this.pageSize);
    this.employeeservice.initializeForm();});
  }

  populateForm(employee){
    this.employeeservice.employeeform.setValue(employee);
  }

  loadCount(){
    this.employeeservice.GetEmployeeCount().subscribe(res=>{this.count=res;},err=>{console.log(err);});
  }

  getPageSizeOptions():number[]{
      return [5,10,15,this.count];
  }

  onDelete(empId,name){
    if (confirm("Do you want to delete Employee with Name: " + name)) {
      this.employeeservice.DeleteEmployeeRecord(empId).subscribe(res=>{alert("employee deleted successfully");
    this.loadList(this.pageLength,this.pageSize)},
      err=>{console.log(err);});
       // alert("employee deleted successfully");
    }
}

clearSearch(){
  this.searchkey="";
}

applyFilter(){
    //this.employees.filter=this.searchkey.trim().toLowerCase();
    if(this.searchkey)
    {
      this.employeeservice.GetEmployeeByName(this.searchkey.trim().toLowerCase()).subscribe(
        res=>{this.employees=res;},err=>{console.log(err);});
    }
    else{
        this.loadList(this.pageLength,this.pageSize);
    }
    
   // this.clearSearch();
}

}