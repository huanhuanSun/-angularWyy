import { DOCUMENT } from '@angular/common';
import { INFERRED_TYPE } from '@angular/compiler/src/output/output_ast';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, forwardRef, Inject, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { fromEvent, merge, Observable, Subscription } from 'rxjs';
import { distinctUntilChanged, filter, map, pluck, takeUntil, tap } from 'rxjs/internal/operators';
import { inArray } from 'src/app/utils/array';
import { getPercent, limitNumberInRange } from 'src/app/utils/number';
import { getElementOffset, sliderEvent } from './wy-slider-helper';
import { SliderEventObserverConfig, SliderValue } from './wy-slider-type';

@Component({
  selector: 'app-wy-slider',
  templateUrl: './wy-slider.component.html',
  styleUrls: ['./wy-slider.component.less'],
  encapsulation:ViewEncapsulation.None,//解决样式不起作用问题 .app-wy-slider-handle 和 .wy-slider-track
  //修改变更检测策略
  changeDetection:ChangeDetectionStrategy.OnPush,
  providers:[{
    provide:NG_VALUE_ACCESSOR,
    useExisting:forwardRef(()=>WySliderComponent),
    multi:true
  }]
})
//自定义表单接口  ControlValueAccessor
export class WySliderComponent implements OnInit,OnDestroy, ControlValueAccessor{
  @ViewChild('wySlider',{static:true})   private mySlider:ElementRef;
  @Input() wyVertical = false;//默认水平方向

  //输入属性，用户可以自己修改
  @Input() wyMin = 0;
  @Input() wyMax = 100;

  @Input() bufferOffset:SliderValue = 0;



  private slideDom:HTMLElement;
  private  dragStart$ :Observable<number>;
  private  dragMove$ :Observable<number>;
  private  dragEnd$ :Observable<Event>

  private  dragStart_$ :Subscription | null;
  private  dragMove_$ :Subscription | null;
  private  dragEnd_$ :Subscription | null;

  private isDragging = false;
  value:SliderValue = null;
  offset:SliderValue = null;


  constructor(
    private el:ElementRef,
    @Inject(DOCUMENT) private doc:Document,
    private cdr:ChangeDetectorRef
  ) { }

  //ControlValueAccessor 的三个方法
  writeValue(value: SliderValue): void {
    this.setValue(value,true);
  }

  registerOnChange(fn: (value:SliderValue)=>void): void {
    // throw new Error('Method not implemented.');
    this.OnValueChange = fn;
  }

  registerOnTouched(fn: ()=> void): void {
    this.OnTOuched = fn;
  }

  private OnValueChange(value:SliderValue):void {
    
  }

  private OnTOuched():void {
    
  }

  ngOnInit() {
    // console.log(this.el) // 这种拿到的是 HTMLDom 不用这种的
    // console.log(this.mySlider) 
    this.slideDom = this.mySlider.nativeElement;
    this.createDraggingObservables();
    this.subscribeDrag(['start'])
  }

  private createDraggingObservables(){
    const orientField = this.wyVertical?'pageY':'pageX';

    const mouse:SliderEventObserverConfig={
      start:'mousedown',
      move:'mousemove',
      end:'mouseup',
      filter:(e:MouseEvent)=> e instanceof MouseEvent,
      pluckKey:[orientField]
    };

    const touch:SliderEventObserverConfig={
      start:'touchstart',
      move:'touchmove',
      end:'touchend',
      filter:(e:TouchEvent)=> e instanceof TouchEvent,
      pluckKey:['touches'+orientField]
    };

    [mouse,touch].forEach(source => {
      const {start,move,end,filter:filterFunc,pluckKey} = source;
      source.startPlucked$  = fromEvent(this.slideDom,start)
      .pipe(
        filter(filterFunc),
        tap(sliderEvent),
        //获取鼠标按下的位置
        //pc端 event.pageX   event.pageY  移动端：event.touches[0].pageX  event.touches[0].pageY
        pluck(...pluckKey), //到这步 取到的是鼠标按下的位置
        map((position:number)=>this.findClosestValue(position))
      );
      source.end$ = fromEvent(this.doc,end);
      source.moveResolved$ = fromEvent(this.doc,move).pipe(
        filter(filterFunc),
        tap(sliderEvent),
        //获取鼠标按下的位置
        //pc端 event.pageX   event.pageY  移动端：event.touches[0].pageX  event.touches[0].pageY
        pluck(...pluckKey), //到这步 取到的是鼠标按下的位置
        distinctUntilChanged(),//移动过程中发射事件，如果只停留在一个地方，不发射事件,
        map((position:number)=>this.findClosestValue(position)), 
        takeUntil(source.end$)//直到end$事件执行之后

      )
    });
    //为了方便订阅 用merge统一管理
    this.dragStart$ = merge(mouse.startPlucked$,touch.startPlucked$)
    this.dragMove$ = merge(mouse.moveResolved$,touch.startPlucked$)
    this.dragEnd$ = merge(mouse.end$,touch.end$)


  }
//将鼠标按下的dom点转换为我们需要的百分比值
  private findClosestValue(position:number):number{
    //position/滑块组件总长 ===（val-min）/(max-min)
    //获取滑块总长
    const sliderLength = this.getSliderLength();
    //滑块左(上)端点位置 / 滑块总长
    const sliderStart = this.getSliderStart();
    //滑块当前位置
    const ratio = limitNumberInRange( (position - sliderStart) / sliderLength,0,1);
    const ratioTrue = this.wyVertical?(1-ratio) :ratio; 

    return ratioTrue * (this.wyMax-this.wyMin) + this.wyMin;
  }

