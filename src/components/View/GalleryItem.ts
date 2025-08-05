import { ProductItem } from './Common/ProductItem';
import { IGalleryItem } from '../../types';
import { IEvents } from '../base/events';
import { ensureElement } from '../../utils/utils';
import { categories, viewEvents } from '../../utils/constants';

interface IGalleryItemData {
	category: string;
	image: string;
}

export class GalleryItem extends ProductItem<IGalleryItemData> implements IGalleryItem {
	protected previewButton: HTMLButtonElement;
	protected categoryElement: HTMLElement;
	protected imageElement: HTMLImageElement;
	protected events: IEvents;

	constructor(container: HTMLElement, events: IEvents) {
		super(container, events);
		this.events = events;
		this.previewButton = container.querySelector<HTMLButtonElement>('.gallery__item');
		this.categoryElement = ensureElement<HTMLElement>('.card__category', container);
		this.imageElement = ensureElement<HTMLImageElement>('.card__image', container);

		this.container.addEventListener('click', () => {
			events.emit(viewEvents.productOpen);
		});
	}

	set category(value: string) {

		this.setText(this.categoryElement, value);
	}

	set image(value: string) {
		this.setImage(this.imageElement, value);
	}
}

