import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProducts, addProduct, updateProduct, deleteProduct } from '../api/productsApi';
import type { IProduct } from '../types';
import toast from 'react-hot-toast';

export const useProducts = () => {
  const queryClient = useQueryClient();

  const { data: products = [], isLoading, error } = useQuery<IProduct[]>({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  const addProductMutation = useMutation({
    mutationFn: addProduct,
    onSuccess: (newProduct) => {
      queryClient.setQueryData(['products'], (oldData: IProduct[] = []) => [newProduct, ...oldData]);
      toast.success('Produto adicionado com sucesso!');
    },
    onError: () => {
      toast.error('Falha ao adicionar o produto.');
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: (updatedProduct) => {
      queryClient.setQueryData(['products'], (oldData: IProduct[] = []) =>
        oldData.map(p => p.id === updatedProduct.id ? updatedProduct : p)
      );
      toast.success('Produto atualizado com sucesso!');
    },
    onError: () => {
      toast.error('Falha ao atualizar o produto.');
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: (deletedProduct) => {
      queryClient.setQueryData(['products'], (oldData: IProduct[] = []) =>
        oldData.filter(p => p.id !== deletedProduct.id)
      );
      toast.success('Produto excluído com sucesso!');
    },
    onError: () => {
      toast.error('Falha ao excluir o produto.');
    },
  });

  return {
    products,
    isLoading,
    error,
    addProduct: addProductMutation.mutate,
    updateProduct: updateProductMutation.mutate,
    deleteProduct: deleteProductMutation.mutate,
  };
};