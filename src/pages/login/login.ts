import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { FunctionsDefaultProvider } from '../../providers/functions-default/functions-default';
import { StorageProvider } from '../../providers/storage/storage';
import { ServiceProvider } from '../../providers/service/service';
import { DashboardPage } from '../dashboard/dashboard';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  	selector: 'page-login',
  	templateUrl: 'login.html',
})
export class LoginPage {

	private formLogin: FormGroup

  	constructor(public navCtrl: NavController, 
  				public navParams: NavParams,
  				private formBuilder: FormBuilder,
				private functions: FunctionsDefaultProvider,
				private service: ServiceProvider,
				private storage: StorageProvider,) {
  		
  		if (this.storage.getUser()) {
  			this.navCtrl.setRoot(DashboardPage)
  		}

  		this.formLogin = this.formBuilder.group({
			username: ['', Validators.required],
			password: ['', Validators.required],
		})
  	}

  	auth(){
  		this.functions.loading('Aguarde...')

  		let dados:any = new Object

  		dados = this.formLogin.value

  		this.service.call_api('login', dados)
			.subscribe(data => {
				let result:any = data.json()
				if (result.status) {
					this.storage.setUser(result.data)
					this.navCtrl.setRoot(DashboardPage)
				}else{
					this.functions.showAlert(result.data)
				}
				this.functions.load.dismiss()
			},err => {
				console.log(err)
				this.functions.load.dismiss()
			})
  	}
}
