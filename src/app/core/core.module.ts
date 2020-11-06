import { NgModule, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServicesModule } from '../services/services.module';
import { PagesModule } from '../pages/pages.module';
import { ShareModule } from '../share/share.module';
import {NZ_I18N, zh_CN} from 'ng-zorro-antd'
import { AppStoreModule } from '../store';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ServicesModule,
    PagesModule,
    ShareModule,
    AppRoutingModule,
    AppStoreModule
  ],
  exports:[
    ShareModule,
    AppRoutingModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
})
export class CoreModule { 
  //装饰器  @SkipSelf() 表示只能被自己调用
  //装饰器 @Optional() 表示 当CoreModule没找到时 会给parentModule赋值为null
  constructor(@SkipSelf() @Optional() parentModule:CoreModule){
    if (parentModule) {
      throw new Error('CoreModule只能被appModule引入');
    }
  }
}
