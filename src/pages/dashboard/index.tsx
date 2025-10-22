import { useProducts } from '../../hooks/useProducts'; 

import MetricCard from '../../components/metricCard';
import CategoryChart from '../../components/categoryChart';
import LowStockProductsChart from '../../components/lowStockProductsChart';

export default function Dashboard() {
  const { products, isLoading, error } = useProducts();

  const formatPrice = (price: number) => {
    return `R$ ${new Intl.NumberFormat('pt-BR', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price)}`;
  }

  let totalValue = 0;
  let avgPrice = 0;
  let uniqueCategories = 0;

  if (products.length > 0) {
    totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0);
    avgPrice = products.reduce((sum, p) => sum + p.price, 0) / products.length;
    uniqueCategories = new Set(products.map(p => p.category)).size;
  }

  if (isLoading) return <div className="text-center p-8">Carregando dados...</div>;
  if (error) return <div className="text-center p-8 text-red-500">Ocorreu um erro: {error.message}</div>;

  return (
    <div className="space-y-6 pt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <MetricCard title="Valor Total do Estoque" value={`${formatPrice(totalValue)}`} />
        <MetricCard title="Média de Preço" value={`${formatPrice(avgPrice)}`} />
        <MetricCard title="Total de Categorias" value={uniqueCategories} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CategoryChart products={products} />
        <LowStockProductsChart products={products} />
      </div>
    </div>
  );
};
