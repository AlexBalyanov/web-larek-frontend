import { IBasketItem } from '../../types';
import { IEvents } from '../base/events';
import { ensureElement } from '../../utils/utils';
import { ProductItem } from './Common/ProductItem';
import { viewEvents } from '../../utils/constants';

interface IBasketItemData {
	title: string;
	price: number | null;
	index: number;
}

export class BasketItem extends ProductItem<IBasketItemData> implements IBasketItem {
	protected deleteButton: HTMLButtonElement;
	protected indexElement: HTMLElement;
	protected events: IEvents;

	constructor(container: HTMLElement, events: IEvents) {
		super(container, events);
		this.events = events;
		this.deleteButton = ensureElement<HTMLButtonElement>('.basket__item-delete', container);
		this.indexElement = ensureElement<HTMLElement>('.basket__item-index', container);

		this.deleteButton.addEventListener('click', () => {
			events.emit(viewEvents.basketDelete, this);
		});
	}

	set index(value: number) {
		this.setText(this.indexElement, value);
	}
}