import { gql, makeExtendSchemaPlugin, Resolvers } from "graphile-utils"
const { Upload } = require("graphql-upload");

export const ImageUpload = makeExtendSchemaPlugin(build => {

    const { GraphQLScalarType, GraphQLError } = build.graphql;

    const GraphQLUpload = new GraphQLScalarType({
        name: "Upload",
        description: "The `Upload` scalar type represents a file upload.",
        parseValue(value) {
          if (value instanceof Upload) return value.promise;
          throw new GraphQLError("Upload value invalid.");
        },
        parseLiteral(ast) {
          throw new GraphQLError("Upload literal unsupported.", ast);
        },
        serialize() {
          throw new GraphQLError("Upload serialization unsupported.");
        },
      });
  

    build.addType(GraphQLUpload);
    
    const typeDef = gql`
        input ImageUpload {
            image: Upload!
        }

        extend type Mutation {
            createImage(input: ImageUpload!): Image!
        }
    `;
    
    const resolvers:Resolvers = {
        Mutation: {
            createImage: async (_query, args, context, resolveInfo) => {
                const { image } = await args.input;
                console.log("createImage", {image});
                return { imageUrl: "https://example.com/image.jpg" };
            }
        }
    };

    return {
        typeDefs: [typeDef],
        resolvers,
    };
});