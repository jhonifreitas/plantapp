import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer'
import { Camera, CameraOptions } from '@ionic-native/camera'

import { FunctionsDefaultProvider } from '../../providers/functions-default/functions-default';
import { StorageProvider } from '../../providers/storage/storage';
import { ServiceProvider } from '../../providers/service/service';

/**
 * Generated class for the UsuariosFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
	selector: 'page-usuarios-form',
	templateUrl: 'usuarios-form.html',
})
export class UsuariosFormPage {

	private formUser: FormGroup
	private grupos:any
	private id: number
	private active: number
	private alterPassword: boolean = false
	private hidePassword: boolean = true
	private profilePhoto: string = 'assets/imgs/user.png';
	private upload: boolean = false;

	constructor(public navCtrl: NavController, 
				public navParams: NavParams,
				private formBuilder: FormBuilder,
				private functions: FunctionsDefaultProvider,
				private storage: StorageProvider,
				private service: ServiceProvider,
				private transfer: FileTransfer,
                private camera: Camera,
                public plt: Platform) {

		this.formUser = this.formBuilder.group({
			name: ['', Validators.required],
			group_id: ['', Validators.required],
			phone: ['', Validators.required],
			email: ['', Validators.required],
			username: ['', Validators.required],
			password: [''],
		});
	}

	ionViewDidLoad() {
		this.functions.loading('Aguarde...')
		this.service.call_api('getGrupos', {client_id: this.storage.getUser().client_id})
			.subscribe(data => {
				this.grupos = data.json().data;
				this.functions.load.dismiss();
			}, err => {
				this.functions.load.dismiss();
				console.log(err);
			});

		if (this.navParams.get('user')) {
			let user = this.navParams.get('user')
			this.setValues(user)
			if (this.navParams.get('senha')) {
				this.alterPassword = true
				this.hidePassword = false
			}
		}else if (this.navParams.get('local')){
			this.setValues(this.storage.getUser())
		}else{
			this.formUser.get('password').setValidators(Validators.required)
			this.hidePassword = false
		}
	}

	setValues(user){
		this.id = user.id;
		this.active = user.active;
		this.formUser.get('name').setValue(user.name);
		this.formUser.get('group_id').setValue(user.group_id);
		this.formUser.get('phone').setValue(user.phone);
		this.formUser.get('email').setValue(user.email);
		this.formUser.get('username').setValue(user.username);
	}

	save() {
		this.functions.loading("Aguarde...");

		let dados:any = this.formUser.value
		dados.client_id = this.storage.getUser().client_id

		if (this.id) {
			dados.id = this.id
		}if (this.active) {
			dados.active = this.active
		}if (this.alterPassword) {
			dados.changePassword = true
		}

		this.service.call_api('setUsuario', dados)
			.subscribe(data => {
				if (data.json().status) {
					if(this.upload){
	                    this.uploadImagem()
	                }else{
	                    this.functions.load.dismiss()
	                    this.functions.showAlertReturn('Sucesso!', 'Perfil editado com sucesso')
	                        .then(() => {
	                            this.fechar()
	                        })
	                }
				}
			}, err => {
				this.functions.load.dismiss();
				console.log(err);
				this.functions.showAlert("Erro! Por favor tente novamente.");
			});
	}

	changePhoto(){
        this.functions.showAlertConfirm('Atenção', 'Escolha uma das opções para carregar a imagem', 'Camera', 'Galeria')
            .then(() => {
                this.getCamera()
            },() => {
                this.getGaleria()
            })
    }

    uploadImagem(){
        const fileTransfer: FileTransferObject = this.transfer.create();

        let options: FileUploadOptions = {  
            fileKey: "file",
            fileName: this.profilePhoto.substr(this.profilePhoto.lastIndexOf('/')+1),
            chunkedMode: false,
            params: {
                'user_id': this.storage.getUser().id,
            }
        }

        fileTransfer.onProgress((progressEvent: ProgressEvent) => {
            let porcent = Math.floor(progressEvent.loaded / progressEvent.total * 100)+"%"
            console.log(porcent)
        });

        fileTransfer.upload(this.profilePhoto, this.service.API_URL+'uploadImage', options)
            .then((data) => {
                this.functions.load.dismiss()
                this.functions.showAlertReturn('Sucesso!', 'Perfil editado com sucesso')
                	.then(()=>{
                		this.fechar()
                	})
            }, (error) => {
                console.log(error)
                this.functions.load.dismiss();
                this.functions.showAlert('Atenção', 'Não foi possível enviar sua imagem...');
            })
    }

    getCamera(){    
        const options: CameraOptions = {
            quality: 80,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            correctOrientation: true,
        }

        this.camera.getPicture(options).then((imageData) => {
            if (this.plt.is('ios')) {
                this.profilePhoto = imageData.replace(/^file:\/\//, '');
            }else{
                this.profilePhoto = imageData;
            }
            this.upload = true;
        }, (error) => {
            console.log(error)
        });
    }


    getGaleria(){
        const options: CameraOptions = {
            quality: 80,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            encodingType: this.camera.EncodingType.JPEG,
            correctOrientation: true,
        }

        this.camera.getPicture(options).then((imageData) => {          
            var caminho = imageData.slice(0, imageData.lastIndexOf('/')+1);
            var novaImg = imageData.substr(imageData.lastIndexOf('/')+1);
            var cortaImagem = novaImg.slice(0, novaImg.indexOf('?'));
            var finalImagem = caminho+cortaImagem;

            if (this.plt.is('ios')) {
                this.profilePhoto = imageData.replace(/^file:\/\//, '');
            }else{
                this.profilePhoto = finalImagem;
            }
            this.upload = true;
        }, (error) => {
            console.log(error)
        });
    }

	fechar() {
		this.navCtrl.pop();
	}
}
