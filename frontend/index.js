// DOM Elements
const createPatientBtn = document.getElementById('create-patient-btn');
const createPatientModal = document.getElementById('create-patient-modal');
const closeModalButtons = document.querySelectorAll('.close-modal');
const createPatientForm = document.getElementById('create-patient-form');
const generatePasswordBtn = document.getElementById('generate-password');
const patientTableBody = document.getElementById('patient-table-body');
const patientSearch = document.getElementById('patient-search');
const prevPageBtn = document.getElementById('prev-page');
const nextPageBtn = document.getElementById('next-page');
const pageInfo = document.getElementById('page-info');
const logoutBtn = document.getElementById('logout-btn');

// Global variables
let patients = [];
let currentPage = 1;
const patientsPerPage = 10;
let filteredPatients = null;

// Initialize the dashboard
document.addEventListener('DOMContentLoaded', () => {
    // Load doctor's information
    loadDoctorInfo();
    
    // Load patient data
    fetchPatients();
    
    // Set up event listeners
    setupEventListeners();
});

function loadDoctorInfo() {
    // In a real app, this would come from an API or session
    document.getElementById('doctor-name').textContent = 'Dr. Nirmala';
    document.getElementById('doctor-specialization').textContent = 'Cardiologist';
    
    // These would come from API in real app
    updateQuickStats(5, 127, 2);
}

function updateQuickStats(appointments, totalPatients, prescriptions) {
    document.getElementById('today-appointments').textContent = appointments;
    document.getElementById('total-patients').textContent = totalPatients;
    document.getElementById('pending-prescriptions').textContent = prescriptions;
}

function fetchPatients() {
    // Show loading state
    patientTableBody.innerHTML = `
        <tr>
            <td colspan="7" class="loading-state">
                <div class="loading-spinner"></div>
                <span>Loading patients...</span>
            </td>
        </tr>
    `;
    
    // Simulate API call with timeout
    setTimeout(() => {
        // Sample data - in a real app, this would come from your backend
        patients = [
            { id: 1, firstName: 'Raksha', lastName: 'bhat', age: 45, gender: 'Male', lastVisit: '2023-05-15', status: 'Active', email: 'john.doe@example.com', phone: '555-0101' },
            { id: 2, firstName: 'Ankita', lastName: 'bhat', age: 32, gender: 'Female', lastVisit: '2023-05-10', status: 'Active', email: 'jane.smith@example.com', phone: '555-0102' },
            { id: 3, firstName: 'Nihal', lastName: 'Shetty', age: 58, gender: 'Male', lastVisit: '2023-04-28', status: 'Inactive', email: 'robert.j@example.com', phone: '555-0103' },
            { id: 4, firstName: 'Akshata', lastName: 'bhat', age: 29, gender: 'Female', lastVisit: '2023-05-12', status: 'Active', email: 'emily.w@example.com', phone: '555-0104' },
            { id: 5, firstName: 'Thejas', lastName: 'Hegde', age: 63, gender: 'Male', lastVisit: '2023-03-20', status: 'Active', email: 'michael.b@example.com', phone: '555-0105' },
            { id: 6, firstName: 'Sahana', lastName: 'Shetty', age: 41, gender: 'Female', lastVisit: '2023-05-01', status: 'Active', email: 'sarah.d@example.com', phone: '555-0106' },
            { id: 7, firstName: 'Kavya', lastName: 'Patil', age: 50, gender: 'Female', lastVisit: '2023-02-15', status: 'Inactive', email: 'david.m@example.com', phone: '555-0107' },
            { id: 8, firstName: 'Chirantan', lastName: 'Hegde', age: 35, gender: 'Male', lastVisit: '2023-05-14', status: 'Active', email: 'jessica.w@example.com', phone: '555-0108' },
            { id: 9, firstName: 'Thomas', lastName: 'Gouda', age: 47, gender: 'Male', lastVisit: '2023-04-05', status: 'Active', email: 'thomas.m@example.com', phone: '555-0109' },
            { id: 10, firstName: 'Sanchith', lastName: 'S', age: 52, gender: 'Male', lastVisit: '2023-05-08', status: 'Active', email: 'lisa.t@example.com', phone: '555-0110' },
            { id: 11, firstName: 'Siddarth', lastName: 'Shetty', age: 39, gender: 'Male', lastVisit: '2023-03-30', status: 'Inactive', email: 'daniel.a@example.com', phone: '555-0111' },
            { id: 12, firstName: 'Prajwal', lastName: 'P', age: 44, gender: 'Male', lastVisit: '2023-05-09', status: 'Active', email: 'amy.t@example.com', phone: '555-0112' }
        ];
        
        renderPatientTable();
        updatePaginationInfo();
    }, 1000);
}

