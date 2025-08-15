import { Component } from '../base/Component';
import { IHeader } from '../../types';
import { IEvents } from '../base/events';
import { ensureElement } from '../../utils/utils';
import { viewEvents } from '../../utils/constants';

interface IHeaderData {
	counter: number;
}

export class Header extends Component<IHeaderData> implements IHeader {
	protected basketButton: HTMLButtonElement;
	protected basketCounterElement: HTMLElement;
	protected events: IEvents;

	constructor(container: HTMLElement, events: IEvents) {
		super(container);
		this.events = events;
		this.basketButton = ensureElement<HTMLButtonElement>('.header__basket', container);
		this.basketCounterElement = ensureElement<HTMLElement>('.header__basket-counter', container);

		this.basketButton.addEventListener('click', () => {
			events.emit(viewEvents.basketOpen);
		});
	}

	set counter(value: number) {
		this.setText(this.basketCounterElement, value);
	}
}