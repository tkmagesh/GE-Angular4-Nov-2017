import { Component, OnInit } from '@angular/core'
import { IBug } from './models/IBug';
import { BugApiService } from './services/bugApi.service';


@Component({
	selector : 'bug-tracker',
	templateUrl : 'bugTracker.component.html'
})
export class BugTrackerComponent implements OnInit {
	
	bugs : IBug[] = [];

	newBugName : string = '';
	sortBugsBy : string = '';
	sortBugDescending : boolean  = false;
	
	constructor( private bugApi : BugApiService ){
		
	}

	ngOnInit(){
		this.bugApi
			.getAll()
			.subscribe(bugs => this.bugs = bugs);
	}

	onBugCreated(newBug : IBug){
		this.bugs = [...this.bugs, newBug];
	}	

	onBugClick(bugToToggle){
		this.bugApi
			.toggle(bugToToggle)
			.subscribe(toggledBug => this.bugs = this.bugs.map(
				(bug) => bug === bugToToggle ? toggledBug : bug)
			);
	}

	onRemoveClosedClick(){
		this.bugs
			.filter(bug => bug.isClosed)
			.forEach(bug => this.bugApi.remove(bug).subscribe(_ => {}));
			
		this.bugs = this.bugs.filter(bug => !bug.isClosed);
	}
}