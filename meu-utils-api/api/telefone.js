/**
 * Phone number validation and formatting utilities
 */

/**
 * Validates a phone number
 * @param {string} telefone - The phone number to validate
 * @returns {boolean} True if valid, false otherwise
 */
function validarTelefone(telefone) {
  // Remove non-digits
  telefone = telefone.replace(/\D/g, '');

  // Valid lengths: 10 (landline) or 11 (mobile)
  if (telefone.length !== 10 && telefone.length !== 11) {
    return false;
  }

  // First digit cannot be 0
  if (telefone.charAt(0) === '0') {
    return false;
  }

  // Second digit must be between 1 and 9
  if (telefone.charAt(1) < '1' || telefone.charAt(1) > '9') {
    return false;
  }

  return true;
}

/**
 * Formats a phone number
 * @param {string} telefone - The phone number to format
 * @returns {string} Formatted phone number
 */
function formatarTelefone(telefone) {
  telefone = telefone.replace(/\D/g, '');

  if (telefone.length === 10) {
    // Landline: (XX) XXXX-XXXX
    return telefone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  } else if (telefone.length === 11) {
    // Mobile: (XX) XXXXX-XXXX
    return telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }

  return telefone;
}

module.exports = {
  validarTelefone,
  formatarTelefone,
};
