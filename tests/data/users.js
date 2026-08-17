// Staging rejects duplicate emails, so registration flows need a fresh address per run.
function uniqueEmail(prefix = 'ambreeny4191') {
  return `${prefix}+${Date.now()}@gmail.com`;
}

function primaryCustomer(overrides = {}) {
  return {
    firstName: 'Ambreen',
    lastName: 'Y',
    email: uniqueEmail(),
    state: 'California',
    ...overrides,
  };
}

module.exports = {
  primaryCustomer,
  uniqueEmail,
};
