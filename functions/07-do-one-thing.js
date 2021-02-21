function handleCreateUserRequest(request) {
  try {
    createUser('email', 'password');
  } catch (error) {
    showErrorMessage(error.message);
  }
}

function createUser(email, password) {
  validateInput(email, password);

  saveUser(email, password);
}

function validateInput(email, password) {
  if (inputIsNotValid(email, password)) {
    // showErrorMessage('Invalid input!');
    // return;
    throw new Error('Invalid input!');
  }
}

function inputIsNotValid(email password) {
  return !email || !email.includes('@') || !password || password.trim() === '';
}

function showErrorMessage(message) {
  console.log(message);
}

function saveUser(email, password) {
  const user = {
    email: email,
    password: password,
  };

  database.insert(user);
}
