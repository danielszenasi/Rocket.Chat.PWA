import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {ComponentsModule} from './components/index';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CommonModule} from '@angular/common';
import {RoomService} from './services/room/room.service';
import {RCDDPClient} from './services/api/rc-ddp-client';
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
import {Hostname} from 'app/models/hostname.model';
import {MessageEffects} from "./effects/message/message";

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
    RCDDPClient,
    Authentication,
    RoomService,

    {provide: Hostname, useValue: {value: 'demo.rocket.chat'}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
