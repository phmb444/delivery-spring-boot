'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [address, setAddress] = useState({
    street: '',
    number: '',
    district: '',
    city: '',
  });
  const router = useRouter();

  useEffect(() => {
    const cart = localStorage.getItem('cart');
    if (cart) {
      setCart(JSON.parse(cart));
    }
  }, []);
  
  const getTotal = () => {
    return cart.reduce((total, item) => total + item.value * item.quantity, 0);
  };

  const handleInputChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const finalizeOrder = () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      router.push('/register');
    } else {
      setIsModalOpen(true);
    }
  };

  const submitOrder = async () => {
    const userId = localStorage.getItem('userId');
    const order = {
      userId,
      itemIds: cart.map(item => item.idItem),
      quantities: cart.map(item => item.quantity),
      ...address,
    };

    const response = await fetch('https://delivery-rough-field-5633.fly.dev/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order),
    });

    if (response.ok) {
      alert('Pedido realizado com sucesso!');
      localStorage.removeItem('cart');
      router.push('/orders');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-orange-600 mb-2">Carrinho de Compras</h1>
        </header>
        <div className="cart-items grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cart.map(item => (
            <div key={item.idItem} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <p className="text-gray-800 font-semibold">{item.name} - R$ {item.value.toFixed(2)} x {item.quantity}</p>
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-bold text-orange-600 mt-8">Total: R$ {getTotal().toFixed(2)}</h2>
        <button onClick={finalizeOrder} className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition-colors duration-200 mt-4">Finalizar Pedido</button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl mb-4">Endereço de Entrega</h2>
            <input
              type="text"
              name="street"
              placeholder="Rua"
              value={address.street}
              onChange={handleInputChange}
              className="w-full mb-2 p-2 border"
            />
            <input
              type="text"
              name="number"
              placeholder="Número"
              value={address.number}
              onChange={handleInputChange}
              className="w-full mb-2 p-2 border"
            />
            <input
              type="text"
              name="district"
              placeholder="Bairro"
              value={address.district}
              onChange={handleInputChange}
              className="w-full mb-2 p-2 border"
            />
            <input
              type="text"
              name="city"
              placeholder="Cidade"
              value={address.city}
              onChange={handleInputChange}
              className="w-full mb-4 p-2 border"
            />
            <button onClick={submitOrder} className="bg-orange-600 text-white px-4 py-2 rounded">Confirmar</button>
            <button onClick={() => setIsModalOpen(false)} className="ml-2 bg-gray-300 px-4 py-2 rounded">Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
