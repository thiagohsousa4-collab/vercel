export default function handler(req, res) {
  const telefone = req.query.telefone || '';

  const resultado = telefone
    .replace(/\D/g, '')
    .replace(/^55/, '');

  res.status(200).json({
    original: telefone,
    resultado: resultado
  });
}
