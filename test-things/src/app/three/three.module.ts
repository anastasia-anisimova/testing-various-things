import {NgModule} from '@angular/core';
import {ThreeComponent} from './three/three.component';
import {ThreeRoutingModule} from "./three-routing.module";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [ThreeComponent],
  imports: [
    ThreeRoutingModule,
    FormsModule
  ]
})
export class ThreeModule {
}
