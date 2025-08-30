import { Form } from './Common/Form';
import { IFormOrder } from '../../types';
import { IEvents } from '../base/events';
import { ensureElement } from '../../utils/utils';
import { viewEvents } from '../../utils/constants';

interface IFormOrderData {
	cash: boolean;
	online: boolean;
	address: string;
	isOnlineOrCash: boolean;
}

export class FormOrder extends Form<IFormOrderData> implements IFormOrder {
	protected cashButton: HTMLButtonElement;
	protected onlineButton: HTMLButtonElement;
	protected addressInputElement: HTMLInputElement;

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);
		this.cashButton = ensureElement<HTMLInputElement>('.button_alt[name=cash]', container);
		this.onlineButton = ensureElement<HTMLInputElement>('.button_alt[name=card]', container);
		this.addressInputElement = ensureElement<HTMLInputElement>('input[name=address]', container);

		this.cashButton.addEventListener('click', ()=> {
			events.emit(viewEvents.formOrderCash, super.getInputsValues());
		});

		this.onlineButton.addEventListener('click', ()=> {
			events.emit(viewEvents.formOrderOnline, super.getInputsValues());
		});
	}

	set address(value: string) {
		this.addressInputElement.value = value;
	}

	set isOnlineOrCash(value: boolean) {
		if (value) {
			this.onlineButton.classList.add('button_alt-active');
			this.cashButton.classList.remove('button_alt-active');
		} else {
			this.cashButton.classList.add('button_alt-active');
			this.onlineButton.classList.remove('button_alt-active');
		}
	}
}