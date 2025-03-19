// ✅ Google Sheets Integration
const { GoogleSpreadsheet } = require("google-spreadsheet");
const { JWT } = require("google-auth-library");
const creds = {
  type: "service_account",
  project_id: process.env.GOOGLE_PROJECT_ID,
  private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
  private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  client_email: process.env.GOOGLE_CLIENT_EMAIL,
  client_id: process.env.GOOGLE_CLIENT_ID,
  auth_uri: process.env.GOOGLE_AUTH_URI,
  token_uri: process.env.GOOGLE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.GOOGLE_AUTH_PROVIDER_CERT_URL,
  client_x509_cert_url: process.env.GOOGLE_CLIENT_CERT_URL,
};

// ✅ Google Sheet ID (Replace with your actual Sheet ID)
const SHEET_ID = "13WezerzzuaGoWN3mDEpnmZmgj4I0aS9h3i91X7Msw0g"; 

// ✅ Function to update Google Sheets on registration
async function updateGoogleSheet(userData) {
  async function updateGoogleSheet(userData, isAbstractSubmission = false) {
    try {
      console.log("🟢 Google Sheets update triggered for:", userData.email);
  
      const auth = new JWT({
        email: process.env.GOOGLE_CLIENT_EMAIL,
        key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
      });
  
      const doc = new GoogleSpreadsheet(SHEET_ID);
      await doc.useServiceAccountAuth(auth);
      await doc.loadInfo();
  
      const sheet = doc.sheetsByIndex[0];
  
      // ✅ Check if the user already exists in Google Sheets
      const rows = await sheet.getRows();
      const existingRow = rows.find(row => row.Email === userData.email);
  
      if (existingRow) {
        console.log("🔄 Updating existing user row in Google Sheets for:", userData.email);
  
        // ✅ Update abstract details if user already exists
        if (isAbstractSubmission) {
          existingRow.Abstract_Title = userData.abstractSubmission.title || "N/A";
          existingRow.Abstract_Scope = userData.abstractSubmission.scope || "N/A";
          existingRow.Abstract_PresentingType = userData.abstractSubmission.presentingType || "N/A";
          existingRow.Abstract_File = userData.abstractSubmission.abstractFile || "N/A";
          existingRow.Abstract_Authors = userData.abstractSubmission.otherAuthors || "N/A";
        } else {
          // ✅ Update all user details during registration
          
          existingRow.Email = userData.email;
          existingRow.Phone = userData.phone;
          existingRow.Given_Name = userData.givenName;
          existingRow.Family_Name = userData.familyName || "N/A";
          existingRow.Full_Name = userData.fullName;
          existingRow.Country = userData.country;
          existingRow.Affiliation = userData.affiliation;
          existingRow.Registered_At = new Date().toISOString();
        }
  
        await existingRow.save();
        console.log("✅ Google Sheets row updated for:", userData.email);
      } else {
        console.log("⚠️ User not found in Google Sheets. Adding new row...");
        await sheet.addRow({
          
          Email: userData.email,
          Phone: userData.phone,
          Given_Name: userData.givenName,
          Family_Name: userData.familyName || "N/A",
          Full_Name: userData.fullName,
          Country: userData.country,
          Affiliation: userData.affiliation,
          Registered_At: new Date().toISOString(),
          Abstract_Title: userData.abstractSubmission?.title || "N/A",
          Abstract_Scope: userData.abstractSubmission?.scope || "N/A",
          Abstract_PresentingType: userData.abstractSubmission?.presentingType || "N/A",
          Abstract_File: userData.abstractSubmission?.abstractFile || "N/A",
          Abstract_Authors: userData.abstractSubmission?.otherAuthors || "N/A",
        });
        console.log("✅ Google Sheets new row added for:", userData.email);
      }
    } catch (error) {
      console.error("❌ Error updating Google Sheets:", error);
    }
  }
}
// ✅ Ensure function is properly exported
module.exports = { updateGoogleSheet };
