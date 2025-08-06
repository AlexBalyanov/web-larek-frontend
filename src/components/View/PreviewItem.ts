import { IPreviewItem } from '../../types';
import { IEvents } from '../base/events';
import { ProductItem } from './Common/ProductItem';
import { ensureElement } from '../../utils/utils';
import { viewEvents } from '../../utils/constants';

interface IPreviewItemData {
	category: string;
	description: string;
	image: string;
}

export class PreviewItem extends ProductItem<IPreviewItemData> implements IPreviewItem {
	protected toBasketButton: HTMLButtonElement;
	protected categoryElement: HTMLElement;
	protected descriptionElement: HTMLElement;
	protected imageElement: HTMLImageElement;
	protected categoryClass: Record<string, string>;
	protected events: IEvents;

	constructor(container: HTMLElement, category: Record<string, string>, events: IEvents) {
		super(container, events);
		this.events = events;
		this.categoryClass = category;
		this.toBasketButton = ensureElement<HTMLButtonElement>('.card__button', container);
		this.categoryElement = ensureElement<HTMLElement>('.card__category', container);
		this.descriptionElement = ensureElement<HTMLElement>('.card__text', container);
		this.imageElement = ensureElement<HTMLImageElement>('.card__image', container);

		this.toBasketButton.addEventListener('click', () => {
			events.emit(viewEvents.productBuy, this);
		});
	}

	set category(value: string) {
		const classElement: string = this.categoryClass[value];
		this.toggleClass(this.categoryElement, classElement);
		this.setText(this.categoryElement, value);
	}

	set description(value: string) {
		this.setText(this.descriptionElement, value);
	}

	set image(value: string) {
		this.setImage(this.imageElement, value);
	}
}