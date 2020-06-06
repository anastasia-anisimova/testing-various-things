import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ThreeModule} from "./three.module";
import {ThreeComponent} from "./three/three.component";

const routes: Routes = [
  {
    path: '',
    component: ThreeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThreeRoutingModule { }
