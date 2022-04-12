import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  transaction:any
  acno:any

  constructor(private ds:DataService) { 

    this.acno=JSON.parse(localStorage.getItem('currentAcno')||'')

    // Asynchronous
    this.ds.getTransaction(this.acno)
    .subscribe((result:any)=>{
      if(result){
        this.transaction=result.transaction
      }
    },
    result=>{
      alert(result.message)
    }
    )
    
  }

  ngOnInit(): void {
  }

}
