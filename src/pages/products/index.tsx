import { useState } from "react";
import type { IProduct } from "../../types";
import { useProducts } from "../../hooks/useProducts";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaPlus } from "react-icons/fa";

import ProductsTable from "../../components/productTable";
import ProductFormModal from "../../components/productFormModal";
import ConfirmDialog from "../../components/confirmDialog";

export default function Products() {
  const {
    products,
    isLoading,
    error,
    addProduct,
    updateProduct,
    deleteProduct,
  } = useProducts();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<IProduct | null>(null);

  const [searchTerm, setSearchTerm] = useState("");

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);

  const filteredProducts = !searchTerm
    ? products
    : products.filter((product) =>
    (product.title || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product: IProduct) => {
    setEditingProduct({...product});
    setIsModalOpen(true);
  };

  const handleDeleteProduct = (id: number) => {
    setProductToDelete(id);
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (productToDelete !== null) {
      try {  
        await deleteProduct(productToDelete);
      } catch (e) {
        console.error("Erro ao excluir o produto:", e);
      }
    }
    setIsConfirmOpen(false);
    setProductToDelete(null);
  };

  const handleCancelDelete = () => {
    setIsConfirmOpen(false);
    setProductToDelete(null);
  };

  const handleModalSubmit = async (productData: Omit<IProduct, "id"> | IProduct) => {
    if ("id" in productData) {
      updateProduct(productData, {
        onSuccess: () => {
          setIsModalOpen(false);
          setEditingProduct(null);
        },
      });
    } else {
      addProduct(productData, {
        onSuccess: () => {
          setIsModalOpen(false);
        },
      });
    }
  };

  if (isLoading) return <div className="p-8 text-center text-gray-500">Carregando produtos...</div>;
  if (error) return <div className="p-8 text-center text-red-600 bg-red-50 rounded-lg">Ocorreu um erro ao buscar os produtos.</div>;

  return (
    <div>
      <div className="bg-slate-50 p-4 sm:p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded-xl shadow-lg"
        >
      
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">
                Gerenciamento de Produtos
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                {products.length} produtos cadastrados no total.
              </p>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <FaSearch className="text-gray-400" />
                </span>
                <input
                  type="text"
                  list="products"
                  className="block w-full border border-slate-300 rounded-lg shadow-sm py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar produto por..."
                />
                <datalist id="products">
                  {searchTerm.length > 1 &&
                    products.map((product) => (
                      <option key={product.id} value={product.title} />
                    ))}
                </datalist>
              </div>
              <button
                onClick={handleOpenAddModal}
                className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:scale-105"
              >
                <FaPlus />
                <span className="font-semibold">Adicionar</span>
              </button>
            </div>
          </div>
          <ProductsTable
            products={filteredProducts}
            onEdit={handleOpenEditModal}
            onDelete={handleDeleteProduct}
          />
        </motion.div>
        <AnimatePresence>
          {isModalOpen && (
            <ProductFormModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onSubmit={handleModalSubmit}
              initialData={editingProduct}
            />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {isConfirmOpen && (
            <ConfirmDialog
              title="Confirmar Exclusão"
              description="Tem certeza que deseja excluir este produto? Esta ação não pode ser desfeita."
              onCancel={handleCancelDelete}
              onConfirm={handleConfirmDelete}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
