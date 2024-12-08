/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "corex",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
      providers: {
        aws: {
          region: "us-east-1",
        }
      },
    };
  },
  async run() {
    new sst.aws.Nextjs("MyWeb", {
      environment: {
        AUTH_SECRET: process.env.AUTH_SECRET!,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID!,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET!,
        DATABASE_URL: process.env.DATABASE_URL!,
        STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY!,
        STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET!,
        AUTH_TRUST_HOST: process.env.AUTH_TRUST_HOST!,
        NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,

        // Do not include these variables in build
        // AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY!,
        // AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID!,
      }
    });
  },
});
