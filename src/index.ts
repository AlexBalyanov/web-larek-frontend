import './scss/styles.scss';
import { EventEmitter } from './components/base/events';
import { AppApi } from './components/CommunicationApi/AppApi';
import { API_URL, CDN_URL, modelEvents } from './utils/constants';
import { ProductsData } from './components/Models/ProductsData';

const events = new EventEmitter();
const api = new AppApi(API_URL, CDN_URL);

const productsData = new ProductsData(events);


events.onAll(({eventName, data}) => {
	console.log(eventName, data);
});

api.getProducts()
	.then((products) => {
		productsData.setProducts(products);
		events.emit(modelEvents.productSaved)
		console.log(productsData.getProducts());
	})
	.catch((err) => {
		console.error(err);
	});
