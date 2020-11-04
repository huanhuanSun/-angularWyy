//轮播图数据
export type Banner={
    url:string,
    targetId:number,
    imageUrl:string
}

//歌曲分类
export  type HotTag={
    id:number,
    name:string,
    position:number
}


//歌手
export type Singer={
    id:number,
    name:string,
    picUrl:string,
    albumSize:number//专辑数量
}

//歌单数据类型
export type Song={
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

//歌单
export type SongSheet = {
    id:number,
    name:string,
    picUrl:string
    playCount:number,
    tracks:Song[]
}
//播放地址
export type SongUrl={
    id:number,
    url:string
}