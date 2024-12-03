import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const API_URL = 'http://localhost:3306/users/register'; // Substitua pelo endpoint correto do backend

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, { username, password });
      navigate('/'); // Redireciona para a tela de login após o registro
    } catch (err) {
      console.error('Erro ao criar usuário:', err);
      setError('Falha ao criar usuário. Verifique as informações e tente novamente.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-l from-purple-500 via-purple-300 to-white flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg w-96 p-6">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-4">Registrar-se</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 font-bold mb-2">
              Usuário:
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-gray-700"
              placeholder="Digite seu usuário"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
              Senha:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-gray-700"
              placeholder="Digite sua senha"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
          >
            Registrar
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Já tem uma conta?{' '}
          <button
            onClick={() => navigate('/')}
            className="text-blue-500 underline"
          >
            Faça login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
