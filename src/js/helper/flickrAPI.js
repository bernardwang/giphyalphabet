/**
 *
 *	flickrAPI.js
 *
 *	Flickr API helper functions
 *
 *	Response format:
 *	-Collections: gallery categories/pages
 *		-Photosets: page items
 *			-Photos: item photos
 *
 */

import { $http } from './http';

const defaultArgs = {
	api_key: '7b408cc78c673ca31f5f105d9a28c601',
	collection_id: '72157665082008986',
	user_id: '139316082@N06',
	format: 'json',
	nojsoncallback: '1',
}

/**
 *	Validates Flickr API Response and transforms to JSON
 */
const checkResponse = function checkAPIResponse(response) {
	let data = JSON.parse(response);
	if( 'stat' in data && data.stat === 'fail' ) { // Flickr api stat
		throw new Error('APIResponseError');
	}
	return data;
};

/**
 *	Flickr API, get collections of photosets
 */
const collectionAPI = function collectionAPICall() {
	// Flickr API
	const url = 'https://www.flickr.com/services/rest/';
	const args = {
		method: 'flickr.collections.getTree',
		api_key: defaultArgs.api_key,
		collection_id: defaultArgs.collection_id,
		user_id: defaultArgs.user_id,
		format: defaultArgs.format,
		nojsoncallback: defaultArgs.nojsoncallback,
	};

	return $http(url)
		.get(args)
		.then((response) => checkResponse(response));
};

/**
 *	Flickr API, get photos in photosets
 */
const photosetAPI = function photosetAPICall(set_id) {
	// Flickr API
	const url = 'https://www.flickr.com/services/rest/';
	const args = {
		method: 'flickr.photosets.getPhotos',
		api_key: defaultArgs.api_key,
		photoset_id: set_id,
		user_id: defaultArgs.user_id,
		format: defaultArgs.format,
		nojsoncallback: defaultArgs.nojsoncallback,
	};

	return $http(url)
		.get(args)
		.then((response) => checkResponse(response));
};

export {
	collectionAPI, photosetAPI
};
