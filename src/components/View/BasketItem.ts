import { IBasketItem } from '../../types';
import { IEvents } from '../base/events';
import { ensureElement } from '../../utils/utils';
import { ProductItem } from './Common/ProductItem';
import { viewEvents } from '../../utils/constants';

interface IBasketItemData {
	title: string;
	price: number | null;
}

export class BasketItem extends ProductItem<IBasketItemData> implements IBasketItem {
	protected deleteButton: HTMLButtonElement;
	protected events: IEvents;

	constructor(container: HTMLElement, events: IEvents) {
		super(container, events);
		this.events = events;
		this.deleteButton = ensureElement<HTMLButtonElement>('.basket__item-delete', container);

		this.deleteButton.addEventListener('click', () => {
			events.emit(viewEvents.basketDelete);
		});
	}
}