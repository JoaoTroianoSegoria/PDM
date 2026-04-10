import DespesaSaida from "../components/despesa/DespesaSaida";

function getDateMinusDays(data, dias) {
  const novaData = new Date(data);
  novaData.setDate(novaData.getDate() - dias);
  return novaData;
}

export default function DespesaRecentes({ despesas }) {
  const hoje = new Date();
  const seteDiasAtras = getDateMinusDays(hoje, 7);

  const despesasRecentes = despesas.filter((despesa) => {
    return despesa.data >= seteDiasAtras && despesa.data <= hoje;
  });

  return (
    <DespesaSaida despesas={despesasRecentes} periodo="Últimos 7 dias" />
  );
}
