import { auth } from "@/server/auth";
import NavbarLayout from "@/app/_components/navbar/navbar-layout";
import { List, ListItem } from "@/components/ui/list";
import { isUserAdminById } from "@/server/db/queries";

export default async function Page() {
  const session = await auth();
  const isAdmin = session?.user.id ? await isUserAdminById(session.user.id) : false;

  return (
    <NavbarLayout session={session} isAdmin={isAdmin}>
      <section className="prose prose-zinc prose-p:my-2 mx-auto flex w-full max-w-4xl flex-col space-y-6 px-4 py-20">
        <h1 className="mb-8 text-4xl font-extrabold">
          <strong>Privacy Policy</strong>
        </h1>
        <p>
          <strong>Introduction</strong>
        </p>
        <p>
          CoreX is a scalable, fully customizable, and effortlessly deployable
          SaaS solution for building and managing web applications. At CoreX, we
          value your privacy and are committed to protecting the personal
          information you share with us. This Privacy Policy outlines the types
          of personal information we collect, how we use it, and your rights
          regarding your data.
        </p>
        <p>
          <strong>Contact Information</strong>
        </p>
        <p>
          If you have any questions about our privacy practices, please open a{" "}
          <a className="text-background-foreground underline" href="/help">
            ticket
          </a>
          .
        </p>

        <p>
          <strong>Information We Collect</strong>
        </p>
        <p>
          CoreX collects personal information in order to provide our services
          effectively. This information may include:
        </p>
        <List>
          <ListItem number={1}>Name</ListItem>
          <ListItem number={2}>Email address</ListItem>
          <ListItem number={3}>
            Usage data (e.g., IP addresses, browser information, and usage
            patterns)
          </ListItem>
        </List>

        <p>
          <strong>How We Use Your Information</strong>
        </p>
        <p>We use the information we collect to:</p>
        <List>
          <ListItem number={1}>Provide and improve our services</ListItem>
          <ListItem number={2}>Process payments securely</ListItem>
          <ListItem number={3}>
            Communicate with you regarding updates, promotions, and support
          </ListItem>
          <ListItem number={4}>Ensure the security of our services</ListItem>
          <ListItem number={5}>Comply with legal obligations</ListItem>
        </List>
        <p>
          <strong>Data Storage and Security</strong>
        </p>
        <p>
          Your personal data is stored securely using encryption methods and is
          hosted on cloud servers provided by reputable service providers, such
          as AWS and other cloud infrastructure providers. We take reasonable
          measures to protect your data from unauthorized access, use, or
          disclosure.
        </p>

        <p>
          <strong>Sharing Your Information</strong>
        </p>
        <p>
          CoreX does not sell your personal information to third parties. We may
          share your information with trusted partners and service providers who
          assist us in delivering our services, such as payment processors
          (e.g., Stripe). We may also share information as required by law or to
          protect our rights and interests.
        </p>

        <p>
          <strong>Your Rights</strong>
        </p>
        <p>
          Depending on your location, you may have certain rights regarding your
          personal data. These may include the right to:
        </p>
        <List>
          <ListItem number={1}>Access your personal data</ListItem>
          <ListItem number={2}>Rectify any inaccuracies in your data</ListItem>
          <ListItem number={3}>Request the deletion of your data</ListItem>
          <ListItem number={4}>
            Object to processing or restrict the use of your data
          </ListItem>
          <ListItem number={5}>Withdraw consent, if applicable</ListItem>
        </List>

        <p>
          To exercise these rights, please open a{" "}
          <a className="text-background-foreground underline" href="/help">
            ticket
          </a>
          .
        </p>

        <p>
          <strong>Data Transfers</strong>
        </p>
        <p>
          Your personal data may be processed in countries outside your
          jurisdiction, including the United States. By using CoreX services,
          you consent to the transfer of your data to these locations, which may
          have different data protection laws.
        </p>

        <p>
          <strong>Changes to This Privacy Policy</strong>
        </p>
        <p>
          CoreX reserves the right to update this Privacy Policy from time to
          time. When we do, we will post the revised policy on this page and
          update the effective date below. We encourage you to review this
          policy periodically to stay informed about how we protect your data.
        </p>

        <p>
          <strong>Effective Date</strong>
        </p>
        <p>This Privacy Policy is effective as of 2024-11-28.</p>
      </section>
    </NavbarLayout>
  );
}
