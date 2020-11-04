import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { first, take } from 'rxjs/internal/operators';
import { Banner, HotTag, Singer, SongSheet } from 'src/app/services/data-types/commonTypes';
import { HomeService } from 'src/app/services/home.service';
import { SingerService } from 'src/app/services/singer.service';

type HomeDataType=[Banner[],HotTag[],SongSheet[],Singer[]]

@Injectable({ providedIn: 'root' })

export class HomeResolveService implements Resolve<HomeDataType> {
  constructor(
    public homeserve:HomeService,
    public singerservice:SingerService,
  ) {

  }

  resolve(): Observable<HomeDataType>|Promise<any>|any {
      //forkJoin接收一个数组， 数组的每个参数都返回一个Observable数据
      return forkJoin([
        this.homeserve.getPersonalSheetList(),//歌单列表数据
        this.homeserve.getBanners(),//获取轮播图数据
        this.homeserve.getHotTags(),//歌单分类
        this.singerservice.getSingers()//获取入驻歌手列表
      ])
      //.pipe(take(1)) // take 只取forkJoin发出的流中的第一个
      .pipe(first())
    return '';
  }
}
