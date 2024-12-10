interface Config {
  site: {
    name: string;
    tagline: string;
    socialUrls: {
      twitter: string;
      instagram: string;
      facebook: string;
      github: string;
    };
  };
  stripe: {
    plans: StripePlan[];
  };
}

export interface StripePlan {
  name: string;
  limits: Record<string, number>;
  price: {
    amount: number;
    priceIds: {
      test: string;
      production: string;
    };
    frequency: string;
  };
  features: Feature[];
  isFree?: boolean;
}

export interface Feature {
  text: string;
  footnote?: string;
  negative?: boolean;
}

const config = {
  site: {
    name: "CoreX",
    tagline:
      "Scalable, fully customizable, and effortlessly deployable SaaS solution.",
    socialUrls: {
      twitter: "",
      instagram: "",
      facebook: "",
      github: "https://github.com/Readtt/corex",
    },
  },
  stripe: {
    plans: [
      {
        name: "Free",
        limits: {},
        price: {
          amount: 0,
          priceIds: {
            test: "",
            production: "",
          },
          frequency: "Forever"
        },
        features: [
          {
            "text": "Seamless integration with your tools",
            "footnote": "Easily connects to your existing systems for streamlined workflows."
          },
          {
            "text": "Enhanced analytics",
            "footnote": "Get deeper insights with advanced reporting and metrics."
          },
          {
            "text": "Customizable workflows",
            "footnote": "Tailor the platform to suit your unique business processes.",
            "negative": true
          },
          {
            "text": "24/7 customer support",
            "negative": true
          }
        ],
        isFree: true
      },
      {
        name: "Pro",
        limits: {},
        price: {
          amount: 9.99,
          priceIds: {
            test: "price_1QQP2FGO8j9YkwYNngYSaekr",
            production: "price_1QQP2FGO8j9YkwYNngYSaekr",
          },
          frequency: "Per month"
        },
        features: [
          {
            "text": "Seamless integration with your tools",
            "footnote": "Easily connects to your existing systems for streamlined workflows."
          },
          {
            "text": "Enhanced analytics",
            "footnote": "Get deeper insights with advanced reporting and metrics."
          },
          {
            "text": "Customizable workflows",
            "footnote": "Tailor the platform to suit your unique business processes.",
            "negative": true
          },
          {
            "text": "24/7 customer support",
            "negative": true
          }
        ],
      },
      {
        name: "Entreprise",
        limits: {},
        price: {
          amount: 99.99,
          priceIds: {
            test: "price_1QQP2mGO8j9YkwYNd5Lb61dR",
            production: "price_1QQP2mGO8j9YkwYNd5Lb61dR",
          },
          frequency: "Per month"
        },
        features: [
          {
            "text": "Seamless integration with your tools",
            "footnote": "Easily connects to your existing systems for streamlined workflows."
          },
          {
            "text": "Enhanced analytics",
            "footnote": "Get deeper insights with advanced reporting and metrics."
          },
          {
            "text": "Customizable workflows",
            "footnote": "Tailor the platform to suit your unique business processes.",
            "negative": true
          },
          {
            "text": "24/7 customer support",
            "negative": true
          }
        ],
      },
    ],
  },
} satisfies Config;

export default config;
