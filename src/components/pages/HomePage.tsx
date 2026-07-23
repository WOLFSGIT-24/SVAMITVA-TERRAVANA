import NavBar from '@/components/terravana/NavBar';
import HeroSection from '@/components/terravana/HeroSection';
import StorySection from '@/components/terravana/StorySection';
import FeaturesSection from '@/components/terravana/FeaturesSection';
import MasterplanSection from '@/components/terravana/MasterplanSection';
import VillasSection from '@/components/terravana/VillasSection';
import EnquirySection from '@/components/terravana/EnquirySection';
import Footer from '@/components/terravana/Footer';
import LuxuryCursor from '@/components/terravana/LuxuryCursor';
import FloatingCTA from '@/components/terravana/FloatingCTA';
import WhatsAppButton from '@/components/terravana/WhatsAppButton';
import EnquiryPopup from '@/components/terravana/EnquiryPopup';

export default function HomePage() {
  return (
    <div style={{ background: '#F8F6F1', minHeight: '100vh' }}>
      {/* Luxury cursor — hidden on mobile via CSS */}
      <LuxuryCursor />

      {/* Floating enquire CTA */}
      <FloatingCTA />

      {/* Sticky WhatsApp button */}
      <WhatsAppButton />

      {/* Popup enquiry form — auto-shows after 25s */}
      <EnquiryPopup />

      {/* ── Section 1: Navbar ── */}
      <NavBar />

      {/* ── Section 1: Hero ── */}
      <HeroSection />

      {/* ── Section 2: Project Story ── */}
      <StorySection />

      {/* ── Section 3: Why Terravana ── */}
      <FeaturesSection />

      {/* ── Section 4: Masterplan + Amenities ── */}
      <MasterplanSection />

      {/* ── Section 5: Villas + Location ── */}
      <VillasSection />

      {/* ── Section 6: Enquiry CTA ── */}
      <EnquirySection />

      {/* ── Section 7: Footer ── */}
      <Footer />
    </div>
  );
}
