import type { Ticket } from '../../services/api';
import { colors } from '../../theme/colors';
import { Button } from '../Button';

interface TicketDisplayProps {
  ticket: Ticket;
  onPrint?: () => void;
  onNewTicket?: () => void;
}

export function TicketDisplay({ ticket, onPrint, onNewTicket }: TicketDisplayProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatCurrency = (amount?: number) => {
    if (!amount) return 'N/A';
    return `PKR ${amount.toFixed(2)}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return '#F59E0B';
      case 'in-progress':
        return colors.primary;
      case 'completed':
        return '#10B981';
      case 'cancelled':
        return colors.danger;
      default:
        return colors.textSecondary;
    }
  };

  return (
    <div
      style={{
        width: '100%',
        maxWidth: 650,
        backgroundColor: colors.surface,
        borderRadius: 24,
        padding: 0,
        boxShadow: '0 20px 60px rgba(15, 23, 42, 0.15)',
        overflow: 'hidden',
      }}
    >
      {/* Elegant Success Header */}
      <div
        style={{
          background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
          padding: '2.5rem',
          textAlign: 'center',
          color: colors.surface,
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 80,
            height: 80,
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
            border: '3px solid rgba(255, 255, 255, 0.3)',
            marginBottom: '1rem',
            fontSize: '2rem',
          }}
        >
          ✓
        </div>
        <h1
          style={{
            margin: 0,
            fontSize: '2rem',
            color: colors.surface,
            fontWeight: 700,
            marginBottom: '0.5rem',
          }}
        >
          Ticket Generated Successfully
        </h1>
        <p style={{ margin: 0, color: colors.surface, fontSize: '0.95rem', opacity: 0.9 }}>
          Your ticket has been created and saved
        </p>
      </div>

      {/* Ticket Content */}
      <div style={{ padding: '2.5rem' }}>

        {/* Ticket Card */}
        <div
          style={{
            backgroundColor: colors.primaryLight,
            borderRadius: 20,
            padding: '2rem',
            marginBottom: '2rem',
            border: `3px solid ${colors.primary}`,
            boxShadow: '0 8px 24px rgba(11, 116, 209, 0.15)',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '1.5rem',
            }}
          >
            <div>
              <div
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: colors.primary,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginBottom: '0.5rem',
                }}
              >
                Ticket Number
              </div>
              <div
                style={{
                  fontSize: '2.5rem',
                  fontWeight: 700,
                  color: colors.primary,
                  letterSpacing: '0.08em',
                  fontFamily: 'monospace',
                }}
              >
                {ticket.ticketNumber}
              </div>
            </div>
            <div
              style={{
                padding: '0.5rem 1.25rem',
                borderRadius: 999,
                backgroundColor: colors.surface,
                color: getStatusColor(ticket.status),
                fontSize: '0.85rem',
                fontWeight: 600,
                textTransform: 'capitalize',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              }}
            >
              {ticket.status}
            </div>
          </div>

          <div
            style={{
              height: 2,
              background: `linear-gradient(90deg, transparent, ${colors.primary}, transparent)`,
              margin: '1.5rem 0',
            }}
          />

          {/* Primary Ticket Information */}
          <div
            style={{
              backgroundColor: colors.surface,
              borderRadius: 16,
              padding: '1.5rem',
              marginBottom: '1rem',
              boxShadow: '0 4px 12px rgba(15, 23, 42, 0.08)',
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div>
                <div
                  style={{
                    color: colors.textSecondary,
                    fontSize: '0.8rem',
                    fontWeight: 500,
                    marginBottom: '0.5rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  Patient Name
                </div>
                <div style={{ color: colors.textPrimary, fontWeight: 700, fontSize: '1.2rem' }}>
                  {ticket.patientName}
                </div>
              </div>
              <div>
                <div
                  style={{
                    color: colors.textSecondary,
                    fontSize: '0.8rem',
                    fontWeight: 500,
                    marginBottom: '0.5rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  Phone Number
                </div>
                <div style={{ color: colors.textPrimary, fontWeight: 600, fontSize: '1rem' }}>
                  {ticket.phoneNumber}
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Information */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem',
              padding: '1.5rem',
              backgroundColor: colors.background,
              borderRadius: 16,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: colors.textSecondary, fontSize: '0.9rem' }}>
                Age:
              </span>
              <span style={{ color: colors.textPrimary, fontWeight: 600 }}>
                {ticket.age ? `${ticket.age} years` : 'N/A'}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: colors.textSecondary, fontSize: '0.9rem' }}>
                Gender:
              </span>
              <span style={{ color: colors.textPrimary, fontWeight: 600, textTransform: 'capitalize' }}>
                {ticket.gender || 'N/A'}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: colors.textSecondary, fontSize: '0.9rem' }}>
                Doctor Name:
              </span>
              <span style={{ color: colors.textPrimary, fontWeight: 600 }}>
                {ticket.doctorName || 'Not assigned'}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: colors.textSecondary, fontSize: '0.9rem' }}>
                Date:
              </span>
              <span style={{ color: colors.textPrimary, fontWeight: 600 }}>
                {formatDate(ticket.createdAt)}
              </span>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.75rem',
                backgroundColor: colors.surface,
                borderRadius: 12,
                gridColumn: '1 / -1',
              }}
            >
              <span
                style={{
                  color: colors.textSecondary,
                  fontSize: '0.9rem',
                  fontWeight: 500,
                }}
              >
                Fees:
              </span>
              <span
                style={{
                  color: colors.primary,
                  fontWeight: 700,
                  fontSize: '1.25rem',
                }}
              >
                {formatCurrency(ticket.fees)}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: colors.textSecondary, fontSize: '0.9rem' }}>
                Time:
              </span>
              <span style={{ color: colors.textPrimary, fontSize: '0.9rem' }}>
                {new Date(ticket.createdAt).toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
          </div>

          {/* Additional Information */}
          {(ticket.reasonForVisit || ticket.appointmentType) && (
            <>
              <div
                style={{
                  height: '1px',
                  backgroundColor: colors.border,
                  margin: '0.5rem 0',
                }}
              />
              {ticket.reasonForVisit && (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: colors.textSecondary, fontSize: '0.9rem' }}>
                    Reason for Visit:
                  </span>
                  <span style={{ color: colors.textPrimary, fontWeight: 600 }}>
                    {ticket.reasonForVisit}
                  </span>
                </div>
              )}
              {ticket.appointmentType && (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: colors.textSecondary, fontSize: '0.9rem' }}>
                    Appointment Type:
                  </span>
                  <span style={{ color: colors.textPrimary, fontWeight: 600, textTransform: 'capitalize' }}>
                    {ticket.appointmentType.replace('-', ' ')}
                  </span>
                </div>
              )}
            </>
          )}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          {onPrint && (
            <Button
              variant="secondary"
              onClick={onPrint}
              style={{ flex: 1, padding: '0.9rem' }}
            >
              🖨️ Print Ticket
            </Button>
          )}
          {onNewTicket && (
            <Button
              variant="primary"
              onClick={onNewTicket}
              style={{ flex: 1, padding: '0.9rem' }}
            >
              ➕ Create New Ticket
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

