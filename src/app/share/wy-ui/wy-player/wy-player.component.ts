import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Song } from 'src/app/services/data-types/commonTypes';
import { AppStoreModule } from 'src/app/store';
import { PlayState } from 'src/app/store/reduciers/player.reducer';
import { getCurrentIndex, getCurrentSong, getPlayList, getPlayMode, getSongList } from 'src/app/store/selectors/playerSelector';
import { PlayMode } from './player-type';

@Component({
  selector: 'app-wy-player',
  templateUrl: './wy-player.component.html',
  styleUrls: ['./wy-player.component.less']
})
export class WyPlayerComponent implements OnInit {
  public sliderValue = 35;
  public bufferOffset = 70;

  songList:Song[];
  playList:Song[];
  currentIndex:number;
  currentSong:Song;

  @ViewChild('audio',{static:true})   private audio:ElementRef;
  private audioEl:HTMLAudioElement;



  constructor(
    // private store$: Store<AppStoreModule>
    private store$: Store<{pplayer:AppStoreModule}>

  ) { 

    // this.store$.pipe(select('pplayer'),select(getSongList)).subscribe(list=>{
    //   console.log(list)
    // })
    const appStore$ = this.store$.pipe(select('pplayer'));//这里的 pplayer就是 store/index.ts中定义的

    const stateArr=[
      {
        type:getSongList,
        cb:list=>this.watchList(list,'songList')
      },
      {
        type:getPlayList,
        cb:list=>this.watchList(list,'playList')
      },
      {
        type:getCurrentIndex,
        cb:index=>this.watchCurrentIndex(index)
      },
      {
        type:getPlayMode,
        cb:index => this.watchPlayMode(index)
      },
      {
        type:getCurrentSong,
        cb:song => this.watchCurrentSong(song)
      }
    ]

    stateArr.forEach((item:any)=>{
      appStore$.pipe(select(item.type)).subscribe(item.cb);
    })

  }

  ngOnInit() {
    console.log('audio:'+this.audio.nativeElement)
    this.audioEl = this.audio.nativeElement;
  }


  private watchList(list:Song[],type:string) {
      // console.log(type,list)
      this[type] = list;
  }

  private watchCurrentIndex(index:number) {
    // console.log(index)
    this.currentIndex = index
  }

  private watchPlayMode(mode:PlayMode) {
    // console.log(mode)
  }

  private watchCurrentSong(song:Song) {
    console.log(song)
    this.currentSong = song;
  }

  onCanPlay(){
    this.play()
  }

  private play() {
    this.audioEl.play();
  }

}