function setupEventListeners() {
    // Modal controls
    createPatientBtn.addEventListener('click', () => {
        createPatientModal.style.display = 'flex';
    });
    
    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            createPatientModal.style.display = 'none';
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === createPatientModal) {
            createPatientModal.style.display = 'none';
        }
    });
    
    // Generate password button
    generatePasswordBtn.addEventListener('click', generatePassword);
    
    // Form submission
    createPatientForm.addEventListener('submit', handleCreatePatient);
    
    // Patient search
    patientSearch.addEventListener('input', filterPatients);
    
    // Pagination
    prevPageBtn.addEventListener('click', goToPrevPage);
    nextPageBtn.addEventListener('click', goToNextPage);
    
    // Logout
    logoutBtn.addEventListener('click', handleLogout);
}

function renderPatientTable(patientsData = null) {
    const patientsToDisplay = patientsData || patients;
    const startIndex = (currentPage - 1) * patientsPerPage;
    const endIndex = startIndex + patientsPerPage;
    const paginatedPatients = patientsToDisplay.slice(startIndex, endIndex);
    
    patientTableBody.innerHTML = '';
    
    if (paginatedPatients.length === 0) {
        patientTableBody.innerHTML = `
            <tr>
                <td colspan="7" class="no-patients">
                    <i class="fas fa-user-slash"></i>
                    <span>No patients found</span>
                </td>
            </tr>
        `;
        return;
    }
    
    paginatedPatients.forEach(patient => {
        const row = document.createElement('tr');
        row.dataset.id = patient.id;
        
        row.innerHTML = `
            <td>${patient.id}</td>
            <td>${patient.firstName} ${patient.lastName}</td>
            <td>${patient.age}</td>
            <td>${patient.gender}</td>
            <td>${formatDate(patient.lastVisit)}</td>
            <td><span class="status-badge status-${patient.status.toLowerCase()}">${patient.status}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn view-btn" data-id="${patient.id}" title="View Details">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn edit-btn" data-id="${patient.id}" title="Edit Patient">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn delete-btn" data-id="${patient.id}" title="Delete Patient">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            </td>
        `;
        
        patientTableBody.appendChild(row);
    });
    
    // Add event listeners to action buttons
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const patientId = e.currentTarget.dataset.id;
            viewPatientDetails(patientId);
        });
    });
    
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const patientId = e.currentTarget.dataset.id;
            editPatient(patientId);
        });
    });
    
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const patientId = e.currentTarget.dataset.id;
            deletePatient(patientId);
        });
    });
}

function viewPatientDetails(patientId) {
    // Find the patient
    const patient = patients.find(p => p.id == patientId);
    if (!patient) return;
    
    // In a real app, this would redirect to a patient details page
    // For demo purposes, we'll show a modal with patient details
    const detailsHtml = `
        <div class="patient-details">
            <div class="detail-header">
                <h3>${patient.firstName} ${patient.lastName}</h3>
                <span class="status-badge status-${patient.status.toLowerCase()}">${patient.status}</span>
            </div>
            
            <div class="detail-row">
                <div class="detail-item">
                    <label>Patient ID</label>
                    <p>${patient.id}</p>
                </div>
                <div class="detail-item">
                    <label>Age</label>
                    <p>${patient.age}</p>
                </div>
                <div class="detail-item">
                    <label>Gender</label>
                    <p>${patient.gender}</p>
                </div>
            </div>
            
            <div class="detail-item">
                <label>Last Visit</label>
                <p>${formatDate(patient.lastVisit)}</p>
            </div>
            
            <div class="detail-item">
                <label>Contact Information</label>
                <p>${patient.email}</p>
                <p>${patient.phone}</p>
            </div>
            
            <div class="detail-actions">
                <button class="btn btn-primary" onclick="window.location.href='patient-details.html?id=${patient.id}'">
                    <i class="fas fa-file-medical"></i> View Full Details
                </button>
            </div>
        </div>
    `;
    
    showCustomModal(`Patient Details - ${patient.firstName} ${patient.lastName}`, detailsHtml);
}

