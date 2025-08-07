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
	user: IUser;
	events: IEvents;
	setUserData(user: Partial<IUser>): void;
	getUserData(): IUser;
	checkUserValidation(): boolean;
}

export interface IBasketData {
	// products: IProduct[];
	// events: IEvents;
	getProductsList(): IProduct[];
	getProductsCount(): number;
	getProductsPrice(): number;
	addToBasket(product: IProduct): void;
	deleteFromBasket(product: IProduct): void;
	clearBasket(): void;
	isProductInBasket(id: string): boolean;
}

export interface IModal {
	// contentElement: HTMLElement;
	// closeButton: HTMLButtonElement;
	// events: IEvents;
	set content(element: HTMLElement);
	open(): void;
	close(): void;
	handleEscUp(evt: KeyboardEvent): void;
}

export interface ISuccess {
	totalPriceElement: HTMLElement;
	successCloseButton: HTMLButtonElement;
	set totalPrice(value: number);
}

export interface IBasket {
	basketListElement: HTMLElement;
	orderButton: HTMLButtonElement;
	totalPriceElement: HTMLElement;
	set basketList(item: HTMLElement);
	set totalPrice(value: number);
	set valid(value: boolean);
}

export interface IBasketView {
	// orderButtonElement: HTMLButtonElement;
	// totalPriceElement: HTMLElement;
	// contentElement: HTMLElement;
	set valid(value: boolean);
	set content(element: HTMLElement[]);
	set totalPrice(value: number);
}

export interface IForm {
	submitButton: HTMLButtonElement;
	errorsElement: HTMLElement;
	set valid(value: boolean);
	set errors(value: string);
}

export interface IFormOrder {
	cashButton: HTMLButtonElement;
	onlineButton: HTMLButtonElement;
	set cash(value: boolean);
	set online(value: boolean);
	set address(value: string);
}

export interface IFormContacts {
	set email(value: string);
	set phone(value: string);
}

export interface IProductItem {
	// titleElement: HTMLElement;
	// priceElement: HTMLElement;
	set title(value: string);
	set price(value: number | string);
}

export interface IGalleryItem {
	// previewButton: HTMLButtonElement;
	// categoryElement: HTMLElement;
	// imageElement: HTMLImageElement;
	set category(value: string);
	set image(value: string);
}

export interface IPreviewItem {
	// toBasketButton: HTMLButtonElement;
	// categoryElement: HTMLElement;
	// descriptionElement: HTMLElement;
	// imageElement: HTMLElement;
	set category(value: string);
	set description(value: string);
	set image(value: string);
	set isProductInBasket(value: boolean);
}

export interface IBasketItem {
	// deleteButton: HTMLButtonElement;
}

export interface IHeader {
	// basketButton: HTMLButtonElement;
	// basketCounterElement: HTMLElement;
	// events: IEvents;
	set counter(value: number);
}

export interface IGallery {
	set catalog(items: HTMLElement[]);
}

export interface IOrderData {
	payment: string;
	email: string;
	phone: string;
	address: string;
	total: number;
	items: string[];
}

export interface IApi {
	baseUrl: string;
	get<T>(uri: string): Promise<T>;
	post<T>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE' | 'PATCH';
export type PaymentMethod = 'cash' | 'online' | '';