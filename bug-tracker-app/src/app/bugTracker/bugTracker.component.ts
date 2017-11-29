import { Component } from '@angular/core'
import { IBug } from './models/IBug';
import { BugOperationsService } from './services/bugOperations.service';

@Component({
	selector : 'bug-tracker',
	template : `
		<h1>Bug Tracker</h1>
		<hr>
		<section class="stats">
			<span class="closed">{{getClosedCount()}}</span>
			<span> / </span>
			<span>{{bugs.length}}</span>
		</section>
		<section class="sort">
			<label for="">Order By :</label>
			<select name="" id="">
				<option value="name">Name</option>
				<option value="">Status</option>
				<option value="">Created At</option>
			</select>
			<label for="">Descending ? :</label>
			<input type="checkbox" name="" id="">
		</section>
		<section class="edit">
			<label for="">Bug Name :</label>
			<input type="text" #txtBugName>
			<input type="button" value="Create New" (click)="onCreateClick(txtBugName.value)">
		</section>
		<section class="list">
			<ol>
				<li *ngFor="let bug of bugs">
					<span class="bugname" 
						(click)="onBugClick(bug)"
						[ngClass]="{closed : bug.isClosed}"
					>
						{{bug.name | trimText:40}}
					</span>
					<div class="datetime">[Created At]</div>
				</li>
			</ol>
			<input type="button" value="Remove Closed" (click)="onRemoveClosedClick()">
		</section>
	`
})
export class BugTrackerComponent{
	
	bugs : IBug[] = [];
	
	constructor( private bugOperations : BugOperationsService){
		
	}

	onCreateClick(bugName:string){
		let newBug : IBug = this.bugOperations.createNew(bugName);
		this.bugs.push(newBug);
	}

	onBugClick(bugToToggle){
		this.bugOperations.toggle(bugToToggle);
	}

	getClosedCount(){
		return this
			.bugs
			.reduce((prevResult, bug) => bug.isClosed ? ++prevResult : prevResult, 0);
	}

	onRemoveClosedClick(){
		this.bugs = this.bugs.filter(bug => !bug.isClosed);
	}
}