import { Component } from '../../base/Component';
import { IForm } from '../../../types';
import { IEvents } from '../../base/events';
import { ensureElement } from '../../../utils/utils';

interface IFormData {
	valid: boolean;
	errors: string;
}

export class Form<T> extends Component<T & IFormData> implements IForm {
	protected errorsElement: HTMLElement;
	protected submitButton: HTMLButtonElement;
	protected events: IEvents;

	constructor(container: HTMLElement, events: IEvents) {
		super(container);
		this.events = events;
		this.errorsElement = ensureElement<HTMLElement>('.form__errors', container);
		this.submitButton = ensureElement<HTMLButtonElement>('.order__button', container);
	}

	set errors(value: string) {
		this.setText(this.errorsElement, value);
	}

	set valid(value: boolean) {
		this.submitButton.disabled = !value;
	}

}