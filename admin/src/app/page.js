'use client';
import { useState, useEffect, useMemo } from 'react';
import { api } from '@/utils/api';
import { Search, Edit2, ChevronDown, X, Filter } from 'lucide-react';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [balances, setBalances] = useState({
    totalBalance: 0,
    bitcoin: 0,
    ethereum: 0,
    ripple: 0,
    stellar: 0,
    hedera: 0,
  });
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    status: 'all',
    balanceRange: 'all'
  });
  const [fundingData, setFundingData] = useState({
    amount: 0,
    currency: 'USD'
  });
  const [isFunding, setIsFunding] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showDesktopFilters, setShowDesktopFilters] = useState(false);
  const [activeModalTab, setActiveModalTab] = useState('fund');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await api.getAllUsers();
      setUsers(response.users);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    // Map existing user.balances array (with currency symbols) to local state fields
    const getAmt = (sym) => Number(user.balances?.find((b) => b.currency === sym)?.amount || 0);
    setBalances({
      totalBalance: user.totalBalance || 0,
      bitcoin: getAmt('BTC'),
      ethereum: getAmt('ETH'),
      ripple: getAmt('XRP'),
      stellar: getAmt('XLM'),
      hedera: getAmt('HBAR'),
    });
    setIsEditing(true);
  };

  const handleBalanceUpdate = async () => {
    try {
      setIsUpdating(true);
      await api.updateUserBalances(selectedUser.id, balances);
      setIsEditing(false);
      fetchUsers(); // Refresh user list
    } catch (error) {
      console.error('Failed to update balances:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleFundUser = async () => {
    try {
      setIsFunding(true);
      await api.fundUser(selectedUser.id, fundingData);
      setIsEditing(false);
      fetchUsers();
    } catch (error) {
      console.error('Failed to fund user:', error);
    } finally {
      setIsFunding(false);
    }
  };

  const applyFilters = (users) => {
    return users.filter(user => {
      const matchesSearch = user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.username.toLowerCase().includes(search.toLowerCase());

      const matchesStatus = filters.status === 'all' ? true :
        filters.status === 'verified' ? user.isVerified :
        !user.isVerified;

      const matchesBalance = filters.balanceRange === 'all' ? true :
        filters.balanceRange === 'high' ? (user.totalBalance || 0) > 10000 :
        filters.balanceRange === 'medium' ? (user.totalBalance || 0) > 1000 && (user.totalBalance || 0) <= 10000 :
        (user.totalBalance || 0) <= 1000;

      return matchesSearch && matchesStatus && matchesBalance;
    });
  };

  const filteredUsers = applyFilters(users);

  const stats = useMemo(() => {
    const totalUsers = users.length;
    const verifiedUsers = users.filter(u => u.isVerified).length;
    const totalBalance = users.reduce((sum, u) => sum + (u.balances?.reduce((s, b) => s + b.amount, 0) || 0), 0);
    const avgBalance = totalUsers ? totalBalance / totalUsers : 0;
    return { totalUsers, verifiedUsers, totalBalance, avgBalance };
  }, [users]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">User Management</h1>
          {/* Desktop search and filters */}
          <div className="hidden md:flex items-center gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 pl-10 focus:outline-none focus:border-blue-500 min-w-72"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <button
              onClick={() => setShowDesktopFilters((v) => !v)}
              className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-200"
            >
              <Filter size={16} />
              Filters
              <ChevronDown size={14} className={`transition-transform ${showDesktopFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>

        {/* Desktop Filters Panel */}
        {showDesktopFilters && (
          <div className="hidden md:block bg-gray-800/60 border border-gray-700 rounded-xl p-4 mb-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-400 block mb-2">Status</label>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2"
                >
                  <option value="all">All Users</option>
                  <option value="verified">Verified Only</option>
                  <option value="unverified">Unverified Only</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-400 block mb-2">Balance Range</label>
                <select
                  value={filters.balanceRange}
                  onChange={(e) => setFilters(prev => ({ ...prev, balanceRange: e.target.value }))}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2"
                >
                  <option value="all">All Balances</option>
                  <option value="high">High Balance ($10,000+)</option>
                  <option value="medium">Medium Balance ($1,000-$10,000)</option>
                  <option value="low">Low Balance ($1,000)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-800/70 border border-gray-700 rounded-xl p-4">
            <div className="text-sm text-gray-400">Total Users</div>
            <div className="mt-1 text-2xl font-semibold">{loading ? '—' : stats.totalUsers}</div>
          </div>
          <div className="bg-gray-800/70 border border-gray-700 rounded-xl p-4">
            <div className="text-sm text-gray-400">Verified Users</div>
            <div className="mt-1 text-2xl font-semibold">{loading ? '—' : stats.verifiedUsers}</div>
          </div>
          <div className="bg-gray-800/70 border border-gray-700 rounded-xl p-4">
            <div className="text-sm text-gray-400">Total Balance</div>
            <div className="mt-1 text-2xl font-semibold">{loading ? '—' : `$${stats.totalBalance.toLocaleString(undefined, { maximumFractionDigits: 2 })}`}</div>
          </div>
          <div className="bg-gray-800/70 border border-gray-700 rounded-xl p-4">
            <div className="text-sm text-gray-400">Avg. Balance</div>
            <div className="mt-1 text-2xl font-semibold">{loading ? '—' : `$${stats.avgBalance.toLocaleString(undefined, { maximumFractionDigits: 2 })}`}</div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-900/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Total Balance</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {loading ? (
                  Array.from({ length: 6 }).map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-full bg-gray-700" />
                          <div>
                            <div className="h-4 w-32 bg-gray-700 rounded mb-2" />
                            <div className="h-3 w-24 bg-gray-800 rounded" />
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="h-4 w-48 bg-gray-700 rounded" />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="h-4 w-24 bg-gray-700 rounded" />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="h-8 w-28 bg-gray-700 rounded" />
                      </td>
                    </tr>
                  ))
                ) : filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-gray-400">
                      No users found. Try adjusting your search or filters.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map(user => (
                    <tr key={user.id} className="hover:bg-gray-700/50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-gray-600 flex items-center justify-center">
                            {user.username.charAt(0).toUpperCase()}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium">{user.username}</div>
                            <div className="text-sm text-gray-400">{user.firstName} {user.lastName}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">$
{`${user.balances.reduce((sum, b) => sum + b.amount, 0).toFixed(2)}`}
</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => handleUserSelect(user)}
                          className="text-blue-400 hover:text-blue-300 flex items-center gap-2"
                        >
                          <Edit2 size={16} />
                          Edit Balances
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Floating Action Button (Mobile Only) */}
        <button
          onClick={() => setIsSearchModalOpen(true)}
          className="fixed right-4 bottom-4 md:hidden bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4 shadow-lg"
        >
          <Search size={24} />
        </button>

        {/* Search Modal (Mobile Only) */}
        {isSearchModalOpen && (
          <div className="fixed inset-0 bg-black/90 z-50 md:hidden">
            <div className="flex flex-col h-full">
              <div className="p-4 border-b border-gray-800">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsSearchModalOpen(false)}
                    className="p-2 hover:bg-gray-800 rounded-lg"
                  >
                    <X size={24} />
                  </button>
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                    autoFocus
                  />
                </div>
              </div>

              <div className="p-4 flex-1 overflow-auto">
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="text-sm text-gray-400 block mb-2">Status</label>
                    <select
                      value={filters.status}
                      onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2"
                    >
                      <option value="all">All Users</option>
                      <option value="verified">Verified Only</option>
                      <option value="unverified">Unverified Only</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm text-gray-400 block mb-2">Balance Range</label>
                    <select
                      value={filters.balanceRange}
                      onChange={(e) => setFilters(prev => ({ ...prev, balanceRange: e.target.value }))}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2"
                    >
                      <option value="all">All Balances</option>
                      <option value="high">High Balance ($10,000)</option>
                      <option value="medium">Medium Balance ($1,000-$10,000)</option>
                      <option value="low">Low Balance ($1,000)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  {filteredUsers.map(user => (
                    <div
                      key={user.id}
                      className="bg-gray-800 rounded-lg p-4"
                      onClick={() => {
                        handleUserSelect(user);
                        setIsSearchModalOpen(false);
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center">
                          {user.username.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-medium">{user.username}</div>
                          <div className="text-sm text-gray-400">{user.email}</div>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center justify-between text-sm">
                        <span className="text-gray-400">Balance: ${user.totalBalance?.toLocaleString() || '0'}</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          user.isVerified ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {user.isVerified ? 'Verified' : 'Unverified'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Balance Modal */}
        {isEditing && selectedUser && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 overflow-y-auto py-6"
            onClick={() => setIsEditing(false)}
          >
            <div
              className="bg-gray-800 rounded-2xl p-6 w-full max-w-md m-4 shadow-2xl border border-gray-700 max-h-[85vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="edit-user-balances-title"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 id="edit-user-balances-title" className="text-xl font-semibold">
                  Edit: {selectedUser.username}
                </h3>
                <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-white">
                  <X size={24} />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex items-center gap-2 mb-6">
                <button
                  onClick={() => setActiveModalTab('fund')}
                  className={`px-3 py-2 rounded-lg text-sm border ${
                    activeModalTab === 'fund'
                      ? 'bg-blue-600 border-blue-500 text-white'
                      : 'bg-gray-900 border-gray-700 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  Fund User
                </button>
                <button
                  onClick={() => setActiveModalTab('balances')}
                  className={`px-3 py-2 rounded-lg text-sm border ${
                    activeModalTab === 'balances'
                      ? 'bg-blue-600 border-blue-500 text-white'
                      : 'bg-gray-900 border-gray-700 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  Crypto Balances
                </button>
              </div>

              {activeModalTab === 'fund' ? (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-400">Amount</label>
                    <div className="mt-1 flex items-stretch gap-2">
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={fundingData.amount}
                        onChange={(e) => setFundingData(prev => ({ ...prev, amount: parseFloat(e.target.value) || 0 }))}
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2"
                      />
                      <select
                        value={fundingData.currency}
                        onChange={(e) => setFundingData(prev => ({ ...prev, currency: e.target.value }))}
                        className="bg-gray-900 border border-gray-700 rounded-lg px-3 text-sm"
                      >
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                      </select>
                    </div>
                    <div className="mt-2 flex gap-2">
                      {[100, 500, 1000].map(v => (
                        <button
                          key={v}
                          onClick={() => setFundingData(prev => ({ ...prev, amount: v }))}
                          className="px-3 py-1.5 text-xs rounded-full bg-gray-900 border border-gray-700 text-gray-300 hover:bg-gray-700"
                          type="button"
                        >
                          +{v}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handleFundUser}
                    disabled={isFunding || fundingData.amount <= 0}
                    className="w-full bg-green-500 hover:bg-green-600 disabled:bg-green-500/50 disabled:cursor-not-allowed text-white rounded-lg px-4 py-2"
                  >
                    {isFunding ? 'Processing...' : `Fund ${selectedUser.username}`}
                  </button>
                  <p className="text-xs text-gray-400">
                    This action credits the user's account with the selected currency.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-400">Total Balance</label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={balances.totalBalance}
                        onChange={(e) => setBalances(prev => ({ ...prev, totalBalance: parseFloat(e.target.value) || 0 }))}
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 mt-1"
                      />
                    </div>
                    <div className="self-end text-xs text-gray-400">
                      Current: ${selectedUser.totalBalance?.toLocaleString() || '0'}
                    </div>

                    <div>
                      <label className="text-sm text-gray-400">Bitcoin (BTC)</label>
                      <input
                        type="number"
                        step="0.00000001"
                        min="0"
                        value={balances.bitcoin}
                        onChange={(e) => setBalances(prev => ({ ...prev, bitcoin: parseFloat(e.target.value) || 0 }))}
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 mt-1"
                      />
                    </div>

                    <div>
                      <label className="text-sm text-gray-400">Ethereum (ETH)</label>
                      <input
                        type="number"
                        step="0.00000001"
                        min="0"
                        value={balances.ethereum}
                        onChange={(e) => setBalances(prev => ({ ...prev, ethereum: parseFloat(e.target.value) || 0 }))}
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 mt-1"
                      />
                    </div>

                    <div>
                      <label className="text-sm text-gray-400">Ripple (XRP)</label>
                      <input
                        type="number"
                        step="0.000001"
                        min="0"
                        value={balances.ripple}
                        onChange={(e) => setBalances(prev => ({ ...prev, ripple: parseFloat(e.target.value) || 0 }))}
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 mt-1"
                      />
                    </div>

                    <div>
                      <label className="text-sm text-gray-400">Stellar (XLM)</label>
                      <input
                        type="number"
                        step="0.000001"
                        min="0"
                        value={balances.stellar}
                        onChange={(e) => setBalances(prev => ({ ...prev, stellar: parseFloat(e.target.value) || 0 }))}
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 mt-1"
                      />
                    </div>

                    <div>
                      <label className="text-sm text-gray-400">Hedera (HBAR)</label>
                      <input
                        type="number"
                        step="0.000001"
                        min="0"
                        value={balances.hedera}
                        onChange={(e) => setBalances(prev => ({ ...prev, hedera: parseFloat(e.target.value) || 0 }))}
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 mt-1"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>
                      Crypto sum: {(Number(balances.bitcoin) + Number(balances.ethereum) + Number(balances.ripple) + Number(balances.stellar) + Number(balances.hedera)).toLocaleString(undefined, { maximumFractionDigits: 8 })}
                    </span>
                    <span>
                      Set Total Balance to reflect any fiat or non-crypto amounts.
                    </span>
                  </div>

                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="w-1/2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg px-4 py-2"
                      type="button"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleBalanceUpdate}
                      disabled={isUpdating}
                      className="w-1/2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 disabled:cursor-not-allowed text-white rounded-lg px-4 py-2"
                    >
                      {isUpdating ? 'Updating...' : 'Save Balances'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}