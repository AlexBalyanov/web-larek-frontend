import { IUser, IUserData } from '../../types';
import { IEvents } from '../base/events';

export class UserData implements IUserData {
	protected user: IUser = {
		payment: '',
		email: '',
		phone: '',
		address: '',
	}
	protected errorMessage: string;
	protected events: IEvents;

	constructor(events: IEvents) {
		this.events = events;
	}

	checkUserValidation(inputValue: string) {
		const isPayment = this.user.payment !== '';

		this.errorMessage = '';

		if (!isPayment) {
			this.errorMessage = 'Необходимо выбрать способ оплаты'
		}
		if (!this.user.address) {
			this.errorMessage = 'Необходимо указать адрес'
		}

		return !!inputValue;
	}

	getUserData(): IUser {
		return this.user;
	}

	getErrorMessage() {
		return this.errorMessage;
	}

	setUserData(data: Partial<IUser>) {
		Object.assign(this.user, data);
	}
}