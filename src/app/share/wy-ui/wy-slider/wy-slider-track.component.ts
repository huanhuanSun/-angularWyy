/**
 * 滑块组件
 * 如果是水平方向  则修改track:width   handle:left
 * 如果是垂直方向  则修改track:height   handle:bottom
 */
import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { WysliderStyle } from './wy-slider-type';

@Component({
  selector: 'app-wy-slider-track',
  template: `<div class="wy-slider-track" [class.buffer]="wyBuffer" [ngStyle]="myStyle"></div>`,
  //修改变更检测策略
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class WySliderTrackComponent implements OnInit,OnChanges {
  @Input() wyVertical = false;
  @Input() wyLength:number;

  @Input() wyBuffer = false;//缓冲条

  public myStyle:WysliderStyle = {};
  constructor() { }
  

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['wyLength']) {
      if (this.wyVertical) {
        this.myStyle.height = this.wyLength + '%';
        this.myStyle.left = null;
        this.myStyle.width = null;
      }
      else {
        this.myStyle.width = this.wyLength + '%';
        this.myStyle.bottom = null;
        this.myStyle.height = null;
      }
    }
  }

}
