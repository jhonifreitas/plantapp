import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import { StorageProvider } from '../../providers/storage/storage';
/*
	Generated class for the ConnectionProvider provider.

	See https://angular.io/guide/dependency-injection for more info on providers
	and Angular DI.
*/
@Injectable()
export class ServiceProvider {

	public API_URL: string;
	private API_URL_EXTERNAL: string = 'http://freitasjonathan08.000webhostapp.com/plantapp-api/';

	constructor(public http: Http, private storage: StorageProvider) {
		this.checkApiUrl()
	}

	public call_api(api, dados) {
		this.checkApiUrl()
		return this.http.post(this.API_URL+api, dados);
	}

	public call_api_get(api) {
		this.checkApiUrl()
		return this.http.get(this.API_URL+api);
	}

	checkApiUrl(){
		this.API_URL = this.API_URL_EXTERNAL
		if (this.storage.getConfig()) {
			this.API_URL = this.storage.getConfig().host_api_local;
		}
	}
}
