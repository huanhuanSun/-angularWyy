import { createAction, props } from '@ngrx/store';
import { Song } from 'src/app/services/data-types/commonTypes';
import { PlayMode } from 'src/app/share/wy-ui/wy-player/player-type';
//定义一系列动作
//第一个参数字符串标识符，语义化告诉别人这个动作是干什么的
//播放
export const SetPlaying = createAction('[player] set playing',props<{ playing:boolean }>());
//播放列表
export const SetPlayList = createAction('[player] set playList', props<{ playList:Song[] }>())
//歌曲列表
export const SetSongList = createAction('[player] set songList', props<{ songList:Song[] }>());
//播放模式
export const SetPlayMode = createAction('[player] set palyMode', props<{ playMode:PlayMode }>());
//正在播放的索引
export const SetCurrentIndex = createAction('[player] set currentIndex',props<{currentIndex:number}>());




