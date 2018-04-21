import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { FunctionsDefaultProvider } from '../../providers/functions-default/functions-default';
import { StorageProvider } from '../../providers/storage/storage';
import { ServiceProvider } from '../../providers/service/service';
import { LocalFormPage } from '../local-form/local-form';
import { PlantacoesPage } from '../plantacoes/plantacoes';

/**
 * Generated class for the LocalListagemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
	selector: 'page-local',
	templateUrl: 'local.html',
})
export class LocalPage {

	private locais: any = []

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
		this.service.call_api('getLocais', {client_id: this.storage.getUser().client_id})
			.subscribe(data => {
				this.locais = data.json().data;
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
		this.navCtrl.push(LocalFormPage);
	}

	editar(local, item) {
		item.close();
		this.navCtrl.push(LocalFormPage, { local: local });
	}

	excluir(local) {
		this.functions.loading("Excluindo...");
		this.service.call_api('setLocal', { id: local.id, name: local.name, active: 0 })
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

	openPlantacoes(local) {
		this.navCtrl.push(PlantacoesPage, { local: local });
	}

	checkPermission(page, permission){
		return this.functions.checkPermission(page, permission)
	}
}
