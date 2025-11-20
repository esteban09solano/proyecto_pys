import { useState } from 'react';
import { Car } from 'lucide-react';
import { Alert, Input, Button } from '../components/common';
import { useAuth } from '../hooks';
import { apiService } from '../services/api.service';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async () => {
    setError('');
    setLoading(true);

    try {
      const response = await apiService.login(username, password);
      login(username, response.token || 'dummy-token');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSubmit();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <Car size={48} className="mx-auto text-blue-600 mb-4" />
          <h1 className="text-3xl font-bold text-gray-800">Sistema de Carros</h1>
          <p className="text-gray-600 mt-2">Ingresa tus credenciales</p>
        </div>

        <div className="space-y-4">
          <Input
            label="Usuario"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={handleKeyPress}
            required
          />
          
          <Input
            label="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
            required
          />

          {error && <Alert variant="error">{error}</Alert>}

          <Button onClick={handleSubmit} disabled={loading} className="w-full">
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;