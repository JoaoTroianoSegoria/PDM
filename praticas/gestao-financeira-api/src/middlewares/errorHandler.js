export function errorHandler(err, req, res, next) {
  console.error(err);

  if (err.name === "ZodError") {
    return res.status(400).json({
      error: "Dados invalidos",
      details: err.issues,
    });
  }

  if (err.code === "P2025") {
    return res.status(404).json({ error: "Recurso nao encontrado" });
  }

  if (err.code === "P2002") {
    return res.status(409).json({ error: "Registro duplicado" });
  }

  if (err.code === "P2003") {
    return res.status(400).json({
      error: "Nao foi possivel remover porque existem registros relacionados",
    });
  }

  return res.status(500).json({ error: "Erro interno do servidor" });
}
