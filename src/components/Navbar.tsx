import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from '@/components/ui/dropdown-menu';
import { useNavigate, useLocation } from 'react-router-dom';

import { User, Settings, LogOut, LayoutDashboard, FileText, BookOpen } from 'lucide-react';
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

  const handleLogout = async () => {
    await signOut();
    navigate('/auth');
  };

  const isDashboardActive = location.pathname === '/dashboard';
  const isActive = (path: string) => location.pathname.startsWith(path);

  const displayName = user?.user_metadata?.full_name || user?.email || 'User';
  const initials = getInitials(displayName);

  // Nav button animado com framer-motion
  const NavButton = ({ path, Icon, label }: { path: string; Icon: React.ElementType; label: string }) => {
    const active = (path === '/dashboard' && isDashboardActive) || isActive(path);

    return (
      <motion.button
        onClick={() => navigate(path)}
        initial={false}
        animate={{
          color: active ? '#2563eb' : '#4b5563', // azul-600 ou cinza-700
        }}
        whileHover={{ scale: 1.1, color: '#2563eb' }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="flex items-center gap-1 font-medium whitespace-nowrap" // impede quebra de linha
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
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md min-w-[320px]">
      <motion.div
        className="text-xl font-bold cursor-pointer select-none"
        onClick={() => navigate('/dashboard')}
        initial={false}
        animate={{ color: isDashboardActive ? '#2563eb' : '#111827' }} // azul-600 ou cinza-900
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        OSCE Prep UK
      </motion.div>

      <nav className="hidden md:flex space-x-8"> {/* espaçamento maior entre botões */}
        <NavButton path="/dashboard" Icon={LayoutDashboard} label="Dashboard" />
        <NavButton path="/dashboard/mock-exams" Icon={FileText} label={"Mock\u00A0Exams"} />
        <NavButton path="/dashboard/resources" Icon={BookOpen} label="Resources" />
      </nav>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <motion.div
            className="w-9 h-9 flex items-center justify-center bg-blue-600 text-white rounded-full text-sm font-bold cursor-pointer select-none"
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
    </header>
  );
};

export default Header;
