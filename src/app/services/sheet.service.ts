
import { HttpClient, HttpParams } from '@angular/common/http';
import {Injectable } from '@angular/core';
import axios from 'axios'
import { Observable } from 'rxjs';
import { map, pluck, switchMap } from 'rxjs/internal/operators';
import { Song, SongSheet } from './data-types/commonTypes';
import { SongService } from './song.service';



@Injectable({
  providedIn: 'root'
})
export class SheetService {
  public domain:string = 'http://localhost:3000/'

  constructor(
    private http: HttpClient,
    public songServe:SongService
  ) { }

  //获取歌曲详情
  getSongDetail(id:number){
    const params = new HttpParams().set('id',id.toString());
    return this.http.get(this.domain+'playlist/detail',{params})
    .pipe(map((res:{playlist:SongSheet})=>{
      // console.log(res)
      return res.playlist
    }))
  }

  playSheet(id:number):Observable<Song[]>{
    // return this.getSongDetail(id).pipe(pluck('tracks'),switchMap(track=>this.songServe.getSongList(tracks)))
    //pluck('tracks') 只需要tracks字段
    return this.getSongDetail(id).pipe(pluck('tracks'),switchMap(track=>this.songServe.getSongList(track)))
  }

}
