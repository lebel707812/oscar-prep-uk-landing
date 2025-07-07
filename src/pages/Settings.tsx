import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import Header from '@/components/ui/Header';  // importando o Header

const Settings = () => {
  const { user, updateUser, changePassword, signOut, deleteAccount } = useAuth();

  const [fullName, setFullName] = useState(user?.user_metadata?.full_name || '');
  const [email] = useState(user?.email || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleUpdateProfile = async () => {
    setLoading(true);
    try {
      await updateUser({ full_name: fullName });
      toast({ title: 'Profile updated', variant: 'default' });
    } catch {
      toast({ title: 'Error', description: 'Failed to update profile', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast({ title: 'Error', description: 'Passwords do not match', variant: 'destructive' });
      return;
    }
    setLoading(true);
    try {
      await changePassword(currentPassword, newPassword);
      toast({ title: 'Password changed', variant: 'default' });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch {
      toast({ title: 'Error', description: 'Failed to change password', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut();
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      return;
    }
    setLoading(true);
    try {
      await deleteAccount();
      toast({ title: 'Account deleted', variant: 'default' });
      // Redirect handled by auth context or app
    } catch {
      toast({ title: 'Error', description: 'Failed to delete account', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />

      <div className="max-w-3xl mx-auto p-8 space-y-8">
        <h1 className="text-4xl font-extrabold">Settings</h1>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Profile</h2>
          <label className="block">
            <span className="font-medium">Full Name</span>
            <input
              type="text"
              className="mt-1 block w-full rounded border border-gray-300 p-2"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </label>

          <label className="block">
            <span className="font-medium">Email</span>
            <input
              type="email"
              className="mt-1 block w-full rounded border border-gray-300 p-2 bg-gray-100 cursor-not-allowed"
              value={email}
              disabled
            />
          </label>

          <Button onClick={handleUpdateProfile} disabled={loading}>
            {loading ? 'Saving...' : 'Save Profile'}
          </Button>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Change Password</h2>
          <label className="block">
            <span className="font-medium">Current Password</span>
            <input
              type="password"
              className="mt-1 block w-full rounded border border-gray-300 p-2"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </label>
          <label className="block">
            <span className="font-medium">New Password</span>
            <input
              type="password"
              className="mt-1 block w-full rounded border border-gray-300 p-2"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </label>
          <label className="block">
            <span className="font-medium">Confirm New Password</span>
            <input
              type="password"
              className="mt-1 block w-full rounded border border-gray-300 p-2"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </label>
          <Button onClick={handleChangePassword} disabled={loading}>
            {loading ? 'Saving...' : 'Change Password'}
          </Button>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Preferences</h2>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={notificationsEnabled}
              onChange={() => setNotificationsEnabled(!notificationsEnabled)}
            />
            Enable Notifications
          </label>
        </section>

        <section className="space-y-4 border-t pt-6 border-red-400">
          <h2 className="text-2xl font-semibold text-red-600">Danger Zone</h2>
          <Button variant="destructive" onClick={handleDeleteAccount} disabled={loading}>
            Delete Account
          </Button>
          <Button variant="outline" onClick={handleLogout} disabled={loading}>
            Sign Out
          </Button>
        </section>
      </div>
    </>
  );
};

export default Settings;
