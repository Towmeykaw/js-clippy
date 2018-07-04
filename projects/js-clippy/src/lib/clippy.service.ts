import {
  Injectable,
  Injector,
  ComponentFactoryResolver,
  EmbeddedViewRef,
  ApplicationRef
} from '@angular/core';
import { AgentComponent } from './agent.component';

@Injectable()
export class ClippyService {
  agent: AgentComponent;

constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
) { }
public show (fast): void {
  this.agent.show(fast);
}
public hide (fast, callback) {
  this.agent.hide(fast,callback);
}
public speak (text, hold): void {
  this.agent.speak(text,hold);
}
public create(agentName: string ) {
  // 1. Create a component reference from the component 
  let componentRef = this.componentFactoryResolver
    .resolveComponentFactory(AgentComponent)
    .create(this.injector);
  
  (<AgentComponent>componentRef.instance).name = agentName;
  // 2. Attach component to the appRef so that it's inside the ng component tree
  this.appRef.attachView(componentRef.hostView);
  this.agent = (<AgentComponent>componentRef.instance);
  // 3. Get DOM element from component
  const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
    .rootNodes[0] as HTMLElement;
  
  // 4. Append DOM element to the body
  document.body.appendChild(domElem); 
}
}