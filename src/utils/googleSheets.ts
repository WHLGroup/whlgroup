/**
 * WHL GROUP - Google Sheets Dispatcher
 * This utility sends loan requests to a Google Apps Script Webhook.
 * Replace GOOGLE_SHEET_WEBHOOK_URL with your actual script URL.
 */
const GOOGLE_SHEET_WEBHOOK_URL = 'YOUR_GOOGLE_SHEET_WEBHOOK_URL';

export const submitToGoogleSheets = async (data: any) => {
  try {
    // If no URL is provided, we log to console for development
    if (GOOGLE_SHEET_WEBHOOK_URL === 'YOUR_GOOGLE_SHEET_WEBHOOK_URL') {
      console.log('Google Sheets Sync (Simulated):', data);
      return true;
    }

    const response = await fetch(GOOGLE_SHEET_WEBHOOK_URL, {
      method: 'POST',
      mode: 'no-cors', // Important for Google Apps Script
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        timestamp: new Date().toISOString(),
        branch: 'WHL Microfinance'
      }),
    });

    return true;
  } catch (error) {
    console.error('Google Sheets Error:', error);
    return false;
  }
};
