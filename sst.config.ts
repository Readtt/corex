/// <reference path="./.sst/platform/config.d.ts" />
import { env } from "./src/env";

export default $config({
  app(input) {
    return {
      name: "corex",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
      providers: {
        aws: {
          region: "us-east-1",
        },
      },
    };
  },
  async run() {
    // Do not include these variables in build
    const {
      AWS_ACCESS_KEY_ID,
      AWS_SECRET_ACCESS_KEY,
      NODE_ENV,
      ...environment
    } = env;

    new sst.aws.Nextjs("CoreX", {
      domain: {
        name: "corex.click",
        redirects: ["www.corex.click"],
      },
      environment,
    });
  },
});
