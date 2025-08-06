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

const successTemplate = ensureElement<HTMLTemplateElement>('#success');
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const orderFormTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsFormTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const galleryContainerElement = ensureElement<HTMLElement>('.gallery');
const modalElement = ensureElement<HTMLElement>('#modal-container');

const events = new EventEmitter();
const api = new AppApi(API_URL, CDN_URL);

const productsData = new ProductsData(events);

const galleryContainer = new Gallery(galleryContainerElement, events);
const modal = new Modal(modalElement, events);


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

events.on(modelEvents.productsSaved, () => {
	console.log(productsData.getProducts());
	const productsArray = productsData.getProducts().map((item) => {
		const product = new GalleryItem(cloneTemplate(cardCatalogTemplate), categoriesClasses ,events);
		return product.render(item);
	})
	galleryContainer.render({catalog: productsArray});
});

events.on(viewEvents.productOpen, (data: IProduct) => {
	const previewItem = new PreviewItem(cloneTemplate(cardPreviewTemplate), categoriesClasses, events);
	const findedProduct = productsData.getProducts().find(item => item.id === data.id);
	const renderedPreviewItem = previewItem.render(findedProduct);
	console.log(renderedPreviewItem);

	modal.render({content: renderedPreviewItem});
	modal.open();
})