function editPatient(patientId) {
    // Find the patient
    const patient = patients.find(p => p.id == patientId);
    if (!patient) return;
    
    // In a real app, this would open an edit form with the patient's data
    // For demo purposes, we'll show a toast notification
    showToast(`Edit functionality would open for ${patient.firstName} ${patient.lastName}`, 'info');
}

function deletePatient(patientId) {
    // Find the patient
    const patient = patients.find(p => p.id == patientId);
    if (!patient) return;
    
    // Show confirmation dialog
    showConfirmDialog(
        `Delete Patient - ${patient.firstName} ${patient.lastName}`,
        `Are you sure you want to delete ${patient.firstName}'s record? This action cannot be undone.`,
        'Delete',
        'Cancel',
        () => {
            // Delete action confirmed
            patients = patients.filter(p => p.id != patientId);
            
            // If we're viewing filtered patients, update that too
            if (filteredPatients) {
                filteredPatients = filteredPatients.filter(p => p.id != patientId);
            }
            
            // Re-render the table
            renderPatientTable(filteredPatients || patients);
            updatePaginationInfo();
            
            // Show success message
            showToast(`Patient ${patient.firstName} ${patient.lastName} deleted successfully`, 'success');
            
            // Update quick stats
            updateQuickStats(
                parseInt(document.getElementById('today-appointments').textContent),
                patients.length,
                parseInt(document.getElementById('pending-prescriptions').textContent)
            );
        }
    );
}

function filterPatients() {
    const searchTerm = patientSearch.value.toLowerCase();
    
    if (!searchTerm) {
        filteredPatients = null;
        currentPage = 1;
        renderPatientTable();
        updatePaginationInfo();
        return;
    }
    
    filteredPatients = patients.filter(patient => {
        return (
            patient.firstName.toLowerCase().includes(searchTerm) ||
            patient.lastName.toLowerCase().includes(searchTerm) ||
            patient.id.toString().includes(searchTerm) ||
            patient.gender.toLowerCase().includes(searchTerm) ||
            patient.status.toLowerCase().includes(searchTerm) ||
            patient.email.toLowerCase().includes(searchTerm) ||
            patient.phone.includes(searchTerm)
        );
    });
    
    currentPage = 1;
    renderPatientTable(filteredPatients);
    updatePaginationInfo();
}

function generatePassword() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    
    for (let i = 0; i < 12; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    document.getElementById('patient-password').value = password;
}

function handleCreatePatient(e) {
    e.preventDefault();
    
    // Get form values
    const firstName = document.getElementById('patient-first-name').value.trim();
    const lastName = document.getElementById('patient-last-name').value.trim();
    const dob = document.getElementById('patient-dob').value;
    const gender = document.getElementById('patient-gender').value;
    const email = document.getElementById('patient-email').value.trim();
    const phone = document.getElementById('patient-phone').value.trim();
    const address = document.getElementById('patient-address').value.trim();
    const username = document.getElementById('patient-username').value.trim();
    const password = document.getElementById('patient-password').value;
    
    // Basic validation
    if (!firstName || !lastName || !dob || !gender || !email || !phone || !username || !password) {
        showToast('Please fill in all required fields', 'error');
        return;
    }
    
    // Create new patient object
    const newPatient = {
        id: patients.length > 0 ? Math.max(...patients.map(p => p.id)) + 1 : 1,
        firstName,
        lastName,
        age: calculateAge(new Date(dob)),
        gender,
        lastVisit: new Date().toISOString().split('T')[0],
        status: 'Active',
        email,
        phone,
        address,
        username,
        password // Note: In a real app, this would be hashed
    };
    
    // Simulate API call delay
    showLoading('Creating patient account...');
    
    setTimeout(() => {
        // Add to patients array
        patients.unshift(newPatient);
        
        // Reset form and close modal
        createPatientForm.reset();
        createPatientModal.style.display = 'none';
        hideLoading();
        
        // Show success message
        showToast(`Patient account for ${firstName} ${lastName} created successfully`, 'success');
        
        // Refresh patient table
        currentPage = 1;
        renderPatientTable();
        updatePaginationInfo();
        
        // Update quick stats
        updateQuickStats(
            parseInt(document.getElementById('today-appointments').textContent),
            patients.length,
            parseInt(document.getElementById('pending-prescriptions').textContent)
        );
    }, 1500);
}

