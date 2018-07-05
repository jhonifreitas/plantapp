import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { FunctionsDefaultProvider } from '../../providers/functions-default/functions-default';
import { StorageProvider } from '../../providers/storage/storage';
import { ServiceProvider } from '../../providers/service/service';

/**
 * Generated class for the ConfigurationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  	selector: 'page-configuration',
  	templateUrl: 'configuration.html',
})
export class ConfigurationPage {

	private formConfiguration: FormGroup

  	constructor(public navCtrl: NavController, 
  				public navParams: NavParams,
  				private formBuilder: FormBuilder,
				private functions: FunctionsDefaultProvider,
				private storage: StorageProvider,
				private service: ServiceProvider) {

  		this.formConfiguration = this.formBuilder.group({
			host_api_local: ['', Validators.required]
		});
  	}

  	ionViewDidLoad() {
  		if(this.storage.getConfig()){
  			this.formConfiguration.get('host_api_local').setValue(this.storage.getConfig().host_api_local)
  		}
  	}

  	save(){
  		this.functions.loading('Aguarde...')

  		let dados:any = this.formConfiguration.value

  		this.storage.setConfig(dados)

  		if (this.storage.getUser()) {
  			
  			dados.id = this.storage.getUser().client_id
  			dados.active = 1;
	  		
	  		this.service.call_api('setClient', dados)
				.subscribe(data => {
					this.functions.load.dismiss();
					this.functions.showAlertReturn('Sucesso!', 'Configurações salvas!')
						.then(()=>{
							if(this.navCtrl.getViews().length > 1){
								this.fechar()
							}
						});
				}, err => {
					this.functions.load.dismiss();
					console.log(err);
					this.functions.showAlert("Erro! Por favor tente novamente.");
				});
  		}else{
  			this.functions.load.dismiss();
			this.functions.showAlertReturn('Sucesso!', 'Configurações salvas!')
				.then(()=>{
					if(this.navCtrl.getViews().length > 1){
						this.fechar()
					}
				});
  		}
  	}

  	fechar() {
		this.navCtrl.pop();
	}
}
