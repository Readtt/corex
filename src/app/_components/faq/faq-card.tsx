"use client"

import { List, ListItem } from "@/components/ui/list";

const faqs = [
  {
    question: "What is CoreX and how does it work?",
    answer:
      "CoreX is a scalable, fully customizable SaaS solution built using modern technologies like Next.js, TypeScript, Tailwind CSS, Prisma, and more. It offers an intuitive platform for creating and managing web applications, with seamless integration and deployment capabilities using SST and other modern tools.",
  },
  {
    question: "How do I deploy a CoreX project?",
    answer:
      "CoreX can be deployed effortlessly using SST (Serverless Stack). With SST, you can deploy your CoreX application to AWS and other cloud platforms with just a few simple commands, ensuring quick and reliable deployment at scale.",
  },
  {
    question: "Is CoreX customizable for different business needs?",
    answer:
      "Yes! CoreX is designed to be highly customizable. You can adjust the platform's features, UI components, and integrations to suit the specific needs of your business or product. It offers flexible configuration to fit a wide range of use cases.",
  },
  {
    question:
      "Can I use CoreX for both small projects and large-scale applications?",
    answer:
      "Absolutely! CoreX is designed to scale, making it ideal for both small projects and large-scale enterprise applications. Whether you are building a simple app or an enterprise-level system, CoreX's flexible architecture can handle your needs.",
  },
  {
    question: "Can I integrate third-party services with CoreX?",
    answer:
      "CoreX is built to integrate easily with third-party services. Whether it's analytics, CRM systems, marketing tools, or custom APIs, you can easily extend CoreX by using its flexible APIs and integration points.",
  },
  {
    question: "Is CoreX suitable for developers new to SaaS development?",
    answer:
      "Yes! CoreX is built to be user-friendly while providing powerful customization options for developers of all experience levels. Whether you’re new to SaaS development or an experienced developer, CoreX's intuitive setup and documentation will guide you through the process.",
  },
];

export default function FAQCard() {
  return (
    <List className="space-y-8">
      {faqs.map((faq, index) => (
        <ListItem key={index} description={faq.answer} number={index + 1}>
          {faq.question}
        </ListItem>
      ))}
    </List>
  );
}
