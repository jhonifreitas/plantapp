import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { FunctionsDefaultProvider } from '../../providers/functions-default/functions-default';
import { StorageProvider } from '../../providers/storage/storage';
import { ServiceProvider } from '../../providers/service/service';
import { UsuariosFormPage } from '../usuarios-form/usuarios-form';

/**
 * Generated class for the UsuariosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
	selector: 'page-usuarios',
	templateUrl: 'usuarios.html',
})
export class UsuariosPage {

	private users: any = []

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
		this.service.call_api('getUsuarios', {client_id: this.storage.getUser().client_id})
			.subscribe(data => {
				this.users = data.json().data;
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
		this.navCtrl.push(UsuariosFormPage);
	}

	editar(user, item) {
		item.close();
		this.navCtrl.push(UsuariosFormPage, { user: user });
	}

	senha(user, item) {
		item.close();
		this.navCtrl.push(UsuariosFormPage, { user: user, senha: true});
	}

	excluir(user) {
		user.active = 0
		this.functions.loading("Excluindo...");
		this.service.call_api('setUsuario', user)
			.subscribe(data => {
				this.functions.load.dismiss();
				this.functions.showAlertReturn('Sucesso!', 'Usuários excluido!')
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

	checkPermission(permission){
		return this.functions.checkPermission('usuarios', permission)
	}
}
