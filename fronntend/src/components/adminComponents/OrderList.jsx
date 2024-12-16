import React from 'react';

const orders = [
  { id: 1, customer: 'John Doe', date: '2023-06-01', total: 199.99, status: 'Delivered' },
  { id: 2, customer: 'Jane Smith', date: '2023-06-02', total: 149.99, status: 'Processing' },
  { id: 3, customer: 'Bob Johnson', date: '2023-06-03', total: 99.99, status: 'Shipped' },
  { id: 4, customer: 'Alice Brown', date: '2023-06-04', total: 299.99, status: 'Pending' },
  { id: 5, customer: 'Charlie Davis', date: '2023-06-05', total: 79.99, status: 'Delivered' },
];

function OrderList() {
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">Orders</h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Date
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Total
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">#{order.id}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">{order.customer}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">{order.date}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">${order.total}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <span className={`relative inline-block px-3 py-1 font-semibold leading-tight ${
                    order.status === 'Delivered' ? 'text-green-900' :
                    order.status === 'Shipped' ? 'text-blue-900' :
                    order.status === 'Processing' ? 'text-yellow-900' : 'text-red-900'
                  }`}>
                    <span aria-hidden className={`absolute inset-0 opacity-50 rounded-full ${
                      order.status === 'Delivered' ? 'bg-green-200' :
                      order.status === 'Shipped' ? 'bg-blue-200' :
                      order.status === 'Processing' ? 'bg-yellow-200' : 'bg-red-200'
                    }`}></span>
                    <span className="relative">{order.status}</span>
                  </span>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <button className="text-indigo-600 hover:text-indigo-900">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderList;
