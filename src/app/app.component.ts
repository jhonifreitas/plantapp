import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

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

	pages: Array<{title: string, component: any, icon: string}>;

	constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
		this.initializeApp();

		// used for an example of ngFor and navigation
		this.pages = [
			{ title: 'Dashboard', component: DashboardPage, icon: 'md-pie' },
			{ title: 'Locais', component: LocalPage, icon: 'md-map' },
			{ title: 'Câmeras', component: CamerasPage, icon: 'md-camera' },
			{ title: 'Grupos', component: GruposPage, icon: 'md-people' },
			{ title: 'Usuários', component: UsuariosPage, icon: 'md-person-add' },
			{ title: 'Alterar Senha', component: UsuariosFormPage, icon: 'md-lock' },
		];

	}

	initializeApp() {
		this.platform.ready().then(() => {
			// Okay, so the platform is ready and our plugins are available.
			// Here you can do any higher level native things you might need.
			this.statusBar.styleDefault();
			this.splashScreen.hide();
		});
	}

	openPage(page) {
		// Reset the content nav to have just this page
		// we wouldn't want the back button to show in this scenario
		this.nav.setRoot(page);
	}

	logout(){
		localStorage.removeItem('user')
		this.nav.setRoot(LoginPage)
	}
}
