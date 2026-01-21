import { Header } from '../components/Header';
import { HeroSection } from './landing/HeroSection';
import { AboutUsSection } from './landing/AboutUsSection';
import { DepartmentsSection } from './landing/DepartmentsSection';
import { AwardsSection } from './landing/AwardsSection';
import { ReviewsSection } from './landing/ReviewsSection';
import { CTASection } from './landing/CTASection';
import { colors } from '../theme/colors';

export function LandingPage() {
  return (
    <div style={{ backgroundColor: colors.background }}>
      <Header />
      <HeroSection />
      <div id="about">
        <AboutUsSection />
      </div>
      <div id="departments">
        <DepartmentsSection />
      </div>
      <AwardsSection />
      <div id="reviews">
        <ReviewsSection />
      </div>
      <CTASection />
    </div>
  );
}

