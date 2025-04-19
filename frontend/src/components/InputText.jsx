import React from 'react';

const InputField = ({
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  error,
  label,
  ...props
}) => {
  return (
    <div className="">
      {label && (
        <label className="block text-gray-800 text-[13px] font-bold mb-2" htmlFor={name}>
          {label}
        </label>
      )}
      <input
        className={`appearance-none border border-gray-400 rounded-lg py-2 px-3 w-[320px] h-[28px] text-gray-900 leading-tight placeholder-gray-700 text-[13px] focus:outline-none focus:shadow-outline ${error ? 'border-red-500' : ''
          }`}
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        {...props}
      />
      {error && <p className="text-red-500 text-xs italic mt-1">{error}</p>}
    </div>
  );
};

export default InputField;