# Youtube GraphQL API

**Note: this app is made for educational purposes**

A Youtube GraphQL API made with [Apollo Server](https://www.apollographql.com/docs/apollo-server) and [Youtubei](https://youtubei.netlify.app/)

### How to use:

1. Clone the repository
2. `yarn install` (`npm i -g yarn` if you don't have `yarn`)
3. `npm run dev` to run the development server
4. Send `POST` request to `http://localhost:3000`

### Example

Request:

`POST http://localhost:3000`

```gql
{
	video(id: "8D9XnnjFGMs") {
		id
		title
		viewCount
		likeCount
		dislikeCount
		channel {
			id
			name
			thumbnails
		}
	}
	channels(keyword: "fireship", limit: 3) {
		id
		name
	}
}
```

Response:

```json
{
	"data": {
		"video": {
			"id": "8D9XnnjFGMs",
			"title": "GraphQL with Apollo Server 2.0",
			"viewCount": 92581,
			"likeCount": 1954,
			"dislikeCount": 48,
			"channel": {
				"id": "UCsBjURrPoezykLs9EqgamOA",
				"name": "Fireship",
				"thumbnails": [
					"https://yt3.ggpht.com/ytc/AKedOLTcIl6kKt3lEPJEySUf_hpHiKDKiFeo9eWPReLysQ=s48-c-k-c0x00ffffff-no-rj",
					"https://yt3.ggpht.com/ytc/AKedOLTcIl6kKt3lEPJEySUf_hpHiKDKiFeo9eWPReLysQ=s88-c-k-c0x00ffffff-no-rj",
					"https://yt3.ggpht.com/ytc/AKedOLTcIl6kKt3lEPJEySUf_hpHiKDKiFeo9eWPReLysQ=s176-c-k-c0x00ffffff-no-rj"
				]
			}
		},
		"channels": [
			{
				"id": "UCsBjURrPoezykLs9EqgamOA",
				"name": "Fireship"
			},
			{
				"id": "UCmqIdoFmH9uN_-raxivUcXQ",
				"name": "FireShip"
			},
			{
				"id": "UCeA0r9v6E8LczTMgoeiQ9_A",
				"name": "Fireship Media"
			}
		]
	}
}
```
