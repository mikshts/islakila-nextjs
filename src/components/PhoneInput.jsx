import { memo } from "react";
import { AlertCircle, CheckCircle } from "lucide-react";
import { sanitizePhone, validatePhone } from "../services/index.js";

export const PhoneInput = memo(({ value, onChange, error }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Contact Number *
    </label>
    <input
      type="tel"
      inputMode="tel"
      maxLength={13}
      placeholder="09XXXXXXXXX or +639XXXXXXXXX"
      className={`w-full border rounded-xl px-4 py-2.5 text-sm outline-none transition-all ${
        error
          ? "border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-200"
          : "border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      }`}
      value={value}
      onChange={(e) => onChange(sanitizePhone(e.target.value))}
    />
    {error && (
      <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
        <AlertCircle className="w-3 h-3" />
        {error}
      </p>
    )}
    {!error && value && validatePhone(value) && (
      <p className="text-xs text-emerald-600 mt-1 flex items-center gap-1">
        <CheckCircle className="w-3 h-3" />
        Valid number
      </p>
    )}
  </div>
));
