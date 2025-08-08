import { IUser, IUserData } from '../../types';
import { IEvents } from '../base/events';

export class UserData implements IUserData {
	protected user: IUser = {
		payment: '',
		email: '',
		phone: '',
		address: '',
	}
	protected events: IEvents;

	constructor(events: IEvents) {
		this.events = events;
	}

	checkUserValidation(): boolean {
		return false;
	}

	getUserData(): IUser {
		return this.user;
	}

	setUserData(data: Partial<IUser>) {
		Object.assign(this.user, data);
	}
}