class ContactManager {
    constructor() {
        this.contacts = this.loadFromStorage();
    }

    loadFromStorage() {
        const data = localStorage.getItem('contacts');
        return data ? JSON.parse(data) : [];
    }

    saveToStorage() {
        localStorage.setItem('contacts', JSON.stringify(this.contacts));
    }

    validateInput(name, phone, email) {
        if (!name || name.trim() === "") {
            alert("Please enter a full name.");
            return false;
        }
        
        const phoneRegex = /^\d{10,15}$/;
        if (!phoneRegex.test(phone.replace(/\s+/g, ''))) {
            alert("Please enter a valid phone number (10-15 digits).");
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address.");
            return false;
        }

        return true;
    }

    addContact(name, phone, email) {
        if (!this.validateInput(name, phone, email)) return false;

        const newContact = {
            id: Date.now(),
            name: name.trim(),
            phone: phone.trim(),
            email: email.trim()
        };

        this.contacts.push(newContact);
        this.saveToStorage();
        return true;
    }

    updateContact(id, name, phone, email) {
        if (!this.validateInput(name, phone, email)) return false;

        for (let i = 0; i < this.contacts.length; i++) {
            if (this.contacts[i].id === id) {
                this.contacts[i].name = name.trim();
                this.contacts[i].phone = phone.trim();
                this.contacts[i].email = email.trim();
                break;
            }
        }
        this.saveToStorage();
        return true;
    }

    deleteContact(id) {
        this.contacts = this.contacts.filter(contact => contact.id !== id);
        this.saveToStorage();
    }

    searchContacts(query) {
        const lowerCaseQuery = query.toLowerCase();
        return this.contacts.filter(contact => 
            contact.name.toLowerCase().includes(lowerCaseQuery)
        );
    }
}

const manager = new ContactManager();
const idInput = document.getElementById('contactId');
const nameInput = document.getElementById('nameInput');
const phoneInput = document.getElementById('phoneInput');
const emailInput = document.getElementById('emailInput');
const saveBtn = document.getElementById('saveBtn');
const searchInput = document.getElementById('searchInput');
const contactList = document.getElementById('contactList');

function renderUI(contactsToDisplay = manager.contacts) {
    contactList.innerHTML = '';
    
    contactsToDisplay.forEach(contact => {
        const li = document.createElement('li');
        li.className = 'contact-card';

        li.innerHTML = `
            <div class="contact-details">
                <strong>${contact.name}</strong>
                <span>📞 ${contact.phone}</span>
                <span>📧 ${contact.email}</span>
            </div>
            <div class="actions">
                <button class="edit-btn" onclick="prepareEdit(${contact.id})">Edit</button>
                <button class="delete-btn" onclick="deleteContact(${contact.id})">Delete</button>
            </div>
        `;
        contactList.appendChild(li);
    });
}

saveBtn.onclick = () => {
    const id = idInput.value;
    const name = nameInput.value;
    const phone = phoneInput.value;
    const email = emailInput.value;

    let success = false;
    if (id) {
        success = manager.updateContact(Number(id), name, phone, email);
    } else {
        success = manager.addContact(name, phone, email);
    }

    if (success) {
        idInput.value = '';
        nameInput.value = '';
        phoneInput.value = '';
        emailInput.value = '';
        saveBtn.textContent = 'Save Contact';
        renderUI();
    }
};

searchInput.addEventListener('input', (e) => {
    const results = manager.searchContacts(e.target.value);
    renderUI(results);
});

window.deleteContact = (id) => {
    if(confirm("Are you sure you want to delete this contact?")) {
        manager.deleteContact(id);
        renderUI();
    }
};

window.prepareEdit = (id) => {
    const contact = manager.contacts.find(c => c.id === id);
    if (contact) {
        idInput.value = contact.id;
        nameInput.value = contact.name;
        phoneInput.value = contact.phone;
        emailInput.value = contact.email;
        saveBtn.textContent = 'Update Contact';
        window.scrollTo(0, 0);
    }
};

renderUI();
