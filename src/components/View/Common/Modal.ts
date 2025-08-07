import { IModal } from '../../../types';
import { IEvents } from '../../base/events';
import { Component } from '../../base/Component';
import { ensureElement } from '../../../utils/utils';
import { viewEvents } from '../../../utils/constants';

interface IModalData {
	content: HTMLElement;
}

export class Modal extends Component<IModalData> implements IModal {
	protected contentElement: HTMLElement;
	protected closeButton: HTMLButtonElement;
	protected events: IEvents;

	constructor(container: HTMLElement, events: IEvents) {
		super(container)
		this.events = events;
		this.contentElement = ensureElement<HTMLElement>('.modal__content', container);
		this.closeButton = ensureElement<HTMLButtonElement>('.modal__close', container);

		this.closeButton.addEventListener('click', () => {
			this.close()
		});

		container.addEventListener('mousedown', (evt) => {
			if (evt.target === evt.currentTarget) {
				this.close();
			}
		});

		this.handleEscUp = this.handleEscUp.bind(this);
	}

	set content(element: HTMLElement) {
		this.contentElement.replaceChildren(element);
	}

	open() {
		this.toggleClass(this.container, 'modal_active');
		document.addEventListener('keyup', this.handleEscUp);
	}

	close() {
		this.toggleClass(this.container, 'modal_active');
		document.removeEventListener('keyup', this.handleEscUp);
		this.events.emit(viewEvents.productClose);
	}

	handleEscUp(evt: KeyboardEvent) {
		if (evt.key === 'Escape') {
			this.close();
		}
	}
}