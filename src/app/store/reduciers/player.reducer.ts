import { Song } from 'src/app/services/data-types/commonTypes';
import { PlayMode } from 'src/app/share/wy-ui/wy-player/player-type';

export type PlayState = {
    //播放状态
    playing:boolean;

    //播放模式
    playMode:PlayMode;

    //歌曲列表
    songList:Song[];

    //播放列表
    playList:Song[];

    //当前正在播放的索引
    currenIndex:number
}

export const initialState:PlayState = {
    playing:false,
    songList:[],
    playList:[],
    playMode:{type:'loop',label:'循环'},
    currenIndex:-1    
}

// const reducer = 