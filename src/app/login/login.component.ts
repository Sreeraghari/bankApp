import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  aim = "perfect banking partner"
  accno = "account number please"
  acno = ""
  pswd = ""

  loginForm = this.fb.group({

    acno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    pswd: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]


  })


  database: any = {
    1000: { acno: 1000, uname: "Neer", password: 1000, balance: 5000 },
    1001: { acno: 1001, uname: "Vyom", password: 1001, balance: 5000 },
    1002: { acno: 1002, uname: "Laisha", password: 1002, balance: 5000 }
  }
  constructor(private router: Router, private ds: DataService, private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  // acno change
  acnoChange(event: any) {
    this.acno = event.target.value
    console.log(this.acno)

  }
  //  pswd change
  pswdChange(event: any) {
    this.pswd = event.target.value
    console.log(this.pswd);


  }

  // login (template)

  //   login(a:any,p:any){
  //     var acno=a.value
  //     var pswd=p.value
  //     let database=this.database
  //     if(acno in database){

  //       if(pswd==database[acno]["password"]){
  //         alert("login success")

  //       }
  //       else
  //       {
  //        alert("incorrect password")
  //       }


  //     }
  //     else
  //     {
  //       alert("user doesnot exist")
  //     }

  //   }

  // }



  login() {
    var acno = this.loginForm.value.acno
    var pswd = this.loginForm.value.pswd
    let database = this.ds.database


    if (this.loginForm.valid) {

      // Asynchronous call -Login
      this.ds.login(acno, pswd)
        .subscribe((result: any) => {

          if (result) {

            localStorage.setItem('currentAcno', JSON.stringify(result.currentAcno))
            localStorage.setItem('currentUname', JSON.stringify(result.currentUname))
            localStorage.setItem('token', JSON.stringify(result.token))
            alert(result.message)
            this.router.navigateByUrl("home")

          }
        },
          (result) => {
            alert(result.error.message)
          }


        )
    }
    else {
      alert("invalid form")
    }


  }
}
