import { useState } from 'react';
import { colors } from '../../theme/colors';

interface Review {
  name: string;
  role: string;
  text: string;
  avatar: string;
}

const reviews: Review[] = [
  {
    name: 'Paul Jackson',
    role: 'Patient',
    text: 'Exceptional care throughout my wife\'s pregnancy. The staff was professional, caring, and always available when we needed them. Highly recommend!',
    avatar: '👨',
  },
  {
    name: 'Lauren Smith',
    role: 'Patient',
    text: 'The best maternity clinic in the area. The doctors are knowledgeable and compassionate. They made my pregnancy journey smooth and stress-free.',
    avatar: '👩',
  },
  {
    name: 'Alexandra Rose',
    role: 'Patient',
    text: 'Outstanding service from start to finish. The facilities are modern, and the care is personalized. Thank you for everything!',
    avatar: '👱‍♀️',
  },
];

export function ReviewsSection() {
  const [selectedReview, setSelectedReview] = useState(1);

  return (
    <section
      style={{
        padding: '4rem 2rem',
        maxWidth: 1200,
        margin: '0 auto',
      }}
    >
      <div
        style={{
          fontSize: '0.85rem',
          fontWeight: 600,
          color: colors.primary,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          marginBottom: '0.5rem',
        }}
      >
        Some Reviews
      </div>
      <h2
        style={{
          fontSize: '2.5rem',
          fontWeight: 700,
          color: colors.textPrimary,
          marginBottom: '0.5rem',
        }}
      >
        Of Our Clients
      </h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '300px 1fr',
          gap: '3rem',
          marginTop: '3rem',
        }}
      >
        {/* Left - Review List */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          {reviews.map((review, index) => (
            <div
              key={index}
              onClick={() => setSelectedReview(index)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem',
                borderRadius: 12,
                backgroundColor:
                  selectedReview === index ? colors.primaryLight : 'transparent',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
                border:
                  selectedReview === index
                    ? `2px solid ${colors.primary}`
                    : `2px solid transparent`,
              }}
            >
              <div
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  backgroundColor: colors.primaryLight,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem',
                  flexShrink: 0,
                }}
              >
                {review.avatar}
              </div>
              <div>
                <div
                  style={{
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: colors.textPrimary,
                    marginBottom: '0.25rem',
                  }}
                >
                  {review.name}
                </div>
                <div
                  style={{
                    fontSize: '0.85rem',
                    color: colors.textSecondary,
                  }}
                >
                  {review.role}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right - Review Content */}
        <div
          style={{
            backgroundColor: colors.background,
            borderRadius: 16,
            padding: '3rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              fontSize: '4rem',
              color: colors.primary,
              marginBottom: '1.5rem',
              lineHeight: 1,
            }}
          >
            "
          </div>
          <p
            style={{
              fontSize: '1.1rem',
              color: colors.textPrimary,
              lineHeight: 1.8,
              marginBottom: '2rem',
              fontStyle: 'italic',
            }}
          >
            {reviews[selectedReview].text}
          </p>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <div
              style={{
                width: 50,
                height: 50,
                borderRadius: '50%',
                backgroundColor: colors.primaryLight,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
              }}
            >
              {reviews[selectedReview].avatar}
            </div>
            <div>
              <div
                style={{
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: colors.textPrimary,
                }}
              >
                {reviews[selectedReview].name}
              </div>
              <div
                style={{
                  fontSize: '0.85rem',
                  color: colors.textSecondary,
                }}
              >
                {reviews[selectedReview].role}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

