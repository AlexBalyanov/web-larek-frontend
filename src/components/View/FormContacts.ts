import { Form } from './Common/Form';
import { IFormContacts } from '../../types';
import { IEvents } from '../base/events';
import { ensureElement } from '../../utils/utils';

interface IFormContactsData {
	email: string;
	phone: string;
}

export class FormContacts extends Form<IFormContactsData> implements IFormContacts {
	protected emailInputElement: HTMLInputElement;
	protected phoneInputElement: HTMLInputElement;
	protected events: IEvents;

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);
		this.events = events;
		this.emailInputElement = ensureElement<HTMLInputElement>('input[name=email]', container);
		this.phoneInputElement = ensureElement<HTMLInputElement>('input[name=phone]', container);
	}

	set email(value: string) {
		this.emailInputElement.value = value;
	}

	set phone(value: string) {
		this.phoneInputElement.value = value;
	}
}