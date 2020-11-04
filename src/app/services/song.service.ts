
import { HttpClient, HttpParams } from '@angular/common/http';
import {Injectable } from '@angular/core';
import axios from 'axios'
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import { Song, SongSheet, SongUrl } from './data-types/commonTypes';



@Injectable({
  providedIn: 'root'
})
export class SongService {
  public domain:string = 'http://localhost:3000/'

  constructor(
    private http:HttpClient
  ) { }
  //获取歌曲列表数据 需要用pipe方法，所以，要用HttpClient 模块提供的http方法，不能用promise

  getSongUrl(ids:string):Observable<SongUrl[]>{
    const params = new HttpParams().set('id',ids);
    return this.http.get(this.domain+'song/url',{params})
    .pipe(map((res:{data:SongUrl[]})=>{
      // console.log(res)
      return res.data
    }))
  }

  getSongList(songs:Song|Song[]):Observable<Song[]>{
    //不管参数传的是否是数组，都转成数组
    const songArr = Array.isArray(songs)?songs.slice():[songs];
    const ids = songArr.map(item=>item.id).join(',');
    return this.getSongUrl(ids).pipe(map(urls=>this.generateSongList(songArr,urls)))
  }

  /**
   * 处理数据  将数据处理成
   {
        id:number,
        name:string,
        url:string,
        ar:Singer[]//
        al:{//
            id:number,
            name:string,
            picUrl:string
        },//专辑信息
        dt:number
    }
   */
  private generateSongList(songs:Song[],urls:SongUrl[]):Song[]{
    const result = [];
    songs.forEach(song=>{
      const url= urls.find(url=> url.id===song.id).url;
      if (url) {
        result.push({...song,url});
      }
    })
    return result
  }

}
