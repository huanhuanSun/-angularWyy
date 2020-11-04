import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SongSheet } from 'src/app/services/data-types/commonTypes';

@Component({
  selector: 'app-single-sheet',
  templateUrl: './single-sheet.component.html',
  styleUrls: ['./single-sheet.component.less']
})
export class SingleSheetComponent implements OnInit {

  //输入属性
  @Input() sheet:SongSheet;
  @Output() onPlay = new EventEmitter<number>()
  constructor() { }

  ngOnInit() {
  }

  playSong(id:number){
    //子组件点击事件传给父组件数据
    this.onPlay.emit(id)
  }

}
