# Uber NextJs Blockchain Clone

- Web 3.0
- Metamask
- NextJS 12
- Sanity.io
- Mapbox
- TailwindCSS

## Getting Started

Deployed chains

Polygon Mumbai:
https://mumbai.polygonscan.com/address/0x337C664Fd95fb2cF0F6E192F8Cca0B130E01D54d

Arbitrum: (chainId: 421613)
https://testnet.arbiscan.io/address/0x337C664Fd95fb2cF0F6E192F8Cca0B130E01D54d

Scroll sepolia
https://sepolia-blockscout.scroll.io/address/0x337C664Fd95fb2cF0F6E192F8Cca0B130E01D54d
<br />

### 1) Create your .env file

Use `.env.template` to create your own `.env` file.  
Paste in your Sanity.io and Mapbox project/token info.

<br />

### 2) Install dependencies

```bash
npm install
```

<br />

### 3) Create your Sanity.io project

Create a new project at [Sanity.io](https://www.sanity.io/).

Then, go into the `studio` (sanity studio) folder. Use `sanity.json.template` to create `sanity.json` file. Paste in your Sanity project.name and api.projectId values.

Run `npm install` to install the studio dependencies.

Run `sanity start` and open [http://localhost:3333](http://localhost:3333)

Create data for Rides by referring to `sample-data/rides.json` and PNGs from `assets/rides`

Run `sanity deploy` to deploy your local changes to Sanity.io.

For more info [https://www.sanity.io/docs/getting-started-with-sanity-cli](https://www.sanity.io/docs/getting-started-with-sanity-cli)

<br />

### 4) Run the NextJS App

Then, from this project's root folder, run the NextJS development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

<br/>
<br/>
