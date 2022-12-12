// const { request } = require('../app');
const request = require('request');
const config = require('./config');

const paystack = () => {
  const secretKey = config.paystack.secret;
  const initializePayment = (form, mycallback) => {
    const options = {
      url: 'https://api.paystack.co/transaction/initialize',
      headers: {
        authorization: `Bearer ${secretKey}`,
        'content-type': 'application/json',
        'cache-control': 'no-cache',
      },
      form,
    };
    const callback = (error, response, body) => {
      return mycallback(error, body);
    };
    request.post(options, callback);
  };

  const verifyPayment = (ref, mycallback) => {
    const options = {
      url: `https://api.paystack.co/transaction/verify/${encodeURIComponent(ref)}`,
      headers: {
        authorization: `Bearer ${secretKey}`,
        'content-type': 'application/json',
        'cache-control': 'no-cache',
      },
    };
    const callback = (error, response, body) => {
      return mycallback(error, body);
    };
    request(options, callback);
  };

  return { initializePayment, verifyPayment };
};

module.exports = paystack;
