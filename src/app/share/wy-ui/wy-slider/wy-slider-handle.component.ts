/**
 * 小圆点组件
 * 如果是水平方向  则修改track:width   handle:left
 * 如果是垂直方向  则修改track:height   handle:bottom
 */
import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { WysliderStyle } from './wy-slider-type';

@Component({
  selector: 'app-wy-slider-handle',
  template: `<div class="wy-slider-handle" [ngStyle]="myStyle"></div>`,
  //修改变更检测策略
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class WySliderHandleComponent implements OnInit, OnChanges {

  @Input() wyVertical = false; // 水平 还是垂直  垂直的就是音量那种，水平的是播放块
  @Input() wyOffset:number; // 滑块的偏移量 即小圆点的偏移


  public myStyle:WysliderStyle = {};
  constructor() { }
  

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    //监听滑块变化  如果滑块有变化
    // console.log(changes)
    if (changes['wyOffset']) {
      this.myStyle[this.wyVertical?'bottom':'left'] = this.wyOffset + '%';
      
    }
  }

}
