import { Component, OnInit } from '@angular/core'
import { IBug } from './models/IBug';
//import { BugOperationsService } from './services/bugOperations.service';
import { BugStorageService } from './services/bugStorage.service';


@Component({
	selector : 'bug-tracker',
	template : `
		<h1>Bug Tracker</h1>
		<hr>
		<bug-stats [data]="bugs"></bug-stats>
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
		<bug-edit (newBug)="onBugCreated($event)"></bug-edit>
		<section class="list">
			<ol>
				<li *ngFor="let bug of ( bugs | sort:sortBugsBy:sortBugDescending)">
					<span class="bugname" 
						(click)="onBugClick(bug)"
						[ngClass]="{closed : bug.isClosed}"
					>
						{{bug.name | trimText:40}}
					</span>
					<div class="datetime" [title]="bug.createdAt | date:'dd-MMM-yyyy hh:mm:ss a'">{{bug.createdAt | elapsed}}</div>
				</li>
			</ol>
			<input type="button" value="Remove Closed" (click)="onRemoveClosedClick()">
		</section>
	`
})
export class BugTrackerComponent implements OnInit {
	
	bugs : IBug[] = [];

	newBugName : string = '';
	
	constructor( private bugStorage : BugStorageService){
		
	}

	ngOnInit(){
		this.bugs = this.bugStorage.getAll();
	}

	onBugCreated(newBug : IBug){
		this.bugs = [...this.bugs, newBug];
	}	

	onBugClick(bugToToggle){
		var toggledBug = this.bugStorage.toggle(bugToToggle);
		this.bugs = this.bugs.map(bug => bug === bugToToggle ? toggledBug : bug);
	}

	onRemoveClosedClick(){
		this.bugs
			.filter(bug => bug.isClosed)
			.forEach(bug => this.bugStorage.remove(bug));
			
		this.bugs = this.bugs.filter(bug => !bug.isClosed);
	}
}