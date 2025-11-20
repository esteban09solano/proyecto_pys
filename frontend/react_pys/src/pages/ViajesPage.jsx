import { useState, useEffect} from 'react';
import { MapPin, Search } from 'lucide-react';
import { Alert, Input, Button, Select} from '../components/common';
import Navbar from '../components/layout/Navbar';
import { useAuth } from '../hooks';
import { apiService } from '../services/api.service';

const ViajesPage = () => {
  const { user } = useAuth();
  const [viajes, setViajes] = useState([]);
  const [carros, setCarros] = useState([]);
  const [ciudades, setCiudades] = useState([]);
  const [searchPlaca, setSearchPlaca] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loadingData, setLoadingData] = useState(true);
  const [formData, setFormData] = useState({
    carro: '',
    ciudad_origen: '',
    ciudad_destino: '',
    tiempo_horas: '',
    fecha: ''
  });

  // Cargar carros y ciudades al montar el componente
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoadingData(true);
        const [carrosData, ciudadesData] = await Promise.all([
          apiService.getCarros(user.token),
          apiService.getCiudades(user.token)
        ]);
        setCarros(carrosData);
        setCiudades(ciudadesData);
      } catch (err) {
        setError('Error al cargar datos iniciales: ' + err.message);
      } finally {
        setLoadingData(false);
      }
    };

    loadInitialData();
  }, [user.token]);

  const handleCreateViaje = async () => {
    setError('');
    setSuccess('');

    // Validaciones
    if (!formData.carro || !formData.ciudad_origen || !formData.ciudad_destino || 
        !formData.tiempo_horas || !formData.fecha) {
      setError('Todos los campos son obligatorios');
      return;
    }

    if (formData.ciudad_origen === formData.ciudad_destino) {
      setError('La ciudad de origen y destino no pueden ser iguales');
      return;
    }

    try {
      await apiService.createViaje(user.token, formData);
      setSuccess('Viaje creado exitosamente');
      setFormData({ carro: '', ciudad_origen: '', ciudad_destino: '', tiempo_horas: '', fecha: '' });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSearch = async () => {
    setError('');

    if (!searchPlaca) {
      setError('Debes seleccionar una placa');
      return;
    }

    try {
      const data = await apiService.getViajesByPlaca(user.token, searchPlaca);
      setViajes(data);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loadingData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar title="Gestión de Viajes" icon={MapPin} />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <p className="text-center text-gray-600">Cargando datos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar title="Gestión de Viajes" icon={MapPin} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <MapPin className="text-green-600" />
              Crear Nuevo Viaje
            </h2>

            <div className="space-y-4">
              <Select
                label="Placa del Carro"
                value={formData.carro}
                onChange={(e) => setFormData({ ...formData, carro: e.target.value })}
                required
              >
                <option value="">Selecciona un carro</option>
                {carros.map((carro, index) => (
                  <option key={index} value={carro.id}>
                    {carro.placa} - {carro.color}
                  </option>
                ))}
              </Select>

              <Select
                label="Ciudad Origen"
                value={formData.ciudad_origen}
                onChange={(e) => setFormData({ ...formData, ciudad_origen: e.target.value })}
                required
              >
                <option value="">Selecciona ciudad de origen</option>
                {ciudades
                  .filter(ciudad => ciudad.activo)
                  .map((ciudad, index) => (
                    <option key={index} value={ciudad.id}>
                      {ciudad.nombre}
                    </option>
                  ))}
              </Select>

              <Select
                label="Ciudad Destino"
                value={formData.ciudad_destino}
                onChange={(e) => setFormData({ ...formData, ciudad_destino: e.target.value })}
                required
              >
                <option value="">Selecciona ciudad de destino</option>
                {ciudades
                  .filter(ciudad => ciudad.activo && ciudad.id !== formData.ciudad_origen)
                  .map((ciudad, index) => (
                    <option key={index} value={ciudad.id}>
                      {ciudad.nombre}
                    </option>
                  ))}
              </Select>

              <Input
                label="Tiempo (horas)"
                type="number"
                min="0.1"
                step="0.1"
                placeholder="Ej: 5.5"
                value={formData.tiempo_horas}
                onChange={(e) => setFormData({ ...formData, tiempo_horas: e.target.value })}
                required
              />

              <Input
                label="Fecha"
                type="date"
                value={formData.fecha}
                onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                required
              />

              {error && <Alert variant="error">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}

              <Button onClick={handleCreateViaje} className="w-full">Crear Viaje</Button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">Buscar Viajes por Placa</h2>

            <div className="mb-6">
              <div className="flex gap-2">
                <div className="flex-1">
                  <Select
                    value={searchPlaca}
                    onChange={(e) => setSearchPlaca(e.target.value)}
                  >
                    <option value="">Selecciona una placa</option>
                    {carros.map((carro, index) => (
                      <option key={index} value={carro.placa}>
                        {carro.placa} - {carro.color}
                      </option>
                    ))}
                  </Select>
                </div>
                <Button onClick={handleSearch}>
                  <Search size={18} />
                </Button>
              </div>
            </div>

            {viajes.length === 0 ? (
              <p className="text-gray-600">No hay viajes para mostrar</p>
            ) : (
              <div className="space-y-3">
                {viajes.map((viaje, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <h3 className="font-bold">{ciudades.find(ciudad => ciudad.id === viaje.ciudad_origen)?.nombre} → {ciudades.find(ciudad => ciudad.id === viaje.ciudad_destino)?.nombre}</h3>
                    <p className="text-gray-600">Carro: {carros.find(carro => carro.id === viaje.carro)?.placa}</p>
                    <p className="text-sm text-gray-500">Duración: {viaje.tiempo_horas}h</p>
                    <p className="text-sm text-gray-500">Fecha: {viaje.fecha}</p>
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


export default ViajesPage;