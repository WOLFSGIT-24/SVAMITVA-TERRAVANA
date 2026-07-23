export default function PrivacyPolicy() {
  return (
    <div style={{ background: '#F8F6F1', minHeight: '100vh', padding: 'clamp(6rem, 10vw, 9rem) clamp(1.5rem, 5vw, 9rem) 4rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <a href="/" style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.72rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#C76B33', textDecoration: 'none', fontWeight: 600 }}>
          ← Back to Home
        </a>

        <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 400, color: '#1F1F1F', letterSpacing: '-0.02em', margin: '2rem 0 1rem', lineHeight: 1.1 }}>
          Privacy Policy
        </h1>
        <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.8rem', color: '#888', marginBottom: '3rem' }}>
          Last updated: July 2025
        </p>

        <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.92rem', color: '#555', lineHeight: 1.85 }}>
          <Section title="1. Information We Collect">
            <p>When you fill out the enquiry form on our website, we collect:</p>
            <ul>
              <li>Your name</li>
              <li>Phone number</li>
              <li>Email address</li>
              <li>Any message you provide</li>
              <li>Date and time of submission</li>
            </ul>
            <p>We do not collect any data automatically through cookies, tracking pixels, or analytics tools unless explicitly disclosed.</p>
          </Section>

          <Section title="2. How We Use Your Information">
            <p>We use the information collected solely for the following purposes:</p>
            <ul>
              <li>To respond to your enquiry about Svamitva Terravana</li>
              <li>To schedule a site visit or private tour</li>
              <li>To provide project-related updates (only if requested)</li>
              <li>To connect you with our authorised sales team</li>
            </ul>
          </Section>

          <Section title="3. Information Sharing">
            <p>Your personal information is shared only with:</p>
            <ul>
              <li><strong>Svamitva Group</strong> — the project developer</li>
              <li><strong>Wolf Media</strong> — authorised sales partner managing this website</li>
            </ul>
            <p>We do not sell, rent, or share your information with any third parties for marketing or advertising purposes.</p>
          </Section>

          <Section title="4. Data Security">
            <p>We take reasonable measures to protect your personal information from unauthorized access, alteration, or destruction. Form submissions are transmitted securely over HTTPS.</p>
          </Section>

          <Section title="5. Data Retention">
            <p>We retain your enquiry data only for as long as necessary to fulfill the purpose of your enquiry and comply with applicable laws. You may request deletion of your data at any time.</p>
          </Section>

          <Section title="6. Your Rights">
            <p>You have the right to:</p>
            <ul>
              <li>Request access to the data we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your personal data</li>
              <li>Opt-out of any communications</li>
            </ul>
          </Section>

          <Section title="7. Contact Us">
            <p>For any privacy-related queries, please contact:</p>
            <p style={{ margin: '0.75rem 0' }}>
              <strong>Wolf Media (Authorised Sales Partner)</strong><br />
              Email: wolfmedia.website@gmail.com<br />
              Phone: +91 89715 04584
            </p>
          </Section>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '2.5rem' }}>
      <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.5rem', fontWeight: 500, color: '#1F1F1F', margin: '0 0 0.75rem', letterSpacing: '-0.01em' }}>
        {title}
      </h2>
      {children}
    </div>
  );
}
