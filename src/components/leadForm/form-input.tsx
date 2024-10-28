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
    <div class={fullWidth ? 'w-full' : 'flex-1'}>
      <label 
        for={id}
        class="block text-gray-700 text-sm font-bold mb-2"
      >
        {label}
        {required && <span class="text-red-500">*</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      {error && (
        <p class="text-red-500 text-xs italic mt-1">{error}</p>
      )}
    </div>
  );
});
