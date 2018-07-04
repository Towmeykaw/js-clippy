import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgentComponent } from './agent.component';
import { BalloonComponent } from './balloon.component';
import { AngularDraggableModule } from 'angular2-draggable';
import { ClippyService } from './clippy.service';

@NgModule({
  imports: [CommonModule,AngularDraggableModule],
  declarations: [AgentComponent, BalloonComponent]
  ,providers: [ClippyService],
  exports: [AgentComponent,BalloonComponent],
  entryComponents: [AgentComponent]
})
export class JsClippyModule { }
