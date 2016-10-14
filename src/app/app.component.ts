/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';

import { AppState } from './app.service';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styles: [
    require('./app.component.css'),
    require('../../node_modules/leaflet/dist/leaflet.css'),
    require('../libs/leaflet/plugins/photos/Leaflet.Photo.css'),
    require('../libs/leaflet/plugins/cluster/MarkerCluster.css'),
    require('../libs/leaflet/plugins/cluster/MarkerCluster.Default.css')
  ],
  template: `
      <router-outlet></router-outlet>
  `
})
export class App {
  constructor(
    public appState: AppState) {

  }

  ngOnInit() {
    console.log('Initial App State', this.appState.state);
  }

}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
