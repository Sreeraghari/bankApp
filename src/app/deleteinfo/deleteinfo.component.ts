import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-deleteinfo',
  templateUrl: './deleteinfo.component.html',
  styleUrls: ['./deleteinfo.component.css']
})
export class DeleteinfoComponent implements OnInit {
  @Input() item: string | undefined
  @Output() onCancel = new EventEmitter()
  @Output() onDelete=new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }
  cancel() {
    this.onCancel.emit()
  }
  delete(){
    this.onDelete.emit(this.item)
  }
}
