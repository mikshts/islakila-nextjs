import { memo } from "react";
import { CheckCircle, AlertCircle, Info } from "lucide-react";

export const Toast = memo(({ message, type = "default" }) => {
  if (!message) return null;
  const styles = {
    default: "bg-gray-900",
    success: "bg-emerald-700",
    error: "bg-rose-700",
    info: "bg-blue-700",
  };
  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] ${styles[type] ?? styles.default} text-white text-sm font-medium px-5 py-2.5 rounded-2xl shadow-xl border border-white/10 flex items-center gap-2`}>
      {type === "success" && (
        <CheckCircle className="w-4 h-4 text-emerald-300 flex-shrink-0" />
      )}
      {type === "error" && (
        <AlertCircle className="w-4 h-4 text-rose-300 flex-shrink-0" />
      )}
      {type === "info" && (
        <Info className="w-4 h-4 text-blue-300 flex-shrink-0" />
      )}
      {message}
    </div>
  );
});
