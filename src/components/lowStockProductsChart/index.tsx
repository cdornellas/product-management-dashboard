import type { IProduct } from '../../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface LowStockProductsChartProps {
    products: IProduct[];
}

const STOCK_THRESHOLD = 20;

export default function LowStockProductsChart({ products }: LowStockProductsChartProps) {
    const data = products
            .filter(p => p.stock < STOCK_THRESHOLD) 
            .sort((a, b) => a.stock - b.stock)  
            .slice(0, 5); 

    if (data.length === 0) {
        return (
            <div className="group bg-white p-6 rounded-lg shadow h-96 flex items-center justify-center transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg from-blue-50 to-indigo-100 motion-">
                <p className="text-gray-500 transition-colors">Nenhum produto com baixo estoque.</p>
            </div>
        )
    }

    return (
        <div className="group bg-white p-6 rounded-lg shadow h-110 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg from-blue-50 to-indigo-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 transition-colors">Top 5 Produtos com Baixo Estoque (Abaixo de {STOCK_THRESHOLD} un.)</h3>
            <ResponsiveContainer width="100%" height="80%">
                <BarChart data={data} layout="vertical" margin={{ top: 5, right: 20, left: 100, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="title" type="category" width={80} />
                    <Tooltip formatter={(value: number) => [`${value} unidades`, "Estoque"]} />
                    <Legend />
                    <Bar dataKey="stock" name="Estoque" fill="#314892" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
