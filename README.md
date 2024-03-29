# Branda Admin Panel

This is the admin panel that allows Brandeis staff to change the data displayed in the Branda app as well as perform other administrative tasks. This repo is for the version that is being rebuilt in [Next.js](https://nextjs.org/). If you want the version that is currently deployed, go to the [BrandaServer](https://github.com/segalb/BrandaServer) repo.

The production version of this admin panel can be found at https://branda-admin-panel.herokuapp.com/

## API

The Branda backend as it is now is not very user friendly, mostly because the bulk of it was written at a time when none of us really knew what we were doing. This, in combination with the double edged sword that is the same-origin policy, made it pretty undesirable to use the current backend in development of this project. Therefore, I've gone ahead and rebuilt parts of our backend in this repo using Next.js' built-in api support.

### How It Works

The endpoints that we will need to hit for this project are in the [pages/api](https://github.com/elijahmiller237/branda-admin-panel/tree/main/pages/api) folder and take advantage of Next.js' [dynamic routing](https://nextjs.org/docs/routing/dynamic-routes) feature. For a given route, the code for that route will either be in a file of the same name (e.g. the `/api/announcements/{date}` route in `/pages/api/announcements/[date].js`), or in a file called `index.js` under a folder of the same name (e.g. the `/api/schedules` route in `/pages/api/schedules/index.js`).

Each element on a file path that is enclosed in square brackets indicates a parameter that needs to be passed to that path's endpoints. So for the GET endpoint located at file path `/pages/api/schedules/[week]/[id].js`, my call for the schedule with id "1234" on the 48th week of the year would look something like `get('/api/schedules/48/1234')`.

### Documentation

This api is documented using the [OpenApi Specification 3.0](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.0.md). The documentation resides in the [docs](https://github.com/elijahmiller237/branda-admin-panel/tree/main/docs) folder of this project. Most of the information will be in the openapi.json file. This is where you will find information on when and where to use the various routes in the api. Additionally, the schemas that are used by the endpoints are documented in the [docs/components/schemas](https://github.com/elijahmiller237/branda-admin-panel/tree/main/docs/components/schemas) folder. When you are using an endpoint that requires information in a request body, this is where you can go to figure out what information to send. Alternatively, it might be easier to just reference the example that is included in openapi.json under each endpoint.


### Libraries

Below are the libraries we will be using for this project. If you want to add a new library to the stack, just make sure it doesn't serve the same function as something that we already have installed.

* [Materialize](https://materializecss.com/) - Our main css library, provides things like buttons, tables, etc.

* [Material-UI](https://material-ui.com/) and [Material-UI Pickers](https://material-ui-pickers.dev/) - Provides more complex UI elements such as Date/Time pickers, Popovers, ect.

* [Axios](https://www.npmjs.com/package/axios) - Used for making http requests

* [Luxon](https://moment.github.io/luxon/) - Date library that provides functionality beyond vanilla JS's Date class

* [NextAuth.js](https://next-auth.js.org/) - Authentication library designed for serverless, Next.js applications
