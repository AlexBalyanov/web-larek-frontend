import { IProductItem } from '../../../types';
import { Component } from '../../base/Component';
import { IEvents } from '../../base/events';
import { ensureElement } from '../../../utils/utils';

// interface IProductItemData {
// 	title: string;
// 	price: number | null;
// }

export class ProductItem<T> extends Component<T> implements IProductItem {
	protected titleElement: HTMLElement;
	protected priceElement: HTMLElement;
	protected events: IEvents;

	constructor(container: HTMLElement, events: IEvents) {
		super(container);
		this.events = events;
		this.titleElement = ensureElement<HTMLElement>('.card__title', container);
		this.priceElement = ensureElement<HTMLElement>('.card__price', container);
	}

	set title(value: string) {
		this.setText(this.titleElement, value);
	}

	set price(value: number | null) {
		this.setText(this.priceElement, value + ' синапсов');
	}
}