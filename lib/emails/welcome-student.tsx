import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface VercelInviteUserEmailProps {
  inviteFromIp?: string;
  inviteFromLocation?: string;
  inviteLink?: string;
  invitedByEmail?: string;
  invitedByUsername?: string;
  teamImage?: string;
  teamName?: string;
  userImage?: string;
  username?: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : '';

export const WelcomeStudentEmail = ({
  invitedByEmail = 'bukinoshita@example.com',
  invitedByUsername = 'bukinoshita',
  inviteFromIp = '204.13.186.218',
  inviteFromLocation = 'São Paulo, Brazil',
  inviteLink = 'https://vercel.com/teams/invite/foo',
  teamImage = `${baseUrl}/static/vercel-team.png`,
  teamName = 'My Project',
  userImage = `${baseUrl}/static/vercel-user.png`,
  username = 'zenorocha',
}: VercelInviteUserEmailProps) => {
  const previewText = `Join ${invitedByUsername} on Vercel`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
            <Section className="mt-[32px]">
              <Img
                alt="Vercel"
                className="my-0 mx-auto"
                height="37"
                src={`${baseUrl}/static/vercel-logo.png`}
                width="40"
              />
            </Section>
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              Join <strong>{teamName}</strong> on <strong>Vercel</strong>
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              Hello {username},
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              <strong>{invitedByUsername}</strong> (
              <Link
                className="text-blue-600 no-underline"
                href={`mailto:${invitedByEmail}`}
              >
                {invitedByEmail}
              </Link>
              ) has invited you to the <strong>{teamName}</strong> team on{' '}
              <strong>Vercel</strong>.
            </Text>
            <Section>
              <Row>
                <Column align="right">
                  <Img
                    className="rounded-full"
                    height="64"
                    src={userImage}
                    width="64"
                  />
                </Column>
                <Column align="center">
                  <Img
                    alt="invited you to"
                    height="9"
                    src={`${baseUrl}/static/vercel-arrow.png`}
                    width="12"
                  />
                </Column>
                <Column align="left">
                  <Img
                    className="rounded-full"
                    height="64"
                    src={teamImage}
                    width="64"
                  />
                </Column>
              </Row>
            </Section>
            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center py-3 px-5"
                href={inviteLink}
              >
                Join the team
              </Button>
            </Section>
            <Text className="text-black text-[14px] leading-[24px]">
              or copy and paste this URL into your browser:{' '}
              <Link className="text-blue-600 no-underline" href={inviteLink}>
                {inviteLink}
              </Link>
            </Text>
            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              This invitation was intended for{' '}
              <span className="text-black">{username} </span>.This invite was
              sent from <span className="text-black">{inviteFromIp}</span>{' '}
              located in{' '}
              <span className="text-black">{inviteFromLocation}</span>. If you
              were not expecting this invitation, you can ignore this email. If
              you are concerned about your account&apos;s safety, please reply
              to this email to get in touch with us.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default WelcomeStudentEmail;
