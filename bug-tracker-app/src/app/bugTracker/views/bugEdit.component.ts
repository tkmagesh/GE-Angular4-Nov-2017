import { Component, Output, EventEmitter } from '@angular/core';
import { IBug } from '../models/IBug';
import { BugApiService } from '../services/bugApi.service';

@Component({
	selector : 'bug-edit',
	template : `
		<section class="edit">
			<label for="">Bug Name :</label>
			<input type="text" [(ngModel)]="newBugName">
			<input type="button" value="Create New" (click)="onCreateClick()">
		</section>
	`
})
export class BugEditComponent{
	newBugName : string = '';

	@Output()
	newBug : EventEmitter<IBug> = new EventEmitter<IBug>();

	constructor(private bugApi : BugApiService){

	}

	onCreateClick(){
		this.bugApi
			.addNew(this.newBugName)
			.subscribe(bug => this.newBug.emit(bug));
	}
}