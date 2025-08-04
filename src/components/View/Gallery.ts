import { IGallery } from '../../types';
import { Component } from '../base/Component';
import { IEvents } from '../base/events';

interface IGalleryData {
	catalog: HTMLElement[];
}

export class Gallery extends Component<IGalleryData> implements IGallery {
	protected catalogElement: HTMLElement;
	protected events: IEvents;

	constructor(container: HTMLElement, events: IEvents) {
		super(container);
		this.events = events;
	}

	set catalog(items: HTMLElement[]) {
		this.container.replaceChildren(...items);
	}
}