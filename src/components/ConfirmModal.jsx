import { memo } from "react";
import { AlertTriangle, X } from "lucide-react";

export const ConfirmModal = memo(
  ({
    title,
    message,
    confirmLabel = "Delete",
    onConfirm,
    onCancel,
    danger = true,
  }) => (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(6px)" }}
      onClick={(e) => e.target === e.currentTarget && onCancel()}>
      <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-6 relative">
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
          <X className="w-4 h-4 text-gray-500" />
        </button>
        <div className="flex items-center gap-3 mb-4">
          {danger && (
            <div className="w-10 h-10 bg-rose-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-5 h-5 text-rose-600" />
            </div>
          )}
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        </div>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">{message}</p>
        <div className="flex gap-2">
          <button
            onClick={onCancel}
            className="flex-1 border border-gray-200 py-2.5 rounded-2xl text-sm font-semibold hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 py-2.5 rounded-2xl text-sm font-semibold text-white transition-all active:scale-[0.98] ${danger ? "bg-rose-600 hover:bg-rose-700" : "bg-blue-600 hover:bg-blue-700"}`}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  ),
);
