import { IBasketData, IProduct } from '../../types';
import { IEvents } from '../base/events';
import { modelEvents } from '../../utils/constants';

export class BasketData implements IBasketData {
	protected products: IProduct[] = [];
	protected events: IEvents;

	constructor(events: IEvents) {
		this.events = events;
	}

	getProductsList() {
		return this.products;
	}

	getProductsCount() {
		return this.products.length;
	}
	getProductsPrice() {
		return this.products.reduce((prev, curr: IProduct) => {
			return prev + curr.price;
		}, 0);
	}

	addToBasket(product: IProduct) {
		this.products.unshift(product);
		this.events.emit(modelEvents.basketChanged, this.products);
	}

	deleteFromBasket(id: string) {
		this.products = this.products.filter((item) => item.id !== id);
		this.events.emit(modelEvents.basketChanged, this.products);
	}

	clearBasket() {
		this.products = [];
		this.events.emit(modelEvents.basketChanged, this.products);
	}

	isProductInBasket(id: string) {
		return this.products.some((item) => item.id === id);
	}
}