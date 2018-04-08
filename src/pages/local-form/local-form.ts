import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { FunctionsDefaultProvider } from '../../providers/functions-default/functions-default';
import { StorageProvider } from '../../providers/storage/storage';
import { ServiceProvider } from '../../providers/service/service';
/**
 * Generated class for the LocalAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
	selector: 'page-local-form',
	templateUrl: 'local-form.html',
})
export class LocalFormPage {

	private formLocal: FormGroup
	private id: number
	private active: number

	constructor(public navCtrl: NavController, 
				public navParams: NavParams,
				private formBuilder: FormBuilder,
				private functions: FunctionsDefaultProvider,
				private storage: StorageProvider,
				private service: ServiceProvider) {
		this.formLocal = this.formBuilder.group({
			name: ['', Validators.required],
		});
	}

	ionViewDidLoad() {
		if (this.navParams.get('local')) {
			this.id = this.navParams.get('local').id;
			this.active = this.navParams.get('local').active;
			this.formLocal.get('name').setValue(this.navParams.get('local').name);
		}
	}

	save() {
		this.functions.loading("Aguarde...");

		let dados:any = this.formLocal.value
		dados.client_id = this.storage.getUser().client_id

		if (this.id) {
			dados.id = this.id
		}if (this.active) {
			dados.active = this.active
		}

		this.service.call_api('setLocal', dados)
			.subscribe(data => {
				this.functions.load.dismiss();
				this.functions.showAlertReturn('Sucesso!', 'Local salvo!')
					.then(()=>{
						this.fechar()
					});
			}, err => {
				this.functions.load.dismiss();
				console.log(err);
				this.functions.showAlert("Erro! Por favor tente novamente.");
			});
	}

	fechar() {
		this.navCtrl.pop();
	}
}
