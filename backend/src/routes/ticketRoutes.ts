import express, { Router } from 'express';
import {
  createTicket,
  getTickets,
  getTicketById,
  updateTicketStatus,
} from '../controllers/ticketController';
import { authMiddleware } from '../middleware/authMiddleware';

const router: Router = express.Router();

// All ticket routes require authentication
router.use(authMiddleware);

router.post('/', createTicket);
router.get('/', getTickets);
router.get('/:id', getTicketById);
router.patch('/:id/status', updateTicketStatus);

export default router;

