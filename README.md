# JsClippy
This is an angular component that adds clippy or one of his friends to the site. 
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

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
