import { Component } from '@angular/core';

@Component({
	selector : 'greeter',
	templateUrl : 'greeter.component.html'
})
export class GreeterComponent{
	title = 'app';

	changeTitle(newTitle){
		this.title = newTitle;
	}
}