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
		comments(limit: Int): [Comment]!
		upNext: VideoCompact
	}

	type VideoCompact {
		id: ID!
		title: String!
		channel: Channel!
		thumbnail: [String]!
		uploadDate: String
		viewCount: Int
	}

	type Comment {
		id: ID!
		author: Channel!
		content: String!
		isAuthorChannelOwner: Boolean!
		isPinnedComment: Boolean!
		likeCount: Int
		replyCount: Int
		publishDate: String!
	}
`;

export const query = gql`
	extend type Query {
		video(id: String!): Video
		videos(keyword: String!, limit: Int): [VideoCompact]
	}
`;

export const queryResolver: IResolverObject = {
	async video(_, { id }: VideoQuery) {
		const video = await youtube.getVideo(id);
		if (!video) return;
		return video;
	},

	async videos(_, { keyword = "", limit = 10 }) {
		const videos = await youtube.search(keyword, { type: "video" });
		return videos.slice(0, limit);
	},
};

export const resolvers: IResolverObject = {
	channel: (v: Video) => channel.mapper(v.channel),
	async comments(v: Video, { limit = 10 }) {
		while (v.comments.length < limit) {
			const comments = await v.nextComments();
			if (!comments.length) break;
		}
		return v.comments.slice(0, limit);
	},
};
