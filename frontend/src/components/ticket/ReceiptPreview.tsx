import type { Ticket } from '../../services/api';
import { colors } from '../../theme/colors';
import { Button } from '../Button';

interface ReceiptPreviewProps {
  ticket: Ticket;
  onPrint: () => void;
  onNewTicket: () => void;
}

export function ReceiptPreview({ ticket, onPrint, onNewTicket }: ReceiptPreviewProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatCurrency = (amount?: number) => {
    if (!amount) return 'PKR 0.00';
    return `PKR ${amount.toFixed(2)}`;
  };

  return (
    <>
      {/* Preview Container */}
      <div
        style={{
          width: '100%',
          maxWidth: 800,
          margin: '0 auto',
        }}
      >
        {/* Preview Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem',
            padding: '1.5rem',
            backgroundColor: colors.surface,
            borderRadius: 16,
            boxShadow: '0 4px 12px rgba(15, 23, 42, 0.1)',
          }}
        >
          <div>
            <h2
              style={{
                margin: 0,
                fontSize: '1.5rem',
                fontWeight: 700,
                color: colors.textPrimary,
                marginBottom: '0.25rem',
              }}
            >
              Receipt Preview
            </h2>
            <p
              style={{
                margin: 0,
                fontSize: '0.9rem',
                color: colors.textSecondary,
              }}
            >
              Review your receipt before printing (Optimized for A4 - Single Page)
            </p>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Button variant="secondary" onClick={onNewTicket}>
              ← Back
            </Button>
            <Button variant="primary" onClick={onPrint}>
              🖨️ Print Receipt
            </Button>
          </div>
        </div>

        {/* A4 Receipt - Compact Single Page Design */}
        <div
          id="receipt-content"
          style={{
            width: '210mm',
            height: '297mm',
            margin: '0 auto',
            padding: '15mm',
            backgroundColor: colors.surface,
            boxShadow: '0 8px 24px rgba(15, 23, 42, 0.15)',
            borderRadius: 8,
            fontFamily: 'system-ui, -apple-system, sans-serif',
            display: 'flex',
            flexDirection: 'column',
            fontSize: '11pt',
            lineHeight: 1.4,
          }}
        >
          {/* Clinic Header - Logo and Name in One Line on Left */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4mm',
              marginBottom: '8mm',
              paddingBottom: '6mm',
              borderBottom: `2px solid ${colors.primary}`,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '45px',
                height: '45px',
                borderRadius: '8px',
                backgroundColor: colors.primary,
                color: '#ffffff',
                fontSize: '18pt',
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              AC
            </div>
            <div>
              <h1
                style={{
                  margin: 0,
                  fontSize: '16pt',
                  fontWeight: 700,
                  color: colors.textPrimary,
                  lineHeight: 1.2,
                }}
              >
                Ali Maternity Clinic
              </h1>
              <p
                style={{
                  margin: 0,
                  fontSize: '9pt',
                  color: colors.textSecondary,
                }}
              >
                Patient Receipt
              </p>
            </div>
          </div>

          {/* Ticket Number - Compact */}
          <div
            style={{
              backgroundColor: colors.primaryLight,
              padding: '6mm',
              borderRadius: '8px',
              marginBottom: '8mm',
              border: `1.5px solid ${colors.primary}`,
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontSize: '8pt',
                fontWeight: 600,
                color: colors.primary,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '2mm',
              }}
            >
              Ticket Number
            </div>
            <div
              style={{
                fontSize: '20pt',
                fontWeight: 700,
                color: colors.primary,
                letterSpacing: '0.1em',
                fontFamily: 'monospace',
              }}
            >
              {/* Display only last 3 digits for easy patient understanding (001, 002, 003) */}
              {ticket.ticketNumber.slice(-3)}
            </div>
          </div>

          {/* Patient Information - Compact Grid */}
          <div style={{ marginBottom: '6mm' }}>
            <h3
              style={{
                fontSize: '11pt',
                fontWeight: 600,
                color: colors.textPrimary,
                marginBottom: '4mm',
                paddingBottom: '2mm',
                borderBottom: `1px solid ${colors.border}`,
              }}
            >
              Patient Information
            </h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '4mm',
                fontSize: '10pt',
              }}
            >
              <div>
                <div
                  style={{
                    color: colors.textSecondary,
                    fontSize: '8pt',
                    marginBottom: '1mm',
                  }}
                >
                  Patient Name
                </div>
                <div
                  style={{
                    color: colors.textPrimary,
                    fontWeight: 600,
                    fontSize: '10pt',
                  }}
                >
                  {ticket.patientName}
                </div>
              </div>
              <div>
                <div
                  style={{
                    color: colors.textSecondary,
                    fontSize: '8pt',
                    marginBottom: '1mm',
                  }}
                >
                  Phone Number
                </div>
                <div
                  style={{
                    color: colors.textPrimary,
                    fontWeight: 600,
                    fontSize: '10pt',
                  }}
                >
                  {ticket.phoneNumber}
                </div>
              </div>
              {ticket.age && (
                <div>
                  <div
                    style={{
                      color: colors.textSecondary,
                      fontSize: '8pt',
                      marginBottom: '1mm',
                    }}
                  >
                    Age
                  </div>
                  <div
                    style={{
                      color: colors.textPrimary,
                      fontWeight: 600,
                      fontSize: '10pt',
                    }}
                  >
                    {ticket.age} years
                  </div>
                </div>
              )}
              {ticket.gender && (
                <div>
                  <div
                    style={{
                      color: colors.textSecondary,
                      fontSize: '8pt',
                      marginBottom: '1mm',
                    }}
                  >
                    Gender
                  </div>
                  <div
                    style={{
                      color: colors.textPrimary,
                      fontWeight: 600,
                      fontSize: '10pt',
                      textTransform: 'capitalize',
                    }}
                  >
                    {ticket.gender}
                  </div>
                </div>
              )}
              {ticket.doctorName && (
                <div>
                  <div
                    style={{
                      color: colors.textSecondary,
                      fontSize: '8pt',
                      marginBottom: '1mm',
                    }}
                  >
                    Doctor Name
                  </div>
                  <div
                    style={{
                      color: colors.textPrimary,
                      fontWeight: 600,
                      fontSize: '10pt',
                    }}
                  >
                    {ticket.doctorName}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Visit Details - Compact */}
          <div style={{ marginBottom: '6mm' }}>
            <h3
              style={{
                fontSize: '11pt',
                fontWeight: 600,
                color: colors.textPrimary,
                marginBottom: '4mm',
                paddingBottom: '2mm',
                borderBottom: `1px solid ${colors.border}`,
              }}
            >
              Visit Details
            </h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '4mm',
                fontSize: '10pt',
              }}
            >
              <div>
                <div
                  style={{
                    color: colors.textSecondary,
                    fontSize: '8pt',
                    marginBottom: '1mm',
                  }}
                >
                  Date
                </div>
                <div
                  style={{
                    color: colors.textPrimary,
                    fontWeight: 600,
                    fontSize: '10pt',
                  }}
                >
                  {formatDate(ticket.createdAt)}
                </div>
              </div>
              <div>
                <div
                  style={{
                    color: colors.textSecondary,
                    fontSize: '8pt',
                    marginBottom: '1mm',
                  }}
                >
                  Time
                </div>
                <div
                  style={{
                    color: colors.textPrimary,
                    fontWeight: 600,
                    fontSize: '10pt',
                  }}
                >
                  {formatTime(ticket.createdAt)}
                </div>
              </div>
              {ticket.reasonForVisit && (
                <div style={{ gridColumn: '1 / -1' }}>
                  <div
                    style={{
                      color: colors.textSecondary,
                      fontSize: '8pt',
                      marginBottom: '1mm',
                    }}
                  >
                    Reason for Visit
                  </div>
                  <div
                    style={{
                      color: colors.textPrimary,
                      fontWeight: 600,
                      fontSize: '10pt',
                    }}
                  >
                    {ticket.reasonForVisit}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Medicines Section - Always shown for doctor to write */}
          <div style={{ marginBottom: '6mm', flex: '0 0 auto' }}>
            <h3
              style={{
                fontSize: '11pt',
                fontWeight: 600,
                color: colors.textPrimary,
                marginBottom: '3mm',
                paddingBottom: '2mm',
                borderBottom: `1px solid ${colors.border}`,
              }}
            >
              Prescribed Medicines
            </h3>
            <div
              style={{
                backgroundColor: colors.background,
                padding: '4mm',
                borderRadius: '6px',
                border: `1px solid ${colors.border}`,
                minHeight: '35mm',
                fontSize: '9pt',
                color: colors.textPrimary,
                whiteSpace: 'pre-wrap',
                lineHeight: 1.8,
              }}
            >
              {ticket.medicines || ''}
            </div>
          </div>

          {/* Payment Section - Compact */}
          <div
            style={{
              backgroundColor: colors.background,
              padding: '6mm',
              borderRadius: '8px',
              marginBottom: '6mm',
              marginTop: 'auto',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '4mm',
                backgroundColor: colors.surface,
                borderRadius: '6px',
              }}
            >
              <div>
                <div
                  style={{
                    color: colors.textSecondary,
                    fontSize: '9pt',
                    marginBottom: '2mm',
                  }}
                >
                  Total Amount
                </div>
                <div
                  style={{
                    color: colors.primary,
                    fontWeight: 700,
                    fontSize: '16pt',
                  }}
                >
                  {formatCurrency(ticket.fees)}
                </div>
              </div>
              <div
                style={{
                  padding: '3mm 8mm',
                  backgroundColor: colors.primary,
                  color: '#ffffff',
                  borderRadius: '6px',
                  fontWeight: 600,
                  fontSize: '9pt',
                }}
              >
                Paid
              </div>
            </div>
          </div>

          {/* Footer - Compact */}
          <div
            style={{
              marginTop: 'auto',
              paddingTop: '4mm',
              borderTop: `1px solid ${colors.border}`,
              textAlign: 'center',
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: '8pt',
                color: colors.textSecondary,
                lineHeight: 1.4,
              }}
            >
              Thank you for choosing Ali Maternity Clinic
            </p>
            <p
              style={{
                margin: '2mm 0 0',
                fontSize: '7pt',
                color: colors.textSecondary,
              }}
            >
              This is a computer-generated receipt. No signature required.
            </p>
          </div>
        </div>
      </div>

      {/* Print Styles - Optimized for A4 Single Page */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @media print {
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          
          body {
            margin: 0;
            padding: 0;
          }
          
          body * {
            visibility: hidden;
          }
          
          #receipt-content,
          #receipt-content * {
            visibility: visible;
          }
          
          #receipt-content {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 210mm !important;
            height: 297mm !important;
            max-width: 210mm !important;
            max-height: 297mm !important;
            margin: 0 !important;
            padding: 15mm !important;
            box-sizing: border-box !important;
            box-shadow: none !important;
            border-radius: 0 !important;
            page-break-after: avoid !important;
            page-break-inside: avoid !important;
            page-break-before: avoid !important;
            overflow: hidden !important;
            display: flex !important;
            flex-direction: column !important;
          }
          
          @page {
            size: A4;
            margin: 0;
            padding: 0;
          }
          
          /* Prevent page breaks in all elements */
          h1, h2, h3, h4, h5, h6, p, div, section {
            page-break-after: avoid !important;
            page-break-inside: avoid !important;
            page-break-before: avoid !important;
          }
          
          /* Ensure no scaling */
          @page {
            size: 210mm 297mm;
            margin: 0;
          }
        }
      `,
        }}
      />
    </>
  );
}
