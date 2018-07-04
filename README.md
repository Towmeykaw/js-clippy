# JsClippy
This is an angular component that adds clippy or one of his friends to the site. 
To install run the command
``` 
npm install js-clippy
``` 
To enable clippy you first need to import the JsClippyModule .

```
@NgModule({
  declarations: [
  ],
  imports: [
    JsClippyModule
  ]
})
export class AppModule { }
```
Next add the service to a component. By default clippy is hidden and the show method makes him appear.
The other two methods to know are hide and speak.
``` 
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
```
The create method takes a string parameter, by setting it you get a different character. 
The available characters are: 
Bonzi
Clippy
F1
Genie
Genius
Links
Merlin
Peedy
Rocky
Rover

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Thanks 
A big thanks to Smore for creating the original clippy.js from which this project has borrowed most of its stuff. 
And of course to the brilliant people who created Clippy.
