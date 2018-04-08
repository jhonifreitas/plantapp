import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { FunctionsDefaultProvider } from '../../providers/functions-default/functions-default';
import { StorageProvider } from '../../providers/storage/storage';
import { ServiceProvider } from '../../providers/service/service';
/**
 * Generated class for the GruposFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
	selector: 'page-grupos-form',
	templateUrl: 'grupos-form.html',
})
export class GruposFormPage {

	private formGrupo: FormGroup
	private opcoes:any
	private id: number
	private active: number

	constructor(public navCtrl: NavController, 
				public navParams: NavParams,
				private formBuilder: FormBuilder,
				private functions: FunctionsDefaultProvider,
				private storage: StorageProvider,
				private service: ServiceProvider) {
		this.formGrupo = this.formBuilder.group({
			name: ['', Validators.required],
			dashboard: [[]],
			locais: [[]],
			plantacoes: [[]],
			cameras: [[]],
		});

		this.opcoes = [
            { value: 'view', name: 'Visualizar' },
            { value: 'add', name: 'Adicionar' },
            { value: 'edit', name: 'Editar' },
            { value: 'del', name: 'Excluir' }
        ];
	}

	ionViewDidLoad() {
		if (this.navParams.get('grupo')) {
			let grupo = this.navParams.get('grupo')
			this.id = grupo.id;
			this.active = grupo.active;


			if(grupo.permissions.dashboard){
				this.checkPermission(grupo.permissions.dashboard, 'dashboard')
			}if(grupo.permissions.locais){
				this.checkPermission(grupo.permissions.locais, 'locais')
			}if(grupo.permissions.plantacoes){
				this.checkPermission(grupo.permissions.plantacoes, 'plantacoes')
			}if(grupo.permissions.cameras){
				this.checkPermission(grupo.permissions.cameras, 'cameras')
			}

			this.formGrupo.get('name').setValue(grupo.name);
		}
	}

	save() {
		this.functions.loading("Aguarde...");

		let dados:any = this.formGrupo.value
		dados.client_id = this.storage.getUser().client_id

		if (this.id) {
			dados.id = this.id
		}if (this.active) {
			dados.active = this.active
		}

		this.service.call_api('setGrupo', dados)
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

	checkPermission(permissions, input){
		let values:any = Array();
		for (let permission of permissions) {
			values.push(permission)
		}
		this.formGrupo.get(input).setValue(values)
	}

	fechar() {
		this.navCtrl.pop();
	}

}
