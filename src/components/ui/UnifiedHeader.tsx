import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import NotificationCenter from '@/components/ui/NotificationCenter';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from '@/components/ui/dropdown-menu';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

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
  Trophy,
  MessageCircle,
  Lock,
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

const UnifiedHeader = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { theme, toggleTheme } = useTheme();

  const handleLogout = async () => {
    await signOut();
    navigate('/auth');
  };

  const handleAuthRequired = (path: string, label: string) => {
    toast({
      title: "Login Required",
      description: `Please sign in to access ${label}.`,
      action: (
        <div className="flex gap-2">
          <button
            onClick={() => navigate('/auth')}
            className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
          >
            Sign In
          </button>
        </div>
      ),
    });
  };

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path);

  const displayName = user?.user_metadata?.full_name || user?.email || 'User';
  const initials = getInitials(displayName);

  // Todos os itens de navegação com suas configurações
  const allNavItems = [
    { 
      path: '/dashboard', 
      label: 'Dashboard', 
      Icon: LayoutDashboard, 
      requiresAuth: true 
    },
    { 
      path: '/dashboard/mock-exams', 
      label: 'Mock Exams', 
      Icon: FileText, 
      requiresAuth: true 
    },
    { 
      path: '/dashboard/scenario-library', 
      label: 'Scenario Library', 
      Icon: Library, 
      requiresAuth: true 
    },
    { 
      path: '/dashboard/session-history', 
      label: 'Session History', 
      Icon: History, 
      requiresAuth: true 
    },

    { 
      path: '/dashboard/clinical-cases', 
      label: 'Clinical Cases', 
      Icon: BookOpen, 
      requiresAuth: true 
    },
    { 
      path: '/blog', 
      label: 'Blog', 
      Icon: BookOpen, 
      requiresAuth: false 
    },
    { 
      path: '/forum', 
      label: 'Forum', 
      Icon: MessageCircle, 
      requiresAuth: false 
    },
    { 
      path: '/dashboard/gamification', 
      label: 'Achievements', 
      Icon: Trophy, 
      requiresAuth: true 
    },
    { 
      path: '/learning-hub', 
      label: 'Learning Hub', 
      Icon: BookOpen, 
      requiresAuth: true 
    },
  ];

  const NavButton = ({
    path,
    Icon,
    label,
    requiresAuth,
    onClick,
  }: {
    path: string;
    Icon: React.ElementType;
    label: string;
    requiresAuth: boolean;
    onClick?: () => void;
  }) => {
    const active = isActive(path);
    const isDisabled = requiresAuth && !user;

    const handleClick = () => {
      if (requiresAuth && !user) {
        handleAuthRequired(path, label);
      } else {
        navigate(path);
      }
      if (onClick) onClick();
    };

    return (
      <motion.button
        onClick={handleClick}
        initial={false}
        animate={{
          color: active ? '#2563eb' : isDisabled ? '#9ca3af' : '#4b5563',
          opacity: isDisabled ? 0.6 : 1,
        }}
        whileHover={{ 
          scale: 1.1, 
          color: isDisabled ? '#9ca3af' : '#2563eb' 
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="flex items-center gap-1 font-medium text-left px-4 py-2 whitespace-nowrap relative"
        disabled={isDisabled}
      >
        <motion.div
          initial={false}
          animate={{ scale: active ? 1.1 : 1 }}
          whileHover={{ scale: isDisabled ? 1 : 1.1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="flex items-center gap-1"
        >
          <Icon size={18} />
          {isDisabled && <Lock size={12} className="ml-1" />}
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
          navigate(user ? '/dashboard' : '/');
          setMobileMenuOpen(false);
        }}
        initial={false}
        animate={{ color: isActive('/dashboard') || isActive('/') ? '#2563eb' : '#111827' }}
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        OSCE Prep UK
      </motion.div>

      {/* Desktop nav */}
      <nav className="hidden lg:flex space-x-4">
        {allNavItems.map(({ path, label, Icon, requiresAuth }) => (
          <NavButton 
            key={path} 
            path={path} 
            Icon={Icon} 
            label={label} 
            requiresAuth={requiresAuth}
          />
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

        {/* Notification Center - only show for authenticated users */}
        {user && <NotificationCenter />}

        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-2 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={() => setMobileMenuOpen((open) => !open)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileMenuOpen ? <CloseIcon size={24} /> : <MenuIcon size={24} />}
        </button>

        {/* User dropdown or Auth button */}
        {user ? (
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
        ) : (
          <motion.button
            onClick={() => navigate('/auth')}
            className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Sign In
          </motion.button>
        )}
      </div>

      {/* Mobile nav dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white shadow-md rounded-b-md lg:hidden flex flex-col divide-y divide-gray-200 z-40"
          >
            {allNavItems.map(({ path, label, Icon, requiresAuth }) => (
              <NavButton
                key={path}
                path={path}
                Icon={Icon}
                label={label}
                requiresAuth={requiresAuth}
                onClick={() => setMobileMenuOpen(false)}
              />
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default UnifiedHeader;

