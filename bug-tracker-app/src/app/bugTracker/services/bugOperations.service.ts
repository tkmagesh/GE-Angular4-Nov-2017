import { IBug } from '../models/IBug';

export class BugOperationsService{
	createNew(id : number = 0, bugName : string) : IBug{
		let newBug = {
			id : id,
			name : bugName,
			isClosed : false,
			createdAt : new Date()
		}
		return newBug;
	}
	toggle(bug : IBug) : IBug {
		return {...bug, isClosed : !bug.isClosed};
	}
}