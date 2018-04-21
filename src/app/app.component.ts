import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { StorageProvider } from '../providers/storage/storage';

import { LoginPage } from '../pages/login/login';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { LocalPage } from '../pages/local/local';
import { CamerasPage } from '../pages/cameras/cameras';
import { GruposPage } from '../pages/grupos/grupos';
import { UsuariosPage } from '../pages/usuarios/usuarios';
import { UsuariosFormPage } from '../pages/usuarios-form/usuarios-form';

@Component({
	templateUrl: 'app.html'
})
export class MyApp {
	@ViewChild(Nav) nav: Nav;

	rootPage: any = LoginPage;

	thumbnail: string
	name: string
	group: string

	profilePage: any = UsuariosFormPage

	pages: Array<{title: string, component: any, icon: string, permission: string}>;

	constructor(public platform: Platform, 
				public statusBar: StatusBar, 
				public splashScreen: SplashScreen,
				private events: Events,
				private storage: StorageProvider) {
		this.initializeApp();

		if (this.storage.getUser()) {
			this.setProfile()
		}
		this.events.subscribe('login',() => {
  			this.setProfile()
  		})
	}

	initializeApp() {
		this.platform.ready().then(() => {
			// Okay, so the platform is ready and our plugins are available.
			// Here you can do any higher level native things you might need.
			this.statusBar.styleDefault();
			this.splashScreen.hide();
		});
	}

	openPage(page, param = null) {
		// Reset the content nav to have just this page
		// we wouldn't want the back button to show in this scenario
		this.nav.setRoot(page, param);
	}

	logout(){
		localStorage.removeItem('user')
		this.nav.setRoot(LoginPage)
	}

	setProfile(){
		this.thumbnail = this.storage.getUser().thumbnail
		this.name = this.storage.getUser().name
		this.group = this.storage.getUser().group.name

		// used for an example of ngFor and navigation
		this.pages = [
			{ title: 'Painel de Controle', component: DashboardPage, icon: 'md-pie', permission: 'dashboard' },
			{ title: 'Locais', component: LocalPage, icon: 'md-map', permission: 'locais' },
			{ title: 'Câmeras', component: CamerasPage, icon: 'md-camera', permission: 'cameras' },
			{ title: 'Grupos', component: GruposPage, icon: 'md-people', permission: 'grupos' },
			{ title: 'Usuários', component: UsuariosPage, icon: 'md-person-add', permission: 'usuarios' },
		];
	}

	checkPermission(permission){
		let result = false
		if(this.storage.getPermissions()[permission]){
			this.storage.getPermissions()[permission].forEach(val=>{
				if (val == 'view') {
					result = true
				}
			})
		}
		return result
	}

	defaultImage(event){
        event.srcElement.attributes[0].value = 'assets/imgs/user.png'
    }
}
