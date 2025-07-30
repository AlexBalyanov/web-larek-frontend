import { IEvents } from '../components/base/events';

export interface IProduct {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
}

export interface IProductsData {
	_products: IProduct[];
	_selectedProduct: IProduct;
	events: IEvents;
	set products(products: IProduct[]);
	get products(): IProduct[];
	set selectedProduct(product: IProduct);
	get selectedProduct(): IProduct;
}

export interface IUser {
	payment: PaymentMethod;
	email: string;
	phone: string;
	address: string;
}

export interface IUserData {
	payment: PaymentMethod;
	email: string;
	phone: string;
	address: string;
	events: IEvents;
	setUserData(user: Partial<IUser>): void;
	getUserData(): IUser;
	checkUserValidation(): boolean;
}

export interface IBasketData {
	products: IProduct[];
	events: IEvents;
	getProductsList(): IProduct[];
	getProductsCount(): number;
	getProductsPrice(): number;
	addToBasket(product: IProduct): void;
	deleteFromBasket(product: IProduct): void;
	isProductInBasket(id: string): boolean;
}

export interface IApi {
	baseUrl: string;
	get<T>(uri: string): Promise<T>;
	post<T>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE' | 'PATCH';
export type PaymentMethod = 'cash' | 'online' | '';