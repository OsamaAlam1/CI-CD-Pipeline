import { Request, Response } from 'express';
import Ticket, { ITicket } from '../models/Ticket';
import type { AuthRequest } from '../middleware/authMiddleware';
import AuditLog from '../models/AuditLog';

// Generate unique ticket number
// Format: TYYYYMMDD### (e.g., T20260120001, T20260120002, ...)
// Stores full unique ID in database, but displays only last 3 digits (001, 002) on ticket
// Starts from 001 each day and increments sequentially
async function generateTicketNumber(): Promise<string> {
  const today = new Date();
  const dateStr = today.toISOString().slice(0, 10).replace(/-/g, ''); // YYYYMMDD
  
  // Find the last ticket for today (ticket numbers starting with today's date)
  const lastTicket = await Ticket.findOne({
    ticketNumber: new RegExp(`^T${dateStr}`),
  }).sort({ ticketNumber: -1 });

  let sequence = 1; // Start from 001 for each new day
  if (lastTicket && lastTicket.ticketNumber) {
    // Extract the 3-digit sequence from the end of the ticket number
    const lastSequence = parseInt(lastTicket.ticketNumber.slice(-3));
    if (!isNaN(lastSequence) && lastSequence > 0) {
      sequence = lastSequence + 1;
    }
  }

  // Format: T + YYYYMMDD + ### (full unique ID for database)
  // Display will show only last 3 digits (001, 002, 003) on printed ticket
  return `T${dateStr}${sequence.toString().padStart(3, '0')}`;
}

// Simple helper to sanitize strings
const cleanString = (value?: string): string | undefined => {
  if (typeof value !== 'string') return undefined;
  const trimmed = value.trim();
  return trimmed.length ? trimmed : undefined;
};

// Basic phone number validation (digits, +, -, spaces)
const isValidPhone = (value: string): boolean => {
  return /^[0-9+\-\s]{6,20}$/.test(value);
};

export const createTicket = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      patientName,
      phoneNumber,
      age,
      gender,
      doctorName,
      fees,
      reasonForVisit,
      appointmentType,
      priority,
      dateOfBirth,
      email,
      address,
      previousVisit,
      insuranceProvider,
      insuranceNumber,
      notes,
      medicines,
    } = req.body;

    const safePatientName = cleanString(patientName);
    const safePhoneNumber = cleanString(phoneNumber);

    // Validate required fields
    if (!safePatientName || !safePhoneNumber) {
      res.status(400).json({
        success: false,
        message: 'Patient name and phone number are required',
      });
      return;
    }

    if (!isValidPhone(safePhoneNumber)) {
      res.status(400).json({
        success: false,
        message: 'Phone number format is invalid',
      });
      return;
    }

    const numericAge = age !== undefined && age !== null && age !== '' ? Number(age) : undefined;
    const numericFees = fees !== undefined && fees !== null && fees !== '' ? Number(fees) : undefined;

    if (numericAge !== undefined && (Number.isNaN(numericAge) || numericAge < 0 || numericAge > 150)) {
      res.status(400).json({
        success: false,
        message: 'Age must be a valid number between 0 and 150',
      });
      return;
    }

    if (numericFees !== undefined && (Number.isNaN(numericFees) || numericFees < 0)) {
      res.status(400).json({
        success: false,
        message: 'Fees must be a valid non-negative number',
      });
      return;
    }

    // Generate ticket number
    const ticketNumber = await generateTicketNumber();

    const authReq = req as AuthRequest;

    // Create ticket
    const ticket = new Ticket({
      ticketNumber,
      patientName: safePatientName,
      phoneNumber: safePhoneNumber,
      age: numericAge,
      gender,
      doctorName: cleanString(doctorName),
      fees: numericFees,
      reasonForVisit: cleanString(reasonForVisit),
      appointmentType: appointmentType || 'walk-in',
      priority: priority || 'normal',
      dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
      email: cleanString(email),
      address: cleanString(address),
      previousVisit: Boolean(previousVisit),
      insuranceProvider: cleanString(insuranceProvider),
      insuranceNumber: cleanString(insuranceNumber),
      notes: cleanString(notes),
      medicines: cleanString(medicines),
      status: 'pending',
      createdBy: authReq.userId,
      createdByUsername: authReq.username,
    });

    await ticket.save();

    // Audit log
    await AuditLog.create({
      userId: authReq.userId,
      username: authReq.username,
      action: 'CREATE_TICKET',
      resource: 'Ticket',
      details: {
        ticketId: ticket._id,
        ticketNumber: ticket.ticketNumber,
        patientName: ticket.patientName,
      },
    });

    res.status(201).json({
      success: true,
      message: 'Ticket created successfully',
      data: ticket,
    });
  } catch (error: any) {
    console.error('Error creating ticket:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create ticket',
      error: error.message,
    });
  }
};

export const getTickets = async (req: Request, res: Response): Promise<void> => {
  try {
    const { status, date, page = 1, limit = 50 } = req.query;

    const query: any = {};
    if (status) {
      query.status = status;
    }
    if (date) {
      const startDate = new Date(date as string);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(date as string);
      endDate.setHours(23, 59, 59, 999);
      query.createdAt = { $gte: startDate, $lte: endDate };
    }

    const skip = (Number(page) - 1) * Number(limit);

    const tickets = await Ticket.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Ticket.countDocuments(query);

    res.json({
      success: true,
      data: tickets,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error: any) {
    console.error('Error fetching tickets:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch tickets',
      error: error.message,
    });
  }
};

export const getTicketById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const ticket = await Ticket.findById(id);

    if (!ticket) {
      res.status(404).json({
        success: false,
        message: 'Ticket not found',
      });
      return;
    }

    res.json({
      success: true,
      data: ticket,
    });
  } catch (error: any) {
    console.error('Error fetching ticket:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch ticket',
      error: error.message,
    });
  }
};

export const updateTicketStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !['pending', 'in-progress', 'completed', 'cancelled'].includes(status)) {
      res.status(400).json({
        success: false,
        message: 'Valid status is required',
      });
      return;
    }

    const ticket = await Ticket.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!ticket) {
      res.status(404).json({
        success: false,
        message: 'Ticket not found',
      });
      return;
    }

    res.json({
      success: true,
      message: 'Ticket status updated',
      data: ticket,
    });
  } catch (error: any) {
    console.error('Error updating ticket:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update ticket',
      error: error.message,
    });
  }
};

