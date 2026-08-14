// Staging rejects duplicate emails, so registration flows need a fresh address per run.
function uniqueEmail(prefix = 'patricia.miller') {
  const randomSuffix = Math.random().toString(36).slice(2, 8);
  return `${prefix}+${Date.now()}-${randomSuffix}@example.com`;
}

function primaryCustomer(overrides = {}) {
  return {
    firstName: 'Patricia',
    lastName: 'Miller',
    email: uniqueEmail(),
    state: 'California',
    ...overrides,
  };
}

module.exports = {
  primaryCustomer,
  uniqueEmail,
};
