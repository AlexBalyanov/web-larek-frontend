import { IProduct, IProductsData } from '../../types';
import { IEvents } from '../base/events';

export class ProductsData implements IProductsData {
	products: IProduct[];
	selectedProduct: IProduct;
	events: IEvents;

	constructor(events: IEvents) {
		this.events = events;
	}

	setProducts(products: IProduct[]) {
		this.products = products;
	}

	getProducts(): IProduct[] {
		return this.products;
	}

	setProductPreview(product: IProduct) {
		this.selectedProduct = product;
	}

	getProductPreview(): IProduct {
		return this.selectedProduct;
	}
}