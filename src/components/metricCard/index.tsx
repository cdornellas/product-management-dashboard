interface MetricCardProps {
  title: string;
  value: string | number;
}

export default function MetricCard({ title, value }: MetricCardProps){
  return (
    <div className="group bg-white p-6 rounded-lg shadow transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg from-blue-50 to-indigo-100">
      <h3 className="text-sm font-medium text-gray-500 truncate transition-colors group-hover:text-indigo-600">{title}</h3>
      <p className="mt-1 text-3xl font-semibold text-gray-900 transition-colors group-hover:text-indigo-800">{value}</p>
    </div>
  );
};

