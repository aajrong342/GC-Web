document.addEventListener('DOMContentLoaded', function() {
    // Get modal elements
    const userManagementModal = document.getElementById('user-management-modal');
    const createRoleModal = document.getElementById('create-role-modal');
    
    // Get buttons that open the modals
    const manageUserButtons = document.querySelectorAll('.manage-users-btn');
    const createRoleButton = document.getElementById('create-role-btn');
    
    // Get elements that close the modals
    const closeButtons = document.querySelectorAll('.close-btn');
    const cancelButtons = document.querySelectorAll('.cancel-btn');
    const closeModalButtons = document.querySelectorAll('.close-modal-btn');
    
    // Add click event to all manage user buttons
    manageUserButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get role info from data attributes
            const roleId = this.getAttribute('data-role-id');
            const roleName = this.getAttribute('data-role-name');
            
            // Set role name in modal title
            document.getElementById('modal-role-name').textContent = roleName;
            
            // Here you would typically fetch users for this role from server
            // For now, we're just showing the modal
            userManagementModal.style.display = 'flex';
        });
    });
    
    // Add click event to create role button
    if (createRoleButton) {
        createRoleButton.addEventListener('click', function() {
            createRoleModal.style.display = 'flex';
        });
    }
    
    // Close modals when clicking close buttons
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal-overlay');
            modal.style.display = 'none';
        });
    });
    
    // Close modals when clicking cancel buttons
    cancelButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal-overlay');
            modal.style.display = 'none';
        });
    });
    
    // Close modals when clicking close modal buttons
    closeModalButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal-overlay');
            modal.style.display = 'none';
        });
    });
    
    // Close modals when clicking outside the modal content
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal-overlay')) {
            event.target.style.display = 'none';
        }
    });
    
    // Handle role creation form submission
    const createRoleForm = document.getElementById('create-role-form');
    if (createRoleForm) {
        createRoleForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const roleName = document.getElementById('role-name').value.trim();
            if (!roleName) {
                // Show error message
                document.getElementById('role-name-error').style.display = 'block';
                return;
            }
            
            // Here you would typically submit the form to the server
            // For now, we're just closing the modal
            createRoleModal.style.display = 'none';
            
            // Reset form
            createRoleForm.reset();
            document.getElementById('role-name-error').style.display = 'none';
        });
    }
    
    // Handle search in user management modal
    const userSearchInput = document.getElementById('user-search');
    if (userSearchInput) {
        userSearchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const userRows = document.querySelectorAll('.user-row');
            
            userRows.forEach(row => {
                const userName = row.querySelector('.user-name').textContent.toLowerCase();
                const userEmail = row.querySelector('.user-email').textContent.toLowerCase();
                
                if (userName.includes(searchTerm) || userEmail.includes(searchTerm)) {
                    row.style.display = 'table-row';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }
});