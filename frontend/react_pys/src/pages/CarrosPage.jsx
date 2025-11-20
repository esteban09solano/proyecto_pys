import { useState, useEffect } from 'react';
import { Car } from 'lucide-react';
import { Alert, Input, Button } from '../components/common';
import Navbar from '../components/layout/Navbar';
import { useAuth } from '../hooks';
import { apiService } from '../services/api.service';

const CarrosPage = () => {
  const { user } = useAuth();
  const [carros, setCarros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({ placa: '', color: '', fecha_ingreso: '' });

  const loadCarros = async () => {
    try {
      setLoading(true);
      const data = await apiService.getCarros(user.token);
      setCarros(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCarros();
  }, []);

  const handleSubmit = async () => {
    setError('');
    setSuccess('');

    try {
      await apiService.createCarro(user.token, formData);
      setSuccess('Carro creado exitosamente');
      setFormData({ placa: '', color: '', fecha_ingreso: '' });
      loadCarros();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar title="Gestión de Carros" icon={Car} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Car className="text-blue-600" />
              Crear Nuevo Carro
            </h2>

            <div className="space-y-4">
              <Input
                label="Placa"
                type="text"
                placeholder="AAA123"
                value={formData.placa}
                onChange={(e) => setFormData({ ...formData, placa: e.target.value.toUpperCase() })}
                required
              />

              <Input
                label="Color"
                type="text"
                placeholder="Rojo"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                required
              />

              <Input
                label="Fecha de Ingreso"
                type="date"
                value={formData.fecha_ingreso}
                onChange={(e) => setFormData({ ...formData, fecha_ingreso: e.target.value })}
                required
              />

              {error && <Alert variant="error">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}

              <Button onClick={handleSubmit} className="w-full">Crear Carro</Button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">Lista de Carros</h2>

            {loading ? (
              <p className="text-gray-600">Cargando carros...</p>
            ) : carros.length === 0 ? (
              <p className="text-gray-600">No hay carros registrados</p>
            ) : (
              <div className="space-y-3">
                {carros.map((carro, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <h3 className="font-bold text-lg">{carro.placa}</h3>
                    <p className="text-gray-600">Color: {carro.color}</p>
                    <p className="text-sm text-gray-500">Ingreso: {carro.fecha_ingreso}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarrosPage;