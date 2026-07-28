import React, { useState } from 'react';
import {
  ShieldCheck,
  KeyRound,
  UserPlus,
  Search,
  Filter,
  Lock,
  Unlock,
  RefreshCw,
  Printer,
  Copy,
  Check,
  AlertCircle,
  FileText,
  User,
  Building,
  Mail,
  Phone,
  Clock,
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { UserAccount, IDAuditLog, Role } from '../../types';

interface UserIDManagementProps {
  users: UserAccount[];
  auditLogs: IDAuditLog[];
  currentUser: UserAccount;
  onAddUser: (newUser: UserAccount) => void;
  onUpdateUser: (updatedUser: UserAccount) => void;
  onAddAuditLog: (log: IDAuditLog) => void;
}

export const UserIDManagement: React.FC<UserIDManagementProps> = ({
  users,
  auditLogs,
  currentUser,
  onAddUser,
  onUpdateUser,
  onAddAuditLog
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRoleFilter, setSelectedRoleFilter] = useState<string>('ALL');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('ALL');
  const [activeTab, setActiveTab] = useState<'directory' | 'audit'>('directory');

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [selectedUserForReset, setSelectedUserForReset] = useState<UserAccount | null>(null);
  const [isSlipModalOpen, setIsSlipModalOpen] = useState(false);
  const [slipUser, setSlipUser] = useState<UserAccount | null>(null);

  // New User Form State
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState<Role>('Teacher');
  const [newDept, setNewDept] = useState('STEM & Science');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newPassword, setNewPassword] = useState('pass123');
  const [mustChangePassword, setMustChangePassword] = useState(true);

  // Reset Password State
  const [resetPasswordVal, setResetPasswordVal] = useState('');
  const [copiedSlip, setCopiedSlip] = useState(false);

  // Metrics
  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === 'ACTIVE').length;
  const lockedUsers = users.filter(u => u.status === 'LOCKED').length;

  // Filter Users
  const filteredUsers = users.filter(u => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRoleFilter === 'ALL' || u.role === selectedRoleFilter;
    const matchesStatus = selectedStatusFilter === 'ALL' || u.status === selectedStatusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  // Helper to generate auto User ID
  const generateAutoUserId = (role: Role): string => {
    const prefix =
      role === 'Principal'
        ? 'PRIN'
        : role === 'Vice Principal'
        ? 'VP'
        : role === 'User ID Administrator'
        ? 'IDADM'
        : role === 'Admin'
        ? 'ADM'
        : role === 'Teacher'
        ? 'TCH'
        : role === 'Accountant'
        ? 'ACC'
        : 'STF';
    const rand = Math.floor(100 + Math.random() * 900);
    return `${prefix}-${rand}`;
  };

  const handleCreateUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) return;

    const generatedId = generateAutoUserId(newRole);
    const newUser: UserAccount = {
      id: `USR-${Date.now()}`,
      userId: generatedId,
      name: newName.trim(),
      role: newRole,
      department: newDept,
      email: newEmail.trim(),
      phone: newPhone.trim() || '+1 (555) 019-0000',
      passwordHash: newPassword || 'pass123',
      status: 'ACTIVE',
      dateIssued: new Date().toISOString().split('T')[0],
      issuedBy: `${currentUser.name} (${currentUser.role})`,
      mustChangePassword: mustChangePassword
    };

    onAddUser(newUser);

    // Audit Log
    const newLog: IDAuditLog = {
      id: `AUD-${Date.now()}`,
      targetUserId: generatedId,
      targetName: newName,
      action: 'CREATED_ID',
      performedBy: `${currentUser.name} (${currentUser.role})`,
      timestamp: new Date().toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }),
      details: `Created new User ID ${generatedId} for ${newName} as ${newRole} in ${newDept}.`
    };
    onAddAuditLog(newLog);

    // Open Access Slip
    setSlipUser(newUser);
    setIsSlipModalOpen(true);

    // Reset Form
    setNewName('');
    setNewEmail('');
    setNewPhone('');
    setIsAddModalOpen(false);
  };

  const handleToggleLock = (user: UserAccount) => {
    const newStatus = user.status === 'ACTIVE' ? 'LOCKED' : 'ACTIVE';
    const updated = { ...user, status: newStatus as 'ACTIVE' | 'LOCKED' };
    onUpdateUser(updated);

    const newLog: IDAuditLog = {
      id: `AUD-${Date.now()}`,
      targetUserId: user.userId,
      targetName: user.name,
      action: newStatus === 'LOCKED' ? 'LOCKED_ACCOUNT' : 'UNLOCKED_ACCOUNT',
      performedBy: `${currentUser.name} (${currentUser.role})`,
      timestamp: new Date().toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }),
      details: `${newStatus === 'LOCKED' ? 'Locked' : 'Unlocked'} User ID ${user.userId} access.`
    };
    onAddAuditLog(newLog);
  };

  const handleOpenResetPassword = (user: UserAccount) => {
    setSelectedUserForReset(user);
    setResetPasswordVal('pass' + Math.floor(100 + Math.random() * 900));
    setIsResetModalOpen(true);
  };

  const handleSaveResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUserForReset || !resetPasswordVal.trim()) return;

    const updated = { ...selectedUserForReset, passwordHash: resetPasswordVal.trim(), mustChangePassword: true };
    onUpdateUser(updated);

    const newLog: IDAuditLog = {
      id: `AUD-${Date.now()}`,
      targetUserId: selectedUserForReset.userId,
      targetName: selectedUserForReset.name,
      action: 'RESET_PASSWORD',
      performedBy: `${currentUser.name} (${currentUser.role})`,
      timestamp: new Date().toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }),
      details: `Reset password for User ID ${selectedUserForReset.userId}. Issued temporary credentials.`
    };
    onAddAuditLog(newLog);

    setSlipUser(updated);
    setIsResetModalOpen(false);
    setIsSlipModalOpen(true);
  };

  const handleCopyAccessSlipText = () => {
    if (!slipUser) return;
    const text = `EDUONE2047 OFFICIAL STAFF CREDENTIALS SLIP
-------------------------------------------
Staff Name: ${slipUser.name}
Role: ${slipUser.role}
Department: ${slipUser.department}
School User ID: ${slipUser.userId}
Temp Password: ${slipUser.passwordHash || 'pass123'}
Issued By: ${slipUser.issuedBy || 'Sarah Connor (ID Admin)'}
Date Issued: ${slipUser.dateIssued}
-------------------------------------------
Please sign in at the EduOne2047 portal using your School User ID.`;

    navigator.clipboard.writeText(text);
    setCopiedSlip(true);
    setTimeout(() => setCopiedSlip(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner - Sarah Connor ID Administration Spotlight */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 border border-blue-800/40 shadow-sm text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-blue-400 shrink-0">
            <KeyRound className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                User ID Administration & Credentials Center
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-[10px] font-semibold uppercase tracking-wider">
                Designated Admin
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Designated staff member <strong>Sarah Connor (Chief ID Administrator)</strong> manages total staff user ID creation, password resets, and account access authorization across EduOne2047.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl shadow-md transition flex items-center gap-1.5"
          >
            <UserPlus className="w-4 h-4" />
            <span>Issue New Staff User ID</span>
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Total User IDs Issued</span>
            <ShieldCheck className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">{totalUsers}</div>
          <div className="text-[11px] text-slate-500 mt-1">Active across all departments</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Active Operational Accounts</span>
            <User className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-700 mt-2">{activeUsers}</div>
          <div className="text-[11px] text-emerald-600 mt-1">Verified & authenticated</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Locked / Suspended IDs</span>
            <Lock className="w-4 h-4 text-red-600" />
          </div>
          <div className="text-2xl font-black text-red-600 mt-2">{lockedUsers}</div>
          <div className="text-[11px] text-red-500 mt-1">Access currently restricted</div>
        </div>
      </div>

      {/* Tabs & Filter Bar */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('directory')}
              className={`px-4 py-2 text-xs font-semibold rounded-xl transition ${
                activeTab === 'directory'
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Staff User ID Directory ({users.length})
            </button>
            <button
              onClick={() => setActiveTab('audit')}
              className={`px-4 py-2 text-xs font-semibold rounded-xl transition ${
                activeTab === 'audit'
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              ID Administration Audit Log ({auditLogs.length})
            </button>
          </div>

          <span className="text-xs text-slate-500 font-mono">
            LoggedIn: <strong className="text-slate-800">{currentUser.name}</strong> ({currentUser.role})
          </span>
        </div>

        {activeTab === 'directory' && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Search Name, User ID or Department..."
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <select
                value={selectedRoleFilter}
                onChange={e => setSelectedRoleFilter(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:border-blue-500"
              >
                <option value="ALL">All Roles</option>
                <option value="User ID Administrator">User ID Administrator</option>
                <option value="Principal">Principal</option>
                <option value="Vice Principal">Vice Principal</option>
                <option value="Admin">Admin</option>
                <option value="Teacher">Teacher / Faculty</option>
                <option value="General Staff">General Staff</option>
              </select>
            </div>

            <div>
              <select
                value={selectedStatusFilter}
                onChange={e => setSelectedStatusFilter(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:border-blue-500"
              >
                <option value="ALL">All Account Statuses</option>
                <option value="ACTIVE">Active Only</option>
                <option value="LOCKED">Locked Only</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Directory Table */}
      {activeTab === 'directory' ? (
        <div className="bg-white border border-slate-200/90 rounded-2xl shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[10px] font-bold">
                <tr>
                  <th className="px-4 py-3.5">School User ID</th>
                  <th className="px-4 py-3.5">Staff Name & Role</th>
                  <th className="px-4 py-3.5">Department & Email</th>
                  <th className="px-4 py-3.5">Date Issued</th>
                  <th className="px-4 py-3.5">Status</th>
                  <th className="px-4 py-3.5 text-right">ID Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-slate-400">
                      No staff User IDs found matching your filters.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map(user => (
                    <tr key={user.id} className="hover:bg-slate-50/80 transition">
                      <td className="px-4 py-3.5 font-mono font-bold text-blue-700">
                        {user.userId}
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="font-bold text-slate-900">{user.name}</div>
                        <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                          {user.role}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-slate-600">
                        <div>{user.department}</div>
                        <div className="text-[11px] text-slate-400">{user.email}</div>
                      </td>
                      <td className="px-4 py-3.5 text-slate-500">
                        <div>{user.dateIssued}</div>
                        <div className="text-[10px] text-slate-400">By {user.issuedBy || 'Sarah Connor'}</div>
                      </td>
                      <td className="px-4 py-3.5">
                        {user.status === 'ACTIVE' ? (
                          <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold inline-flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            ACTIVE
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-full bg-red-50 text-red-700 border border-red-200 text-[10px] font-bold inline-flex items-center gap-1">
                            <Lock className="w-3 h-3 text-red-500" />
                            LOCKED
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3.5 text-right space-x-1.5">
                        <button
                          onClick={() => handleOpenResetPassword(user)}
                          className="px-2.5 py-1.5 bg-slate-100 hover:bg-amber-50 text-slate-700 hover:text-amber-700 rounded-lg text-[11px] font-semibold transition inline-flex items-center gap-1 border border-slate-200"
                          title="Reset Password"
                        >
                          <RefreshCw className="w-3 h-3" />
                          <span>Reset Password</span>
                        </button>

                        <button
                          onClick={() => {
                            setSlipUser(user);
                            setIsSlipModalOpen(true);
                          }}
                          className="px-2.5 py-1.5 bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 rounded-lg text-[11px] font-semibold transition inline-flex items-center gap-1 border border-slate-200"
                          title="Print Credentials Slip"
                        >
                          <Printer className="w-3 h-3" />
                          <span>Access Slip</span>
                        </button>

                        <button
                          onClick={() => handleToggleLock(user)}
                          className={`p-1.5 rounded-lg text-[11px] font-semibold transition inline-flex items-center border ${
                            user.status === 'ACTIVE'
                              ? 'bg-red-50 text-red-700 hover:bg-red-100 border-red-200'
                              : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-emerald-200'
                          }`}
                          title={user.status === 'ACTIVE' ? 'Lock Account' : 'Unlock Account'}
                        >
                          {user.status === 'ACTIVE' ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Audit Logs List */
        <div className="bg-white border border-slate-200/90 rounded-2xl shadow-2xs p-5 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-600" />
            Sarah Connor's ID Administration Log
          </h3>

          <div className="space-y-3">
            {auditLogs.map(log => (
              <div key={log.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs space-y-1">
                <div className="flex items-center justify-between text-slate-500">
                  <span className="font-bold text-slate-900">{log.action.replace('_', ' ')}</span>
                  <span className="font-mono text-[10px]">{log.timestamp}</span>
                </div>
                <div className="text-slate-700">{log.details}</div>
                <div className="text-[11px] text-slate-400">Performed by: {log.performedBy}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CREATE NEW USER ID MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white border border-slate-200 rounded-3xl shadow-2xl max-w-md w-full p-6 text-slate-900 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-blue-600" />
                Issue New Staff User ID
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateUserSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Staff Full Name *</label>
                <input
                  type="text"
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  placeholder="e.g. Professor Alan Turing"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Assigned School Role *</label>
                <select
                  value={newRole}
                  onChange={e => setNewRole(e.target.value as Role)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500"
                >
                  <option value="Teacher">Teacher / Faculty</option>
                  <option value="General Staff">General Staff</option>
                  <option value="Admin">System Administrator</option>
                  <option value="Vice Principal">Vice Principal</option>
                  <option value="Principal">Principal</option>
                  <option value="User ID Administrator">User ID Administrator</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Department / Subject *</label>
                <input
                  type="text"
                  value={newDept}
                  onChange={e => setNewDept(e.target.value)}
                  placeholder="e.g. Computer Science & AI"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={e => setNewEmail(e.target.value)}
                  placeholder="e.g. alan.turing@eduone2047.org"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Initial Password</label>
                <input
                  type="text"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-800"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-2xs"
                >
                  Generate & Issue User ID
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* RESET PASSWORD MODAL */}
      {isResetModalOpen && selectedUserForReset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white border border-slate-200 rounded-3xl shadow-2xl max-w-sm w-full p-6 text-slate-900 space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-amber-600" />
              Reset Password Credentials
            </h3>
            <p className="text-xs text-slate-600">
              Reset password for <strong>{selectedUserForReset.name}</strong> ({selectedUserForReset.userId}).
            </p>

            <form onSubmit={handleSaveResetPassword} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">New Temporary Password *</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={resetPasswordVal}
                    onChange={e => setResetPasswordVal(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-900 focus:outline-none focus:border-blue-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setResetPasswordVal('pass' + Math.floor(100 + Math.random() * 900))}
                    className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl shrink-0"
                  >
                    Random
                  </button>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsResetModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-semibold shadow-2xs"
                >
                  Save & Issue Slip
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ACCESS SLIP PRINT / COPY MODAL */}
      {isSlipModalOpen && slipUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white border border-slate-200 rounded-3xl shadow-2xl max-w-md w-full p-6 text-slate-900 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-blue-700 font-bold text-sm">
                <Printer className="w-4 h-4" />
                <span>EduOne2047 Official Staff Access Slip</span>
              </div>
              <button
                onClick={() => setIsSlipModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 font-mono text-xs space-y-2">
              <div className="text-center font-bold text-slate-900 border-b pb-2">
                EDUONE2047 STAFF CREDENTIALS CARD
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Staff Name:</span>
                <span className="font-bold">{slipUser.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">School Role:</span>
                <span className="font-bold text-blue-700">{slipUser.role}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Department:</span>
                <span>{slipUser.department}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">School User ID:</span>
                <span className="font-bold text-indigo-700 text-sm">{slipUser.userId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Password:</span>
                <span className="font-bold text-amber-700">{slipUser.passwordHash || 'pass123'}</span>
              </div>
              <div className="flex justify-between pt-1 border-t text-[10px] text-slate-400">
                <span>Issued By: {slipUser.issuedBy || 'Sarah Connor'}</span>
                <span>Date: {slipUser.dateIssued}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={handleCopyAccessSlipText}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-semibold text-xs flex items-center gap-1.5"
              >
                {copiedSlip ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSlip ? 'Copied to Clipboard!' : 'Copy Slip Text'}</span>
              </button>

              <button
                onClick={() => window.print()}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-xs shadow-2xs flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Card</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
