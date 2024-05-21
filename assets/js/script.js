document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-main');
    const createAccountForm = document.getElementById('signup-main');

    document.getElementById('create-account').addEventListener('click', function(event) {
      event.preventDefault();
      loginForm.style.display = 'none';
      createAccountForm.style.display = 'flex';
    });

    document.getElementById('login').addEventListener('click', function(event) {
      event.preventDefault();
      createAccountForm.style.display = 'none';
      loginForm.style.display = 'flex';
    });
  });