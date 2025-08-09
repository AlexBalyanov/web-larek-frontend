import { IOrderData, IProduct, ISuccessOrder } from '../../types';
import { Api, ApiListResponse } from '../base/api';

export class AppApi extends Api {
	protected readonly cdn: string;

	constructor(baseURL: string, cdn: string, options?: RequestInit) {
		super(baseURL, options)
		this.cdn = cdn;
	}

	getProducts(): Promise<IProduct[]> {
		return this.get('/product/').then((data: ApiListResponse<IProduct>) =>
			data.items.map((item) => ({
				...item,
				image: this.cdn + item.image
			}))
		);
	}

	sendOrder(data: IOrderData): Promise<ISuccessOrder> {
		return this.post<ISuccessOrder>('/order', data, 'POST')
			.then((res: ISuccessOrder) => res);
	}
}