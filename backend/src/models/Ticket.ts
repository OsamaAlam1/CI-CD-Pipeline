import mongoose, { Schema, Document } from 'mongoose';

export interface ITicket extends Document {
  ticketNumber: string;
  patientName: string;
  phoneNumber: string;
  age?: number;
  gender?: 'male' | 'female' | 'other';
  doctorName?: string;
  fees?: number;
  // Suggested additional fields
  reasonForVisit?: string;
  appointmentType?: 'walk-in' | 'scheduled' | 'emergency' | 'follow-up';
  priority?: 'low' | 'normal' | 'high' | 'urgent';
  dateOfBirth?: Date;
  email?: string;
  address?: string;
  previousVisit?: boolean;
  insuranceProvider?: string;
  insuranceNumber?: string;
  notes?: string;
  medicines?: string;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  createdBy?: string;
  createdByUsername?: string;
  createdAt: Date;
  updatedAt: Date;
}

const TicketSchema: Schema = new Schema(
  {
    ticketNumber: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    patientName: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      min: 0,
      max: 150,
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
    },
    doctorName: {
      type: String,
      trim: true,
    },
    fees: {
      type: Number,
      min: 0,
    },
    reasonForVisit: {
      type: String,
      trim: true,
    },
    appointmentType: {
      type: String,
      enum: ['walk-in', 'scheduled', 'emergency', 'follow-up'],
      default: 'walk-in',
    },
    priority: {
      type: String,
      enum: ['low', 'normal', 'high', 'urgent'],
      default: 'normal',
    },
    dateOfBirth: {
      type: Date,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    address: {
      type: String,
      trim: true,
    },
    previousVisit: {
      type: Boolean,
      default: false,
    },
    insuranceProvider: {
      type: String,
      trim: true,
    },
    insuranceNumber: {
      type: String,
      trim: true,
    },
    notes: {
      type: String,
      trim: true,
    },
    medicines: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['pending', 'in-progress', 'completed', 'cancelled'],
      default: 'pending',
    },
    createdBy: {
      type: String,
    },
    createdByUsername: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ITicket>('Ticket', TicketSchema);

