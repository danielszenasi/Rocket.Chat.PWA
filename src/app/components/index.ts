import {LoginComponent} from './login/login.component';
import {RoomComponent} from './room/room.component';
import {SidenavComponent} from './sidenav/sidenav.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {MdButtonModule, MdIconModule, MdSlideToggleModule, MdInputModule, MdTabsModule, MdListModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';

export const COMPONENTS = [
  LoginComponent,
  RoomComponent,
  SidenavComponent
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
    FlexLayoutModule,
    BrowserAnimationsModule,
    RouterModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class ComponentsModule {
}
