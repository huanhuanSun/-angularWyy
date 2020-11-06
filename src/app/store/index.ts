import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { playerReducer } from './reduciers/player.reducer';



@NgModule({
  declarations: [],
  imports: [
    //引入reducer
    StoreModule.forRoot({ pplayer:playerReducer },{
      //开发环境下会检测 state，action等操作是否合法
      runtimeChecks:{
        strictActionImmutability:true,
        strictStateImmutability:true,
        strictActionSerializability:true,
        strictStateSerializability:true
      }
    }),
    //调试插件
    StoreDevtoolsModule.instrument({
      maxAge:20,
      logOnly:environment.production
    })
  ]
})
export class AppStoreModule { }
