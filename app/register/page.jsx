'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleRegister = async () => {
    const user = { name, telefone: phone, cpf, password };

    const response = await fetch('https://delivery-rough-field-5633.fly.dev/clients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });

    const data = await response.json();
    localStorage.setItem('userId', data.idClient);
    alert('Conta criada com sucesso!');
    router.push('/cart');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-amber-100 to-orange-100 py-12 px-4 sm:px-6 lg:px-8 transition-all duration-300">
      <div className="max-w-md mx-auto space-y-8">
        <header className="text-center transform transition-all duration-500 hover:scale-105">
          <h1 className="text-4xl font-extrabold text-orange-600 mb-2 tracking-tight">
            Crie sua Conta
          </h1>
          <p className="text-gray-600 text-lg font-medium">
            Junte-se a nós para uma experiência deliciosa
          </p>
        </header>

        <form 
          onSubmit={(e) => { e.preventDefault(); handleRegister(); }} 
          className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] 
            space-y-6 transform transition-all duration-500 hover:shadow-[0_20px_50px_rgb(0,0,0,0.12)]"
        >
          <div className="space-y-4">
            <div className="group">
              <label className="block text-gray-700 font-medium mb-2 transition-colors group-hover:text-orange-600">
                Nome
              </label>
              <input 
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 
                  focus:border-orange-400 focus:ring-2 focus:ring-orange-200 
                  transition-all duration-300 outline-none
                  transform hover:translate-x-1"
              />
            </div>

            <div className="group">
              <label className="block text-gray-700 font-medium mb-2 transition-colors group-hover:text-orange-600">
                Telefone
              </label>
              <input 
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 
                  focus:border-orange-400 focus:ring-2 focus:ring-orange-200 
                  transition-all duration-300 outline-none
                  transform hover:translate-x-1"
              />
            </div>

            <div className="group">
              <label className="block text-gray-700 font-medium mb-2 transition-colors group-hover:text-orange-600">
                CPF
              </label>
              <input 
                type="text"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 
                  focus:border-orange-400 focus:ring-2 focus:ring-orange-200 
                  transition-all duration-300 outline-none
                  transform hover:translate-x-1"
              />
            </div>

            <div className="group">
              <label className="block text-gray-700 font-medium mb-2 transition-colors group-hover:text-orange-600">
                Senha
              </label>
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 
                  focus:border-orange-400 focus:ring-2 focus:ring-orange-200 
                  transition-all duration-300 outline-none
                  transform hover:translate-x-1"
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 
              text-white font-bold py-3 rounded-lg
              transform transition-all duration-300
              hover:from-orange-600 hover:to-orange-700
              hover:scale-[1.02] hover:shadow-lg
              focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2
              active:scale-95"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
