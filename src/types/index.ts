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
	products: IProduct[];
	selectedProduct: IProduct;
	events: IEvents;
	setProducts(products: IProduct[]): void;
	getProducts(): IProduct[];
	setProductPreview(product: IProduct): void;
	getProductPreview(): IProduct;
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

export interface IHeader {
	basketButton: HTMLButtonElement;
	basketCounterElement: HTMLElement;
	events: IEvents;
	set counter(value: number);
}

export interface IGallery {
	catalogElement: HTMLElement;
	set catalog(items: HTMLElement[]);
}

export interface IModal {
	_content: HTMLElement;
	closeButton: HTMLButtonElement;
	events: IEvents;
	set content(element: HTMLElement);
	open(): void;
	close(): void;
	handleEscUp(): void;
}



export interface IApi {
	baseUrl: string;
	get<T>(uri: string): Promise<T>;
	post<T>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE' | 'PATCH';
export type PaymentMethod = 'cash' | 'online' | '';