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
	productBuy = 'product:buy',
	basketOpen = 'basket:open',
	basketDelete = 'basket:delete',
	basketOrder = 'basket:order',
	formSubmit = 'formSubmit',
	formOrderSubmit = 'formSubmit:order',
	formContactsSubmit = 'formSubmit:contacts',
	formInput = 'formInput',
	formOrderInput = 'formInput:order',
	formContactsInput = 'formInput:contacts',
	formOrderOnline = 'formOrder:online',
	formOrderCash = 'formOrder:cash',
	successButtonPressed = 'success:pressed'
}
