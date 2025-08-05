export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

export const settings = {
	headers: {
		"Content-Type": "application/json"
	},
}

export const categories: Record<string, string> = {
	'другое': 'card__category_other',
	'софт-скил': 'card__category_soft',
	'дополнительное': 'card__category_additional',
	'кнопка': 'card__category_button',
	'хард-скил': 'card__category_hard',
};

export enum modelEvents {
	productsSaved = 'products:saved',
}

export enum viewEvents {
	productOpen = 'product:open',
}
