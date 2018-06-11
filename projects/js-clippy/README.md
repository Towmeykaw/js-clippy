# JsClippy
This is an angular component that adds clippy or one of his friends to the site. 
To install run the command
``` 
npm install js-clippy
``` 
To enable clippy you first need to declare the components and import the AngularDraggableModule that clippy uses to be draggable.

```
@NgModule({
  declarations: [
    AgentComponent,
    BalloonComponent
  ],
  imports: [
    AngularDraggableModule
  ]
})
export class AppModule { }
```
Next add the component to the page. By default clippy is hidden and the show method makes him appear. 
The other two methods to know are hide and speak.
``` 
<button (click)="clippy.show(true)">
  AddClippy
</button>
<app-clippy name="Clippy" #clippy></app-clippy>
```
By setting the name property you get a different character. 
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