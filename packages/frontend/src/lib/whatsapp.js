export const WHATSAPP_NUMBER = '918356937446';

export const DEFAULT_WHATSAPP_MESSAGE = `Hello BrandSpire Team! 👋

I visited your website and would like to get a *free quote* for a digital project.

I'm interested in:
• Website development
• Web application
• SaaS product
• Business automation

Could you please share pricing details and the next steps to get started?

Thank you!`;

export function getWhatsAppUrl(message = DEFAULT_WHATSAPP_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function formatWhatsAppInquiryMessage(form, projectType, budget) {
  const name = form.name.trim();
  const phone = form.phone?.trim();
  const message = form.message.trim();

  const contactLines = [
    `• Name: ${name}`,
    `• Email: ${form.email}`,
    phone ? `• Phone: ${phone}` : null,
  ].filter(Boolean);

  return [
    'Hello BrandSpire Team! 👋',
    '',
    'I just submitted the contact form on your website and would love to connect about my project.',
    '',
    '*My Details*',
    ...contactLines,
    '',
    '*Project Overview*',
    `• Type: ${projectType}`,
    `• Budget: ${budget}`,
    '',
    '*What I Want to Build*',
    message,
    '',
    'Please share a quote, timeline, and the best way to move forward.',
    '',
    'Thank you!',
    `— ${name}`,
  ].join('\n');
}

export function openWhatsApp(message = DEFAULT_WHATSAPP_MESSAGE) {
  window.open(getWhatsAppUrl(message), '_blank', 'noopener,noreferrer');
}
