/**
 * CPF validation and formatting utilities
 */

/**
 * Validates a CPF number
 * @param {string} cpf - The CPF number to validate
 * @returns {boolean} True if valid, false otherwise
 */
function validarCPF(cpf) {
  // Remove non-digits
  cpf = cpf.replace(/\D/g, '');

  if (cpf.length !== 11) {
    return false;
  }

  // Check if all digits are the same
  if (/^(\d)\1{10}$/.test(cpf)) {
    return false;
  }

  // Calculate first check digit
  let sum = 0;
  let remainder;

  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }

  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }

  if (remainder !== parseInt(cpf.substring(9, 10))) {
    return false;
  }

  // Calculate second check digit
  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }

  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }

  if (remainder !== parseInt(cpf.substring(10, 11))) {
    return false;
  }

  return true;
}

/**
 * Formats a CPF number
 * @param {string} cpf - The CPF number to format
 * @returns {string} Formatted CPF (XXX.XXX.XXX-XX)
 */
function formatarCPF(cpf) {
  cpf = cpf.replace(/\D/g, '');
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

module.exports = {
  validarCPF,
  formatarCPF,
};
