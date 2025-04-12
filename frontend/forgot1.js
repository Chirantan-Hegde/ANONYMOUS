document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const emailInput = document.getElementById('email');
    const sendOtpBtn = document.getElementById('sendOtpBtn');
    const otpInputs = document.querySelectorAll('.otp-input');
    const verifyOtpBtn = document.getElementById('verifyOtpBtn');
    const resendOtpLink = document.getElementById('resendOtp');
    const newPasswordInput = document.getElementById('newPassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const resetPasswordBtn = document.getElementById('resetPasswordBtn');
    const loginLink = document.getElementById('loginLink');
    
    // Form steps
    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');
    const step3 = document.getElementById('step3');
    const successMessage = document.getElementById('successMessage');
    
    // Variables to store data between steps
    let userEmail = '';
    let generatedOtp = '';
    
    // Event Listeners
    sendOtpBtn.addEventListener('click', sendOtp);
    verifyOtpBtn.addEventListener('click', verifyOtp);
    resendOtpLink.addEventListener('click', resendOtp);
    resetPasswordBtn.addEventListener('click', resetPassword);
    loginLink.addEventListener('click', function(e) {
        e.preventDefault();
        // In a real app, this would redirect to login page
        alert('Redirecting to login page...');
    });
    
    // OTP input navigation
    otpInputs.forEach((input, index) => {
        input.addEventListener('input', function() {
            if (this.value.length === 1 && index < otpInputs.length - 1) {
                otpInputs[index + 1].focus();
            }
        });
        
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Backspace' && this.value.length === 0 && index > 0) {
                otpInputs[index - 1].focus();
            }
        });
    });
    
    // Password strength indicator
    newPasswordInput.addEventListener('input', function() {
        updatePasswordStrength(this.value);
    });
    
    // Functions
    function sendOtp() {
        const email = emailInput.value.trim();
        
        if (!validateEmail(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // In a real app, you would send this to your backend
        userEmail = email;
        generatedOtp = generateOtp();
        
        // Simulate sending OTP (in a real app, this would be an API call)
        setTimeout(() => {
            console.log(`OTP for ${email}: ${generatedOtp}`); // For demo purposes
            alert(`OTP sent to ${email} (Check console for demo OTP)`);
            
            // Move to step 2
            step1.classList.remove('active');
            step2.classList.add('active');
        }, 1000);
    }
    
    function verifyOtp() {
        let enteredOtp = '';
        otpInputs.forEach(input => {
            enteredOtp += input.value;
        });
        
        if (enteredOtp.length !== 6) {
            alert('Please enter the complete 6-digit OTP');
            return;
        }
        
        if (enteredOtp === generatedOtp) {
            // Move to step 3
            step2.classList.remove('active');
            step3.classList.add('active');
        } else {
            alert('Invalid OTP. Please try again.');
        }
    }
    
    function resendOtp(e) {
        e.preventDefault();
        
        if (!userEmail) {
            alert('Please enter your email first');
            return;
        }
        
        generatedOtp = generateOtp();
        
        // Simulate resending OTP
        setTimeout(() => {
            console.log(`New OTP for ${userEmail}: ${generatedOtp}`); // For demo purposes
            alert(`New OTP sent to ${userEmail} (Check console for demo OTP)`);
            
            // Clear previous OTP inputs
            otpInputs.forEach(input => {
                input.value = '';
            });
            otpInputs[0].focus();
        }, 1000);
    }
    
    function resetPassword() {
        const newPassword = newPasswordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        
        if (newPassword.length < 8) {
            alert('Password must be at least 8 characters long');
            return;
        }
        
        if (newPassword !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        
        // In a real app, you would send the new password to your backend
        setTimeout(() => {
            console.log(`Password reset for ${userEmail} to: ${newPassword}`);
            
            // Show success message
            step3.classList.remove('active');
            successMessage.style.display = 'block';
        }, 1000);
    }
    
    // Helper Functions
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function generateOtp() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }
    
    function updatePasswordStrength(password) {
        const strengthIndicators = document.querySelectorAll('.strength-indicator');
        
        // Reset all indicators
        strengthIndicators.forEach(indicator => {
            indicator.classList.remove('weak', 'medium', 'strong');
        });
        
        if (password.length === 0) {
            return;
        }
        
        // Very simple strength calculation (in a real app, use a more robust method)
        let strength = 0;
        
        // Length check
        if (password.length >= 8) strength++;
        if (password.length >= 12) strength++;
        
        // Character variety
        if (/[A-Z]/.test(password)) strength++;
        if (/\d/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;
        
        // Update UI
        if (strength <= 2) {
            strengthIndicators[0].classList.add('weak');
        } else if (strength <= 4) {
            strengthIndicators[0].classList.add('weak');
            strengthIndicators[1].classList.add('medium');
        } else {
            strengthIndicators[0].classList.add('weak');
            strengthIndicators[1].classList.add('medium');
            strengthIndicators[2].classList.add('strong');
        }
    }
});