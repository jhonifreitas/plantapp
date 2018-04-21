import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { FunctionsDefaultProvider } from '../../providers/functions-default/functions-default';
import { StorageProvider } from '../../providers/storage/storage';
import { ServiceProvider } from '../../providers/service/service';

/**
 * Generated class for the CamerasFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  	selector: 'page-cameras-form',
  	templateUrl: 'cameras-form.html',
})
export class CamerasFormPage {

	private formCamera: FormGroup
	private id: number
	private active: number

  	constructor(public navCtrl: NavController, 
  				public navParams: NavParams,
  				private formBuilder: FormBuilder,
				private functions: FunctionsDefaultProvider,
				private storage: StorageProvider,
				private service: ServiceProvider) {
  		this.formCamera = this.formBuilder.group({
			name: ['', Validators.required],
			url: ['', Validators.required],
		});
  	}

  	ionViewDidLoad() {
    	if (this.navParams.get('camera')) {
			let camera = this.navParams.get('camera')
			this.id = camera.id;
			this.active = camera.active;
			this.formCamera.get('name').setValue(camera.name);
			this.formCamera.get('url').setValue(camera.url);
		}
  	}

  	save() {
		this.functions.loading("Aguarde...");

		let dados:any = this.formCamera.value
		dados.client_id = this.storage.getUser().client_id

		if (this.id) {
			dados.id = this.id
		}if (this.active) {
			dados.active = this.active
		}

		this.service.call_api('setCameras', dados)
			.subscribe(data => {
				this.functions.load.dismiss();
				this.functions.showAlertReturn('Sucesso!', 'Câmera salvo!')
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
