import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Employee } from '../employee';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
url="https://localhost:44362/api/employees";
  constructor(private http:HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  GetEmployeeRecords(pageLength:number,pageSize:number):Observable<Employee[]>
  {
    return this.http.get<Employee[]>(this.url+"?pageLength="+pageLength+"&pageSize="+pageSize);
  }

  AddEmployeeRecord(employee)
  {
    return this.http.post(this.url, employee, this.httpOptions);
  }

  DeleteEmployeeRecord(empId:number):Observable<Employee>{
      return this.http.delete<Employee>(this.url+"/" + empId, this.httpOptions);
  }

  EditEmployeeRecord(empId,employee)
  {
    return this.http.put(this.url+"/"+empId,employee,this.httpOptions);
  }

  GetEmployeeCount()
  {
    return this.http.get(this.url+"/Count");
  }

  GetEmployeeById(empId:number)
  {
      return this.http.get(this.url+"/EmployeeById?empId="+empId);
  }

  GetEmployeeByName(empName:string)
  {
      return this.http.get(this.url+"/EmployeeByName?empName="+empName);
  }

  employeeform:FormGroup=new FormGroup({
    empId:new FormControl(null),
    name:new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z ]*')]),
    email:new FormControl('',[Validators.required,Validators.email]),
    gender:new FormControl('Male'),
    mobileNo:new FormControl('',[Validators.required,Validators.pattern('[0-9]{9}')]),
    dateOfJoining:new FormControl('',Validators.required),

  });

  initializeForm(){
this.employeeform.setValue({
  empId:null,
  name:'',
  email:'',
  gender:'Male',
  mobileNo:'',
  dateOfJoining:'',
});}

resetForms(){
  this.employeeform.patchValue({
  name:'',
  email:'',
  gender:'Male',
  mobileNo:'',
  dateOfJoining:'',
});
}


}

