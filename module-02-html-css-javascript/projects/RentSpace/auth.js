document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const role = document.getElementById('role').value;
      
      const users = StorageLayer.getUsers();
      const user = users.find(u => u.email === email && u.role === role);

      if (user) {
        StorageLayer.setCurrentUser(user);
        window.location.href = role === 'landlord' ? 'landlord-profile.html' : 'index.html';
      } else {
        alert('User not found. Please register first.');
      }
    });
  }

  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const user = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        role: document.getElementById('role').value
      };

      StorageLayer.addUser(user);
      StorageLayer.setCurrentUser(user);
      alert('Registration successful!');
      window.location.href = user.role === 'landlord' ? 'landlord-profile.html' : 'index.html';
    });
  }
});