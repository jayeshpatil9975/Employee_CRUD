import { Component, OnInit } from '@angular/core';
import { EmployeeService} from '../../shared/employee.service'
import { MatDialogRef, MatRadioButton } from '@angular/material';
import { ListemployeeComponent } from '../listemployee/listemployee.component';

@Component({
  selector: 'app-addemployee',
  templateUrl: './addemployee.component.html',
  styleUrls: ['./addemployee.component.css']
})
export class AddemployeeComponent implements OnInit {

  constructor(private employeeService:EmployeeService,private dialogRef:MatDialogRef<ListemployeeComponent>) { }
  today = Date.now();
  maxDate=new Date(this.today);
  ngOnInit() {

  }

  onClose(){
    this.employeeService.employeeform.reset();
    this.employeeService.initializeForm();
    this.dialogRef.close();
  }

  onSubmit(){
    if(this.employeeService.employeeform.valid){
      if(!this.employeeService.employeeform.get('empId').value){
        var emp=(this.employeeService.employeeform.value);
        emp.mobileNo=parseInt(this.employeeService.employeeform.get('mobileNo').value);
        var employee={name:emp.name,email:emp.email,gender:emp.gender,mobileNo:emp.mobileNo,dateOfJoining:emp.dateOfJoining}
        this.employeeService.AddEmployeeRecord(employee).subscribe(res=>
          {console.log(res);
            this.dialogRef.close();
            alert("Employee Added Successfully");
          },err=>{console.log(err);});
      }
      else{
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
    
    }
    
  }

  onClear(){
    this.employeeService.resetForms();
  }

}
