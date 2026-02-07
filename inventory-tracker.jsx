import React, { useState, useEffect } from 'react';
import { Package, Lock, Unlock, Plus, Edit2, Trash2, Download, Search, Eye, EyeOff, Settings, X, Check, AlertTriangle } from 'lucide-react';

// Simple hash function for password (prototype only - use bcrypt in production)
const hashPassword = (password) => {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash.toString();
};

export default function InventoryTracker() {
  // State
  const [inventory, setInventory] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showSetupModal, setShowSetupModal] = useState(false);
  const [showItemModal, setShowItemModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showCost, setShowCost] = useState(false);
  const [changeLog, setChangeLog] = useState([]);

  // Form state for add/edit
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    bottleSize: '',
    numBoxes: '',
    perBox: '',
    sold: '',
    pricePerUnit: '',
    costPerUnit: ''
  });

  // Load data from LocalStorage on mount
  useEffect(() => {
    const savedInventory = localStorage.getItem('inventory_data');
    const savedPassword = localStorage.getItem('inventory_password');
    const savedLog = localStorage.getItem('inventory_changelog');

    if (savedInventory) {
      setInventory(JSON.parse(savedInventory));
    }
    if (savedLog) {
      setChangeLog(JSON.parse(savedLog));
    }
    if (!savedPassword) {
      setShowSetupModal(true);
    }
  }, []);

  // Save inventory to LocalStorage
  useEffect(() => {
    if (inventory.length > 0) {
      localStorage.setItem('inventory_data', JSON.stringify(inventory));
    }
  }, [inventory]);

  // Save change log
  useEffect(() => {
    if (changeLog.length > 0) {
      localStorage.setItem('inventory_changelog', JSON.stringify(changeLog));
    }
  }, [changeLog]);

  // Add log entry
  const addLogEntry = (action, itemName, details = '') => {
    const entry = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      action,
      itemName,
      details
    };
    setChangeLog(prev => [entry, ...prev].slice(0, 100)); // Keep last 100 entries
  };

  // Setup password
  const handleSetupPassword = () => {
    if (newPassword.length < 4) {
      setError('Password must be at least 4 characters');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    localStorage.setItem('inventory_password', hashPassword(newPassword));
    setShowSetupModal(false);
    setIsAuthenticated(true);
    setNewPassword('');
    setConfirmPassword('');
    setError('');
  };

  // Login
  const handleLogin = () => {
    const savedPassword = localStorage.getItem('inventory_password');
    if (hashPassword(passwordInput) === savedPassword) {
      setIsAuthenticated(true);
      setShowPasswordModal(false);
      setPasswordInput('');
      setError('');
    } else {
      setError('Incorrect password');
    }
  };

  // Logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setShowCost(false);
  };

  // Calculate fields
  const calculateFields = (item) => {
    const totalUnits = (Number(item.numBoxes) || 0) * (Number(item.perBox) || 0);
    const remaining = totalUnits - (Number(item.sold) || 0);
    const expectedValue = (Number(item.sold) || 0) * (Number(item.pricePerUnit) || 0);
    const profit = isAuthenticated ? (Number(item.pricePerUnit) - Number(item.costPerUnit)) * Number(item.sold) : null;

    return { totalUnits, remaining, expectedValue, profit };
  };

  // Add/Edit item
  const handleSaveItem = () => {
    if (!formData.name.trim()) {
      setError('Product name is required');
      return;
    }

    const itemData = {
      ...formData,
      id: editingItem?.id || Date.now(),
      updatedAt: new Date().toISOString()
    };

    if (editingItem) {
      setInventory(prev => prev.map(item =>
        item.id === editingItem.id ? itemData : item
      ));
      addLogEntry('Updated', formData.name, `Modified item details`);
    } else {
      itemData.createdAt = new Date().toISOString();
      setInventory(prev => [...prev, itemData]);
      addLogEntry('Added', formData.name, `New item added to inventory`);
    }

    closeItemModal();
  };

  // Delete item
  const handleDeleteItem = (item) => {
    if (window.confirm(`Delete "${item.name}" from inventory?`)) {
      setInventory(prev => prev.filter(i => i.id !== item.id));
      addLogEntry('Deleted', item.name, 'Removed from inventory');
    }
  };

  // Open add modal
  const openAddModal = () => {
    setFormData({
      name: '',
      amount: '',
      bottleSize: '',
      numBoxes: '',
      perBox: '',
      sold: '0',
      pricePerUnit: '',
      costPerUnit: ''
    });
    setEditingItem(null);
    setShowItemModal(true);
    setError('');
  };

  // Open edit modal
  const openEditModal = (item) => {
    setFormData({ ...item });
    setEditingItem(item);
    setShowItemModal(true);
    setError('');
  };

  // Close item modal
  const closeItemModal = () => {
    setShowItemModal(false);
    setEditingItem(null);
    setError('');
  };

  // Export to Excel
  const exportToExcel = async () => {
    // Dynamically load SheetJS
    const XLSX = await import('https://cdn.sheetjs.com/xlsx-0.20.1/package/xlsx.mjs');

    const exportData = inventory.map(item => {
      const calc = calculateFields(item);
      const row = {
        'Name': item.name,
        'Initial Amount': item.amount,
        'Bottle Size': item.bottleSize,
        '# of Boxes': item.numBoxes,
        'Per Box': item.perBox,
        'Total Units': calc.totalUnits,
        'Sold': item.sold,
        'Remaining': calc.remaining,
        'Price/Unit': `$${Number(item.pricePerUnit).toFixed(2)}`,
        'Expected Value (Sold)': `$${calc.expectedValue.toFixed(2)}`,
        'Last Updated': new Date(item.updatedAt).toLocaleString()
      };

      // Include cost if authenticated and toggled
      if (isAuthenticated && showCost) {
        row['Cost/Unit'] = `$${Number(item.costPerUnit || 0).toFixed(2)}`;
        row['Profit (Sold)'] = `$${calc.profit?.toFixed(2) || '0.00'}`;
      }

      return row;
    });

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Inventory');

    // Add summary sheet
    const today = new Date();
    const summaryData = [{
      'Export Date': today.toLocaleDateString(),
      'Export Time': today.toLocaleTimeString(),
      'Total Products': inventory.length,
      'Total Units in Stock': inventory.reduce((sum, item) => sum + calculateFields(item).remaining, 0),
      'Total Expected Revenue': `$${inventory.reduce((sum, item) => sum + calculateFields(item).expectedValue, 0).toFixed(2)}`
    }];
    const summaryWs = XLSX.utils.json_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(wb, summaryWs, 'Daily Summary');

    // Generate filename with date
    const dateStr = today.toISOString().split('T')[0];
    XLSX.writeFile(wb, `inventory_${dateStr}.xlsx`);

    addLogEntry('Export', 'All Items', `Excel export generated for ${inventory.length} items`);
  };

  // Filter inventory
  const filteredInventory = inventory.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.bottleSize?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate totals
  const totals = inventory.reduce((acc, item) => {
    const calc = calculateFields(item);
    return {
      totalUnits: acc.totalUnits + calc.totalUnits,
      totalRemaining: acc.totalRemaining + calc.remaining,
      totalExpectedValue: acc.totalExpectedValue + calc.expectedValue,
      totalSold: acc.totalSold + Number(item.sold || 0)
    };
  }, { totalUnits: 0, totalRemaining: 0, totalExpectedValue: 0, totalSold: 0 });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Package className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Inventory Tracker</h1>
                <p className="text-sm text-gray-500">Daily Stock Management</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {isAuthenticated ? (
                <>
                  <button
                    onClick={() => setShowCost(!showCost)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition ${
                      showCost ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {showCost ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    Cost Data
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-200 transition"
                  >
                    <Unlock className="w-4 h-4" />
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setShowPasswordModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition"
                >
                  <Lock className="w-4 h-4" />
                  Unlock to Edit
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 mb-1">Total Products</p>
            <p className="text-2xl font-bold text-gray-900">{inventory.length}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 mb-1">Total Units</p>
            <p className="text-2xl font-bold text-gray-900">{totals.totalUnits.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 mb-1">Remaining Stock</p>
            <p className="text-2xl font-bold text-blue-600">{totals.totalRemaining.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 mb-1">Expected Revenue</p>
            <p className="text-2xl font-bold text-green-600">${totals.totalExpectedValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
          </div>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={exportToExcel}
              disabled={inventory.length === 0}
              className="flex items-center gap-2 px-4 py-2.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="w-4 h-4" />
              Export Excel
            </button>

            {isAuthenticated && (
              <button
                onClick={openAddModal}
                className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
              >
                <Plus className="w-4 h-4" />
                Add Item
              </button>
            )}
          </div>
        </div>

        {/* Inventory Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="text-center px-3 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Initial</th>
                  <th className="text-center px-3 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Size</th>
                  <th className="text-center px-3 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Boxes</th>
                  <th className="text-center px-3 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Per Box</th>
                  <th className="text-center px-3 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Total</th>
                  <th className="text-center px-3 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Sold</th>
                  <th className="text-center px-3 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Remaining</th>
                  <th className="text-right px-3 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
                  {isAuthenticated && showCost && (
                    <th className="text-right px-3 py-3 text-xs font-semibold text-amber-600 uppercase tracking-wider">Cost</th>
                  )}
                  <th className="text-right px-3 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Exp. Value</th>
                  {isAuthenticated && (
                    <th className="text-center px-3 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredInventory.length === 0 ? (
                  <tr>
                    <td colSpan={isAuthenticated ? 12 : 10} className="px-4 py-12 text-center text-gray-500">
                      {inventory.length === 0 ? (
                        <div>
                          <Package className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                          <p className="font-medium">No inventory items yet</p>
                          <p className="text-sm mt-1">
                            {isAuthenticated ? 'Click "Add Item" to get started' : 'Unlock to add items'}
                          </p>
                        </div>
                      ) : (
                        <p>No items match your search</p>
                      )}
                    </td>
                  </tr>
                ) : (
                  filteredInventory.map(item => {
                    const calc = calculateFields(item);
                    const isLowStock = calc.remaining < calc.totalUnits * 0.2;

                    return (
                      <tr key={item.id} className="hover:bg-gray-50 transition">
                        <td className="px-4 py-3">
                          <div className="font-medium text-gray-900">{item.name}</div>
                          <div className="text-xs text-gray-400">
                            Updated {new Date(item.updatedAt).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="text-center px-3 py-3 text-gray-600">{item.amount}</td>
                        <td className="text-center px-3 py-3 text-gray-600">{item.bottleSize}</td>
                        <td className="text-center px-3 py-3 text-gray-600">{item.numBoxes}</td>
                        <td className="text-center px-3 py-3 text-gray-600">{item.perBox}</td>
                        <td className="text-center px-3 py-3 font-medium text-gray-900">{calc.totalUnits}</td>
                        <td className="text-center px-3 py-3 text-gray-600">{item.sold}</td>
                        <td className="text-center px-3 py-3">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium ${
                            isLowStock ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                          }`}>
                            {isLowStock && <AlertTriangle className="w-3 h-3" />}
                            {calc.remaining}
                          </span>
                        </td>
                        <td className="text-right px-3 py-3 text-gray-900">${Number(item.pricePerUnit).toFixed(2)}</td>
                        {isAuthenticated && showCost && (
                          <td className="text-right px-3 py-3 text-amber-600 font-medium">
                            ${Number(item.costPerUnit || 0).toFixed(2)}
                          </td>
                        )}
                        <td className="text-right px-3 py-3 font-semibold text-green-600">
                          ${calc.expectedValue.toFixed(2)}
                        </td>
                        {isAuthenticated && (
                          <td className="text-center px-3 py-3">
                            <div className="flex items-center justify-center gap-1">
                              <button
                                onClick={() => openEditModal(item)}
                                className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteItem(item)}
                                className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        )}
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activity */}
        {changeLog.length > 0 && (
          <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Recent Activity</h3>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {changeLog.slice(0, 10).map(log => (
                <div key={log.id} className="flex items-center gap-3 text-sm">
                  <span className="text-gray-400 text-xs w-32 flex-shrink-0">
                    {new Date(log.timestamp).toLocaleString()}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                    log.action === 'Added' ? 'bg-green-100 text-green-700' :
                    log.action === 'Updated' ? 'bg-blue-100 text-blue-700' :
                    log.action === 'Deleted' ? 'bg-red-100 text-red-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {log.action}
                  </span>
                  <span className="text-gray-700 font-medium">{log.itemName}</span>
                  <span className="text-gray-400">{log.details}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Password Setup Modal */}
      {showSetupModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Settings className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Set Up Password</h2>
              <p className="text-gray-500 mt-2">Create a master password to protect inventory changes</p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter password"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Confirm password"
                />
              </div>
              <button
                onClick={handleSetupPassword}
                className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
              >
                Set Password
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Enter Password</h2>
                <p className="text-gray-500 mt-1">Unlock to add, edit, or delete items</p>
              </div>
              <button
                onClick={() => { setShowPasswordModal(false); setError(''); setPasswordInput(''); }}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter password"
                autoFocus
              />
              <button
                onClick={handleLogin}
                className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
              >
                Unlock
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Item Modal */}
      {showItemModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                {editingItem ? 'Edit Item' : 'Add New Item'}
              </h2>
              <button
                onClick={closeItemModal}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Olive Oil Premium"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Initial Amount</label>
                <input
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Starting quantity"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bottle Size</label>
                <input
                  type="text"
                  value={formData.bottleSize}
                  onChange={(e) => setFormData({ ...formData, bottleSize: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 500ml, 1L"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1"># of Boxes</label>
                <input
                  type="number"
                  value={formData.numBoxes}
                  onChange={(e) => setFormData({ ...formData, numBoxes: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Number of boxes"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Units Per Box</label>
                <input
                  type="number"
                  value={formData.perBox}
                  onChange={(e) => setFormData({ ...formData, perBox: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Bottles per box"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sold</label>
                <input
                  type="number"
                  value={formData.sold}
                  onChange={(e) => setFormData({ ...formData, sold: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Units sold"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price Per Unit ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.pricePerUnit}
                  onChange={(e) => setFormData({ ...formData, pricePerUnit: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Selling price"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-amber-700 mb-1">
                  Cost Per Unit ($) <span className="text-xs text-gray-400">— Admin only</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.costPerUnit}
                  onChange={(e) => setFormData({ ...formData, costPerUnit: e.target.value })}
                  className="w-full px-4 py-2.5 border border-amber-200 bg-amber-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Your cost (hidden from public view)"
                />
              </div>

              {/* Calculated Preview */}
              <div className="col-span-2 mt-2 p-4 bg-gray-50 rounded-lg">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Calculated Fields Preview</h4>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Total Units:</span>
                    <span className="ml-2 font-medium">
                      {(Number(formData.numBoxes) || 0) * (Number(formData.perBox) || 0)}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Remaining:</span>
                    <span className="ml-2 font-medium">
                      {((Number(formData.numBoxes) || 0) * (Number(formData.perBox) || 0)) - (Number(formData.sold) || 0)}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Expected Value:</span>
                    <span className="ml-2 font-medium text-green-600">
                      ${((Number(formData.sold) || 0) * (Number(formData.pricePerUnit) || 0)).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={closeItemModal}
                className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveItem}
                className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" />
                {editingItem ? 'Update Item' : 'Add Item'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
