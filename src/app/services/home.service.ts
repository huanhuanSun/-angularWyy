import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Banner, HotTag } from './data-types/commonTypes';
import {  ServicesModule } from './services.module';
import {map} from 'rxjs/internal/operators'
import axios from 'axios'


@Injectable({
  providedIn: 'root'
})
export class HomeService {
  public domain:string = 'http://localhost:3000/'

  constructor() { }

  // getBanners():Observable<Banner[]>{
  //   return this.http.get(this.uri+'banner')
  //   .pipe(map((res:{banners:Banner[]})=>{
  //     console.log(res)
  //     return res.banners
  //   }))
  // }
  //获取轮播图的数据
  getBanners(){
    return new Promise((resolve,reject)=>{
      axios.get(this.domain+'banner').then((res:any)=>{
        resolve(res.data.banners)
      })
      .catch((err)=>{
        console.log(err)
      })
      .then(()=>{
        // console.log('无论成功失败都会执行')
      })
    })
  }

  //获取歌单分类
  getHotTags(){
    return new Promise((resolve,reject)=>{
      axios.get(this.domain + 'playlist/hot').then((res:any)=>{
        // console.log(res)
        let tem_data =res.data.tags.sort((x:HotTag,y:HotTag)=>{
          // x.position - y.position
          return x.position-y.position
        }).slice(0,5)
        resolve(tem_data)
      })
    })
  }

  //歌单列表数据
  getPersonalSheetList(){
    return new Promise((resolve)=>{
      axios.get(this.domain+'personalized').then((res:any)=>{
        // console.log(res)
        resolve(res.data.result.slice(0,16))
      })
    })
  }
}
