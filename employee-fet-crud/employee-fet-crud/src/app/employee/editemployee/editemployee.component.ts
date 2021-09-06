import { Component, OnInit, Inject, Optional, Output,EventEmitter } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ListemployeeComponent } from '../listemployee/listemployee.component';


@Component({
  selector: 'app-editemployee',
  templateUrl: './editemployee.component.html',
  styleUrls: ['./editemployee.component.css']
})
export class EditemployeeComponent implements OnInit {
  employeeId:number;
  constructor(private employeeService:EmployeeService,private dialogRef:MatDialogRef<ListemployeeComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data:any){
    this.employeeId=data.empId;
  } 

  employee;
 

  ngOnInit() {
    console.log(this.employeeId);
    this.getEmployee();
  }

  onClose(){
    this.employeeService.employeeform.reset();
    this.employeeService.initializeForm();
    this.dialogRef.close();
  }

  getEmployee(){
    this.employeeService.GetEmployeeById(this.employeeId)
    .subscribe(res=>{this.employee=res;this.employeeService.employeeform.setValue(this.employee);},err=>{console.log(err);})
  }

  onSubmit(employee){
    var emp=(this.employeeService.employeeform.value);
    var empID=parseInt(this.employeeService.employeeform.get('empId').value);
    emp.mobileNo=parseInt(this.employeeService.employeeform.get('mobileNo').value);
    var employees={empId:empID,name:emp.name,email:emp.email,gender:emp.gender,mobileNo:emp.mobileNo,dateOfJoining:emp.dateOfJoining}
    this.employeeService.EditEmployeeRecord(empID,employees).subscribe(res=>
      {console.log(res);
        this.dialogRef.close();
        alert("Employee Updated Successfully");
      },err=>{console.log(err);});
  }
  
  onClear(){
    this.employeeService.resetForms();
  }

}
