'use client'

import { useState, useEffect } from 'react';

const AdminPage = () => {
  const [items, setItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [newItem, setNewItem] = useState({ name: '', value: '', description: '' });
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchItems = async () => {
        const res = await fetch('https://delivery-rough-field-5633.fly.dev/items');
        const data = await res.json();
        setItems(data);
      };

      const fetchOrders = async () => {
        const res = await fetch('https://delivery-rough-field-5633.fly.dev/orders');
        const data = await res.json();
        setOrders(data);
      };

      fetchItems();
      fetchOrders();
    }
  }, [isAuthenticated]);

  const deleteItem = async (idItem) => {
    await fetch(`https://delivery-rough-field-5633.fly.dev/items/${idItem}`, { method: 'DELETE' });
    setItems(items.filter(item => item.idItem !== idItem));
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === '1234') {
      setIsAuthenticated(true);
    } else {
      alert('Senha incorreta!');
    }
  };

  const handleNewItemChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const handleNewItemSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('https://delivery-rough-field-5633.fly.dev/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem),
    });
    const data = await res.json();
    setItems([...items, data]);
    setNewItem({ name: '', value: '', description: '' });
  };

  const handleEditItemChange = (e) => {
    const { name, value } = e.target;
    setEditingItem({ ...editingItem, [name]: value });
  };

  const handleEditItemSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`https://delivery-rough-field-5633.fly.dev/items/${editingItem.idItem}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editingItem),
    });
    const data = await res.json();
    setItems(items.map(item => (item.idItem === data.idItem ? data : item)));
    setEditingItem(null);
  };

  const getOrderDetails = (order) => {
    return order.itemIds.map((itemId, index) => {
      const item = items.find(item => item.idItem === itemId);
      const quantity = order.quantities[index];
      return item ? `${item.name} (${quantity}x)` : 'Item desconhecido';
    }).join(', ');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 flex items-center justify-center">
        <form onSubmit={handlePasswordSubmit} className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Digite a senha</h2>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200">Entrar</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-orange-600 mb-2">Admin - Gerenciar Itens</h1>
        </header>

        <form onSubmit={handleNewItemSubmit} className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-bold mb-4">Adicionar Novo Item</h2>
          <input
            type="text"
            name="name"
            value={newItem.name}
            onChange={handleNewItemChange}
            placeholder="Nome do Item"
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <input
            type="number"
            name="value"
            value={newItem.value}
            onChange={handleNewItemChange}
            placeholder="Valor do Item"
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <textarea
            name="description"
            value={newItem.description}
            onChange={handleNewItemChange}
            placeholder="Descrição do Item"
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors duration-200">Adicionar</button>
        </form>

        {editingItem && (
          <form onSubmit={handleEditItemSubmit} className="bg-white p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-bold mb-4">Editar Item</h2>
            <input
              type="text"
              name="name"
              value={editingItem.name}
              onChange={handleEditItemChange}
              placeholder="Nome do Item"
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <input
              type="number"
              name="value"
              value={editingItem.value}
              onChange={handleEditItemChange}
              placeholder="Valor do Item"
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <textarea
              name="description"
              value={editingItem.description}
              onChange={handleEditItemChange}
              placeholder="Descrição do Item"
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <button type="submit" className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition-colors duration-200">Salvar</button>
          </form>
        )}

        <div className="items-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(item => (
            <div key={item.idItem} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{item.name}</h2>
              <p className="text-gray-600 mb-4">{item.description}</p>
              <p className="text-gray-800 font-bold mb-4">R$ {item.value.toFixed(2)}</p>
              <button onClick={() => setEditingItem(item)} className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition-colors duration-200 mb-2">Editar</button>
              <button onClick={() => deleteItem(item.idItem)} className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors duration-200">Deletar</button>
            </div>
          ))}
        </div>

        <header className="text-center mt-12 mb-12">
          <h1 className="text-4xl font-bold text-orange-600 mb-2">Pedidos Recentes</h1>
        </header>

        <div className="orders-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map(order => (
            <div key={order.idOrder} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden transform transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-orange-600">Pedido #{order.idOrder.slice(0, 8)}</h2>
                  <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-semibold">R$ {order.totalValue.toFixed(2)}</span>
                </div>
                <div className="space-y-4">
                  <div className="border-t border-gray-200 pt-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Itens do Pedido</h3>
                    <p className="text-gray-600">{getOrderDetails(order)}</p>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Endereço de Entrega</h3>
                    <div className="text-gray-600 space-y-1">
                      <p className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {order.street}, {order.number}
                      </p>
                      <p className="ml-6">{order.district}, {order.city}</p>
                    </div>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Detalhes do Cliente</h3>
                    <div className="text-gray-600 space-y-1">
                      <p className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        {order.clientName}
                      </p>
                      <p className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        {order.clientPhone}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;