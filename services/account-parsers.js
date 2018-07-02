import config from '../config';

export const amex = (data, provider) => {
  const transaction = {};

  data.forEach((item, idx) => {
    if (config.headers[provider][idx] !== undefined)
      transaction[config.headers[provider][idx]] = item;
  });

  const current = transaction.date.split('/');

  transaction.reference = transaction.reference.split(' ')[1];
  transaction.amount = transaction.amount.replace(' ', '');
  transaction.processDate = transaction.processDate
    .replace('Process Date ', '')
    .trim();
  transaction.date = new Date(`${current[2]}-${current[1]}-${current[0]}`);

  return transaction;
};

export const halifax = (data, provider) => {
  const transaction = {};
  // Date, Date entered, Reference, Description, Amount
  data.forEach((item, idx) => {
    if (config.headers[provider][idx] !== undefined)
      transaction[config.headers[provider][idx]] = item;
  });

  const current = transaction.date.split('/');
  transaction.date = new Date(`${current[2]}-${current[1]}-${current[0]}`);
  transaction.retailer = transaction.retailer.trim();

  return transaction;
};
