
import { HttpParams } from '@angular/common/http';
import {Injectable } from '@angular/core';
import axios from 'axios'
import queryString from 'query-string'

type SingerParams={
  offset?:number,
  limit?:number,
  type?:number,
  area?:number,
  initial?:string
}

const defaultParams:SingerParams = {
  offset: 0,
  limit: 9,
  type:2,
  area:16,
  initial:'a'
}


@Injectable({
  providedIn: 'root'
})
export class SingerService {
  public domain:string = 'http://localhost:3000/'

  constructor() { }
  //获取歌手列表数据
  getSingers(args:SingerParams = defaultParams){
    return new Promise((resolve,reject)=>{
      //将参数格式化成字符串
      const params = new HttpParams({fromString:queryString.stringify(args) })
      // console.log(params)
      axios.get(this.domain+'artist/list',{params}).then((res:any)=>{
        // console.log(res)
        resolve(res.data.artists)
      })
      .catch((err)=>{
        console.log(err)
      })
      .then(()=>{
        // console.log('无论成功失败都会执行')
      })
    })
  }

}
