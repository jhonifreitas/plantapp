import { Injectable } from '@angular/core';

/*
  Generated class for the StorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StorageProvider {

  	constructor() {
  		
  	}

  	setUser(dados){
  		localStorage.setItem('user', JSON.stringify(dados));
  	}

  	getUser(){
  		return JSON.parse(localStorage.getItem('user'));
  	}

    setPermissions(dados){
      localStorage.setItem('permissions', JSON.stringify(dados));
    }

    getPermissions(){
      return JSON.parse(localStorage.getItem('permissions'));
    }

    setConfig(dados){
      localStorage.setItem('config', JSON.stringify(dados));
    }

    getConfig(){
      return JSON.parse(localStorage.getItem('config'));
    }

}