// LASBCA Website JavaScript - Modern Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Mobile Menu Toggle with animation
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            document.body.classList.toggle('menu-open');
            
            // Toggle icon with animation
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                icon.style.transform = 'rotate(90deg)';
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                icon.style.transform = 'rotate(0)';
            }
        });
    }
    
    // Add active class to current nav item
    const currentLocation = window.location.pathname;
    const navItems = document.querySelectorAll('.nav-links a');
    
    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (currentLocation.includes(href) && href !== '#') {
            item.classList.add('active');
        }
    });
    
    // Animate elements on scroll
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    function checkScroll() {
        const triggerBottom = window.innerHeight * 0.8;
        
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                element.classList.add('animated');
            }
        });
    }
    
    // Make all elements visible initially
    animateElements.forEach(element => {
        element.classList.add('animated');
    });
    
    // Then check again on scroll for proper animations
    checkScroll();
    
    // Check on scroll
    window.addEventListener('scroll', checkScroll);
    
    // Service card hover effects
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            serviceCards.forEach(c => c.classList.add('dim'));
            this.classList.remove('dim');
            this.classList.add('highlight');
        });
        
        card.addEventListener('mouseleave', function() {
            serviceCards.forEach(c => {
                c.classList.remove('dim');
                c.classList.remove('highlight');
            });
        });
    });
    
    // Countdown Timer for Events
    const countdownElement = document.getElementById('countdown-timer');
    if (countdownElement) {
        const eventDate = new Date(countdownElement.getAttribute('data-event-date'));
        
        function updateCountdown() {
            const now = new Date();
            const distance = eventDate - now;
            
            // Time calculations
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            // Display the result
            countdownElement.innerHTML = `
                <div class="countdown-item">
                    <span class="countdown-number">${days}</span>
                    <span class="countdown-label">Days</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-number">${hours}</span>
                    <span class="countdown-label">Hours</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-number">${minutes}</span>
                    <span class="countdown-label">Minutes</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-number">${seconds}</span>
                    <span class="countdown-label">Seconds</span>
                </div>
            `;
            
            // If the countdown is over
            if (distance < 0) {
                clearInterval(countdownInterval);
                countdownElement.innerHTML = "Event has started!";
            }
        }
        
        // Update countdown every second
        updateCountdown();
        const countdownInterval = setInterval(updateCountdown, 1000);
    }
    
    // Calendar Functionality
    const calendar = document.getElementById('events-calendar');
    if (calendar) {
        const currentDate = new Date();
        let currentMonth = currentDate.getMonth();
        let currentYear = currentDate.getFullYear();
        
        const monthNames = ["January", "February", "March", "April", "May", "June",
                          "July", "August", "September", "October", "November", "December"];
        
        // Sample events data - in a real application, this would come from a database
        const events = [
            {
                date: new Date(2025, 4, 15), // May 15, 2025
                title: "Building Safety Workshop",
                location: "LASBCA Headquarters"
            },
            {
                date: new Date(2025, 4, 22), // May 22, 2025
                title: "Public Awareness Campaign",
                location: "Ikeja City Mall"
            },
            {
                date: new Date(2025, 5, 5), // June 5, 2025
                title: "Stakeholders Meeting",
                location: "Lagos State Secretariat"
            }
        ];
        
        function generateCalendar(month, year) {
            const firstDay = new Date(year, month, 1).getDay();
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            
            // Update month and year display
            document.getElementById('month-year').textContent = `${monthNames[month]} ${year}`;
            
            const calendarDays = document.getElementById('calendar-days');
            calendarDays.innerHTML = '';
            
            // Create empty cells for days before the first day of the month
            for (let i = 0; i < firstDay; i++) {
                const emptyCell = document.createElement('div');
                emptyCell.classList.add('calendar-day', 'empty');
                calendarDays.appendChild(emptyCell);
            }
            
            // Create cells for each day of the month
            for (let day = 1; day <= daysInMonth; day++) {
                const dayCell = document.createElement('div');
                dayCell.classList.add('calendar-day');
                dayCell.textContent = day;
                
                // Check if there are events on this day
                const currentDate = new Date(year, month, day);
                const dayEvents = events.filter(event => 
                    event.date.getDate() === day && 
                    event.date.getMonth() === month && 
                    event.date.getFullYear() === year
                );
                
                if (dayEvents.length > 0) {
                    dayCell.classList.add('has-event');
                    
                    // Create event indicator
                    const eventIndicator = document.createElement('span');
                    eventIndicator.classList.add('event-indicator');
                    dayCell.appendChild(eventIndicator);
                    
                    // Create event details popup
                    const eventDetails = document.createElement('div');
                    eventDetails.classList.add('event-details');
                    
                    dayEvents.forEach(event => {
                        const eventItem = document.createElement('div');
                        eventItem.classList.add('event-item');
                        eventItem.innerHTML = `
                            <h4>${event.title}</h4>
                            <p><i class="fas fa-map-marker-alt"></i> ${event.location}</p>
                        `;
                        eventDetails.appendChild(eventItem);
                    });
                    
                    dayCell.appendChild(eventDetails);
                    
                    // Show event details on hover/click
                    dayCell.addEventListener('click', function() {
                        this.classList.toggle('show-details');
                    });
                }
                
                calendarDays.appendChild(dayCell);
            }
        }
        
        // Generate initial calendar
        generateCalendar(currentMonth, currentYear);
        
        // Previous month button
        document.getElementById('prev-month').addEventListener('click', function() {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            generateCalendar(currentMonth, currentYear);
        });
        
        // Next month button
        document.getElementById('next-month').addEventListener('click', function() {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            generateCalendar(currentMonth, currentYear);
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Back to top button
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Form validation for contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            // Reset error messages
            document.querySelectorAll('.error-message').forEach(el => el.remove());
            
            // Validate name
            if (nameInput.value.trim() === '') {
                showError(nameInput, 'Please enter your name');
                isValid = false;
            }
            
            // Validate email
            if (emailInput.value.trim() === '') {
                showError(emailInput, 'Please enter your email');
                isValid = false;
            } else if (!isValidEmail(emailInput.value)) {
                showError(emailInput, 'Please enter a valid email address');
                isValid = false;
            }
            
            // Validate message
            if (messageInput.value.trim() === '') {
                showError(messageInput, 'Please enter your message');
                isValid = false;
            }
            
            // If form is valid, show success message
            if (isValid) {
                const successMessage = document.createElement('div');
                successMessage.classList.add('success-message');
                successMessage.textContent = 'Your message has been sent successfully!';
                
                contactForm.reset();
                contactForm.appendChild(successMessage);
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }
        });
        
        function showError(input, message) {
            const errorMessage = document.createElement('div');
            errorMessage.classList.add('error-message');
            errorMessage.textContent = message;
            
            input.parentElement.appendChild(errorMessage);
            input.classList.add('error');
            
            // Remove error styling when input changes
            input.addEventListener('input', function() {
                this.classList.remove('error');
                const error = this.parentElement.querySelector('.error-message');
                if (error) {
                    error.remove();
                }
            });
        }
        
        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }
    }
    
    // FAQ accordion
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', function() {
                // Close all other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
            });
        });
    }
});
