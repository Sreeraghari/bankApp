import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, of } from 'rxjs';

const options = {
  headers: new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  currentAcno: any
  currentUname: any

  database: any = {
    1000: { acno: 1000, uname: "Neer", password: 1000, balance: 5000, transaction: [] },
    1001: { acno: 1001, uname: "Vyom", password: 1001, balance: 5000, transaction: [] },
    1002: { acno: 1002, uname: "Laisha", password: 1002, balance: 5000, transaction: [] }
  }


  constructor(private http: HttpClient) {
    // this.getData()


  }
  // to store data in localstorage
  setData() {
    localStorage.setItem("database", JSON.stringify(this.database))
    if (this.currentAcno) {
      localStorage.setItem("currentAcno", JSON.stringify(this.currentAcno))
    }
    if (this.currentUname) {
      localStorage.setItem("currentUname", JSON.stringify(this.currentUname))
    }

  }
  // to get data from local storage
  getData() {
    if (localStorage.getItem("database")) {
      this.database = JSON.parse(localStorage.getItem("database") || '')
    }
    if (localStorage.getItem("currentAcno")) {
      this.currentAcno = JSON.parse(localStorage.getItem("currentAcno") || '')
    }
    if (localStorage.getItem("currentUname")) {
      this.currentUname = JSON.parse(localStorage.getItem("currentUname") || '')
    }

  }




  // register

  register(acno: any, password: any, uname: any) {

    const data = {
      acno, password, uname
    }
    return this.http.post('http://localhost:3000/register', data)

    // let database = this.database

    // if (acno in database) {
    //   return false
    // }
    // else {
    //   database[acno] = {
    //     acno,
    //     uname,
    //     password,
    //     balance: 0,
    //     transaction:[]

    //   }
    //   this.setData()
    //   return true
    // }
  }


  // login

  login(acno: any, password: any) {

    const data = {
      acno, password
    }

    // login API
    return this.http.post('http://localhost:3000/login', data)

    // let database = this.database
    // if (acno in database) {

    //   if (password == database[acno]["password"]) {
    //     this.currentAcno=acno
    //     this.currentUname=database[acno]["uname"]
    //     this.setData()

    //     return true

    //   }
    //   else {
    //     alert("incorrect password")
    //     return false
    //   }


    // }
    // else {
    //   alert("user doesnot exist")
    //   return false
    // }

  }

  // /deposit
  deposit(acno: any, password: any, amt: any) {

    // rqst Body
    const data = {
      acno, password, amt
    }

    // deposit API
    return this.http.post('http://localhost:3000/deposit', data, this.getOptions())
    // var amount = parseInt(amt)
    // let database = this.database
    // if (acno in database) {

    //   if (password == database[acno]["password"]) {

    //     database[acno]["balance"] += amount
    //     database[acno]["transaction"].push({
    //       amount:amount,
    //       type:"CREDIT"
    //     })
    //     this.setData()
    //     return database[acno]["balance"]

    //   }
    //   else {
    //     alert("user does not exist")
    //     return false
    //   }


    // }
    // else {
    //   alert("user does not exist")
    //   return false
    // }
  }

  // to add token in request header
  getOptions() {
    // token fetch
    const token = JSON.parse(localStorage.getItem('token') || '')
    // to create request header
    let headers = new HttpHeaders()
    if (token) {
      headers = headers.append('x-access-token', token)
      options.headers = headers
    }
    return options
  }

  // withdraw

  withdraw(acno: any, password: any, amt: any) {
    // rqst Body
    const data = {
      acno, password, amt
    }

    // withdraw API
    return this.http.post('http://localhost:3000/withdraw', data, this.getOptions())

    // var amount = parseInt(amt)
    // let database = this.database
    // if (acno in database) {

    //   if (password == database[acno]["password"]) {

    //     if (database[acno]["balance"] > amount) {
    //       database[acno]["balance"] -= amount

    //       database[acno]["transaction"].push({
    //         amount:amount,
    //         type:"DEBIT"
    //       })  
    //       this.setData()
    //       return database[acno]["balance"]


    //     } else {
    //       alert("insufficient balance")
    //       return false

    //     }


    //   }
    //   else {
    //     alert("incorrect password")
    //     return false
    //   }


    // }
    // else {
    //   alert("user does not exist")
    //   return false
    // }
  }

  // transaction
  getTransaction(acno: any) {

    // rqst Body
    const data = {
      acno
    }

    // Transaction ApI
    return this.http.post('http://localhost:3000/transaction', data, this.getOptions())

    // return this.database[acno]["transaction"]
  }

  // delete
  delete(acno: any) {
    // delete Acc
    return this.http.delete('http://localhost:3000/deleteAcc/' + acno, this.getOptions())
  }

  getMyName(): Observable<string> {
    return of('sreerag')

  }
}




