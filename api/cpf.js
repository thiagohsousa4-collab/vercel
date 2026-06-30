export default function handler(req, res) {
  const cpf = (req.query.cpf || '').replace(/\D/g, '');

  if (cpf.length !== 11) {
    return res.status(400).json({
      success: false,
      error: 'CPF deve conter 11 dígitos'
    });
  }

  const formatado = cpf.replace(
    /(\d{3})(\d{3})(\d{3})(\d{2})/,
    '$1.$2.$3-$4'
  );

  res.status(200).json({
    success: true,
    original: cpf,
    resultado: formatado
  });
}
