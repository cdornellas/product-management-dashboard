import type { IProduct } from '../../types';
import { useState, useEffect } from 'react';

interface ProductsTableProps {
  products: IProduct[];
  onEdit: (product: IProduct) => void;
  onDelete: (id: number) => void;
}

export default function ProductsTable({ products, onEdit, onDelete }: ProductsTableProps){

  const [ currentPage, setCurrentPage ] = useState(1);
  const [ itemsPerPage ] = useState(6);

  useEffect(() => {
    setCurrentPage(1);
  }, [products]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <div className="overflow-x-auto rounded-lg border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200 table-fixed">
          <thead className="bg-slate-50">
            <tr>
              <th className="w-2/5 px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Nome</th>
              <th className="w-1/5 px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider ">Categoria</th>
              <th className="w-1/5 px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Preço</th>
              <th className="w-1/5 px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Estoque</th>
              <th className="w-1/5 px-6 py-3 text-center text-xs font-semibold text-slate-600 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {currentProducts.length > 0 ? (
              currentProducts.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-slate-900">{product.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{product.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">R$ {product.price.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{product.stock}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                    <div className="flex justify-center items-center gap-4">
                      <div className="flex justify-center items-center gap-4">
                        <button onClick={() => onEdit(product)} className="text-indigo-600 hover:text-indigo-900">Editar</button>
                        <button onClick={() => onDelete(product.id)} className="text-red-600 hover:text-red-900">Excluir</button>
                      </div>
                      </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-10 text-slate-500">
                  Nenhum produto encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4 px-2">
          <span className="text-sm text-slate-600">
            Página <strong>{currentPage}</strong> de <strong>{totalPages}</strong>
          </span>
          <div className="flex gap-2">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Anterior
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Próximo
            </button>
          </div>
        </div>
      )}
    </div>
  );
}