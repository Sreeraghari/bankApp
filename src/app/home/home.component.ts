import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: any
  lDate: any
  accno = ""

  depositForm = this.fb.group({

    acno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    pswd: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
    amount: ['', [Validators.required, Validators.pattern('[0-9]*')]],
  })



  acno1 = ""
  pswd1 = ""
  amount1 = ""
  withdrawForm = this.fb.group({
    acno1: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    pswd1: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
    amount1: ['', [Validators.required, Validators.pattern('[0-9]*')]]

  })

  myname = ""

  constructor(private ds: DataService, private fb: FormBuilder, private router: Router) {

    if (localStorage.getItem('currentUname')) {
      this.user = JSON.parse(localStorage.getItem('currentUname') || '')
    }
    this.lDate = new Date()
  }

  ngOnInit(): void {
    if (!localStorage.getItem("currentAcno") && !localStorage.getItem("currentUname")) {
      alert("please log in")
      this.router.navigateByUrl("")
    }
    this.getName()
  }
  getName() {
    this.ds.getMyName().subscribe((res) => {
      this.myname = res;
    })
  }

  deposit() {
    // alert("deposit clicked")
    var acno = this.depositForm.value.acno
    var pswd = this.depositForm.value.pswd
    var amount = this.depositForm.value.amount

    if (this.depositForm.valid) {
      // calling asynchronous deposit function
      this.ds.deposit(acno, pswd, amount)
        .subscribe((result: any) => {
          if (result) {
            alert(result.message)
          }

        },
          (result) => {
            alert(result.error.message)
          })


    }
    else {
      alert("invalid form")
    }
  }

  withdraw() {
    // alert("withdraw clicked")
    var acno1 = this.withdrawForm.value.acno1
    var pswd1 = this.withdrawForm.value.pswd1
    var amount1 = this.withdrawForm.value.amount1

    if (this.depositForm.valid) {
    this.ds.withdraw(acno1, pswd1, amount1)

      .subscribe((result: any) => {
        if (result) {
          alert(result.message)
        }

      },
        (result) => {
          alert(result.error.message)
        })

    }
    else {
      alert("invalid form")
    }





  }
  logOut() {
    localStorage.removeItem("currentAcno")
    localStorage.removeItem("currentUname")
    this.router.navigateByUrl("")


  }
  deleteMyAccount() {
    this.accno = JSON.parse(localStorage.getItem("currentAcno") || '')

  }
  cancel() {
    this.accno = ""
  }
  delete(event: any) {
    // asynchronous
    this.ds.delete(event)
    .subscribe((result:any)=>{
      if(result){
        alert(result.message)
        localStorage.removeItem("currentAcno")
        localStorage.removeItem("currentUname")
        localStorage.removeItem("token")

        this.router.navigateByUrl("")
    
      }
    },
    (result)=>{
      alert(result.delete.message)
    }
    )
  }
}
