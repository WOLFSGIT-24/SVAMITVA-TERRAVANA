export default function TermsConditions() {
  return (
    <div style={{ background: '#F8F6F1', minHeight: '100vh', padding: 'clamp(6rem, 10vw, 9rem) clamp(1.5rem, 5vw, 9rem) 4rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <a href="/" style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.72rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#C76B33', textDecoration: 'none', fontWeight: 600 }}>
          ← Back to Home
        </a>

        <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 400, color: '#1F1F1F', letterSpacing: '-0.02em', margin: '2rem 0 1rem', lineHeight: 1.1 }}>
          Terms & Conditions
        </h1>
        <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.8rem', color: '#888', marginBottom: '3rem' }}>
          Last updated: July 2025
        </p>

        <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.92rem', color: '#555', lineHeight: 1.85 }}>
          <Section title="1. Introduction">
            <p>This website (svamitva-terravana.vercel.app) is managed by Wolf Media as an authorised sales partner for Svamitva Terravana, a residential project by Svamitva Group located on Kanakapura Road, Bangalore.</p>
            <p>By accessing and using this website, you agree to be bound by these Terms & Conditions.</p>
          </Section>

          <Section title="2. Information Accuracy">
            <p>While we make every effort to ensure that the information on this website is accurate and up-to-date:</p>
            <ul>
              <li>All project details, specifications, images, and amenities are indicative and subject to change without prior notice.</li>
              <li>The developer (Svamitva Group) reserves the right to modify plans, specifications, and features as deemed necessary.</li>
              <li>Images used on this website may include artistic renders and may not represent the actual completed product.</li>
            </ul>
          </Section>

          <Section title="3. RERA Disclaimer">
            <p>This project is subject to RERA (Real Estate Regulatory Authority) registration. RERA registration details will be updated on this website once obtained. Buyers are advised to verify all details directly with the developer before making any purchase decision.</p>
          </Section>

          <Section title="4. No Offer or Solicitation">
            <p>The content on this website does not constitute an offer to sell or a solicitation to buy any property. It is intended solely to provide preliminary information to prospective buyers.</p>
            <p>All transactions are subject to the execution of definitive agreements directly with Svamitva Group.</p>
          </Section>

          <Section title="5. Intellectual Property">
            <p>All content on this website — including text, images, logos, designs, and layout — is the intellectual property of Svamitva Group and/or Wolf Media and is protected by applicable copyright laws.</p>
            <p>You may not reproduce, distribute, or use any content from this website without prior written permission.</p>
          </Section>

          <Section title="6. Third-Party Links">
            <p>This website may contain links to third-party websites or services. We do not control or assume responsibility for the content, privacy policies, or practices of any third-party sites.</p>
          </Section>

          <Section title="7. Limitation of Liability">
            <p>Under no circumstances shall Wolf Media or Svamitva Group be liable for any direct, indirect, incidental, or consequential damages arising from the use of this website or reliance on the information provided herein.</p>
          </Section>

          <Section title="8. Governing Law">
            <p>These terms shall be governed by and construed in accordance with the laws of India. Any disputes arising shall be subject to the exclusive jurisdiction of the courts in Bangalore, Karnataka.</p>
          </Section>

          <Section title="9. Modifications">
            <p>We reserve the right to modify these terms at any time. Changes will be posted on this page with an updated "Last updated" date. Continued use of the website after changes constitutes acceptance of the modified terms.</p>
          </Section>

          <Section title="10. Contact">
            <p>For any questions regarding these terms, please contact:</p>
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
