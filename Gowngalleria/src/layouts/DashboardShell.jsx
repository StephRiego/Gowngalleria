import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { NavIcon, BellIcon, SearchIcon, MenuIcon, LogoutIcon } from '../components/icons/Icon';

export default function DashboardShell({
  brandSubtitle,
  panelTitle,
  navItems,
  searchPlaceholder = 'Search gowns, users, shops...',
}) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const displayName = user?.name?.split(' ')[0] || 'Guest';

  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className="min-h-screen #2A1F1C flex">
      {sidebarOpen && (
        <button
          type="button"
          className="fixed inset-0 bg-gg-charcoal/30 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close menu"
        />
      )}

      {/* ONLY COLOR CHANGED HERE */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-72 glass-card lg:rounded-none lg:border-r lg:border-y-0 flex flex-col m-0 lg:m-0 transform transition-transform duration-300 bg-[#FAF0E6] ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-6 border-b border-gg-lavender/20">
          <p className="font-display text-2xl text-gg-charcoal">GownGalleria</p>
          <p className="text-xs text-gg-gray mt-1 tracking-wide uppercase">{brandSubtitle}</p>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `group ${isActive ? 'nav-pill nav-pill-active' : 'nav-pill'}`
              }
            >
              {({ isActive }) => (
                <>
                  <NavIcon name={item.icon} active={isActive} size={20} />
                  {item.label}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-gg-lavender/20">
          <button
            type="button"
            onClick={handleLogout}
            className="group nav-pill w-full hover:bg-rose-50 hover:text-rose-600"
          >
            <LogoutIcon className="!text-gg-gray group-hover:!text-rose-500" size={20} />
            Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 glass-card mx-4 mt-4 lg:mx-6 lg:mt-6 px-4 lg:px-6 py-4 flex flex-wrap items-center gap-4 justify-between border-0">
          <div className="flex items-center gap-3 flex-1 min-w-[200px]">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl hover:bg-gg-lavender/20"
              aria-label="Open menu"
            >
              <MenuIcon size={22} className="!text-gg-charcoal" />
            </button>
            <div className="hidden sm:flex flex-1 max-w-md items-center gap-2 px-4 py-2.5 rounded-xl bg-gg-beige/80 border border-gg-lavender/20">
              <SearchIcon size={18} className="!text-gg-gray" />
              <input
                type="search"
                placeholder={searchPlaceholder}
                className="bg-transparent w-full text-sm outline-none placeholder:text-gg-gray/70"
              />
            </div>
          </div>

          <h1 className="font-semibold text-gg-charcoal text-sm lg:text-base order-first w-full sm:order-none sm:w-auto lg:hidden">
            {panelTitle}
          </h1>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="relative p-2.5 rounded-xl hover:bg-gg-lavender/20 transition"
              aria-label="Notifications"
            >
              <BellIcon size={20} className="!text-gg-gray hover:!text-gg-gold" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-gg-gold rounded-full shadow-[0_0_6px_#D4AF37]" />
            </button>
            <div className="flex items-center gap-3 pl-3 border-l border-gg-lavender/30">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gg-gold to-gg-lavender flex items-center justify-center text-white font-semibold text-sm shadow-soft">
                {displayName.charAt(0)}
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-semibold text-gg-charcoal">{displayName}</p>
                <p className="text-xs text-gg-gray capitalize">{user?.role}</p>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-6 lg:pt-4 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}