import React, { useState, useEffect } from 'react';
import { ShieldCheck, UserPlus, Users, Key, AlertCircle } from 'lucide-react';
import { ref, get, set, child } from 'firebase/database';
import { db } from '../../lib/firebase';
import { Role } from '../../types';

export const SuperAdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form State
  const [newStaffId, setNewStaffId] = useState('');
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState<Role>('Teacher' as Role);
  const [newPassword, setNewPassword] = useState('');
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  const AVAILABLE_ROLES: Role[] = ['Admin', 'Vice Principal', 'Accountant', 'Registrar', 'Operations Lead', 'Teacher' as Role];

  const fetchUsers = async () => {
    try {
      const dbRef = ref(db);
      const snapshot = await get(child(dbRef, 'users'));
      if (snapshot.exists()) {
        const usersData = snapshot.val();
        setUsers(Object.values(usersData));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRegisterUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback({ type: '', message: '' });

    if (!newStaffId || !newName || !newPassword) {
      setFeedback({ type: 'error', message: 'Please fill in all fields.' });
      return;
    }

    try {
      await set(ref(db, `users/${newStaffId}`), {
        id: newStaffId,
        name: newName,
        role: newRole,
        password: newPassword
      });
      setFeedback({ type: 'success', message: 'User registered successfully!' });
      // Reset form
      setNewStaffId('');
      setNewName('');
      setNewPassword('');
      // Refresh list
      fetchUsers();
    } catch (err) {
      console.error(err);
      setFeedback({ type: 'error', message: 'Failed to register user.' });
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg">
          <ShieldCheck className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Super Admin Platform Manager</h1>
          <p className="text-slate-500 font-medium text-sm">Manage staff access and roles across the entire platform.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Registration Form */}
        <div className="lg:col-span-1 bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-6">
            <UserPlus className="w-5 h-5 text-blue-600" />
            Register New Staff
          </h2>

          <form onSubmit={handleRegisterUser} className="space-y-4">
            {feedback.message && (
              <div className={`p-3 rounded-lg text-sm font-medium flex items-start gap-2 ${feedback.type === 'error' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-green-50 text-green-700 border border-green-200'}`}>
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                {feedback.message}
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Staff ID</label>
              <input type="text" value={newStaffId} onChange={e => setNewStaffId(e.target.value)} placeholder="e.g. TCH-105" className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Full Name</label>
              <input type="text" value={newName} onChange={e => setNewName(e.target.value)} placeholder="e.g. John Doe" className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Role Assignment</label>
              <select value={newRole} onChange={e => setNewRole(e.target.value as Role)} className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                {AVAILABLE_ROLES.map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Temporary Password</label>
              <input type="text" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="e.g. temp123" className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>

            <button type="submit" className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-2.5 rounded-xl transition-colors mt-2 shadow-md">
              Create Account
            </button>
          </form>
        </div>

        {/* User List */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              Active Platform Users
            </h2>
            <div className="bg-blue-50 text-blue-700 px-3 py-1 text-xs font-black rounded-lg">
              {users.length} Total
            </div>
          </div>
          
          <div className="overflow-x-auto">
            {loading ? (
              <div className="p-10 text-center text-slate-500 text-sm font-medium">Loading user database...</div>
            ) : (
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-600 font-bold uppercase text-xs">
                  <tr>
                    <th className="px-6 py-4">Staff ID</th>
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Role</th>
                    <th className="px-6 py-4">Security</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 font-mono font-bold text-slate-900">{u.id}</td>
                      <td className="px-6 py-4 font-medium">{u.name}</td>
                      <td className="px-6 py-4">
                        <span className="bg-blue-50 border border-blue-200 text-blue-700 px-2.5 py-1 rounded-md text-[10px] font-black">
                          {u.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="flex items-center gap-1.5 text-emerald-600 font-bold text-xs bg-emerald-50 px-2 py-1 rounded w-fit border border-emerald-200">
                          <Key className="w-3.5 h-3.5" />
                          Active
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
