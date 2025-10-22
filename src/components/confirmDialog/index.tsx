interface ConfirmDialogProps {
  title: string;
  description?: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function ConfirmDialog({ title, description, onCancel, onConfirm }: ConfirmDialogProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm">
                <h3 className="text-lg font-semibold">{title}</h3>
                {description && <p className="mt-2 text-sm text-gray-600">{description}</p>}
                <div className="mt-6 flex justify-end gap-3">
                    <button 
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition" 
                        onClick={onCancel}>
                        Cancelar
                    </button>
                    <button 
                        className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition" 
                        onClick={onConfirm}>
                        Excluir
                    </button>
                </div>
            </div>
        </div>
    );
}