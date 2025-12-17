/**
 * Generate WhatsApp URL with pre-filled message
 * @param phoneNumber - WhatsApp phone number (with country code)
 * @param message - Pre-filled message text
 * @returns WhatsApp URL
 */
export const generateWhatsAppURL = (
  phoneNumber: string,
  message: string
): string => {
  const encodedMessage = encodeURIComponent(message);
  // Remove any spaces or special characters from phone number
  const cleanedPhone = phoneNumber.replace(/[^0-9+]/g, '');
  return `https://wa.me/${cleanedPhone}?text=${encodedMessage}`;
};

/**
 * Format enrollment data into WhatsApp message
 */
export interface EnrollmentData {
  name: string;
  phone: string;
  email: string;
  institute?: string;
  course: string;
}

export const formatEnrollmentMessage = (data: EnrollmentData): string => {
  let message = `🎓 *New Enrollment Request*\n\n`;
  message += `👤 *Name:* ${data.name}\n`;
  message += `📱 *Phone:* ${data.phone}\n`;
  message += `📧 *Email:* ${data.email}\n`;
  
  if (data.institute) {
    message += `🏫 *Institute:* ${data.institute}\n`;
  }
  
  message += `📚 *Course:* ${data.course}\n\n`;
  message += `_Please confirm my enrollment. Thank you!_`;
  
  return message;
};