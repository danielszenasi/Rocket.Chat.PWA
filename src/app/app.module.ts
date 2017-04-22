import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {ComponentsModule} from './components/index';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CommonModule} from '@angular/common';
import {RoomService} from './services/room/room.service';

import {Authentication} from './services/login/authentication';

import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {DBModule} from '@ngrx/db';
import {RouterStoreModule} from '@ngrx/router-store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {FlexLayoutModule} from '@angular/flex-layout';

import {MdToolbarModule, MdSidenavModule, MdMenuModule, MdIconModule, MdButtonModule} from '@angular/material';

// import effects
import {reducer} from './reducers';
import {schema} from './db';

import {RoomEffects} from './effects/room/room';
import {RoomCollectionEffects} from './effects/room/room-collection';
import {AuthenticationEffects} from './effects/login/authentication';

import {MessageEffects} from './effects/message/message';
import {DDPClientSettings} from './models/DDPClientSettings';
import {DDPService} from './services/ws/ddp.service';
import {WebSocketService} from './services/ws/websocket.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ComponentsModule,
    MdSidenavModule,
    MdToolbarModule,
    MdMenuModule,
    MdIconModule,
    MdButtonModule,
    FlexLayoutModule,

    StoreModule.provideStore(reducer),

    RouterStoreModule.connectRouter(),

    StoreDevtoolsModule.instrumentOnlyWithExtension(),

    EffectsModule.run(AuthenticationEffects),
    EffectsModule.run(RoomEffects),
    EffectsModule.run(RoomCollectionEffects),
    EffectsModule.run(MessageEffects),

    DBModule.provideDB(schema),
  ],
  providers: [
    DDPService,
    Authentication,
    RoomService,
    WebSocketService,
    {
      provide: DDPClientSettings, useValue: {
      host: 'demo.rocket.chat',
      path: 'websocket',
      ssl: true,
      ddpVersion: '1',
      pingInterval: 30000,
      reconnectInterval: 30000,
    }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
