import { AlertCircle } from 'lucide-react';

const Alert = ({ children, variant = 'error' }) => {
  const colors = {
    error: 'bg-red-50 text-red-800 border-red-200',
    success: 'bg-green-50 text-green-800 border-green-200'
  };
  
  return (
    <div className={`flex items-center gap-2 p-3 rounded-lg border ${colors[variant]}`}>
      <AlertCircle size={20} />
      <span>{children}</span>
    </div>
  );
};

export default Alert;