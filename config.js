module.exports = {
	siteName: "Disaster Asset Manager",
	description: "Use this site to manage and maintain map assets for relief responses.",
	db: "arc_assets",
	port: 8888,
	mapboxId: "kevinlustig.n0dmkkj4",
	mapboxToken: "pk.eyJ1Ijoia2V2aW5sdXN0aWciLCJhIjoiNDgzNDhhNzRhMzRhN2FlOGEzZDkzOWNkMDcyMDIzMzIifQ.2fQQqIf5HJsjHjMPsvNTOQ",
	asset_opts: {
		geolocation: true,
		types: [
			"Map",
			"Web Map",
			"Infographic",
			"Situation Report"
		],
		tags: {
			"Extent": {
				required: false,
				values: [
					"Arghakhanchi",	"Bagmati",	"Bara",	"Bhaktapur",	"Chitawan",	"Dhading",	"Dhanusa",	"Dhaualagiri",	"Dolakha",	"Gandaki",	"Ghorkha",	"Gulmi",	"Janakpur",	"Kapilbastu",	"Kaski",	"Kathmandu",	"Kavrepalanchok",	"Koshi",	"Lalitpur",	"Lamjung",	"Lumbini",	"Mahottari",	"Makwanpur",	"Manang",	"Mechi",	"Narayani",	"Nawalparasi",	"Nepal",	"Nuwakot",	"Okhaldhunga",	"Palpa",	"Parsa",	"Ramechhap",	"Rapti",	"Rasuwa",	"Rautahat",	"Rupandehi",	"Sagarmatha",	"Sarlahi",	"Sindhuli",	"Sindhupalchok",	"Syangja",	"Tanahu",	"World"
				]
			},
			"Sector": {
				required: true,
				values: [
					"3W",
					"Accessibility",
					"Admin-boundaries",
					"Affected",
					"Allocation",
					"AmericanRedCross",
					"Atlas-map",
					"Baseline",
					"Coordination",
					"Damage",
					"Distributions",
					"Earthquake",
					"Health",
					"Hillshade",
					"Hubs",
					"IDP-Camps",
					"IRA",
					"Logistics",
					"NRCS",
					"Population",
					"Priority",
					"RedCrossRedCrescent",
					"Roads",
					"Shelter",
					"VDC",
					"Web-map"
				]
			}
		}
	}
}
