import { Component } from '../../base/Component';
import { IForm } from '../../../types';
import { IEvents } from '../../base/events';
import { ensureElement } from '../../../utils/utils';
import { viewEvents } from '../../../utils/constants';

interface IFormData {
	valid: boolean;
	errors: string;
}

export class Form<T> extends Component<T & IFormData> implements IForm {
	protected form: HTMLFormElement;
	protected inputs: NodeListOf<HTMLInputElement>;
	protected errorsElement: HTMLElement;
	protected submitButton: HTMLButtonElement;
	protected events: IEvents;

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container);
		this.events = events;
		this.form = container;
		this.inputs = container.querySelectorAll('.form__input');
		this.errorsElement = ensureElement<HTMLElement>('.form__errors', container);
		this.submitButton = ensureElement<HTMLButtonElement>('button[type=submit]', container);

		this.form.addEventListener('input', () => {
			this.onInputChange();
		});

		this.form.addEventListener('submit', (evt: SubmitEvent) => {
			evt.preventDefault();
			events.emit(`${viewEvents.formSubmit}:${this.form.name}`, this.getInputsValues());
		});
	}

	protected onInputChange() {
		this.events.emit(`${viewEvents.formInput}:${this.form.name}`, this.getInputsValues());
	}

	set errors(value: string) {
		this.setText(this.errorsElement, value);
	}

	set valid(value: boolean) {
		this.submitButton.disabled = !value;
	}

	protected getInputsValues() {
		const inputsValues: Record<string, string> = {}
		this.inputs.forEach((input) => {
			inputsValues[input.name] = input.value;
		});
		return inputsValues;
	}
}