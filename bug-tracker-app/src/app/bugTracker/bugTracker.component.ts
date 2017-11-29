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
			<select [(ngModel)]="sortBugsBy">
				<option value="name">Name</option>
				<option value="isClosed">Status</option>
				<option value="createdAt">Created At</option>
			</select>
			<label for="">Descending ? :</label>
			<input type="checkbox" [(ngModel)]="sortBugDescending">
		</section>
		<section class="edit">
			<label for="">Bug Name :</label>
			<input type="text" #txtBugName>
			<input type="button" value="Create New" (click)="onCreateClick(txtBugName.value)">
		</section>
		<section class="list">
			<ol>
				<li *ngFor="let bug of ( bugs | sort:sortBugsBy:sortBugDescending)">
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
		this.bugs.push(this.bugOperations.createNew('Server communication failure'));
		this.bugs.push(this.bugOperations.createNew(('Application not responding')));
		this.bugs.push(this.bugOperations.createNew(('User actions not recognized')));
		this.bugs.push(this.bugOperations.createNew(('Data integrity checks failed')));
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