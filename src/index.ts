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
import { IProduct } from './types';
import { BasketData } from './components/Models/BasketData';
import { Header } from './components/View/Header';
import { Basket } from './components/View/Basket';
import { BasketItem } from './components/View/BasketItem';

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
const basketData = new BasketData(events);

const header = new Header(headerElement, events);
const galleryContainer = new Gallery(galleryContainerElement, events);
const modal = new Modal(modalElement, events);
const basket = new Basket(cloneTemplate(basketTemplate), events);

events.onAll(({eventName, data}) => {
	console.log(eventName, data);
});

api.getProducts()
	.then((products) => {
		productsData.setProducts(products);
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
});

events.on(viewEvents.basketOpen, () => {
	const basketArray = basketData.getProductsList().map((product) => {
		const basketItem = new BasketItem(cloneTemplate(cardBasketTemplate), events);
		return basketItem.render(product);
	});

	const renderedBasketItem = basket.render({content: basketArray});

	if (basketData.getProductsList().length === 0) {
		basket.render({valid: false});
	} else {
		const totalPrice = basketData.getProductsPrice();
		basket.render({totalPrice: totalPrice, valid: true});
	}

	modal.render({content: renderedBasketItem});
	modal.open();
});
