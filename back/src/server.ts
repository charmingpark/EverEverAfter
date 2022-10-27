import { awsLambdaRequestHandler } from '@trpc/server/adapters/aws-lambda';
import { createContext } from './createContext';
import { appRouter } from '.';

export const handler = awsLambdaRequestHandler({
  router: appRouter,
  createContext,
  responseMeta() {
    return {
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, X-Amz-Date, Authorization, X-Api-Key, X-Amz-Security-Token",
      },
    };
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