  //订阅事件
  private subscribeDrag(event:string[]=['start','move','end']){
    if (inArray(event,'start') && this.dragStart$ && !this.dragStart_$) {
      this.dragStart_$ = this.dragStart$.subscribe(this.onDragStart.bind(this))
    }
    if (inArray(event,'move') && this.dragMove$ && !this.dragMove_$) {
      this.dragMove_$ = this.dragMove$.subscribe(this.onDragMove.bind(this))
    }
    if (inArray(event,'end') && this.dragEnd$ && !this.dragEnd_$) {//event.indexOf('end')!== -1
      this.dragEnd_$ = this.dragEnd$.subscribe(this.onDragEnd.bind(this))
    }
  }

  //unSubscribeDrag
  private unSubscribeDrag(event:string[]=['start','move','end']){
    if (inArray(event,'start')&& this.dragStart_$) {
      this.dragStart_$.unsubscribe();
      this.dragStart_$ = null;
    }
    if (inArray(event,'move')&& this.dragMove_$) {
      this.dragMove_$.unsubscribe();
      this.dragMove_$ = null;
    }
    if (inArray(event,'end')&& this.dragEnd_$) {
      this.dragEnd_$.unsubscribe();
      this.dragEnd_$ = null;
    }
  }


  //鼠标按下的value
  private onDragStart(value:number) {
    // console.log(value)
    this.toggoleDragMoving(true);
    this.setValue(value)
  }

  private onDragMove(value:number) {
    // console.log(value)
    if (this.isDragging) {
      this.setValue(value)
      this.cdr.markForCheck();
    }
  }

  private onDragEnd() {
    this.toggoleDragMoving(false)
    this.cdr.markForCheck();//变更检测
  }

  private toggoleDragMoving(movable:boolean) {
    this.isDragging = movable;
    if (movable) {
      this.subscribeDrag(['move','end'])
    }
    else{
      //鼠标抬起时解绑
      this.unSubscribeDrag(['move','end'])
    }
  }

  private setValue(value:SliderValue,needCheck = false) {
    // console.log(value)
    if (needCheck) {
      if (this.isDragging) return;
      this.value = this.formatValue(value);
      this.updateTrackAndHandles()//改变进度条和滑块的位置
    }else if (!this.valuesEqual(this.value,value)) {
      this.value = value;
      this.updateTrackAndHandles()//改变进度条和滑块的位置
      this.OnValueChange(this.value)
    }
  }

  private formatValue(value:SliderValue):SliderValue {
    let res = value;
    if (this.assertValueValid(value)) {
      res = this.wyMin;
    }
    else{
      res = limitNumberInRange(value,this.wyMin,this.wyMax);
    }
    return res
  }

  //判断是否是NaN
  private assertValueValid(value:SliderValue):boolean {
      return isNaN(typeof value !== 'number' ? parseFloat(value) : value)
  }

  private valuesEqual(valA:SliderValue,valB:SliderValue):boolean {
    if(typeof valA !== typeof  valB) {
      return false
    }
    return valA === valB
  }

  private updateTrackAndHandles() {
    this.offset = this.getValueToOffeset(this.value);
    this.cdr.markForCheck();
  }

  private getValueToOffeset(val:SliderValue):SliderValue {
    return getPercent(this.wyMin,this.wyMax,val);
  }

  private getSliderLength() {
    return this.wyVertical ? this.slideDom.clientHeight : this.slideDom.clientWidth;
  }

  private getSliderStart():number {
    const offset = getElementOffset(this.slideDom)
    return this.wyVertical?offset.top : offset.left
  }

//组件销毁时执行
  ngOnDestroy(): void {
    this.unSubscribeDrag();
  }

}
