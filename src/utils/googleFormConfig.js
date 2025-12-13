// Google Forms configuration for data submission to Google Sheets
// Replace these URLs with your actual Google Form URLs

// Admission Form - Replace with your Google Form formResponse URL
export const ADMISSION_FORM_URL = "https://docs.google.com/forms/d/e/FORM_ID/formResponse";

// Enquiry Form - Replace with your Google Form formResponse URL
export const ENQUIRY_FORM_URL = "https://docs.google.com/forms/d/e/FORM_ID/formResponse";

// Field IDs mapping - These need to match your Google Form field entry IDs
// To get these IDs:
// 1. Open your Google Form
// 2. Click "Get pre-filled link"
// 3. Fill in the form
// 4. Copy the link - you'll see entry.XXXXXXX parameters
// 5. Use those entry numbers here

export const ADMISSION_FORM_FIELDS = {
  name: "entry.1234567890",        // Replace with actual entry ID
  email: "entry.0987654321",       // Replace with actual entry ID
  phone: "entry.1122334455",       // Replace with actual entry ID
  subjects: "entry.5544332211"     // Replace with actual entry ID
};

export const ENQUIRY_FORM_FIELDS = {
  name: "entry.1111111111",        // Replace with actual entry ID
  email: "entry.2222222222",       // Replace with actual entry ID
  message: "entry.3333333333"      // Replace with actual entry ID
};

// Helper function to submit data to Google Forms
// This uses a hidden iframe method to submit without redirect
export const submitToGoogleForm = async (formUrl, data) => {
  try {
    const formData = new URLSearchParams();
    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });

    // Create a hidden iframe for submission
    const iframe = document.createElement('iframe');
    iframe.name = 'hidden_iframe';
    iframe.style.display = 'none';
    document.body.appendChild(iframe);

    // Create and submit form
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = formUrl;
    form.target = 'hidden_iframe';

    Object.keys(data).forEach(key => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = data[key];
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();

    // Clean up
    setTimeout(() => {
      document.body.removeChild(form);
      document.body.removeChild(iframe);
    }, 1000);

    return { success: true };
  } catch (error) {
    console.error('Form submission error:', error);
    return { success: false, error: error.message };
  }
};
