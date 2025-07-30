# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## Данные, используемые в приложении, и их типы
\
**Товар**
````
interface IProduct {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
}
````
\
**Покупатель**
````
interface IUser {
	payment: PaymentMethod;
	email: string;
	phone: string
	address: string;
}
````
\
**Интерфейс модели данных продукта**
````
interface IProductsData {
	_products: IProduct[];
	_selectedProduct: IProduct;
	set products(products: IProduct[]);
	get products(): IProduct[];
	set selectedProduct(product: IProduct);
	get selectedProduct(): IProduct;
}
````
\
**Интерфейс модели данных покупателя**
````
interface IUserData {
	payment: PaymentMethod;
	email: string;
	phone: string
	address: string;
	setUserData(user: Partial<IUser>): void;
	getUserData(): IUser;
	checkUserValidation(): boolean
}
````
\
**Интерфейс модели данных корзины покупок**
````
interface IBasket {
	products: IProduct[];
	getProductsList(): IProduct[];
	getProductsCount(): number;
	getProductsPrice(): number;
	addToBasket(product: IProduct): void;
	deleteFromBasket(product: IProduct): void;
	isProductInBasket(product: IProduct): boolean;
}
````
\
**Данные способа оплаты, используемые в модели покупателя**
````
type PaymentMethod = 'cash' | 'online' | '';
````

## Архитектура веб приложения
Код приложения реализован в парадигме MVP:
- слой данных - отвечает за работу с данными веб приложения (хранение, изменение);
- слой отображения - отвечает за работу с отображением данных на странице веб приложения;
- слой взаимодействия (презентер) - отвечает за взаимосвязь между слоями данных и отображения.

### Базовый код

#### Класс Api
Класс содержит в себе логику работы с сервером веб приложения. В конструктор\
передается адрес сервера и конфиг с заголовками запроса. Методы класса:
- `get` - отправляет GET запрос на переданный эндпоинт и возвращает промис с\
объектом, который послал сервер в качестве ответа;
- `post` - отправляет POST запрос с переданными параметрами: тело запроса JSON, эндпоинт сервера\.
По умолчанию стоит POST метод запроса, который можно изменить, передав третий параметр при вызове.

#### Класс EventEmitter
Класс реализует брокер событий, с помощью которого можно генерировать различные события\,
в слоях приложения, подписываться на них и выполнять нужные действия. Основные методы\
описаны в интерфейсе IEvents:
- `on` - подписка на событие по его имени;
- `emit` - генерация события с нужным именем;
- `trigger` - возвращает функцию, при вызове которой инициализируется требуемое в параметрах событие.

### Слой данных

#### Класс ProductsData
Класс предназначен для хранения и работы с данными карточек товаров, полученных с сервера.\
В полях класса хранятся следующие данные:
- `products: IProduct[]` - массив карточек товаров, полученных с сервера;
- `selectedProduct: IProduct` - сохраненная карточка, которая будет выбрана на главной странице;
- `events: IEvents` - экземпляр класса EventEmitter для генерации событий при изменении данных.

Методы класса:
- сеттер и геттер `products` - предоставляют возможность сохранить или получить\
массив товаров соответствующего поля;
- сеттер и геттер `selectedProduct` - предоставляют возможность сохранить или получить\
выбранный товар соответствующего поля.

#### Класс UserData
Класс предназначен для хранения и работы с данными покупателя (пользователя).\
В полях класса хранятся следующие данные:
- `payment: PaymentMethod` - метод оплаты товаров в корзине;
- `email: string` - электронная почта покупателя;
- `phone: string` - телефонный номер покупателя;
- `address: string` - адрес доставки покупателя;
- `events: IEvents` - экземпляр класса EventEmitter для генерации событий при изменении данных.

Методы класса:
- `setUserData(user: Partial<IUser>): void` - устанавливает данные пользователя\
(можно частями при оформлении заказа в корзине);
- `getUserData(): IUser` - возвращает полные данные пользователя;
- `checkUserValidation(): boolean` - определяет валидность введенных данных.

#### Класс BasketData
Класс предназначен для хранения и работы с данными корзины покупок.\
В полях класса хранятся следующие данные:
- `products: IProduct[]` - массив товаров в корзине;
- `events: IEvents` - экземпляр класса EventEmitter для генерации событий при изменении данных.

Методы класса:
- `getProductsList(): IProduct[]` - возвращает массив товаров в корзине;
- `getProductsCount(): number` - возвращает число количества товаров в корзине;
- `getProductsPrice(): number` - возвращает итоговую стоимость товаров в корзине;
- `addToBasket(product: IProduct): void` - метод добавления товара в корзину;
- `deleteFromBasket(product: IProduct): void` - метод удаления товара из корзины;
- `isProductInBasket(id: string): boolean` - метод, определяющий, есть ли\
конкретный товар в корзине.