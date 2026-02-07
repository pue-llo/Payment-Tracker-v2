import React, { useState, useEffect, useMemo } from 'react';
import { PlusCircle, Edit2, Trash2, Check, X, Calendar, TrendingUp, Users, DollarSign, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const PaymentReminderDashboard = () => {
  const [payments, setPayments] = useState([]);
  const [view, setView] = useState('dashboard');
  const [showModal, setShowModal] = useState(false);
  const [editingPayment, setEditingPayment] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    dueDate: '',
    type: 'owed_to_me',
    person: '',
    category: '',
    status: 'pending',
    recurring: 'none',
    notes: ''
  });

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('paymentReminders');
    if (saved) {
      setPayments(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('paymentReminders', JSON.stringify(payments));
  }, [payments]);

  // Process recurring payments
  useEffect(() => {
    const processRecurring = () => {
      const today = new Date();
      const newPayments = [];

      payments.forEach(payment => {
        if (payment.recurring !== 'none' && payment.status === 'paid') {
          const dueDate = new Date(payment.dueDate);
          const nextDue = new Date(dueDate);

          switch (payment.recurring) {
            case 'weekly':
              nextDue.setDate(dueDate.getDate() + 7);
              break;
            case 'monthly':
              nextDue.setMonth(dueDate.getMonth() + 1);
              break;
            case 'yearly':
              nextDue.setFullYear(dueDate.getFullYear() + 1);
              break;
          }

          if (nextDue <= today) {
            newPayments.push({
              ...payment,
              id: Date.now() + Math.random(),
              dueDate: nextDue.toISOString().split('T')[0],
              status: 'pending'
            });
          }
        }
      });

      if (newPayments.length > 0) {
        setPayments(prev => [...prev, ...newPayments]);
      }
    };

    const interval = setInterval(processRecurring, 60000); // Check every minute
    processRecurring(); // Run once on mount

    return () => clearInterval(interval);
  }, [payments]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingPayment) {
      setPayments(payments.map(p => p.id === editingPayment.id ? { ...formData, id: p.id } : p));
    } else {
      setPayments([...payments, { ...formData, id: Date.now() }]);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      amount: '',
      dueDate: '',
      type: 'owed_to_me',
      person: '',
      category: '',
      status: 'pending',
      recurring: 'none',
      notes: ''
    });
    setEditingPayment(null);
    setShowModal(false);
  };

  const deletePayment = (id) => {
    setPayments(payments.filter(p => p.id !== id));
  };

  const updateStatus = (id, status) => {
    setPayments(payments.map(p => p.id === id ? { ...p, status } : p));
  };

  const editPayment = (payment) => {
    setFormData(payment);
    setEditingPayment(payment);
    setShowModal(true);
  };

  // Analytics calculations
  const analytics = useMemo(() => {
    const totalOwedToMe = payments
      .filter(p => p.type === 'owed_to_me' && p.status !== 'paid')
      .reduce((sum, p) => sum + parseFloat(p.amount || 0), 0);

    const totalIOwe = payments
      .filter(p => p.type === 'i_owe' && p.status !== 'paid')
      .reduce((sum, p) => sum + parseFloat(p.amount || 0), 0);

    const overdue = payments.filter(p => {
      const today = new Date();
      const due = new Date(p.dueDate);
      return p.status === 'pending' && due < today;
    }).length;

    const byPerson = payments.reduce((acc, p) => {
      if (p.status !== 'paid') {
        if (!acc[p.person]) {
          acc[p.person] = { owedToMe: 0, iOwe: 0 };
        }
        if (p.type === 'owed_to_me') {
          acc[p.person].owedToMe += parseFloat(p.amount || 0);
        } else {
          acc[p.person].iOwe += parseFloat(p.amount || 0);
        }
      }
      return acc;
    }, {});

    const byCategory = payments.reduce((acc, p) => {
      if (p.status !== 'paid' && p.category) {
        if (!acc[p.category]) {
          acc[p.category] = 0;
        }
        acc[p.category] += parseFloat(p.amount || 0);
      }
      return acc;
    }, {});

    return { totalOwedToMe, totalIOwe, overdue, byPerson, byCategory };
  }, [payments]);

  const getStatusColor = (payment) => {
    if (payment.status === 'paid') return 'text-green-600 bg-green-50';
    const today = new Date();
    const due = new Date(payment.dueDate);
    if (due < today) return 'text-red-600 bg-red-50';
    return 'text-yellow-600 bg-yellow-50';
  };

  const getStatusText = (payment) => {
    if (payment.status === 'paid') return 'Paid';
    const today = new Date();
    const due = new Date(payment.dueDate);
    if (due < today) return 'Overdue';
    return 'Pending';
  };

  // Calendar view functions
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const getPaymentsForDate = (date) => {
    return payments.filter(p => {
      const paymentDate = new Date(p.dueDate);
      return paymentDate.toDateString() === date.toDateString();
    });
  };

  const renderCalendar = () => {
    const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentMonth);
    const days = [];
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Add empty cells for days before the month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 bg-gray-50 border border-gray-200"></div>);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dayPayments = getPaymentsForDate(date);
      const isToday = date.toDateString() === new Date().toDateString();

      days.push(
        <div
          key={day}
          className={`h-24 border border-gray-200 p-1 overflow-y-auto ${isToday ? 'bg-blue-50 border-blue-300' : 'bg-white'}`}
        >
          <div className={`text-sm font-semibold mb-1 ${isToday ? 'text-blue-600' : 'text-gray-700'}`}>
            {day}
          </div>
          {dayPayments.map(payment => (
            <div
              key={payment.id}
              className={`text-xs p-1 mb-1 rounded truncate ${
                payment.type === 'owed_to_me' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
              }`}
              title={`${payment.person}: $${payment.amount}`}
            >
              ${payment.amount} - {payment.person}
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
            className="p-2 hover:bg-gray-100 rounded"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-bold">
            {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h2>
          <button
            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
            className="p-2 hover:bg-gray-100 rounded"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-0 mb-2">
          {weekDays.map(day => (
            <div key={day} className="text-center font-semibold text-sm py-2 bg-gray-100">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-0">
          {days}
        </div>
        <div className="mt-4 flex gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
            <span>Owed to me</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-orange-100 border border-orange-300 rounded"></div>
            <span>I owe</span>
          </div>
        </div>
      </div>
    );
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Owed to Me</p>
              <p className="text-3xl font-bold mt-1">${analytics.totalOwedToMe.toFixed(2)}</p>
            </div>
            <DollarSign className="w-12 h-12 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">I Owe</p>
              <p className="text-3xl font-bold mt-1">${analytics.totalIOwe.toFixed(2)}</p>
            </div>
            <DollarSign className="w-12 h-12 text-orange-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Net Balance</p>
              <p className="text-3xl font-bold mt-1">
                ${(analytics.totalOwedToMe - analytics.totalIOwe).toFixed(2)}
              </p>
            </div>
            <TrendingUp className="w-12 h-12 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100 text-sm">Overdue</p>
              <p className="text-3xl font-bold mt-1">{analytics.overdue}</p>
            </div>
            <AlertCircle className="w-12 h-12 text-red-200" />
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* By Person Chart */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-bold mb-4">Balance by Person</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={Object.entries(analytics.byPerson).map(([person, amounts]) => ({
              person,
              'Owed to Me': amounts.owedToMe,
              'I Owe': amounts.iOwe
            }))}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="person" />
              <YAxis />
              <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
              <Legend />
              <Bar dataKey="Owed to Me" fill="#10b981" />
              <Bar dataKey="I Owe" fill="#f59e0b" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* By Category Chart */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-bold mb-4">By Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={Object.entries(analytics.byCategory).map(([category, amount]) => ({
                  name: category,
                  value: amount
                }))}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: $${value.toFixed(0)}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {Object.keys(analytics.byCategory).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'][index % 5]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Upcoming Payments */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-bold mb-4">Upcoming Payments</h3>
        <div className="space-y-3">
          {payments
            .filter(p => p.status === 'pending')
            .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
            .slice(0, 5)
            .map(payment => (
              <div key={payment.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{payment.person}</span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      payment.type === 'owed_to_me' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                    }`}>
                      {payment.type === 'owed_to_me' ? 'Owes Me' : 'I Owe'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{payment.name}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">${parseFloat(payment.amount).toFixed(2)}</p>
                  <p className="text-sm text-gray-500">Due: {new Date(payment.dueDate).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          {payments.filter(p => p.status === 'pending').length === 0 && (
            <p className="text-gray-500 text-center py-8">No upcoming payments</p>
          )}
        </div>
      </div>
    </div>
  );

  const renderPaymentList = () => (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">All Payments</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
        >
          <PlusCircle className="w-5 h-5" />
          Add Payment
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Name</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Person</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Amount</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Due Date</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Type</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {payments.map(payment => (
              <tr key={payment.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div>
                    <div className="font-medium">{payment.name}</div>
                    {payment.recurring !== 'none' && (
                      <div className="text-xs text-gray-500">Recurring: {payment.recurring}</div>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">{payment.person}</td>
                <td className="px-4 py-3 font-semibold">${parseFloat(payment.amount).toFixed(2)}</td>
                <td className="px-4 py-3">{new Date(payment.dueDate).toLocaleDateString()}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-1 rounded ${
                    payment.type === 'owed_to_me' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                  }`}>
                    {payment.type === 'owed_to_me' ? 'Owed to Me' : 'I Owe'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-1 rounded font-medium ${getStatusColor(payment)}`}>
                    {getStatusText(payment)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    {payment.status !== 'paid' && (
                      <button
                        onClick={() => updateStatus(payment.id, 'paid')}
                        className="text-green-600 hover:bg-green-50 p-1 rounded"
                        title="Mark as Paid"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => editPayment(payment)}
                      className="text-blue-600 hover:bg-blue-50 p-1 rounded"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deletePayment(payment.id)}
                      className="text-red-600 hover:bg-red-50 p-1 rounded"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {payments.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p>No payments yet. Click "Add Payment" to get started!</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">Payment Reminder Dashboard</h1>
          <p className="text-blue-100 mt-1">Track your IOUs and loans with ease</p>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white shadow">
        <div className="container mx-auto px-4">
          <nav className="flex gap-1">
            <button
              onClick={() => setView('dashboard')}
              className={`px-6 py-3 font-medium transition-colors ${
                view === 'dashboard'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setView('calendar')}
              className={`px-6 py-3 font-medium transition-colors ${
                view === 'calendar'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Calendar
            </button>
            <button
              onClick={() => setView('payments')}
              className={`px-6 py-3 font-medium transition-colors ${
                view === 'payments'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              All Payments
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {view === 'dashboard' && renderDashboard()}
        {view === 'calendar' && renderCalendar()}
        {view === 'payments' && renderPaymentList()}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                  {editingPayment ? 'Edit Payment' : 'Add New Payment'}
                </h2>
                <button
                  onClick={resetForm}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Payment Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., Loan repayment"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Person *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.person}
                      onChange={(e) => setFormData({ ...formData, person: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Amount ($) *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="0.00"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Due Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.dueDate}
                      onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Type *
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="owed_to_me">Owed to Me</option>
                      <option value="i_owe">I Owe</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <input
                      type="text"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., Personal, Business"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Recurring
                    </label>
                    <select
                      value={formData.recurring}
                      onChange={(e) => setFormData({ ...formData, recurring: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="none">None</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="yearly">Yearly</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="pending">Pending</option>
                      <option value="paid">Paid</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notes
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Additional notes..."
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    {editingPayment ? 'Update Payment' : 'Add Payment'}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentReminderDashboard;