import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import type { PieLabelRenderProps } from 'recharts';
import type { IProduct } from '../../types';

interface CategoryChartProps {
    products: IProduct[];
}

const COLORS = ['#C6D229', '#3370B2', '#A2D4EB', '#9DC33E', '#F1A319', '#25405E'];

export default function CategoryChart({ products }: CategoryChartProps) {

    const categoryCounts: Record<string, number> = {};
    products.forEach(p => {
        categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
    });

    const data = Object.entries(categoryCounts).map(([name, value]) => ({ name, value }));

    const totalProducts = data.reduce((sum, entry) => sum + entry.value, 0);

    return (
        <div className="bg-white p-6 rounded-lg shadow h-110 motion- transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg from-blue-50 to-indigo-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Produtos por Categoria</h3>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Tooltip
                        formatter={(value: number, name: string) => [`${value} produtos`, name]}
                    />
                    <Pie
                        dataKey="value"
                        data={data}
                        labelLine={false}
                        outerRadius={100}
                        label={(props: PieLabelRenderProps) => {
                            const value = (props.payload as { value: number }).value;
                            const percent = totalProducts > 0 ? (value / totalProducts) * 100 : 0;
                            return `${percent.toFixed(0)}%`;
                        }}
                    >
                        {data.map((_, i) => (
                            <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}