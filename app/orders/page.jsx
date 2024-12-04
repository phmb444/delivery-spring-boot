'use client'

import { useEffect, useState } from 'react';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch('https://delivery-rough-field-5633.fly.dev/items');
        const data = await res.json();
        setItems(data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };
    fetchItems();
  }, []);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const fetchOrders = async () => {
      try {
        const res = await fetch(`https://delivery-rough-field-5633.fly.dev/orders?userId=${userId}`);
        const data = await res.json();
        const userOrders = data.filter(order => order.userId === userId);
        setOrders(userOrders);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const getOrderDetails = (order) => {
    return order.itemIds.map((itemId, index) => {
      const item = items.find(item => item.idItem === itemId);
      const quantity = order.quantities[index];
      return item ? `${item.name} (${quantity}x)` : 'Item desconhecido';
    }).join(', ');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-32 w-32 rounded-full border-4 border-orange-500 border-t-transparent animate-spin"></div>
          <p className="mt-4 text-orange-600 text-lg font-medium">Carregando seus pedidos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12 transform transition-all duration-500 hover:scale-105">
          <h1 className="text-4xl font-extrabold text-orange-600 mb-3">
            Meus Pedidos
          </h1>
          <p className="text-gray-600 text-lg font-medium">
            Acompanhe seu histórico de sabores
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {orders.map(order => (
            <div 
              key={order.idOrder}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden
                transform transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-orange-600">
                    Pedido #{order.idOrder.slice(0, 8)}
                  </h2>
                  <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-semibold">
                    R$ {order.totalValue.toFixed(2)}
                  </span>
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

        {orders.length === 0 && (
          <div className="text-center py-12">
            <div className="text-orange-600 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900">Nenhum pedido encontrado</h3>
            <p className="mt-2 text-gray-600">Faça seu primeiro pedido e acompanhe-o aqui!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;