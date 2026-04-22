import nodemailer from 'nodemailer';
import logger from '../utils/logger.js';
import dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });

// Phase 5.4 Notification System
export const sendRelixEmailAlert = async (to, subject, htmlContent) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.ethereal.email',
      port: process.env.SMTP_PORT || 587,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    await transporter.sendMail({
      from: '"RELIX Operations Engine" <alerts@relix-ngo.local>',
      to,
      subject,
      html: htmlContent
    });
    
    logger.info(`Incident Alert email pushed to ${to}`);
  } catch (error) {
    logger.error(`Critical Email Notification Failure: ${error.message}`);
  }
};
