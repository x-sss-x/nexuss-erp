import {
  Button,
  Container,
  Heading,
  Html,
  Img,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface OrganizationInviteProps {
  inviteeName?: string;
  inviterName?: string;
  organizationName?: string;
  inviteLink: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const OrganizationInvite = ({
  inviteeName = "there",
  inviterName = "John Doe",
  organizationName = "Acme Corp",
  inviteLink = "https://example.com/invite",
}: OrganizationInviteProps) => {
  return (
    <Tailwind>
      <Html>
        <Section className="bg-gray-50 py-10 font-sans text-base text-gray-800">
          <Container className="mx-auto max-w-xl rounded-lg bg-white px-6 py-8 shadow-md">
            <Img
              src={`${baseUrl}/static/nexuss-logo.png`}
              height={52}
              width={52}
              alt="NexussERP Logo"
            />
            <Heading>NexussERP</Heading>
            <Heading className="mb-4 text-2xl font-normal text-black">
              You've been invited to join <b>{organizationName}</b> 🎉
            </Heading>

            <Text className="mb-4">Hi {inviteeName},</Text>

            <Text className="mb-4">
              {inviterName} has invited you to join the organization{" "}
              <strong>{organizationName}</strong> on our platform. You’ll be
              able to collaborate with your organization, manage subjects, and
              access resources.
            </Text>

            <Button
              href={inviteLink}
              className="mb-6 inline-block rounded-md bg-black px-6 py-3 text-white no-underline hover:bg-gray-900"
            >
              Accept Invitation
            </Button>

            <Text className="text-sm text-gray-500">
              If you weren’t expecting this invitation, you can safely ignore
              this email.
            </Text>
          </Container>
        </Section>
      </Html>
    </Tailwind>
  );
};

export default OrganizationInvite;
