import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent{

  @Input() username = '';

  // onChanges This method is called once on a component's creation and then every time changes are detected in one of the component’s input properties.

  ngOnChanges(changes:SimpleChanges) {
    console.log('ngOnChanges triggered', changes);
    
    if (!changes['username'].isFirstChange()){
       if (changes['username'].currentValue === "Chris") {
          this.username = 'Hello ' + this.username
       } else {
          this.username = changes['username'].previousValue
       }
    }
 }

}
