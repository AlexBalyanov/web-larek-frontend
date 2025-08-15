import { Component } from '../base/Component';
import { IBasketView } from '../../types';
import { IEvents } from '../base/events';
import { ensureElement } from '../../utils/utils';
import { viewEvents } from '../../utils/constants';

interface IBasketViewData {
	valid: boolean;
	content: HTMLElement[];
	totalPrice: number;
}

export class Basket extends Component<IBasketViewData> implements IBasketView {
	protected contentElement: HTMLElement;
	protected orderButtonElement: HTMLButtonElement;
	protected totalPriceElement: HTMLElement;
	protected events: IEvents;

	constructor(container: HTMLElement, events: IEvents) {
		super(container);
		this.events = events;
		this.orderButtonElement = ensureElement<HTMLButtonElement>('.basket__button', container);
		this.totalPriceElement = ensureElement<HTMLElement>('.basket__price', container);
		this.contentElement = ensureElement<HTMLElement>('.basket__list', container);

		this.orderButtonElement.addEventListener('click', () => {
			events.emit(viewEvents.basketOrder);
		});
	}

	set valid(value: boolean) {
		this.orderButtonElement.disabled = !value;
	}

	set content(items: HTMLElement[]) {
		this.contentElement.replaceChildren(...items);
	}

	set totalPrice(value: number) {
		this.setText(this.totalPriceElement, `${value} синапсов`);
	}
}