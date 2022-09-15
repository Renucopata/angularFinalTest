import { NgModule } from '@angular/core';

import { Route, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {SiginComponent} from "./sigin/sigin.component";
const routes: Route[] = [
  {
    path: '',
    component: SiginComponent,
  },
];

@NgModule({
  declarations: [SiginComponent],
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,

    CommonModule,
  ],
})
export class SiginModule {}
