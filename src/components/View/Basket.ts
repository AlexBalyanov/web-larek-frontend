import { Component } from '../base/Component';
import { IBasketView } from '../../types';
import { IEvents } from '../base/events';
import { ensureElement } from '../../utils/utils';
import { viewEvents } from '../../utils/constants';

interface IBasketViewData {
	valid: boolean;
}

export class Basket extends Component<IBasketViewData> implements IBasketView {
	protected orderButtonElement: HTMLButtonElement;
	protected totalPriceElement: HTMLElement;
	events: IEvents;

	constructor(container: HTMLElement, events: IEvents) {
		super(container);
		this.events = events;
		this.orderButtonElement = ensureElement<HTMLButtonElement>('.basket__button', container);
		this.totalPriceElement = ensureElement<HTMLElement>('.basket__price', container);

		this.orderButtonElement.addEventListener('click', () => {
			events.emit(viewEvents.basketOrder);
		});
	}

	set valid(value: boolean) {
		this.orderButtonElement.disabled = !value;
	}
}