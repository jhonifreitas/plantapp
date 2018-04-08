import { Injectable } from '@angular/core';
import { AlertController, ModalController, LoadingController } from 'ionic-angular';

/*
  Generated class for the FunctionDefaultProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FunctionsDefaultProvider {

	public load: any;

  	constructor(public modalCtrl: ModalController,
				public loadingCtrl: LoadingController,
                public alertCtrl: AlertController) {
    
  	}

  	openModal(page, param = null, call = false) {
    	let modal = this.modalCtrl.create(page, param);
        if(call){
            return new Promise((resolve) => {
                modal.onDidDismiss(data => {
                    resolve(data) 
                })
                modal.present()
            })
        }else{
    	    modal.present()
        }
  	}

  	loading(text) {
	  	this.load = this.loadingCtrl.create({
            spinner: 'crescent',
	    	content: text
	  	});

	  	this.load.present();
	}

    showAlert(text, title = 'Atenção!'){        
        let alert = this.alertCtrl.create({
          	title: title,
          	message: text,
          	buttons: ['Ok']
        });
        alert.present();
    }

    showAlertReturn(title, text){        
        return new Promise((resolve) => {
            let alert = this.alertCtrl.create({
                title: title,
                message: text,
                buttons: [{
                    text: 'Ok',
                    handler: () => {
                        resolve(true);
                    }
                }]
            });
            alert.present();
        })
    }

    showAlertConfirm(title, text, confirm = 'Confirmar', cancel = 'Cancelar'){
        return new Promise((resolve, reject) => {
            let alert = this.alertCtrl.create({
                title: title || 'Atenção',
                message: text || 'Deseja mesmo continuar?',
                buttons: [
                    {
                        text: cancel,
                        role: 'cancel',
                        handler: () => {
                            reject(false);
                        }
                    },
                    {
                        text: confirm,
                        handler: () => {
                            resolve(true);
                        }
                    }
                ]
            });
            alert.present();
        });
    }
}
