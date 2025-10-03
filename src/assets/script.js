        const themeToggle = document.getElementById('themeToggle');
        const loginPage = document.getElementById('loginPage');
        const registerPage = document.getElementById('registerPage');
        const toRegister = document.getElementById('toRegister');
        const toLogin = document.getElementById('toLogin');
        const body = document.body;

        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        
        if (prefersDarkScheme.matches) {
            body.classList.add('dark-mode');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            body.classList.remove('dark-mode');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }

        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            if (body.classList.contains('dark-mode')) {
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            } else {
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            }
        });

        function showLogin() {
            loginPage.classList.add('active');
            registerPage.classList.remove('active');
        }

        function showRegister() {
            registerPage.classList.remove('active');
            registerPage.classList.add('active');
            loginPage.classList.remove('active');
        }

        toRegister.addEventListener('click', (e) => {
            e.preventDefault();
            showRegister();
        });

        toLogin.addEventListener('click', (e) => {
            e.preventDefault();
            showLogin();
        });

        function setupPasswordToggle(toggleId, passwordId) {
            const toggle = document.getElementById(toggleId);
            const password = document.getElementById(passwordId);
            
            toggle.addEventListener('click', () => {
                const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
                password.setAttribute('type', type);
                toggle.innerHTML = type === 'password' ? 
                    '<i class="fas fa-eye"></i>' : 
                    '<i class="fas fa-eye-slash"></i>';
            });
        }

        setupPasswordToggle('loginToggle', 'loginPassword');
        setupPasswordToggle('registerToggle', 'registerPassword');

        document.getElementById('loginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            document.querySelectorAll('.error-message').forEach(el => {
                el.style.display = 'none';
            });
            
            let valid = true;
            
            if (!email) {
                document.getElementById('loginEmailError').textContent = 'Veuillez saisir votre identifiant';
                document.getElementById('loginEmailError').style.display = 'block';
                valid = false;
            }
            
            if (!password) {
                document.getElementById('loginPasswordError').textContent = 'Veuillez saisir votre mot de passe';
                document.getElementById('loginPasswordError').style.display = 'block';
                valid = false;
            } else if (password.length < 6) {
                document.getElementById('loginPasswordError').textContent = 'Le mot de passe doit contenir au moins 6 caractères';
                document.getElementById('loginPasswordError').style.display = 'block';
                valid = false;
            }
            
            if (valid) {
                document.querySelector('.btn').innerHTML = '<i class="fas fa-spinner fa-spin"></i> Connexion...';
                setTimeout(() => {
                    alert('Connexion réussie ! Bienvenue');
                    document.querySelector('.btn').innerHTML = 'Se connecter';
                }, 1500);
            }
        });

        document.getElementById('registerForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('registerName').value;
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;
            const confirmPassword = document.getElementById('registerConfirmPassword').value;
            
            document.querySelectorAll('.error-message').forEach(el => {
                el.style.display = 'none';
            });
            
            let valid = true;
            
            if (!name) {
                document.getElementById('registerNameError').textContent = 'Veuillez saisir votre nom complet';
                document.getElementById('registerNameError').style.display = 'block';
                valid = false;
            }
            
            if (!email) {
                document.getElementById('registerEmailError').textContent = 'Veuillez saisir votre email';
                document.getElementById('registerEmailError').style.display = 'block';
                valid = false;
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                document.getElementById('registerEmailError').textContent = 'Adresse email invalide';
                document.getElementById('registerEmailError').style.display = 'block';
                valid = false;
            }
            
            if (!password) {
                document.getElementById('registerPasswordError').textContent = 'Veuillez créer un mot de passe';
                document.getElementById('registerPasswordError').style.display = 'block';
                valid = false;
            } else if (password.length < 6) {
                document.getElementById('registerPasswordError').textContent = 'Le mot de passe doit contenir au moins 6 caractères';
                document.getElementById('registerPasswordError').style.display = 'block';
                valid = false;
            }
            
            if (!confirmPassword) {
                document.getElementById('registerConfirmError').textContent = 'Veuillez confirmer votre mot de passe';
                document.getElementById('registerConfirmError').style.display = 'block';
                valid = false;
            } else if (password !== confirmPassword) {
                document.getElementById('registerConfirmError').textContent = 'Les mots de passe ne correspondent pas';
                document.getElementById('registerConfirmError').style.display = 'block';
                valid = false;
            }
            
            if (valid) {
                document.querySelector('.btn').innerHTML = '<i class="fas fa-spinner fa-spin"></i> Création...';
                setTimeout(() => {
                    alert(`Compte créé avec succès ! Bienvenue ${name}`);
                    document.querySelector('.btn').innerHTML = 'S\'inscrire';
                    showLogin();
                }, 1500);
            }
        });
