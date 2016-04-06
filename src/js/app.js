import 'babel-polyfill';
import { initGallery } from './helper/initGallery';

global.app = function () {

	initGallery()
		.then((data) => { console.log('Gallery Done',data); })
		.catch((e) => { console.log(e); });
};
