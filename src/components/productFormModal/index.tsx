import { useState, useEffect } from 'react';
import type { IProduct } from '../../types';
import { useProducts } from '../../hooks/useProducts';

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (productData: Omit<IProduct, 'id'> | IProduct) => void;
  initialData?: IProduct | null;
}

type Product = {
    title: string;
    category: string;
    price: number;
    stock: number;
}

export default function ProductFormModal({ isOpen, onClose, onSubmit, initialData }: ProductFormModalProps){
  const [formData, setFormData] = useState<Product>({
    title: '',
    category: '',
    price: 0,
    stock: 0,
  });

  const { products } = useProducts();

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        category: initialData.category,
        price: initialData.price,
        stock: initialData.stock,
      });
    } else {
      setFormData({ title: '', category: '', price: 0, stock: 0 });
    }
  }, [initialData, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (initialData) {
      onSubmit({ ...initialData, ...formData });
    } else {
      onSubmit(formData);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">{initialData ? 'Editar Produto' : 'Adicionar Produto'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Nome do Produto</label>
            <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Categoria</label>
            <select
              name="category"
              id="category"
              value={formData.category}
              onChange={handleChange}
              required
              className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2'
            >
              <option value="" disabled>Selecione uma categoria...</option>

              {
                Array.from(new Set(products.map(p => p.category)))
                  .sort() 
                  .map(category => (
                    <option
                      key={category}
                      value={category}
                    >
                      {category}
                    </option>
                  ))
              }
            </select>
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Preço</label>
            <input type="number" name="price" id="price" value={formData.price} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
          </div>
          <div>
            <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Estoque</label>
            <input type="number" name="stock" id="stock" value={formData.stock} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button type="button" onClick={onClose} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition">Cancelar</button>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">Salvar</button>
          </div>
        </form>
      </div>
    </div>
  );
};
