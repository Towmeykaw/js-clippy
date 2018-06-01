import { NgModule } from '@angular/core';
import { AgentComponent } from './agent/agent.component';
import { BalloonComponent } from './balloon/balloon.component';
import { Loader } from './loader';
import { Queue } from './queue';
import { Animator } from './animator';
import { AngularDraggableModule } from 'angular2-draggable';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule,AngularDraggableModule],
  declarations: [AgentComponent, BalloonComponent]
  ,providers: [],
  exports: [AgentComponent, BalloonComponent]
})
export class JsClippyModule { }
