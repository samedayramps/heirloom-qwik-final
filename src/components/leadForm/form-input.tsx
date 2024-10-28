import { component$ } from '@builder.io/qwik';

interface FormInputProps {
  id: string;
  label: string;
  type: string;
  required?: boolean;
  error?: string;
  fullWidth?: boolean;
}

export const FormInput = component$<FormInputProps>(({ 
  id, 
  label, 
  type, 
  required, 
  error,
  fullWidth
}) => {
  return (
    <div class={fullWidth ? 'w-full' : 'w-full'}>
      <label 
        for={id}
        class="block text-gray-700 text-sm font-medium mb-2"
      >
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#d5c6ad] focus:ring-2 focus:ring-[#d5c6ad]/20 transition-all duration-200 bg-white/50 backdrop-blur-sm"
      />
      {error && (
        <p class="text-red-500 text-xs mt-1">{error}</p>
      )}
    </div>
  );
});
