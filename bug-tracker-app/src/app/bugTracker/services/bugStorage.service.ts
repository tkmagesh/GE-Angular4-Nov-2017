import { IBug } from '../models/IBug';
import { BugOperationsService } from './bugOperations.service';

import { Injectable } from '@angular/core';


@Injectable()
export class BugStorageService{
	private _currentBugId = 0;
	private _storage = window.localStorage;

	constructor(private bugOperations : BugOperationsService){

	}
	getAll() : IBug[]{
		let result : IBug[] = [];
		for(let index = 0, count = this._storage.length; index < count; index++){
			let key = this._storage.key(index),
				rawData = this._storage.getItem(key),
				bug = JSON.parse(rawData);
			this._currentBugId = this._currentBugId > bug.id ? this._currentBugId : bug.id;
			result.push(bug);
		}
		return result;
	}
	private save(bug : IBug) : void {
		this._storage.setItem(bug.id.toString(), JSON.stringify(bug));
	}
	addNew(bugName : string) : IBug{
		let newBug = this.bugOperations.createNew(++this._currentBugId, bugName);
		this.save(newBug);
		return newBug;
	}
	toggle(bug : IBug) : IBug {
		let toggledBug = this.bugOperations.toggle(bug);
		this.save(toggledBug);
		return toggledBug;
	}
	remove(bug : IBug) : void {
		this._storage.removeItem(bug.id.toString());
	}
}