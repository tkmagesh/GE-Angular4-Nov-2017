import { Component, Input } from '@angular/core';
import { IBug } from '../models/IBug';

@Component({
	selector : 'bug-stats',
	template : `
		<section class="stats">
			<span class="closed">{{data | closedCount}}</span>
			<span> / </span>
			<span>{{data.length}}</span>
		</section>
	`
})
export class BugStatsComponent{

	@Input()
	data : IBug[] = [];
}