import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {LoginComponent} from './components/login/login.component';
import {RoomComponent} from './components/room/room.component';


const appRoutes: Routes = [
  { path: '',  component: LoginComponent },
  {
    path: 'room', component: RoomComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
