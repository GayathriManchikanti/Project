const registrationForm = document.getElementById('registrationForm');
const userTable = document.getElementById('userTable');
let users = [];

// Load existing users from localStorage
const storedUsers = localStorage.getItem('users');
if (storedUsers) {
  users = JSON.parse(storedUsers);
  renderUsers();
}

registrationForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const dob = document.getElementById('dob').value;
  const acceptedTerms = document.getElementById('acceptedTerms').checked;

  // Validate email
  if (!isValidEmail(email)) {
    alert('Invalid email address.');
    return;
  }

  // Validate age
  const currentDate = new Date();
  const birthDate = new Date(dob);
  const age = currentDate.getFullYear() - birthDate.getFullYear();

  if (age < 18 || age > 55) {
    alert('Age must be between 18 and 55 years.');
    return;
  }

  // Add user to the list
  const newUser = { name, email, password, dob, acceptedTerms };
  users.push(newUser);

  // Update localStorage and render users
  updateLocalStorage();
  renderUsers();

  // Clear the form
  registrationForm.reset();
});

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function updateLocalStorage() {
  localStorage.setItem('users', JSON.stringify(users));
}

function renderUsers() {
  userTable.innerHTML = `
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Password</th>
        <th>Date of Birth</th>
        <th>Accepted Terms</th>
      </tr>
    </thead>
    <tbody>
      ${users.map(user => `
        <tr>
          <td>${user.name}</td>
          <td>${user.email}</td>
          <td>${user.password}</td>
          <td>${user.dob}</td>
          <td>${user.acceptedTerms ? 'Yes' : 'No'}</td>
        </tr>
      `).join('')}
    </tbody>
  `;
}
