module.exports = {
	siteName: "Traffic Incident Reporter",
	description: "Use this site to store and maintain data collected by Kenya Red Cross, Machakos branch on traffic incidents.",
	db: "machakos_incidents",
	port: 8888,
	// // if using MapBox tiles also uncomment lines in client/js/assets.js
	// mapTilesURL: 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}',
	// mapboxId: "kevinlustig.n0dmkkj4",
	// mapboxToken: "pk.eyJ1Ijoia2V2aW5sdXN0aWciLCJhIjoiNDgzNDhhNzRhMzRhN2FlOGEzZDkzOWNkMDcyMDIzMzIifQ.2fQQqIf5HJsjHjMPsvNTOQ",
	// mapAttribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
  //  // if using an open tile server
	mapTilesURL: "http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
	mapAttribution: 'Map data &copy; <a href="http://openstreetmap.org" target="_blank">OpenStreetMap</a> | Map style by <a href="http://hot.openstreetmap.org" target="_blank">H.O.T.</a>',
	startingLatLng: [-1.5264, 37.2721],
	startingZoom: 13,
	asset_opts: {
		geolocation: true,
		types: [
			"typeI",
			"typeII",
			"typeIII",
			"typeIV"
		],
		tags: {
			"tag01": {
				required: false,
				values: [
					"tag01A",	"tag01B",	"tag01C",	"tag01D"
				]
			},
			"tag02": {
				required: true,
				values: [
					"tag02A",	"tag02B",	"tag02C",	"tag02D"
				]
			}
		}
	}
}
