import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { FunctionsDefaultProvider } from '../../providers/functions-default/functions-default';
import { StorageProvider } from '../../providers/storage/storage';
import { ServiceProvider } from '../../providers/service/service';
import { GruposFormPage } from '../grupos-form/grupos-form';

/**
 * Generated class for the GruposPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
	selector: 'page-grupos',
	templateUrl: 'grupos.html',
})
export class GruposPage {

	private grupos: any

	constructor(public navCtrl: NavController, 
				public navParams: NavParams,
				private service: ServiceProvider, 
				private storage: StorageProvider,
				private functions: FunctionsDefaultProvider) {
	}

	ionViewWillEnter(refresh = null) {
		if (!refresh) {
			this.functions.loading('Aguarde...')
		}
		this.service.call_api('getGrupos', {client_id: this.storage.getUser().client_id})
			.subscribe(data => {
				this.grupos = data.json().data;
				if (refresh) {
					refresh.complete()
				}else{
					this.functions.load.dismiss();
				}
			}, err => {
				if (refresh) {
					refresh.complete()
				}else{
					this.functions.load.dismiss();
				}
				console.log(err);
			});
	}

	inserir() {
		this.navCtrl.push(GruposFormPage);
	}

	editar(grupo, item) {
		item.close();
		this.navCtrl.push(GruposFormPage, { grupo: grupo });
	}

	excluir(grupo) {
		this.functions.loading("Excluindo...");
		this.service.call_api('setGrupo', { id: grupo.id, name: grupo.name, active: 0 })
			.subscribe(data => {
				this.functions.load.dismiss();
				this.functions.showAlertReturn('Sucesso!', 'Local excluido!')
					.then(()=>{
						this.ionViewWillEnter();
					});
			}, err => {
				this.functions.load.dismiss();
				console.log(err);
				this.functions.showAlert('Erro! Por favor tente novamente.');
			});
	}

	refresh(pRefresh) {
		setTimeout(() => {
			this.ionViewWillEnter(pRefresh);
		});
	}

	alertConfirm(id, item) {
		item.close();
		this.functions.showAlertConfirm('Deseja mesmo excluir?', '')
			.then(data => {
				this.excluir(id);
			}).catch(() => {});
	}

}
