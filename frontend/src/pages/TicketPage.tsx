import { useState } from 'react';
import type { FormEvent } from 'react';
import { PageShell } from '../components/PageShell';
import { TextInput, Select, TextArea, Checkbox, Button } from '../components';
import { ReceiptPreview } from '../components/ticket/ReceiptPreview';
import { ticketApi } from '../services/api';
import type { Ticket, TicketData } from '../services/api';
import { colors } from '../theme/colors';

export function TicketPage() {
  const [formData, setFormData] = useState<TicketData>({
    patientName: '',
    phoneNumber: '',
    age: undefined,
    gender: undefined,
    doctorName: '',
    fees: undefined,
    reasonForVisit: '',
    dateOfBirth: '',
    previousVisit: false,
    notes: '',
    medicines: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [generatedTicket, setGeneratedTicket] = useState<Ticket | null>(null);

  const handleChange = (
    field: keyof TicketData,
    value: string | boolean | number | undefined
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.patientName.trim()) {
      newErrors.patientName = 'Patient name is required';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^[\d\s\-\+\(\)]+$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }


    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const response = await ticketApi.create(formData);

      if (response.success && response.data) {
        setGeneratedTicket(response.data);
        // Reset form
        setFormData({
          patientName: '',
          phoneNumber: '',
          age: undefined,
          gender: undefined,
          doctorName: '',
          fees: undefined,
          reasonForVisit: '',
          dateOfBirth: '',
          previousVisit: false,
          notes: '',
          medicines: '',
        });
      } else {
        setErrors({ submit: response.message || 'Failed to create ticket' });
      }
    } catch (error: any) {
      setErrors({ submit: error.message || 'An error occurred' });
    } finally {
      setLoading(false);
    }
  };

  const handleNewTicket = () => {
    setGeneratedTicket(null);
  };

  const handlePrint = () => {
    window.print();
  };

  if (generatedTicket) {
    return (
      <PageShell>
        <ReceiptPreview
          ticket={generatedTicket}
          onPrint={handlePrint}
          onNewTicket={handleNewTicket}
        />
      </PageShell>
    );
  }

  return (
    <PageShell>
      <div
        style={{
          width: '100%',
          maxWidth: 900,
          backgroundColor: colors.surface,
          borderRadius: 24,
          padding: 0,
          boxShadow: '0 20px 60px rgba(15, 23, 42, 0.15)',
          overflow: 'hidden',
        }}
      >
        {/* Elegant Header */}
        <div
          style={{
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
            padding: '2.5rem',
            color: colors.surface,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
            }}
          >
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: 16,
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                color: colors.surface,
                fontSize: '1.8rem',
                fontWeight: 700,
                border: '2px solid rgba(255, 255, 255, 0.3)',
              }}
            >
              AC
            </div>
            <div>
              <h1
                style={{
                  margin: 0,
                  fontSize: '2rem',
                  color: colors.surface,
                  fontWeight: 700,
                  marginBottom: '0.25rem',
                }}
              >
                Ali Maternity Clinic
              </h1>
              <p
                style={{
                  margin: 0,
                  fontSize: '0.95rem',
                  color: colors.surface,
                  opacity: 0.9,
                }}
              >
                Patient Ticket Generation
              </p>
            </div>
          </div>
        </div>

        {/* Form Content with Better Spacing */}
        <div style={{ padding: '3rem' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {/* Patient Information Section */}
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '1.5rem',
                }}
              >
                <div
                  style={{
                    width: 4,
                    height: 24,
                    borderRadius: 2,
                    backgroundColor: colors.primary,
                  }}
                />
                <h2
                  style={{
                    margin: 0,
                    fontSize: '1.3rem',
                    fontWeight: 600,
                    color: colors.textPrimary,
                  }}
                >
                  Patient Information
                </h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                  <TextInput
                    label="Patient Name *"
                    placeholder="Enter patient's full name"
                    value={formData.patientName}
                    onChange={(e) => handleChange('patientName', e.target.value)}
                    error={errors.patientName}
                    required
                  />
                  <TextInput
                    label="Phone Number *"
                    placeholder="Enter phone number"
                    value={formData.phoneNumber}
                    onChange={(e) => handleChange('phoneNumber', e.target.value)}
                    error={errors.phoneNumber}
                    required
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.25rem' }}>
                  <TextInput
                    label="Age"
                    type="number"
                    placeholder="Age"
                    value={formData.age || ''}
                    onChange={(e) => handleChange('age', e.target.value ? Number(e.target.value) : undefined)}
                    error={errors.age}
                    min={0}
                    max={150}
                  />
                  <Select
                    label="Gender"
                    value={formData.gender || ''}
                    onChange={(e) => handleChange('gender', e.target.value || undefined)}
                    options={[
                      { value: '', label: 'Select gender' },
                      { value: 'male', label: 'Male' },
                      { value: 'female', label: 'Female' },
                      { value: 'other', label: 'Other' },
                    ]}
                  />
                  <TextInput
                    label="Doctor Name"
                    placeholder="Assigned doctor"
                    value={formData.doctorName}
                    onChange={(e) => handleChange('doctorName', e.target.value)}
                    error={errors.doctorName}
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                  <TextInput
                    label="Date"
                    type="date"
                    value={new Date().toISOString().split('T')[0]}
                    disabled
                    style={{ opacity: 0.7 }}
                  />
                  <TextInput
                    label="Fees (PKR)"
                    type="number"
                    placeholder="0.00"
                    value={formData.fees || ''}
                    onChange={(e) => handleChange('fees', e.target.value ? Number(e.target.value) : undefined)}
                    error={errors.fees}
                    min={0}
                    step="0.01"
                  />
                </div>
              </div>
            </div>

            {/* Divider */}
            <div
              style={{
                height: 1,
                backgroundColor: colors.border,
                margin: '0.5rem 0',
              }}
            />

            {/* Additional Information Section */}
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '1.5rem',
                }}
              >
                <div
                  style={{
                    width: 4,
                    height: 24,
                    borderRadius: 2,
                    backgroundColor: colors.primary,
                  }}
                />
                <h2
                  style={{
                    margin: 0,
                    fontSize: '1.3rem',
                    fontWeight: 600,
                    color: colors.textPrimary,
                  }}
                >
                  Additional Information
                </h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                  <TextInput
                    label="Date of Birth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                  />
                  <TextInput
                    label="Reason for Visit"
                    placeholder="e.g., Regular checkup, Consultation"
                    value={formData.reasonForVisit}
                    onChange={(e) => handleChange('reasonForVisit', e.target.value)}
                  />
                </div>
                <Checkbox
                  label="Previous visit to this clinic"
                  checked={formData.previousVisit}
                  onChange={(e) => handleChange('previousVisit', e.target.checked)}
                />
                <TextArea
                  label="Additional Notes"
                  placeholder="Any additional information or special requirements..."
                  value={formData.notes}
                  onChange={(e) => handleChange('notes', e.target.value)}
                  rows={3}
                />
                <TextArea
                  label="Medicines (Prescribed by Doctor)"
                  placeholder="Enter medicine names, dosages, and instructions..."
                  value={formData.medicines}
                  onChange={(e) => handleChange('medicines', e.target.value)}
                  rows={4}
                />
              </div>
            </div>

            {/* Error Message */}
            {errors.submit && (
              <div
                style={{
                  padding: '1rem 1.25rem',
                  borderRadius: 12,
                  backgroundColor: '#FEE2E2',
                  border: `1px solid ${colors.danger}`,
                  color: colors.danger,
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                }}
              >
                <span style={{ fontSize: '1.2rem' }}>⚠️</span>
                <span>{errors.submit}</span>
              </div>
            )}

            {/* Submit Button */}
            <div style={{ marginTop: '1rem' }}>
              <Button type="submit" fullWidth disabled={loading} style={{ padding: '1rem' }}>
                {loading ? (
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    <span>⏳</span>
                    <span>Generating Ticket...</span>
                  </span>
                ) : (
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    <span>🎫</span>
                    <span>Generate Ticket</span>
                  </span>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </PageShell>
  );
}

