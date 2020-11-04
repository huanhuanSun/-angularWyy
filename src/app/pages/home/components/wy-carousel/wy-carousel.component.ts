import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-wy-carousel',
  templateUrl: './wy-carousel.component.html',
  styleUrls: ['./wy-carousel.component.less'],
  //改变更检测 OnPush只会在 input输入属性发生变化时才会更新 
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class WyCarouselComponent implements OnInit {
  //此处{static:true} 表示 是fou为静态的，若放在ngIf 中，则设置为false  会自动计算时间
  @ViewChild('dot',{static:true}) dotRef:TemplateRef<any>;
  //dot初始化索引为0  用@Input装饰器 输入属性  需要传值
  @Input() activeIndex = 0

  //需要发射给父组件 所以 需要用@Output
  @Output() changeSlide = new EventEmitter<'pre'|'next'>()
  constructor() { }

  ngOnInit() {
  }

  onChangeSLide(type:'pre'|'next'){
    this.changeSlide.emit(type)
  }

}
