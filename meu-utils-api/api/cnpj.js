export default function handler(req, res) {
  const cnpj = (req.query.cnpj || '').replace(/\D/g, '');

  if (cnpj.length !== 14) {
    return res.status(400).json({
      success: false,
      error: 'CNPJ deve conter 14 dígitos'
    });
  }

  const formatado = cnpj.replace(
    /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
    '$1.$2.$3/$4-$5'
  );

  res.status(200).json({
    success: true,
    original: cnpj,
    resultado: formatado
  });
}
