import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { CamerasFormPage } from '../cameras-form/cameras-form';
import { FunctionsDefaultProvider } from '../../providers/functions-default/functions-default';
import { StorageProvider } from '../../providers/storage/storage';
import { ServiceProvider } from '../../providers/service/service';

import { DomSanitizer } from '@angular/platform-browser';

/**
 * Generated class for the CamerasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
	selector: 'page-cameras',
	templateUrl: 'cameras.html',
})
export class CamerasPage {

	private cameras: any = []
	private showVideo:number;

	constructor(public navCtrl: NavController, 
				public navParams: NavParams,
				private service: ServiceProvider, 
				private storage: StorageProvider,
				private functions: FunctionsDefaultProvider,
				private sanitizer: DomSanitizer) {
	}

	ionViewWillEnter() {
		this.functions.loading('Aguarde...')
		this.service.call_api('getCameras', {client_id: this.storage.getUser().client_id})
			.subscribe(data => {
				this.cameras = data.json().data;
				this.functions.load.dismiss();
			}, err => {
				this.functions.load.dismiss();
				console.log(err);
				this.functions.showAlert('Não foi possivel carregar os videos.')
			});
	}

	inserir() {
		this.navCtrl.push(CamerasFormPage);
	}

	editar(camera, item) {
		item.close();
		this.navCtrl.push(CamerasFormPage, { camera: camera });
	}

	excluir(camera) {
		camera.active = 0
		this.functions.loading("Excluindo...");
		this.service.call_api('setCameras', camera)
			.subscribe(data => {
				this.functions.load.dismiss();
				this.functions.showAlertReturn('Sucesso!', 'Camera excluida!')
					.then(()=>{
						this.ionViewWillEnter();
					});
			}, err => {
				this.functions.load.dismiss();
				console.log(err);
				this.functions.showAlert('Erro! Por favor tente novamente.');
			});
	}

	alertConfirm(id, item) {
		item.close();
		this.functions.showAlertConfirm('Deseja mesmo excluir?', '')
			.then(data => {
				this.excluir(id);
			}).catch(() => {});
	}

	getUrl(url){
		return this.sanitizer.bypassSecurityTrustResourceUrl(url)
	}

	openVideo(index) {
	    if (this.isVideoShow(index)) {
	        this.showVideo = null;
	    } else {
	        this.showVideo = index;
	    }
	}
	isVideoShow(index) {
	    return this.showVideo === index;
	}

	checkPermission(permission){
		return this.functions.checkPermission('cameras', permission)
	}
}
