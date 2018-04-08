import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { FunctionsDefaultProvider } from '../../providers/functions-default/functions-default';
import { ServiceProvider } from '../../providers/service/service';

/**
 * Generated class for the PlantacoesFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
	selector: 'page-plantacoes-form',
	templateUrl: 'plantacoes-form.html',
})
export class PlantacoesFormPage {

	private formPlantacao: FormGroup
	private tipos: any
	private local: any
	private id: number
	private active: boolean

	constructor(public navCtrl: NavController, 
				public navParams: NavParams,
				private formBuilder: FormBuilder,
				private functions: FunctionsDefaultProvider,
				private service: ServiceProvider) {
		this.functions.loading('Aguarde...')

		this.formPlantacao = this.formBuilder.group({
			type_id: [[], Validators.required],
			name: ['', Validators.required],
			repeat: [false, Validators.required],
			hour_begin: [{value:'', disabled: true}, Validators.required],
			hour_end: [{value:'', disabled: true}, Validators.required],
		});

		this.formPlantacao.get('repeat').valueChanges.subscribe(val => {
			if (val) {
				this.formPlantacao.get('hour_begin').enable()
				this.formPlantacao.get('hour_end').enable()
			} else {
				this.formPlantacao.get('hour_begin').disable()
				this.formPlantacao.get('hour_end').disable()
			}
		})

		this.service.call_api_get('getTipos')
			.subscribe(data => {
				this.tipos = data.json().data;
				this.functions.load.dismiss();
			}, err => {
				this.functions.load.dismiss();
				console.log(err);
			});
	}

	ionViewDidLoad() {
		this.local = this.navParams.get('local')
		if (this.navParams.get('plant')) {
			let plant = this.navParams.get('plant')
			this.id = plant.id;
			this.active = plant.active;
			
			let types = plant.types
			let typesId:any = Array();
			types.forEach(type => {
				typesId.push(type.id)
			})
			this.formPlantacao.get('type_id').setValue(typesId)
			this.formPlantacao.get('name').setValue(plant.name)
			this.formPlantacao.get('hour_begin').setValue(plant.hour_begin)
			this.formPlantacao.get('hour_end').setValue(plant.hour_end)
			if (plant.repeated == '1') {
				this.formPlantacao.get('repeat').setValue(true)
			}
		}
	}

	save() {
		this.functions.loading("Aguarde...");

		let dados:any = this.formPlantacao.value
		dados.place_id = this.local.id

		if (this.id) {
			dados.id = this.id
		}if (this.active) {
			dados.active = this.active
		}

		this.service.call_api('setPlantacao', dados)
			.subscribe(data => {
				this.functions.load.dismiss();
				this.functions.showAlertReturn('Sucesso!', 'Plantação salvo!')
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
