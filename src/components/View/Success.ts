import { Component } from '../base/Component';
import { ISuccess } from '../../types';
import { IEvents } from '../base/events';
import { ensureElement } from '../../utils/utils';
import { viewEvents } from '../../utils/constants';

interface IModalSuccessData {
	totalPrice: number;
}

export class Success extends Component<IModalSuccessData> implements ISuccess {
	successCloseButton: HTMLButtonElement;
	totalPriceElement: HTMLElement;
	events: IEvents;

	constructor(container: HTMLElement, events: IEvents) {
		super(container);
		this.events = events;
		this.successCloseButton = ensureElement<HTMLButtonElement>('.order-success__close', container);
		this.totalPriceElement = ensureElement<HTMLElement>('.order-success__description', container);

		this.successCloseButton.addEventListener('click', () => {
			events.emit(viewEvents.successButtonPressed);
		});
	}

	set totalPrice(value: number) {
		this.setText(this.totalPriceElement, `Списано ${value} синапсов`);
	}
}