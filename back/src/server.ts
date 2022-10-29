import { awsLambdaRequestHandler } from '@trpc/server/adapters/aws-lambda';
import { createAWSContext } from './createContext';
import { awsAppRouter } from '.';

const headers = {
  'Access-Control-Allow-Origin': 'http://localhost:3000',
  'Access-Control-Request-Method': '*',
  'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
  'Access-Control-Allow-Headers': '*',
};

export const handler = awsLambdaRequestHandler({
  router: awsAppRouter,
  createContext: createAWSContext,
  batching: {
    enabled: true
  },
  responseMeta({ ctx }) {
    const method = ctx?.event.requestContext.http.method;
    if (method === 'OPTIONS' || method === undefined){
      return {
        status: 200,
        headers,
      };
    }
    return { headers };
  },
});


// function getAccessControlAllowOrigin(stage: string) {
//   if (stage === "dev") {
//     return "*";
//   } else if (stage === "test") {
//     return "https://test.example.com";
//   } else if (stage === "prod") {
//     return "https://example.com";
//   } else {
//     throw new Error(
//       "Could not determine Access-Control-Allow-Origin from stage env var"
//     );
//   }
// }