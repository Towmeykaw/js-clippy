import { Component } from '@angular/core';
import { ClippyService } from 'js-clippy';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';
  constructor(private clippy: ClippyService) {
    this.clippy.create("Clippy");
  }
  public show (): void {
    this.clippy.show(true);
  }
  public talk (): void {
    this.clippy.speak("hello world",true);
  }
  public remove (): void {
    this.clippy.hide(true,null);
  }
}
