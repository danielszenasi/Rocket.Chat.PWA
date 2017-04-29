import {LoginComponent} from './login/login.component';
import {RoomComponent} from './room/room.component';
import {SidenavComponent} from './sidenav/sidenav.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {
  MdButtonModule, MdIconModule, MdSlideToggleModule, MdInputModule, MdTabsModule, MdListModule,
  MdToolbarModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import {EditMessageComponent} from './message/edit-message.component';
import {HomeComponent} from "./room/home.component";

export const COMPONENTS = [
  LoginComponent,
  RoomComponent,
  SidenavComponent,
  EditMessageComponent,
  HomeComponent
];


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MdIconModule,
    MdInputModule,
    MdButtonModule,
    MdTabsModule,
    MdListModule,
    MdSlideToggleModule,
    MdToolbarModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    RouterModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class ComponentsModule {
}
