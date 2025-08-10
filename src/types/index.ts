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
	setUserData(data: Partial<IUser>): void;
	getUserData(): IUser;
	checkUserValidation(inputValue: string): boolean;
}

export interface IBasketData {
	getProductsList(): IProduct[];
	getProductsCount(): number;
	getProductsPrice(): number;
	addToBasket(product: IProduct): void;
	deleteFromBasket(id: string): void;
	clearBasket(): void;
	isProductInBasket(id: string): boolean;
}

export interface IModal {
	set content(element: HTMLElement);
	open(): void;
	close(): void;
	handleEscUp(evt: KeyboardEvent): void;
}

export interface ISuccess {
	set totalPrice(value: number);
}

export interface IBasketView {
	set valid(value: boolean);
	set content(element: HTMLElement[]);
	set totalPrice(value: number);
}

export interface IForm {
	set valid(value: boolean);
	set errors(value: string);
}

export interface IFormOrder {
	set address(value: string);
	set isOnlineOrCash(value: boolean);
}

export interface IFormContacts {
	set email(value: string);
	set phone(value: string);
}

export interface IProductItem {
	set title(value: string);
	set price(value: number | string);
}

export interface IGalleryItem {
	set category(value: string);
	set image(value: string);
}

export interface IPreviewItem {
	set category(value: string);
	set description(value: string);
	set image(value: string);
	set buttonDisable(value: boolean);
	set buttonText(value: string);
}

export interface IBasketItem {
	set index(value: number)
}

export interface IHeader {
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

export interface ISuccessOrder {
	id: string;
	total: number;
}

export interface IApi {
	baseUrl: string;
	get<T>(uri: string): Promise<T>;
	post<T>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE' | 'PATCH';
export type PaymentMethod = 'cash' | 'online' | '';