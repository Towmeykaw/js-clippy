import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgentComponent } from './agent.component';
import { BalloonComponent } from './balloon.component';
import { AngularDraggableModule } from 'angular2-draggable';

@NgModule({
  imports: [CommonModule,AngularDraggableModule],
  declarations: [AgentComponent, BalloonComponent]
  ,providers: [],
  exports: [AgentComponent,BalloonComponent]
})
export class JsClippyModule { }
