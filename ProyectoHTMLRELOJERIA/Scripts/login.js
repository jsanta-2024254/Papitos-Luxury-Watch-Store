document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector(".flip-card__front form");
    const signupForm = document.querySelector(".flip-card__back form");

    function saveUser(name, email, password) {
        let users = JSON.parse(localStorage.getItem("users") || "[]");
        if (users.some(u => u.email === email)) {
            alert("El email ya está registrado");
            return false;
        }
        users.push({ name, email, password });
        localStorage.setItem("users", JSON.stringify(users));
        alert("Usuario registrado con éxito");
        return true;
    }

    function validateLogin(email, password) {
        let users = JSON.parse(localStorage.getItem("users") || "[]");
        return users.find(u => u.email === email && u.password === password);
    }

    if (loginForm) {
        loginForm.addEventListener("submit", e => {
            e.preventDefault();
            const email = loginForm.email.value.trim();
            const password = loginForm.password.value.trim();

            if (!email || !password) {
                alert("Por favor complete ambos campos");
                return;
            }

            const user = validateLogin(email, password);
            if (user) {
                localStorage.setItem("loggedIn", "true");
                localStorage.setItem("userEmail", user.email);
                window.location.href = "index.html";
            } else {
                alert("Credenciales inválidas");
            }
        });
    }

    if (signupForm) {
        signupForm.addEventListener("submit", e => {
            e.preventDefault();
            const name = signupForm.querySelector('input[placeholder="Name"]').value.trim();
            const email = signupForm.email.value.trim();
            const password = signupForm.password.value.trim();

            if (!name || !email || !password) {
                alert("Por favor complete todos los campos");
                return;
            }

            if (saveUser(name, email, password)) {
                signupForm.reset();
                alert("Ahora puede iniciar sesión");
            }
        });
    }

    // Función para cerrar sesión y asignar evento al botón logout
    function logout() {
        localStorage.removeItem("loggedIn");
        localStorage.removeItem("userEmail");
        window.location.href = "index-login.html"; 
    }

    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", logout);
    }
});
