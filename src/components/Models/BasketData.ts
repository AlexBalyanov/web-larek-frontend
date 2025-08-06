import { IBasketData, IProduct } from '../../types';
import { IEvents } from '../base/events';

export class BasketData implements IBasketData {
	protected products: IProduct[];
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
	}

	deleteFromBasket(product: IProduct) {
		this.products.filter((item) => item !== product);
	}

	clearBasket() {
		this.products = [];
	}

	isProductInBasket(id: string) {
		return this.products.some((item) => item.id === id);
	}
}