function calculateAge(birthday) {
    const ageDifMs = Date.now() - birthday.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

function goToPrevPage() {
    if (currentPage > 1) {
        currentPage--;
        renderPatientTable(filteredPatients || patients);
        updatePaginationInfo();
    }
}

function goToNextPage() {
    const patientsToUse = filteredPatients || patients;
    const totalPages = Math.ceil(patientsToUse.length / patientsPerPage);
    
    if (currentPage < totalPages) {
        currentPage++;
        renderPatientTable(patientsToUse);
        updatePaginationInfo();
    }
}

function updatePaginationInfo() {
    const patientsToUse = filteredPatients || patients;
    const totalPages = Math.ceil(patientsToUse.length / patientsPerPage);
    
    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    
    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = currentPage === totalPages || totalPages === 0;
}

function handleLogout() {
    showConfirmDialog(
        'Logout Confirmation',
        'Are you sure you want to logout from V-DOC?',
        'Logout',
        'Cancel',
        () => {
            // In a real app, this would clear the session and redirect to login
            showToast('Logging out... Redirecting to login page', 'info');
            
            // Simulate logout delay
            setTimeout(() => {
                // window.location.href = 'login.html';
                alert('In a real app, this would redirect to the login page.');
            }, 1000);
        }
    );
}

/* UI Helper Functions */
function showToast(message, type = 'info') {
    // Remove existing toasts
    const existingToasts = document.querySelectorAll('.toast');
    existingToasts.forEach(toast => toast.remove());
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <div class="toast-message">${message}</div>
        <button class="toast-close">&times;</button>
    `;
    
    // Add to body
    document.body.appendChild(toast);
    
    // Show toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 5000);
    
    // Close button
    toast.querySelector('.toast-close').addEventListener('click', () => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    });
}

function showConfirmDialog(title, message, confirmText, cancelText, onConfirm) {
    // Remove existing dialogs
    const existingDialogs = document.querySelectorAll('.confirm-dialog');
    existingDialogs.forEach(dialog => dialog.remove());
    
    // Create dialog element
    const dialog = document.createElement('div');
    dialog.className = 'confirm-dialog';
    dialog.innerHTML = `
        <div class="dialog-overlay"></div>
        <div class="dialog-content">
            <h3>${title}</h3>
            <p>${message}</p>
            <div class="dialog-actions">
                <button class="btn btn-secondary cancel-btn">${cancelText}</button>
                <button class="btn btn-primary confirm-btn">${confirmText}</button>
            </div>
        </div>
    `;
    
    // Add to body
    document.body.appendChild(dialog);
    
    // Add event listeners
    dialog.querySelector('.confirm-btn').addEventListener('click', () => {
        dialog.remove();
        if (typeof onConfirm === 'function') onConfirm();
    });
    
    dialog.querySelector('.cancel-btn').addEventListener('click', () => {
        dialog.remove();
    });
    
    dialog.querySelector('.dialog-overlay').addEventListener('click', () => {
        dialog.remove();
    });
}

function showCustomModal(title, contentHtml) {
    // Remove existing modals
    const existingModals = document.querySelectorAll('.custom-modal');
    existingModals.forEach(modal => modal.remove());
    
    // Create modal element
    const modal = document.createElement('div');
    modal.className = 'custom-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h3>${title}</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                ${contentHtml}
            </div>
        </div>
    `;
    
    // Add to body
    document.body.appendChild(modal);
    
    // Add event listeners
    modal.querySelector('.modal-close').addEventListener('click', () => {
        modal.remove();
    });
    
    modal.querySelector('.modal-overlay').addEventListener('click', () => {
        modal.remove();
    });
}

function showLoading(message = 'Loading...') {
    // Remove existing loaders
    const existingLoaders = document.querySelectorAll('.loading-overlay');
    existingLoaders.forEach(loader => loader.remove());
    
    // Create loader element
    const loader = document.createElement('div');
    loader.className = 'loading-overlay';
    loader.innerHTML = `
        <div class="loading-content">
            <div class="loading-spinner"></div>
            <p>${message}</p>
        </div>
    `;
    
    // Add to body
    document.body.appendChild(loader);
}

function hideLoading() {
    const existingLoaders = document.querySelectorAll('.loading-overlay');
    existingLoaders.forEach(loader => loader.remove());
}

// Add additional CSS for UI components
const style = document.createElement('style');
style.textContent = `
    /* Toast Styles */
    .toast {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: white;
        padding: 15px 20px;
        border-radius: 4px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-width: 250px;
        max-width: 350px;
        transform: translateY(100px);
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 3000;
    }
    
    .toast.show {
        transform: translateY(0);
        opacity: 1;
    }
    
    .toast-info {
        border-left: 4px solid var(--primary-color);
    }
    
    .toast-success {
        border-left: 4px solid var(--success-color);
    }
    
    .toast-error {
        border-left: 4px solid var(--danger-color);
    }
    
    .toast-close {
        background: none;
        border: none;
        font-size: 18px;
        cursor: pointer;
        margin-left: 15px;
        color: var(--gray-color);
    }
    
    /* Confirm Dialog Styles */
    .confirm-dialog {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 4000;
    }
    
    .dialog-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
    }
    
    .dialog-content {
        background: white;
        padding: 20px;
        border-radius: 8px;
        width: 90%;
        max-width: 500px;
        z-index: 1;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
    }
    
    .dialog-content h3 {
        margin-bottom: 15px;
        color: var(--dark-color);
    }
    
    .dialog-content p {
        margin-bottom: 20px;
        color: var(--dark-color);
    }
    
    .dialog-actions {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
    }
    
    /* Custom Modal Styles */
    .custom-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 4000;
    }
    
    .modal-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
    }
    
    .modal-content {
        background: white;
        border-radius: 8px;
        width: 90%;
        max-width: 600px;
        max-height: 80vh;
        overflow-y: auto;
        z-index: 1;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
    }
    
    .modal-header {
        padding: 15px 20px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .modal-header h3 {
        color: var(--dark-color);
    }
    
    .modal-close {
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: var(--gray-color);
    }
    
    .modal-body {
        padding: 20px;
    }
    
    .patient-details .detail-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }
    
    .patient-details .detail-row {
        display: flex;
        gap: 20px;
        margin-bottom: 15px;
    }
    
    .patient-details .detail-item {
        flex: 1;
    }
    
    .patient-details label {
        display: block;
        font-weight: 500;
        color: var(--gray-color);
        font-size: 14px;
        margin-bottom: 5px;
    }
    
    .patient-details p {
        color: var(--dark-color);
        margin-bottom: 15px;
    }
    
    .patient-details .detail-actions {
        margin-top: 20px;
        display: flex;
        justify-content: flex-end;
    }
    
    /* Loading Styles */
    .loading-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 5000;
    }
    
    .loading-content {
        text-align: center;
    }
    
    .loading-spinner {
        border: 4px solid rgba(0, 0, 0, 0.1);
        border-radius: 50%;
        border-top: 4px solid var(--primary-color);
        width: 40px;
        height: 40px;
        animation: spin 1s linear infinite;
        margin: 0 auto 15px;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    /* Table States */
    .loading-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        padding: 30px 0 !important;
    }
    
    .loading-state .loading-spinner {
        width: 30px;
        height: 30px;
        border-width: 3px;
        margin: 0;
    }
    
    .no-patients {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        padding: 30px 0 !important;
        color: var(--gray-color);
    }
    
    .no-patients i {
        font-size: 18px;
    }
`;
document.head.appendChild(style);