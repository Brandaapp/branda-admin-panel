# Branda Admin Panel

This is the admin panel that allows Brandeis staff to change the data displayed in the Branda app as well as perform other administrative tasks. This repo is for the version that is being rebuilt in [Next.js](https://nextjs.org/). If you want the version that is currently deployed, go to the [BrandaServer](https://github.com/segalb/BrandaServer) repo.

## Setup

After you've cloned the repo to your machine, install the necessary dependencies with:

```bash
npm install
```

## Usage

Run dev server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000)

## API

The Branda backend as it is now is not very user friendly, mostly because the bulk of it was written at a time where none of us really knew what we were doing. This, in combination with the double edged sword that is the same-origin policy made it pretty undesirable to use the current backend in development of this project. Therefore, I've gone ahead and rebuilt parts of our backend in this repo using Next.js' built-in api support.

The endpoints that we will need to hit for this project are in the [pages/api](https://github.com/elijahmiller237/branda-admin-panel/tree/main/pages/api) folder and take advantage of Next.js' [dynamic routing](https://nextjs.org/docs/routing/dynamic-routes) feature. For a given endpoint, the code for that endpoint will either be in a file of the same name (e.g. the `/announcements/{date}` endpoint in `/pages/api/announcements/[date].js`), or in a file called `index.js` under a folder of the same name (e.g. the `/schedules` endpoint in `/pages/api/schedules/index.js`).
