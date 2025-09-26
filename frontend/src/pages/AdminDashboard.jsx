import React, { useEffect, useState } from 'react';
import API from '../api/axios';


export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [txs, setTxs] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingTxs, setLoadingTxs] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res1 = await API.get('/admin/users');
        setUsers(res1.data.users || []);
        setLoadingUsers(false);

        const res2 = await API.get('/admin/transactions');
        setTxs(res2.data.transactions || []);
        setLoadingTxs(false);
      } catch (err) {
        console.error(err);
        setLoadingUsers(false);
        setLoadingTxs(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 px-6 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-indigo-700">Admin Dashboard</h2>
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
          Manage users and transactions efficiently with a clean and intuitive interface.
        </p>
      </div>

      {/* Users Section */}
      <div className="mb-12">
        <h3 className="text-2xl font-semibold text-indigo-600 mb-6">👥 Users</h3>
        {loadingUsers ? (
          <p className="text-gray-500">Loading users...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map(u => (
              <div
                key={u._id}
                className="bg-white rounded-2xl shadow-md p-5 hover:shadow-xl transition transform hover:-translate-y-1 border-l-4 border-indigo-400"
              >
                <p className="text-gray-800 font-semibold truncate">
                  {u.email} <span className="text-indigo-500 text-sm font-medium">({u.role || 'user'})</span>
                </p>
                <p className="text-gray-600 mt-1">Wallet: ₹{u.wallet || 0}</p>
                <p className="mt-2 text-sm">
                  <span className="font-semibold">KYC:</span>{" "}
                  {u.kyc ? (
                    <span className="text-green-600">Yes ({u.kyc.fullName || u.kyc.name})</span>
                  ) : (
                    <span className="text-red-500">No</span>
                  )}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Transactions Section */}
      <div>
        <h3 className="text-2xl font-semibold text-indigo-600 mb-6">💰 Transactions</h3>
        {loadingTxs ? (
          <p className="text-gray-500">Loading transactions...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-2xl shadow-md border border-gray-200">
              <thead>
                <tr className="bg-indigo-200 text-indigo-800 text-left">
                  <th className="px-4 py-3 rounded-tl-2xl">User</th>
                  <th className="px-4 py-3">Product</th>
                  <th className="px-4 py-3">Units</th>
                  <th className="px-4 py-3">Total</th>
                  <th className="px-4 py-3 rounded-tr-2xl">Date</th>
                </tr>
              </thead>
              <tbody>
                {txs.length > 0 ? (
                  txs.map(t => (
                    <tr key={t._id} className="border-b border-gray-200 hover:bg-indigo-50 transition">
                      <td className="px-4 py-3 text-gray-700">{t.user?.name || t.user?.email || 'Unknown'}</td>
                      <td className="px-4 py-3 text-gray-700">{t.product?.name || 'Unknown Product'}</td>
                      <td className="px-4 py-3 text-gray-700">{t.units || 0}</td>
                      <td className="px-4 py-3 text-gray-700">₹{t.total || 0}</td>
                      <td className="px-4 py-3 text-gray-700">{t.createdAt ? new Date(t.createdAt).toLocaleString() : 'N/A'}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-gray-500 italic">
                      No transactions yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
