"use client"

import React, { useEffect, useState } from 'react';

const ItemsPage = () => {
    const [items, setItems] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            const res = await fetch('https://delivery-rough-field-5633.fly.dev/items');
            const data = await res.json();
            console.log(data);
            setItems(data);
        };
        fetchItems();
        setCart(JSON.parse(localStorage.getItem('cart')) || []);
    }, []);

    const increment = (item) => {
        const newCart = [...cart];
        const itemIndex = newCart.findIndex((cartItem) => cartItem.idItem === item.idItem);

        if (itemIndex === -1) {
            newCart.push({ ...item, quantity: 1 });
        } else {
            newCart[itemIndex].quantity += 1;
        }

        setCart(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
    };

    const decrement = (item) => {
        const newCart = [...cart];
        const itemIndex = newCart.findIndex((cartItem) => cartItem.idItem === item.idItem);

        if (itemIndex !== -1) {
            newCart[itemIndex].quantity = Math.max(newCart[itemIndex].quantity - 1, 0);
            if (newCart[itemIndex].quantity === 0) {
                newCart.splice(itemIndex, 1);
            }
            setCart(newCart);
            localStorage.setItem('cart', JSON.stringify(newCart));
        }
    };

    const getQuantity = (item) => {
        const cartItem = cart.find(cartItem => cartItem.idItem === item.idItem);
        return cartItem ? cartItem.quantity : 0;
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100">
            <div className="container mx-auto px-4 py-8">
                <header className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-orange-600 mb-2">Delicious Java</h1>
                    <p className="text-gray-600 text-lg">Sabores que programam felicidade</p>
                </header>
                <button
                    onClick={() => window.location.href = '/cart'}
                    className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-600"
                >
                    Ir para o Carrinho
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map(item => (
                        <div
                            key={item.idItem}
                            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="p-6">
                                <h2 className="text-xl font-semibold text-gray-800 mb-2">{item.name}</h2>
                                <p className="text-gray-600 mb-4 h-20">{item.description}</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-2xl font-bold text-orange-600">
                                        R$ {item.value.toFixed(2)}
                                    </span>
                                    <div className="flex items-center">
                                        <button
                                            onClick={() => decrement(item)}
                                            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded-l-lg transition-colors duration-200"
                                        >
                                            -
                                        </button>
                                        <span className="px-4">{getQuantity(item)}</span>
                                        <button
                                            onClick={() => increment(item)}
                                            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-3 rounded-r-lg transition-colors duration-200"
                                        >
                                            +
                                        </button>
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

export default ItemsPage;
