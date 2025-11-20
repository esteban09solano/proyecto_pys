import { LogOut } from 'lucide-react';
import { Button } from '../common';
import { useAuth } from '../../hooks';

const Navbar = ({ title, icon: Icon }) => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          {Icon && <Icon className="text-blue-600" />}
          <h1 className="text-xl font-bold">{title}</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-gray-600">Hola, {user.username}</span>
          <Button variant="secondary" onClick={logout}>
            <LogOut size={18} className="inline mr-2" />
            Salir
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;