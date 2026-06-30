/**
 * CNPJ validation and formatting utilities
 */

/**
 * Validates a CNPJ number
 * @param {string} cnpj - The CNPJ number to validate
 * @returns {boolean} True if valid, false otherwise
 */
function validarCNPJ(cnpj) {
  // Remove non-digits
  cnpj = cnpj.replace(/\D/g, '');

  if (cnpj.length !== 14) {
    return false;
  }

  // Check if all digits are the same
  if (/^(\d)\1{13}$/.test(cnpj)) {
    return false;
  }

  // Calculate first check digit
  let size = cnpj.length - 2;
  let numbers = cnpj.substring(0, size);
  let digits = cnpj.substring(size);
  let sum = 0;
  let pos = size - 7;

  for (let i = size; i >= 1; i--) {
    sum += numbers.charAt(size - i) * pos--;
    if (pos < 2) {
      pos = 9;
    }
  }

  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(0))) {
    return false;
  }

  // Calculate second check digit
  size = cnpj.length - 1;
  numbers = cnpj.substring(0, size);
  sum = 0;
  pos = size - 7;

  for (let i = size; i >= 1; i--) {
    sum += numbers.charAt(size - i) * pos--;
    if (pos < 2) {
      pos = 9;
    }
  }

  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(1))) {
    return false;
  }

  return true;
}

/**
 * Formats a CNPJ number
 * @param {string} cnpj - The CNPJ number to format
 * @returns {string} Formatted CNPJ (XX.XXX.XXX/XXXX-XX)
 */
function formatarCNPJ(cnpj) {
  cnpj = cnpj.replace(/\D/g, '');
  return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
}

module.exports = {
  validarCNPJ,
  formatarCNPJ,
};
