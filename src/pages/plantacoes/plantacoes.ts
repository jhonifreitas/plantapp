import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { FunctionsDefaultProvider } from '../../providers/functions-default/functions-default';
import { StorageProvider } from '../../providers/storage/storage';
import { ServiceProvider } from '../../providers/service/service';
import { PlantacoesFormPage } from '../plantacoes-form/plantacoes-form';

/**
 * Generated class for the PlantacoesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
	selector: 'page-plantacoes',
	templateUrl: 'plantacoes.html',
})
export class PlantacoesPage {

	private plants: any = []
	private local: any

	shownGroup = null;

	constructor(public navCtrl: NavController, 
				public navParams: NavParams,
				private service: ServiceProvider, 
				private storage: StorageProvider,
				private functions: FunctionsDefaultProvider) {
		this.local = this.navParams.get('local')
	}

	ionViewWillEnter(refresh = null) {
		if (!refresh) {
			this.functions.loading('Aguarde...')
		}
		this.service.call_api('getPlantacoes', {place_id: this.local.id})
			.subscribe(data => {
				this.plants = data.json().data;
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
		this.navCtrl.push(PlantacoesFormPage, { local: this.local });
	}

	editar(plant, item) {
		item.close();
		this.navCtrl.push(PlantacoesFormPage, { local: this.local, plant: plant });
	}

	excluir(local) {
		this.functions.loading("Excluindo...");
		this.service.call_api('setPlantacao', { id: local.id, name: local.name, active: 0 })
			.subscribe(data => {
				this.functions.load.dismiss();
				this.functions.showAlertReturn('Sucesso!', 'Plantação excluida!')
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

	changeStatus(event, id) {
		this.functions.loading('Aguarde...');
		let status = 0;
		let ligado = "desligado";
		if (event.value) {
			status = 1;
			ligado = "ligado";
		}
		this.service.call_api('changeStatusPlantation', { id: id, status: status })
			.subscribe(data => {
				console.log(data)
				this.functions.load.dismiss();
			}, err => {
				this.functions.load.dismiss();
				console.log(err);
				this.functions.showAlert('Erro! Por favor tente novamente.');
			});
	}

	toggleGroup(group) {
	    if (this.isGroupShown(group)) {
	        this.shownGroup = null;
	    } else {
	        this.shownGroup = group;
	    }
	}
	isGroupShown(group) {
	    return this.shownGroup === group;
	}

	checkPermission(permission){
		return this.functions.checkPermission('plantacoes', permission)
	}
}
