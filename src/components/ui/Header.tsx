import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from '@/components/ui/dropdown-menu';
import { useNavigate, useLocation } from 'react-router-dom';

import {
  User,
  Settings,
  LogOut,
  LayoutDashboard,
  FileText,
  BookOpen,
  Menu as MenuIcon,
  X as CloseIcon,
  Sun,
  Moon,
  History,
  Library,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const getInitials = (value: string) => {
  if (!value) return 'U';
  const base = value.split('@')[0];
  const parts = base.split(/[.\s_-]/).filter(Boolean);
  return parts.length >= 2
    ? parts[0][0].toUpperCase() + parts[1][0].toUpperCase()
    : base.slice(0, 2).toUpperCase();
};

const Header = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { theme, toggleTheme } = useTheme();

  const handleLogout = async () => {
    await signOut();
    navigate('/auth');
  };

  const isActive = (path: string) => location.pathname === path;

  const displayName = user?.user_metadata?.full_name || user?.email || 'User';
  const initials = getInitials(displayName);

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', Icon: LayoutDashboard },
    { path: '/dashboard/mock-exams', label: 'Mock Exams', Icon: FileText },
    { path: '/dashboard/scenario-library', label: 'Scenario Library', Icon: Library },
    { path: '/dashboard/session-history', label: 'Session History', Icon: History },
    { path: '/dashboard/pacient-ai', label: 'PacientAI', Icon: User },
    { path: '/learning-hub', label: 'Learning Hub', Icon: BookOpen },
    { path: '/blog', label: 'Blog', Icon: BookOpen }, // Adicionado o link para o blog
  ];

  const NavButton = ({
    path,
    Icon,
    label,
    onClick,
  }: {
    path: string;
    Icon: React.ElementType;
    label: string;
    onClick?: () => void;
  }) => {
    const active = isActive(path);

    return (
      <motion.button
        onClick={() => {
          navigate(path);
          if (onClick) onClick();
        }}
        initial={false}
        animate={{
          color: active ? '#2563eb' : '#4b5563',
        }}
        whileHover={{ scale: 1.1, color: '#2563eb' }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="flex items-center gap-1 font-medium text-left px-4 py-2 whitespace-nowrap"

      >
        <motion.div
          initial={false}
          animate={{ scale: active ? 1.1 : 1 }}
          whileHover={{ scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <Icon size={18} />
        </motion.div>
        {label}
      </motion.button>
    );
  };

  return (
    <header className="bg-white shadow-md px-6 py-4 flex items-center justify-between relative">
      {/* Logo */}
      <motion.div
        className="text-xl font-bold cursor-pointer select-none"
        onClick={() => {
          navigate('/dashboard');
          setMobileMenuOpen(false);
        }}
        initial={false}
        animate={{ color: isActive('/dashboard') ? '#2563eb' : '#111827' }}
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        OSCE Prep UK
      </motion.div>

      {/* Desktop nav */}
      <nav className="hidden md:flex space-x-8">
        {navItems.map(({ path, label, Icon }) => (
          <NavButton key={path} path={path} Icon={Icon} label={label} />
        ))}
      </nav>

      <div className="flex items-center gap-4">
        {/* Theme toggle */}
        <button
          aria-label="Toggle theme"
          onClick={toggleTheme}
          className="p-2 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          {theme === 'dark' ? (
            <Sun size={24} className="text-yellow-500" />
          ) : (
            <Moon size={24} className="text-gray-700" />
          )}
        </button>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={() => setMobileMenuOpen((open) => !open)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileMenuOpen ? <CloseIcon size={24} /> : <MenuIcon size={24} />}
        </button>

        {/* User dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <motion.div
              className="w-9 h-9 flex items-center justify-center bg-blue-600 text-white rounded-full text-sm font-bold cursor-pointer select-none ml-4"
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              {initials}
            </motion.div>
          </DropdownMenuTrigger>

          <AnimatePresence>
            <DropdownMenuContent
              align="end"
              className="bg-white rounded-md shadow-md min-w-[180px] p-1"
              asChild
            >
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {[
                  { label: 'Profile', icon: User, action: () => navigate('/dashboard/profile') },
                  { label: 'Settings', icon: Settings, action: () => navigate('/dashboard/settings') },
                  { label: 'Logout', icon: LogOut, action: handleLogout, danger: true },
                ].map(({ label, icon: Icon, action, danger }) => (
                  <motion.div
                    key={label}
                    whileHover={{ scale: 1.05, backgroundColor: danger ? '#fee2e2' : '#f3f4f6' }}
                    className={`cursor-pointer px-4 py-2 flex items-center gap-2 select-none ${
                      danger ? 'text-red-600' : ''
                    } rounded`}
                    onClick={action}
                    layout
                  >
                    <Icon size={16} />
                    {label}
                  </motion.div>
                ))}
              </motion.div>
            </DropdownMenuContent>
          </AnimatePresence>
        </DropdownMenu>
      </div>

      {/* Mobile nav dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white shadow-md rounded-b-md md:hidden flex flex-col divide-y divide-gray-200 z-40"
          >
            {navItems.map(({ path, label, Icon }) => (
              <NavButton
                key={path}
                path={path}
                Icon={Icon}
                label={label}
                onClick={() => setMobileMenuOpen(false)}
              />
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;


