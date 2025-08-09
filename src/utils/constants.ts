export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

export const settings = {
	headers: {
		"Content-Type": "application/json"
	},
}

export const categoriesClasses: Record<string, string> = {
	'другое': 'card__category_other',
	'софт-скил': 'card__category_soft',
	'дополнительное': 'card__category_additional',
	'кнопка': 'card__category_button',
	'хард-скил': 'card__category_hard',
};

export enum modelEvents {
	productsSaved = 'products:saved',
	basketChanged = 'basket:changed',
}

export enum viewEvents {
	modalOpen = 'modal:open',
	modalClose = 'modal:close',
	productOpen = 'product:open',
	productClose = 'product:close',
	productBuy = 'product:buy',
	basketOrder = 'basket:order',
	basketOpen = 'basket:open',
	basketDelete = 'basket:delete',
	formSubmit = 'formSubmit',
	formInput = 'formInput',
	formOrderSubmit = 'formSubmit:order',
	formOrderInput = 'formInput:order',
	formOrderOnline = 'formOrder:online',
	formOrderCash = 'formOrder:cash',
	formContactsSubmit = 'formSubmit:contacts',
	formContactsInput = 'formInput:contacts',
}
