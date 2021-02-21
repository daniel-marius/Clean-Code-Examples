function connectDatabase() {
  const didConnect = database.connect();
  if (didConnect) {
    return true;
  } else {
    console.log('Could not connect to database!');
    return false;
  }
}

function determineSupportAgent(ticket) {
  let agent;
  if (ticket.requestType === 'unknown') {
    agent = findStandardAgent();
  }
  agent = findAgentByRequestType(ticket.requestType);
  return agent;
}

function isValid(email, password) {
  if (!email.includes('@') || password.length < 7) {
    console.log('Invalid input!');
    return false;
  }
  return true;
}
