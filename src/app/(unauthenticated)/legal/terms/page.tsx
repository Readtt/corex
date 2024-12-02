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
          <strong>Terms of Service</strong>
        </h1>

        <p>
          <strong>Introduction</strong>
        </p>
        <p>
          Welcome to CoreX, a scalable and customizable SaaS solution for
          building and managing web applications. These Terms of Service govern
          your use of our platform and services. By accessing or using CoreX,
          you agree to comply with these terms. If you do not agree to these
          terms, you must not use our services.
        </p>

        <p>
          <strong>Contact Information</strong>
        </p>
        <p>
          If you have any questions about these terms or our services, please
          open a{" "}
          <a className="text-background-foreground underline" href="/help">
            ticket
          </a>
          .
        </p>

        <p>
          <strong>Use of Our Services</strong>
        </p>
        <p>
          You agree to use CoreX only for lawful purposes and in accordance with
          these Terms. You must not:
        </p>
        <List>
          <ListItem number={1}>
            Use the service in any way that violates any applicable local,
            state, national, or international law or regulation.
          </ListItem>
          <ListItem number={2}>
            Engage in any activity that could harm, disrupt, or interfere with
            the operation of the CoreX services or the accounts of other users.
          </ListItem>
          <ListItem number={3}>
            Attempt to gain unauthorized access to any part of the service,
            including other user accounts.
          </ListItem>
        </List>

        <p>
          <strong>Your Account</strong>
        </p>
        <p>
          To use CoreX, you must create an account. You agree to provide
          accurate, current, and complete information during the registration
          process and to update your information as necessary. You are
          responsible for maintaining the confidentiality of your account
          credentials.
        </p>

        <p>
          <strong>Termination</strong>
        </p>
        <p>
          We reserve the right to suspend or terminate your account at our sole
          discretion, without notice, for any violation of these Terms or for
          any activity that may be harmful to our platform or other users.
        </p>

        <p>
          <strong>Payment and Billing</strong>
        </p>
        <p>
          CoreX may charge fees for certain features of our service. You agree
          to pay all fees associated with your use of our services, including
          taxes, on time. Payment terms will be outlined in your account and
          subscription details.
        </p>

        <p>
          <strong>Intellectual Property</strong>
        </p>
        <p>
          All content, designs, logos, and other intellectual property related
          to CoreX are the property of CoreX or our licensors. You may not use,
          copy, or distribute any of this intellectual property without our
          express written permission.
        </p>

        <p>
          <strong>Limitation of Liability</strong>
        </p>
        <p>
          To the fullest extent permitted by law, CoreX shall not be liable for
          any indirect, incidental, special, consequential, or punitive damages
          arising out of or in connection with the use or inability to use our
          services.
        </p>

        <p>
          <strong>Data Privacy and Security</strong>
        </p>
        <p>
          We are committed to protecting your privacy. For more details, please
          refer to our{" "}
          <a
            className="text-background-foreground underline"
            href="/legal/privacy"
          >
            Privacy Policy
          </a>
          .
        </p>

        <p>
          <strong>Amendments to the Terms</strong>
        </p>
        <p>
          CoreX reserves the right to modify these Terms at any time. When we
          do, we will post the revised Terms on this page and update the
          effective date below. You are encouraged to review these Terms
          periodically to stay informed of any changes.
        </p>

        <p>
          <strong>Effective Date</strong>
        </p>
        <p>This Terms of Service is effective as of 2024-11-28.</p>
      </section>
    </NavbarLayout>
  );
}
