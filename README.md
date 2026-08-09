# Contact Book Application

## Project Description
The Contact Book is a web-based mini-project designed to help users manage personal and professional contacts locally on their devices. It allows users to add, view, search, and delete contacts without needing a backend database. 

## How to Run the Project
1. Clone or download this repository to your local machine.
2. Open the project folder.
3. Double-click the `index.html` file to open it in any modern web browser (e.g., Chrome, Edge, Safari).
4. No servers or Node.js installations are required to run the application.

## 3-5 Specific Requirements
* **Requirement 1:** The application must allow users to input a Full Name, Phone Number, and Email Address to save a new contact.
* **Requirement 2:** The application must validate inputs, specifically ensuring phone numbers and emails follow standard formats and preventing empty submissions.
* **Requirement 3:** The application must utilize the browser's Local Storage to ensure contact data persists even if the page is reloaded.
* **Requirement 4:** The application must include a real-time search filtering system to quickly find contacts by name.
* **Requirement 5:** Users must be able to delete unwanted contacts from the interface and Local Storage simultaneously.

## Classes and Functions Needed
* **Class `ContactManager`:** The main Object-Oriented structure that encapsulates all application data and behaviors.
* **Method `addContact()`:** Captures form data and pushes a new contact object into the array.
* **Method `displayContacts()`:** Loops through the contact array and renders the HTML elements to the screen.
* **Method `deleteContact()`:** Removes a specific contact from the array using its unique index.
* **Method `validateInput()`:** Checks the user's string inputs against Regular Expressions (Regex) before allowing a save.
* **Method `saveToLocalStorage()`:** Converts the contact array to a JSON string for browser storage.

## Expected Input and Output Sketch
* **Feature: Add New Contact**
  * *Expected Input:* String (Name), String (Email format), Number/String (10-15 digits).
  * *Expected Output:* A new contact card is generated on the screen, and the form resets.
* **Feature: Input Validation (Edge Case)**
  * *Expected Input:* An empty name field or an email missing the "@" symbol.
  * *Expected Output:* An error alert blocks the submission; data is not saved.
* **Feature: Search Contacts**
  * *Expected Input:* Keystrokes in the search bar (e.g., "John").
  * *Expected Output:* The displayed list instantly filters to only show contact cards containing the string "John".

## Testing & Bug Fixes
* **Normal Testing:** Verified that standard inputs (valid name, proper phone format, correct email) save successfully and display in the list.
* **Edge-Case Bug Found:** During testing, valid phone numbers containing spaces (e.g., `080 123 4567`) were being incorrectly rejected by the validation logic.
* **The Fix:** Updated the validation function to include `.replace(/\s+/g, '')`, which automatically strips out white spaces before the regex test runs.
