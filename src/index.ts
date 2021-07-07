import { ApolloServer, gql, IResolvers } from "apollo-server";
import * as video from "./components/video";
import * as channel from "./components/channel";
import { DocumentNode } from "graphql";

const PORT = process.env.PORT || 3000;

const query = gql`
	type Query {
		_: Boolean
	}
`;

const components = [video, channel];
const typeDefs: DocumentNode[] = [query];
const resolvers: IResolvers = { Query: {} };

for (const component of components) {
	if ("query" in component) typeDefs.push(component.query);
	if ("queryResolver" in component) Object.assign(resolvers.Query, component.queryResolver);
	if ("resolvers" in component) resolvers[component.name] = component.resolvers;
	if ("schema" in component) typeDefs.push(component.schema);
}

const server = new ApolloServer({
	typeDefs,
	resolvers,
});

server.listen(PORT).then(({ url }) => {
	console.log(`🚀 Server ready at ${url}`);
});
