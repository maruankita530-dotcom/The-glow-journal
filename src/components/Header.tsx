import { useState } from 'react';
import { Search, Menu, X } from 'lucide-react';
import { CategoryType } from '../types/blog';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
  onSelectCategory?: (category: CategoryType | null) => void;
}

export function Header({ currentPath, onNavigate, onOpenSearch, onSelectCategory }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (path: string, category?: CategoryType) => {
    setMobileMenuOpen(false);
    if (category && onSelectCategory) {
      onSelectCategory(category);
    }
    onNavigate(path);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FFF9F8]/95 backdrop-blur-md border-b border-[#F3D2CE]/70 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark in Petit Formal Script */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('/');
            if (onSelectCategory) onSelectCategory(null);
          }}
          className="text-2xl sm:text-3xl font-script tracking-wide text-[#2F1E21] hover:text-[#BF7E81] transition-colors whitespace-nowrap shrink-0"
        >
          The Glow Journal
        </a>

        {/* Zone 2: 4-5 Navigation Links (Clean typography, no capsules) */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#2F1E21]/80">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('/');
              if (onSelectCategory) onSelectCategory(null);
            }}
            className={`hover:text-[#BF7E81] transition-colors whitespace-nowrap shrink-0 ${
              currentPath === '/' ? 'text-[#BF7E81] font-semibold' : ''
            }`}
          >
            Home
          </a>
          <button
            onClick={() => handleNavClick('/?category=Skincare+Rituals', 'Skincare Rituals')}
            className="hover:text-[#BF7E81] transition-colors whitespace-nowrap shrink-0 text-left cursor-pointer"
          >
            Skincare
          </button>
          <button
            onClick={() => handleNavClick('/?category=Ingredient+Notes', 'Ingredient Notes')}
            className="hover:text-[#BF7E81] transition-colors whitespace-nowrap shrink-0 text-left cursor-pointer"
          >
            Ingredients
          </button>
          <button
            onClick={() => handleNavClick('/?category=Product+Education', 'Product Education')}
            className="hover:text-[#BF7E81] transition-colors whitespace-nowrap shrink-0 text-left cursor-pointer"
          >
            Product Reviews
          </button>
          <a
            href="/#about"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('/#about');
            }}
            className="hover:text-[#BF7E81] transition-colors whitespace-nowrap shrink-0"
          >
            About
          </a>
        </nav>

        {/* Zone 3: Search Control & Mobile Menu Toggle */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium text-[#2F1E21] bg-white border border-[#F3D2CE] rounded-full hover:border-[#BF7E81] hover:bg-[#FFE4E1]/30 transition-all cursor-pointer shadow-xs"
            aria-label="Search articles"
          >
            <Search className="w-3.5 h-3.5 text-[#BF7E81]" />
            <span className="hidden sm:inline">Search journal</span>
            <kbd className="hidden lg:inline-block px-1.5 py-0.2 text-[10px] text-[#7E6567] bg-[#FFF9F8] border border-[#F3D2CE] rounded">
              ⌘K
            </kbd>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#2F1E21] hover:text-[#BF7E81] focus:outline-none cursor-pointer"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#F3D2CE]/70 bg-[#FFF9F8] px-6 py-5 space-y-4 animate-in slide-in-from-top-2 duration-150">
          <nav className="flex flex-col space-y-3 text-sm font-medium">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('/');
                if (onSelectCategory) onSelectCategory(null);
              }}
              className="py-1 text-[#2F1E21] hover:text-[#BF7E81] transition-colors"
            >
              Home
            </a>
            <button
              onClick={() => handleNavClick('/?category=Skincare+Rituals', 'Skincare Rituals')}
              className="py-1 text-left text-[#2F1E21] hover:text-[#BF7E81] transition-colors"
            >
              Skincare Rituals
            </button>
            <button
              onClick={() => handleNavClick('/?category=Ingredient+Notes', 'Ingredient Notes')}
              className="py-1 text-left text-[#2F1E21] hover:text-[#BF7E81] transition-colors"
            >
              Ingredient Notes
            </button>
            <button
              onClick={() => handleNavClick('/?category=Product+Education', 'Product Education')}
              className="py-1 text-left text-[#2F1E21] hover:text-[#BF7E81] transition-colors"
            >
              Product Reviews & Education
            </button>
            <button
              onClick={() => handleNavClick('/?category=Beauty+on+a+Budget', 'Beauty on a Budget')}
              className="py-1 text-left text-[#2F1E21] hover:text-[#BF7E81] transition-colors"
            >
              Beauty on a Budget
            </button>
            <a
              href="/#about"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('/#about');
              }}
              className="py-1 text-[#2F1E21] hover:text-[#BF7E81] transition-colors"
            >
              About The Glow Journal
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
