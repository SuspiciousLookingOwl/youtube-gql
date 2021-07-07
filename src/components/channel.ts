import { gql, IResolverObject } from "apollo-server";
import { Channel } from "youtubei";
import { youtube } from "../common/youtube";
import * as thumbnail from "./thumbnail";

export const name = "Channel";

interface ChannelSchema {
	id: string;
	name: string;
	thumbnails: string[];
}

interface ChannelQuery {
	keyword: string;
	limit: number;
}

export const query = gql`
	extend type Query {
		channel(keyword: String!): Channel
		channels(keyword: String!, limit: Int): [Channel]
	}
`;

export const queryResolver: IResolverObject = {
	async channel(_, { keyword }: ChannelQuery) {
		const channel = await youtube.findOne(keyword, { type: "channel" });
		if (channel) return mapper(channel);
		return null;
	},

	async channels(_, { keyword, limit = 10 }: ChannelQuery) {
		const channels = await youtube.search(keyword, { type: "channel" });
		return channels.map(mapper).slice(0, limit);
	},
};

export const schema = gql`
	type Channel {
		id: ID!
		name: String!
		thumbnails: [String]
	}
`;

export const mapper = (channel: Channel): ChannelSchema => {
	const { id, name, thumbnails } = channel;
	return { id, name, thumbnails: thumbnails ? thumbnail.mapper(thumbnails) : [] };
};
