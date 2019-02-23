/**
 * Definition
 */

const checkFields = (required, body) => {
  const miss  = [];
  const extra = [];

  required.forEach(prop => {
    if (!prop in body) miss.push(prop);
  });

  const success = (extra.length === 0 && miss.length === 0);

  return { success, extra, miss };
}

/**
 * Export
 */

module.exports = checkFields;
