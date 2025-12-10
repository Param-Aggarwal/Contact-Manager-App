
# Contact Manager App (React + Redux)

A feature-rich contact management application built using **React**, **Redux Toolkit**, and **CSS Modules**, designed to closely match Figma UI specifications.

---

## Features
- Add contacts with validation
- Edit contacts (Name field locked for integrity)
- Bulk delete with confirmation modal
- Search by name, email, state, or contact number
- Fully responsive layout
- Pixel-perfect Figma styling

---

## Tech Stack
- **React 18 (Vite)**
- **Redux Toolkit + React-Redux**
- **CSS Modules**
- **TypeScript**
- **Vite**

---

## Installation & Running Locally
cd contact-manager-app
npm install
npm run dev
---

## Project Structure
![Project Structue](screenshots/Project-Structure.png)
---

##  Assumptions & Constraints
- Contact number: **max 10 digits**
- Pincode: **6 digits**
- Name field is **read-only** during edit
- Required fields: Name, Email, Address Line 1, Pincode, State

---

## UI Screenshots

###  Homepage
![Contact Manager App Homepage](screenshots/Contact-Manager-App-Homepage.png)

### Add Contact Modal
![Add Contact Modal](screenshots/Add-Contact-Modal.png)

### ❗ Add Contact Form Validation
![Add Contact Form Validation](screenshots/Add-Contact-Form-Validation.png)

### Batch Select Contacts
![Batch Select Contacts](screenshots/Batch-Select-Contacts.png)

### Batch Delete Confirmation
![Batch Delete Confirmation](screenshots/Batch-Delete-confirmation.png)

### Delete Confirmation (Single)
![Delete Confirmation](screenshots/Delete-Confirmation.png)

### Search Results
![Search Result](screenshots/Search-Result.png)

### 📱 Responsive Layout View
![Responsive Layout](screenshots/Responsive-Layout.png)