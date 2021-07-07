import { gql, IResolverObject } from "apollo-server";
import * as channel from "./channel";
import { youtube } from "../common/youtube";
import { Video } from "youtubei";

export const name = "Video";

interface VideoQuery {
	id: string;
}

export const schema = gql`
	type Video {
		id: ID!
		title: String!
		channel: Channel!
		description: String!
		likeCount: Int
		dislikeCount: Int
		isLiveContent: Boolean
		tags: [String]!
		thumbnail: [String]!
		uploadDate: String!
		viewCount: Int
	}
`;

export const query = gql`
	extend type Query {
		video(id: String!): Video
	}
`;

export const queryResolver: IResolverObject = {
	async video(_, { id }: VideoQuery) {
		const video = await youtube.getVideo(id);
		if (!video) return;
		return video;
	},
};

export const resolvers: IResolverObject = {
	channel: (v: Video) => channel.mapper(v.channel),
};
