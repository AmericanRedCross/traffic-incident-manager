<<<<<<< HEAD
# Disaster Asset Manager

**American Red Cross and Kevin Lustig**

A Node.js server that enables storing and maintaining assets for disaster relief such as situation reports and maps. Assets can be accessed for display and use via a robust API.

## Installation

**Install via NPM**

```console
npm install
```

**Install Dependencies**

Some modules have additional dependencies:

* [imagemagick](http://www.imagemagick.org/script/index.php)
* [ghostscript](http://www.ghostscript.com/)
* [poppler-utils](http://poppler.freedesktop.org/)
* libvips

On Ubuntu, run:

```console
sudo apt-get imagemagick ghostscript poppler-utils
```

For other systems, please refer to the documentation for individual dependencies.

For more information on installing and configuring libvips properly, visit the [Sharp project](http://sharp.dimens.io/en/stable/install/).

**Configure the application by modifying config.js in the project directory.**

* **siteName (string)**: The name of the site as it will be displayed to your users in the site header.
* **description (string)**: The description of the site as it will be displayed to your users on the homepage.
* **db (string)**: The name of the MongoDB database you will use for this application (will store users, assets, and asset files.) When you start the application for the first time, this database will be created if it doesn't already exist.
* **port (integer)**: The port at which to run the application's public-facing server. If you do not have any other HTTP activity on your server, use port **80**. 
* **mapboxId (string)**: The project ID for the MapBox project you want to use to provide tiles for maps used for geolocation activities
* **mapboxToken (string)**: The Mapbox public access token to use to provide tiles for maps used for geolocation activities
* **asset_opts > geolocation (boolean)**: Whether or not to show the geolocation controls in order to assign longitude/latitude coordinates to assets
* **asset_opts > types (array)**: The different document types that can be assigned to assets
* **asset_opts > tags (object)**: Customized sets of tags that can be assigned to assets. Each set of tags has a name (the key) and two properties: 
	* **required (boolean)**: Whether or not the user is required to provide at least one tag in this set in order to save an asset
	* **values (array)**: The text values for the tags in this set

**Start the application**

```console
node server
```

**Visit the application in your browser**

If you used port 80, the URL should simply be the IP address or URL of the server where you're running the application

```console
http://www.mydomain.com
```

If you used any other port, specify the port along with the IP address/URL (or set up a Virtual Host as appropriate to redirect traffic to the correct port)

```console
http://www.myassetmanager.com:myport
```

e.g.,

```console
http://www.redcross.org:8888
```

**Log in with the default super user**

```console
defaultUser@redcross.org/pa$$w0rd
```

**Go to /users and create a new user**

***Very Important:*** **Delete the default super user**

## Run the Application

You'll want to keep the application up and running on your server. There are multiple tools that will help you do this. We recommend [PM2](https://github.com/Unitech/pm2) or [Forever](https://github.com/foreverjs/forever).

### PM2

**Install PM2**

```console
sudo npm install pm2 -g
```

**Start the Asset Manager**

From the directory where the Asset Manager is installed:

```console
pm2 start server.js
```

**Restart the Asset Manager with your server**

To have the Asset Manager restart itself after a reboot, server downtime, etc., you can generate a startup script. 

Check the [PM2 documentation](https://github.com/Unitech/pm2#startup-script-generation) on this for more details.

## API

The API methods provide access to the data in the asset manager in JSON format from any domain. Assets that are not marked as public are only accessible to users with ownership or super user permissions via the use of access tokens.

### Methods

All methods are accessible via GET request. 

Successful requests are responded to with the property **success: true** and a **response** property containing the data payload.

Failed requests or requests that produce no data are responded to with the property **success: false** and a human readable error message. 

**/api/asset/[id]**

Returns the data for a single asset identified by its MongoDB ID. If an asset cannot be found with the provided ID or the user doesn't have permission to view that asset, a failure response is provided.

**/api/asset/[id]/file**

Returns the file associated with a single asset identified by its MongoDB ID. Returns a file for download if successful, or a 404 response if the file cannot be found. 

**/api/asset/[id]/thumbnail/[size]**

Returns the thumbnail at any size, specified by a width in pixels, associated with a single asset identified by its MongoDB ID. Returns a file if successful, or a 404 response if the thumbnail cannot be found. 

Notes on thumbnails:

* Only PDF file uploads have thumbnails generated by the system. Future versions of this tool will provide thumbnails for other file types.
* Before trying to access an asset's thumbnail via the API, check for the "thumbnail" property of the asset object. If it is not defined, the asset does not have a thumbnail.
* Assets can have a maximum of one thumbnail. When an asset is updated with a new file, a new thumbnail is automatically generated.

**/api/assets**

Returns the data for all public assets by default. If an access token is provided, additional assets will be included as appropriate. 

Query parameters can also be included in the request, and results will be filtered to match these criteria. Parameters that do not match the asset schema will be ignored.

**Note:** In order to filter on nested properties of objects, such as tags, use dot notation. For example:

```console
/api/assets?tag.Sector=AmericanRedCross 
```

**Some More Examples**

```console
/api/assets?type=sitrep 
```

Limits the results to assets tagged as Situation Reports. 

```console
/api/assets?extent=World&extent=Nepal 
```

Limits the results to assets tagged as relevant to the World **or** to Nepal. 

```console
/api/assets?foo=bar 
```

Does nothing.

### Authentication

All authentication methods use the authentication gateway at **/api/authenticate**.

#### Pass-Through Method

To enable users of a different site or application to authenticate for API requests, use the pass-through method. 

Direct your users to the authentication gateway with your site's URL appended as the "from" value, like so:

```console
http://www.myassetmanager.com:myport/api/authenticate?from=www.myotherapplication.com
```

***Note:*** *Do not use "http://" or "https://" in the "from" URL.*

Once users provide their credentials, they will be redirected back to the URL you provided with a token parameter appended to the URL. 

```console
http://www.myotherapplication.com?token=12345.67890.12345
```

Use this token in your code to make API requests on behalf of the authenticated user.

#### AJAX Method

To avoid having to direct users to the authentication gateway, you can also use the AJAX method to submit user credentials to the asset manager to get an access token. 

Send the user's **email** and **password** via a POST request to the authentication gateway at:

```console
http://www.myassetmanager.com:myport/api/authenticate
```

If the credentials are valid, you will receive a success response that looks like:

```console
{
	success: true,
	response: {
		token: 12345.67890.12345
	}
}
```

#### Using the Access Token

Regardless of which method you use, tokens are valid for 24 hours from issue. 

To use an access token, append the token to your API requests in one of two ways:

**As a GET query parameter**

```console
http://www.myassetmanager.com:myport/api/assets?token=12345.67890.12345
```

**As a request header**

```console
x-access-token: 12345.67890.12345
```

## Customizing the Interface

All local resources for the default Asset Manager interface are in the "client" directory. 

**Templates**

Most pages are templated using Handlebars in conjunction with Express from within the Node application. These templates can be found in the "views" directory.

Components of the interface that display data fetched via AJAX (right now, just the create/edit modals) are rendered via Handlebars in the browser. These templates can be found in the "client/js/views" directory.

**Logos**

A Handlebars helper displays the logos in the footer. It scrapes the "client/media/logos" directory for files and displays each as an image. 

To modify these logos, simply add or remove files from that directory. 

=======
# traffic-incident-manager
tool for logging and visualizing road traffic incidents for Kenya Red Cross, Machakos Branch
>>>>>>> a65dba007a3517956006b5f365020f9d92ca536b
