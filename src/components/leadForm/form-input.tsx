import { component$ } from '@builder.io/qwik';

interface FormInputProps {
  id: string;
  label: string;
  type: string;
  required?: boolean;
  error?: string;
  class?: string;
}

export const FormInput = component$<FormInputProps>(({ 
  id, 
  label, 
  type, 
  required, 
  error,
  class: className
}) => {
  return (
    <div class="w-full">
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
        class={[
          'w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#d5c6ad] focus:ring-2 focus:ring-[#d5c6ad]/20 transition-all duration-200 bg-white/50 backdrop-blur-sm',
          error && 'border-red-500',
          className
        ].join(' ')}
      />
      {error && (
        <p class="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
});
