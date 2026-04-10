import DespesaSaida from "../components/despesa/DespesaSaida";

export default function TodasDespesas({ despesas }) {
  return <DespesaSaida despesas={despesas} periodo="Todas as despesas" />;
}
