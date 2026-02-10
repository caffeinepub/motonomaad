export default function PrivacyPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">Privacy Policy</h1>
            <p className="text-xl text-muted-foreground">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <h2>Introduction</h2>
            <p>
              At Motonomaad, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose,
              and safeguard your information when you use our platform. Please read this policy carefully to understand
              our practices regarding your personal data.
            </p>

            <h2>Information We Collect</h2>
            <p>We collect information that you provide directly to us, including:</p>
            <ul>
              <li>Account information (name, profile details)</li>
              <li>Trip planning data (routes, preferences, destinations)</li>
              <li>Social interactions (posts, comments, group memberships)</li>
              <li>Event participation and attendance records</li>
              <li>Mechanic service requests and communications</li>
            </ul>

            <h2>How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide, maintain, and improve our services</li>
              <li>Personalize your experience and provide tailored trip suggestions</li>
              <li>Connect you with other riders, mechanics, and community members</li>
              <li>Send you updates, notifications, and service-related announcements</li>
              <li>Ensure the safety and security of our platform</li>
              <li>Analyze usage patterns to improve our features and functionality</li>
            </ul>

            <h2>Data Storage and Security</h2>
            <p>
              Your data is stored on the Internet Computer blockchain, which provides decentralized and secure data
              storage. We implement appropriate technical and organizational measures to protect your personal
              information against unauthorized access, alteration, disclosure, or destruction.
            </p>

            <h2>Information Sharing</h2>
            <p>
              We do not sell your personal information. We may share your information with other users as part of the
              platform's social features (such as your profile, posts, and group memberships). Information you choose to
              make public will be visible to other Motonomaad users.
            </p>

            <h2>Your Rights and Choices</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access and update your personal information</li>
              <li>Delete your account and associated data</li>
              <li>Control your privacy settings and visibility preferences</li>
              <li>Opt out of non-essential communications</li>
            </ul>

            <h2>Cookies and Tracking</h2>
            <p>
              We use cookies and similar tracking technologies to enhance your experience, analyze usage patterns, and
              maintain your session. You can control cookie preferences through your browser settings.
            </p>

            <h2>Children's Privacy</h2>
            <p>
              Motonomaad is not intended for users under the age of 18. We do not knowingly collect personal information
              from children. If you believe we have collected information from a child, please contact us immediately.
            </p>

            <h2>Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any material changes by posting
              the new policy on this page and updating the "Last updated" date. Your continued use of Motonomaad after
              changes are posted constitutes your acceptance of the updated policy.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have questions or concerns about this Privacy Policy or our data practices, please contact us at{' '}
              <a href="mailto:privacy@motonomaad.com">privacy@motonomaad.com</a>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
