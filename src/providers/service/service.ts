import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

/*
	Generated class for the ConnectionProvider provider.

	See https://angular.io/guide/dependency-injection for more info on providers
	and Angular DI.
*/
@Injectable()
export class ServiceProvider {

	public API_URL: string = 'http://localhost/Particular/plantapp-api/';
	// public API_URL: string = 'http://freitasjonathan08.000webhostapp.com/plantapp-api/';

	constructor(public http: Http) {

	}

	public call_api(api, dados) {
		return this.http.post(this.API_URL+api, dados);
	}

	public call_api_get(api) {
		return this.http.get(this.API_URL+api);
	}
}
