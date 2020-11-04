import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'playCount'
})
// 自定义管道 处理播放量数据
//1234->1234   124569->12万
export class PlayCountPipe implements PipeTransform {

  transform(value: number): number | string {
    if (value >10000) {
      return Math.floor(value/10000)+'万'
    }
    return value;
  }
}
