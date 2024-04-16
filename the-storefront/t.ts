import { openAsBlob } from 'node:fs' 
import { Client, fetchExchange, gql } from "urql/core" 


const graphql = new Client({
    url: "http://localhost:3003/graphql",
    exchanges: [fetchExchange]
});

const req = gql`
    mutation($image: Upload!) {
        createImage(input: {
            image: $image
        }){
            imageUrl
        }
    }
`;

openAsBlob('./public/images/logo.png', { 
    type: 'image/png'
}).then(image => {

    graphql.mutation(req, { image: image }).toPromise().then((res) => {
        console.log(res.data);
    });
        
})

