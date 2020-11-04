import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzCarouselComponent } from 'ng-zorro-antd';
import { map } from 'rxjs/internal/operators';
import { HotTag, Singer, Song, SongSheet } from 'src/app/services/data-types/commonTypes';
import { SheetService } from 'src/app/services/sheet.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  public bannerList:any = [];
  caIndex = 0;
  //歌单相关
  public hotTags:HotTag[];
  public personSheet:SongSheet[];
  public singerList:Singer[];
  public songDetail:Song;

  //

  //拿到NzCarouselComponent组件的所有实例
  @ViewChild(NzCarouselComponent, {static:true}) public nzCarousel:NzCarouselComponent;

  constructor(
    public route:ActivatedRoute,
    public sheetService:SheetService

  ) { 
    this.route.data.pipe(map((res)=>{
      // console.log(res)
      return res.homeData
    })).subscribe(([personSheet,bannerList,hotTags,singerList])=>{
      this.personSheet = personSheet;
      this.bannerList = bannerList;
      this.hotTags = hotTags;
      this.singerList = singerList.slice(0,9);
    })
  }

  ngOnInit() {
    
  }
  //轮播图左右箭头事件
  OnbeforeChange({from,to}){
    this.caIndex = to
  }
  //轮播图小圆点点击事件
  onChangeSlide(type:string){
    this.nzCarousel[type]();
  }

  //点击播放图标事件
  onPlaySong(id:number){
    console.log(id)
    this.sheetService.playSheet(id).subscribe((data)=>{
      console.log(data)
    })
  }

}
