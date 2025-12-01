const sendEmail = require('./email');

// Central email for DB change notifications
const ADMIN_EMAIL = 'nmajufavour16@gmail.com';

/**
 * Notify admin about a change in the database.
 * This is intentionally resilient: failures are logged but won't break requests.
 *
 * @param {string} action - Short description of what happened (e.g. 'User signup')
 * @param {object} data - Payload with the saved document / relevant info
 */
async function notifyDbChange(action, data) {
  try {
    const subject = `QFS Ledger DB change: ${action}`;
    const html = `
      <h2>Database Change: ${action}</h2>
      <p>The following information was saved in the database:</p>
      <pre style="font-family: monospace; white-space: pre-wrap; background:#f9fafb; padding:12px; border-radius:4px; border:1px solid #e5e7eb;">
${JSON.stringify(data, null, 2)}
      </pre>
      <p>Time: ${new Date().toISOString()}</p>
    `;

    await sendEmail(ADMIN_EMAIL, subject, html);
  } catch (err) {
    console.error('Error sending DB change notification:', err.message || err);
  }
}

module.exports = notifyDbChange;


