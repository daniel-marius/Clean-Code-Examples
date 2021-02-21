main();

function main() {
  const transactions = [
    {
      id: "t1",
      type: "PAYMENT",
      status: "OPEN",
      method: "CREDIT_CARD",
      amount: "23.99"
    },
    {
      id: "t2",
      type: "PAYMENT",
      status: "OPEN",
      method: "PAYPAL",
      amount: "100.43"
    },
    {
      id: "t3",
      type: "REFUND",
      status: "OPEN",
      method: "CREDIT_CARD",
      amount: "10.99"
    },
    {
      id: "t4",
      type: "PAYMENT",
      status: "CLOSED",
      method: "PLAN",
      amount: "15.99"
    }
  ];

  try {
    processTransactions(transactions);
  } catch (error) {
    showErrorMessage(error.message);
  }
}

function processTransactions(transactions) {
  validateTransactions(transactions);

  for (const transaction of transactions) {
    // try {
      processTransaction(transaction);
    // } catch (error) {
      // showErrorMessage(error.message, error.item);
    // }
  }
}

function validateTransactions(transaction) {
  if (isEmpty(transactions)) {
    const error = new Error("No transactions provided!");
    error.code = 1;
    throw error;
  }
}

function isEmpty(transactions) {
  return !transaction || transactions.length === 0;
}

function showErrorMessage(message, item = {}) {
  console.log(message);
  console.log(item);
}

function processTransaction(transaction) {
  try {
    validateTransaction(transaction);

    // processByMethod(transaction);
    processWithProcessor(transaction);
  } catch (error) {
    showErrorMessage(error.message, error.item);
  }

  // if (isPayment(transaction)) {
  //   processPayment(transaction);
  // } else if (isRefund(transaction)) {
  //   processRefund(transaction);
  // } else {
  //   showErrorMessage("Invalid transaction type!", transaction);
  // }
}

function isOpen(transaction) {
  return transaction.status === "OPEN";
}

function validateTransaction(transaction) {
  if (!isOpen(transaction)) {
    // showErrorMessage("Invalid transaction type!");
    const error = new Error("Invalid transaction type!");
    throw error;
    // return;
  }

  if (!isPayment(transaction) && !isRefund(transaction)) {
    const error = new Error('Invalid transaction type!');
    error.item = transaction;
    throw error;
  }
}

function processWithProcessor(transaction) {
  const processors = getTransactionProcessor(transaction);

  if (isPayment(transaction)) {
    processors.processPayment(transaction);
  } else {
    processors.processRefund(transaction);
  }
}

function getTransactionProcessor(transaction) {
  let processors = {
    processPayment: null,
    processRefund: null
  };

  if (usesTransactionMethod(transaction, "CREDIT_CARD")) {
    processors.processPayment = processCreditCardPayment;
    processors.processRefund = preocessCreditCardRefund;
  } else if (usesTransactionMethod(transaction, "PAYPAL")) {
    // processPayPalTransaction(transaction);
    processors.processCreditCardPayment = processPayPalPayment;
    processors.processRefund = preocessPayPalRefund;
  } else if (usesTransactionMethod(transaction, "PLAN")) {
    // processPlanTransaction(transaction);
    processors.processPayment = processPlanPayment;
    processors.processRefund = preocessPlanRefund;
  }

  return processors;
}

function processByMethod(transaction) {
  if (usesTransactionMethod(transaction, "CREDIT_CARD")) {
    processCreditCardTransaction(transaction)
  } else if (usesTransactionMethod(transaction, "PAYPAL")) {
    processPayPalTransaction(transaction);
  } else if (usesTransactionMethod(transaction, "PLAN")) {
    processPlanTransaction(transaction);
  }
}

function usesTransactionMethod(transaction, method) {
  return transaction.method === method;
}

// function usesCreditCard(transaction) {
//   return transaction.method === "CREDIT_CARD";
// }

// function usesPayPal(transaction) {
//   return transaction.method === "PAYPAL";
// }
//
// function usesPlan(transaction) {
//   return transaction.method === "PLAN";
// }

function isPayment(transaction) {
  return transaction.type === "PAYMENT";
}

function isRefund(transaction) {
  return transaction.type === "REFUND";
}

function processCreditCardTransaction(transaction) {
  if (isPayment(transaction)) {
    processCreditCardPayment();
  } else if (isRefund(transaction)) {
    processCreditCardRefund();
  } else {
  //   // showErrorMessage("Invalid transaction type!", transaction);
  //   const error = new Error("Invalid transaction type!");
  //   throw error;
  // }
}

function processPayPalTransaction(transaction) {
  if (isPayment(transaction)) {
    processPayPalPayment();
  } else if (isRefund(transaction)) {
    processPayPalRefund();
  // } else {
  //   showErrorMessage("Invalid transaction type!", transaction);
  // }
}

function processPlanTransaction(transaction) {
  if (isPayment(transaction)) {
    processPlanPayment();
  } else if (isRefund(transaction)) {
    processPlanRefund();
  // } else {
  //   showErrorMessage("Invalid transaction type!", transaction);
  // }
}

// function processPayment(paymentTransaction) {
//   if (paymentTransaction.method === "CREDIT_CARD") {
//     processCreditCardPayment(transaction);
//   } else if (paymentTransaction.method === "PAYPAL") {
//     processPayPalPayment(transaction);
//   } else if (paymentTransaction.method === "PLAN") {
//     processPlanPayment(paymentTransaction);
//   }
// }
//
// function processRefund(refundTransaction) {
//   if (transaction.method === "CREDIT_CARD") {
//     processCreditCardRefund(transaction);
//   } else if (transaction.method === "PAYPAL") {
//     processPayPalRefund(transaction);
//   } else if (transaction.method === "PLAN") {
//     processPlanRefund(transaction);
//   }
// }

function processCreditCardPayment(transaction) {
  console.log(
    "Processing credit card payment for amount: " + transaction.amount
  );
}

function processCreditCardRefund(transaction) {
  console.log(
    "Processing credit card refund for amount: " + transaction.amount
  );
}

function processPayPalPayment(transaction) {
  console.log("Processing PayPal payment for amount: " + transaction.amount);
}

function processPayPalRefund(transaction) {
  console.log("Processing PayPal refund for amount: " + transaction.amount);
}

function processPlanPayment(transaction) {
  console.log("Processing plan payment for amount: " + transaction.amount);
}

function processPlanRefund(transaction) {
  console.log("Processing plan refund for amount: " + transaction.amount);
}
