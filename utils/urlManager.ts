import { URLSearchParams } from 'url';

export default class UrlManager {
	private _url: URL;
	private constructor(urlAddress: string) {
		console.log(urlAddress);
		this._url = new URL(urlAddress);
	}

	static create(): UrlManager {
		const baseUrl = process.env.VERCEL_URL;
		console.log(`BASE URL -> ${baseUrl}`);
		if (!baseUrl) {
			throw new Error(
				`-> VERCEL_URL is not defined in ${process.env.NODE_ENV}`
			);
		}
		return new UrlManager(baseUrl);
	}

	addSearchParams(
		params:
			| URLSearchParams
			| string
			| Record<string, string | readonly string[]>
			| Iterable<[string, string]>
			| ReadonlyArray<[string, string]>
	) {
		const sp = new URLSearchParams(params);
		this._url.search += sp;
	}

	getSearchParams() {
		return this._url.searchParams;
	}

	addPathName(pathname: string) {
		this._url.pathname += pathname;
		return this.href;
	}

	get href() {
		return this._url.href;
	}

	getUrlObject() {
		return this._url;
	}
}
