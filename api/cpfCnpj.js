export default function handler(req, res) {
  // Aceita o parâmetro como 'documento', 'cpf' ou 'cnpj' para ficar bem flexível
  const entrada = req.query.documento || req.query.cpf || req.query.cnpj || req.query.cpfCnpj || '';
  
  // Remove tudo o que não for número
  const apenasNumeros = entrada.replace(/\D/g, '');

  let formatado = '';
  let tipo = '';

  // Valida pelo tamanho do documento limpo
  if (apenasNumeros.length === 11) {
    tipo = 'CPF';
    formatado = apenasNumeros.replace(
      /(\d{3})(\d{3})(\d{3})(\d{2})/,
      '$1.$2.$3-$4'
    );
  } else if (apenasNumeros.length === 14) {
    tipo = 'CNPJ';
    formatado = apenasNumeros.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      '$1.$2.$3/$4-$5'
    );
  } else {
    return res.status(400).json({
      success: false,
      error: 'O documento deve conter 11 dígitos para CPF ou 14 dígitos para CNPJ.'
    });
  }

  // Retorno de sucesso
  res.status(200).json({
    success: true,
    tipo: tipo,
    original: entrada,
    limpo: apenasNumeros,
    resultado: formatado
  });
}
