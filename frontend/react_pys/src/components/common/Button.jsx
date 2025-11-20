const Button = ({ children, variant = 'primary', ...props }) => {
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800'
  };
  
  return (
    <button
      className={`px-4 py-2 rounded-lg font-medium transition-colors ${variants[variant]} disabled:opacity-50`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;