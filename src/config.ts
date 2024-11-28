// interface Config {
//     site: {
//         name: string;
//         description: string;
//     }
// }

const config = {
  site: {
    name: "CoreX",
    tagline:
      "Scalable, fully customizable, and effortlessly deployable SaaS solution.",
    socialUrls: {
      twitter: "",
      instagram: "",
      facebook: "",
      github: "https://github.com/Readtt/corex"
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
        },
        features: [
          {
            text: "Mobile-friendly interface",
          },
          {
            text: "Higher-quality responses",
            footnote:
              "Better algorithmic responses for enhanced content quality",
          },
          {
            text: "Adding guests",
            footnote: "Allowing other users to access your chatbot as guests.",
            negative: true,
          },
          {
            text: "Priority support",
            negative: true,
          },
        ],
      },
    ],
  },
}; //satisfies Config;

export default config;
