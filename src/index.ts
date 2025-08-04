import './scss/styles.scss';
import { EventEmitter } from './components/base/events';
import { AppApi } from './components/CommunicationApi/AppApi';
import { API_URL, CDN_URL, modelEvents } from './utils/constants';
import { ProductsData } from './components/Models/ProductsData';
import { cloneTemplate, ensureElement } from './utils/utils';
import { Gallery } from './components/View/Gallery';
import { ProductItem } from './components/View/Common/ProductItem';
import { GalleryItem } from './components/View/GalleryItem';

const successTemplate = ensureElement<HTMLTemplateElement>('#success');
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const orderFormTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsFormTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const galleryContainerElement = ensureElement<HTMLElement>('.gallery');

const events = new EventEmitter();
const api = new AppApi(API_URL, CDN_URL);

const productsData = new ProductsData(events);

const galleryContainer = new Gallery(galleryContainerElement, events);


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
		const product = new GalleryItem(cloneTemplate(cardCatalogTemplate), events);
		return product.render(item);
	})
	galleryContainer.render({catalog: productsArray});
})
