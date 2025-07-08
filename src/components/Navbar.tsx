import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from '@/components/ui/dropdown-menu';
import { useNavigate, useLocation } from 'react-router-dom';

import { User, Settings, LogOut, LayoutDashboard, FileText, BookOpen, Trophy } from 'lucide-react';
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

  // Nav button animado com framer-motion e nova tipografia
  const NavButton = ({ path, Icon, label }: { path: string; Icon: React.ElementType; label: string }) => {
    const active = (path === '/dashboard' && isDashboardActive) || isActive(path);

    return (
      <motion.button
        onClick={() => navigate(path)}
        initial={false}
        animate={{
          color: active ? 'hsl(207 100% 31%)' : 'hsl(0 0% 55%)', // primary ou muted-foreground
        }}
        whileHover={{ scale: 1.05, color: 'hsl(207 100% 31%)' }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="nav-text flex items-center gap-2 whitespace-nowrap hover:text-primary transition-colors duration-200"
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
    <header className="flex items-center justify-between px-8 py-6 bg-white/95 backdrop-blur-sm shadow-soft border-b border-border/50 min-w-[320px]">
      <motion.div
        className="heading-3 font-bold cursor-pointer select-none text-primary"
        onClick={() => navigate('/dashboard')}
        initial={false}
        animate={{ color: isDashboardActive ? 'hsl(207 100% 31%)' : 'hsl(207 72% 47%)' }}
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        OSCE Prep UK
      </motion.div>

      <nav className="hidden md:flex space-x-10">
        <NavButton path="/dashboard" Icon={LayoutDashboard} label="Dashboard" />
        <NavButton path="/dashboard/mock-exams" Icon={FileText} label={"Mock\u00A0Exams"} />
        <NavButton path="/blog" Icon={BookOpen} label="Blog" />
        <NavButton path="/forum" Icon={User} label="Forum" />
        <NavButton path="/dashboard/gamification" Icon={Trophy} label="Achievements" />
        <NavButton path="/dashboard/resources" Icon={BookOpen} label="Resources" />
      </nav>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <motion.div
            className="w-11 h-11 flex items-center justify-center bg-gradient-to-r from-primary to-primary-light text-white rounded-full body-small font-bold cursor-pointer select-none shadow-medium hover:shadow-strong"
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            {initials}
          </motion.div>
        </DropdownMenuTrigger>

        <AnimatePresence>
          <DropdownMenuContent
            align="end"
            className="bg-white/95 backdrop-blur-sm rounded-xl shadow-strong border border-border/50 min-w-[200px] p-2"
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
                  whileHover={{ 
                    scale: 1.02, 
                    backgroundColor: danger ? 'hsl(4 90% 95%)' : 'hsl(0 0% 96%)' 
                  }}
                  className={`cursor-pointer px-4 py-3 flex items-center gap-3 select-none body-text rounded-lg transition-colors duration-200 ${
                    danger ? 'text-destructive hover:text-destructive' : 'text-foreground hover:text-primary'
                  }`}
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

