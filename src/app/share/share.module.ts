import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {NgZorroAntdModule} from 'ng-zorro-antd'
import { WyUiModule } from './wy-ui/wy-ui.module';


//shareModule用来存放全局用到的公共组件、指令等
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgZorroAntdModule,
    WyUiModule
  ],
  exports:[
    CommonModule,
    FormsModule,
    NgZorroAntdModule,
    WyUiModule,

  ]
})
export class ShareModule { }
