import './scss/styles.scss';
import { EventEmitter } from './components/base/events';
import { AppApi } from './components/CommunicationApi/AppApi';
import {
	API_URL,
	categoriesClasses,
	CDN_URL,
	modelEvents, viewEvents,
} from './utils/constants';
import { ProductsData } from './components/Models/ProductsData';
import { cloneTemplate, ensureElement } from './utils/utils';
import { Gallery } from './components/View/Gallery';
import { GalleryItem } from './components/View/GalleryItem';
import { Modal } from './components/View/Common/Modal';
import { PreviewItem } from './components/View/PreviewItem';
import { IProduct, ISuccessOrder } from './types';
import { BasketData } from './components/Models/BasketData';
import { Header } from './components/View/Header';
import { Basket } from './components/View/Basket';
import { BasketItem } from './components/View/BasketItem';
import { FormOrder } from './components/View/FormOrder';
import { UserData } from './components/Models/UserData';
import { FormContacts } from './components/View/FormContacts';
import { Success } from './components/View/Success';

const successTemplate = ensureElement<HTMLTemplateElement>('#success');
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const orderFormTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsFormTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const galleryContainerElement = ensureElement<HTMLElement>('.gallery');
const modalElement = ensureElement<HTMLElement>('#modal-container');
const headerElement = ensureElement<HTMLElement>('.header');
const page = ensureElement('.page__wrapper');

const events = new EventEmitter();
const api = new AppApi(API_URL, CDN_URL);

const productsData = new ProductsData(events);
const userData = new UserData(events);
const basketData = new BasketData(events);

const header = new Header(headerElement, events);
const galleryContainer = new Gallery(galleryContainerElement, events);
const modal = new Modal(modalElement, events);
const basket = new Basket(cloneTemplate(basketTemplate), events);


api.getProducts()
	.then((products) => {

		const svgToPngArray = products.map((product) => {
			const modifiedImage = product.image.replace('svg', 'png');
			return {
				...product,
				image: modifiedImage,
			}
		});

		productsData.setProducts(svgToPngArray);
		events.emit(modelEvents.productsSaved)
	})
	.catch((err) => {
		console.error(err);
	});

events.on(viewEvents.modalOpen, () => {
	page.classList.add('page__wrapper_locked');
});

events.on(viewEvents.modalClose, () => {
	page.classList.remove('page__wrapper_locked');

	userData.setUserData({
		payment: '',
		email: '',
		phone: '',
		address: '',
	});
});

events.on(modelEvents.productsSaved, () => {
	const productsArray = productsData.getProducts().map((item) => {
		const galleryItem = new GalleryItem(cloneTemplate(cardCatalogTemplate), categoriesClasses ,events);
		return galleryItem.render(item);
	});
	galleryContainer.render({catalog: productsArray});
});

events.on(viewEvents.productOpen, (data: IProduct) => {
	const previewItem = new PreviewItem(cloneTemplate(cardPreviewTemplate), categoriesClasses, events);
	const foundProduct = productsData.getProducts().find(item => item.id === data.id);
	const isProductInBasket = basketData.isProductInBasket(data.id);
	const renderedPreviewItem = previewItem.render({
		...foundProduct,
		buttonDisable: isProductInBasket,
	});

	if (foundProduct.price === null) {
		previewItem.render({buttonDisable: true, buttonText: 'Недоступно'});
	}

	modal.render({content: renderedPreviewItem});
	modal.open();
});

events.on(viewEvents.productBuy, (data: IProduct) => {
	const foundProduct = productsData.getProducts().find(item => item.id === data.id);
	basketData.addToBasket(foundProduct);
	modal.close();
});

events.on(modelEvents.basketChanged, (data: IProduct[]) => {
	header.render({counter: data.length});

	const basketArray = basketData.getProductsList().map((product) => {
		const basketItem = new BasketItem(cloneTemplate(cardBasketTemplate), events);
		const index = basketData.getProductsList().indexOf(product) + 1;
		return basketItem.render({
			...product,
			index: index
		});
	});
	const totalPrice = basketData.getProductsPrice();
	const isEmptyBasket = basketData.getProductsList().length !== 0;

	basket.render({
		content: basketArray,
		totalPrice: totalPrice,
		valid: isEmptyBasket
	});
});

events.on(viewEvents.basketOpen, () => {
	const isEmptyBasket = basketData.getProductsList().length !== 0;
	const renderedBasket = basket.render({valid: isEmptyBasket});

	modal.render({content: renderedBasket});
	modal.open();
});

events.on(viewEvents.basketDelete, (data: IProduct) => {
	basketData.deleteFromBasket(data.id);
})

events.on(viewEvents.basketOrder, () => {
	const formOrder = new FormOrder(cloneTemplate(orderFormTemplate), events);
	const renderedFormOrder = formOrder.render({valid: false});
	modal.render({content: renderedFormOrder});

	events.on(viewEvents.formOrderOnline, (data: {address: string}) => {
		formOrder.render({isOnlineOrCash: true});
		userData.setUserData({payment: 'online'});

		const isValid = userData.checkUserValidation(data.address);

		formOrder.render({
			valid: isValid,
			errors: userData.getErrorMessage()
		});
	});

	events.on(viewEvents.formOrderCash, (data: {address: string}) => {
		formOrder.render({isOnlineOrCash: false});
		userData.setUserData({payment: 'cash'});

		const isValid = userData.checkUserValidation(data.address);

		formOrder.render({
			valid: isValid,
			errors: userData.getErrorMessage()
		});
	});

	events.on(viewEvents.formOrderInput, (data: {address: string}) => {
		userData.setUserData({address: data.address});

		const isAddressValid = userData.checkUserValidation(data.address);
		const isPaymentValid = userData.getUserData().payment !== '';
		const isValid = isAddressValid && isPaymentValid;

		formOrder.render({
			valid: isValid,
			errors: userData.getErrorMessage()
		});
	});
});

events.on(viewEvents.formOrderSubmit, () => {

	const formContacts = new FormContacts(cloneTemplate(contactsFormTemplate), events);
	const renderedFormContacts = formContacts.render({valid: false});
	modal.render({content: renderedFormContacts});

	events.on(viewEvents.formContactsInput, (data: {email: string, phone: string}) => {
		userData.setUserData({email: data.email, phone: data.phone});

		const isEmailValid = userData.checkUserValidation(data.email);
		const isPhoneValid = userData.checkUserValidation(data.phone);
		const isValid = isEmailValid && isPhoneValid;

		formContacts.render({
			valid: isValid,
			errors: userData.getErrorMessage()
		});
	});
});

events.on(viewEvents.formContactsSubmit, () => {

	const success = new Success(cloneTemplate(successTemplate), events);
	const userOrderData = userData.getUserData();
	const totalPrice = basketData.getProductsPrice();
	const basketProductsIds = basketData.getProductsList().map((product) => {
		return product.id;
	});

	const orderData = {
		...userOrderData,
		total: totalPrice,
		items: basketProductsIds
	}

	api.sendOrder(orderData)
		.then((data: ISuccessOrder) => {
			const renderedSuccess = success.render({totalPrice: data.total});
			modal.render({content: renderedSuccess});
		})
		.catch(err => console.error(err));
});

events.on(viewEvents.successButtonPressed, () => {
	basketData.clearBasket();
	modal.close();
});



