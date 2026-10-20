import { CategoryType } from '../types/blog';

interface FooterProps {
  onNavigate: (path: string) => void;
  onSelectCategory?: (category: CategoryType | null) => void;
}

export function Footer({ onNavigate, onSelectCategory }: FooterProps) {
  const handleCategoryClick = (cat: CategoryType) => {
    if (onSelectCategory) onSelectCategory(cat);
    onNavigate(`/?category=${encodeURIComponent(cat)}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleHomeClick = () => {
    if (onSelectCategory) onSelectCategory(null);
    onNavigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#FFE4E1]/40 border-t border-[#F3D2CE] pt-14 pb-12 mt-20 text-[#2F1E21]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#F3D2CE]/70">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <span className="font-script text-3xl text-[#2F1E21] block tracking-wide">
              The Glow Journal
            </span>
            <p className="text-xs tracking-widest uppercase font-medium text-[#BF7E81]">
              Your skin, your ritual, your glow.
            </p>
            <p className="text-sm text-[#7E6567] max-w-md leading-relaxed">
              An independent, editorial beauty and skincare journal created to demystify
              ingredients, simplify routines, and foster mindful self-care rituals for every skin journey.
            </p>
          </div>

          {/* Editorial Columns */}
          <div>
            <h4 className="text-xs font-semibold tracking-wider uppercase text-[#BF7E81] mb-3">
              Journal Categories
            </h4>
            <ul className="space-y-2 text-sm text-[#2F1E21]/80">
              <li>
                <button
                  onClick={() => handleCategoryClick('Skincare Rituals')}
                  className="hover:text-[#BF7E81] transition-colors cursor-pointer text-left"
                >
                  Skincare Rituals
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('Ingredient Notes')}
                  className="hover:text-[#BF7E81] transition-colors cursor-pointer text-left"
                >
                  Ingredient Notes
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('Product Education')}
                  className="hover:text-[#BF7E81] transition-colors cursor-pointer text-left"
                >
                  Product Education
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('Beauty on a Budget')}
                  className="hover:text-[#BF7E81] transition-colors cursor-pointer text-left"
                >
                  Beauty on a Budget
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Navigation & Assignment Info */}
          <div>
            <h4 className="text-xs font-semibold tracking-wider uppercase text-[#BF7E81] mb-3">
              Publication Notes
            </h4>
            <ul className="space-y-2 text-sm text-[#2F1E21]/80">
              <li>
                <button
                  onClick={handleHomeClick}
                  className="hover:text-[#BF7E81] transition-colors cursor-pointer text-left"
                >
                  Journal Index
                </button>
              </li>
              <li>
                <a
                  href="/#about"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/#about');
                  }}
                  className="hover:text-[#BF7E81] transition-colors cursor-pointer"
                >
                  Editorial Mission
                </a>
              </li>
              <li>
                <a
                  href="/sitemap.xml"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#BF7E81] transition-colors text-xs text-[#7E6567]"
                >
                  Sitemap (XML)
                </a>
              </li>
              <li>
                <a
                  href="/robots.txt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#BF7E81] transition-colors text-xs text-[#7E6567]"
                >
                  Robots (TXT)
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Quiet Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7E6567]">
          <p>© {new Date().getFullYear()} The Glow Journal. All rights reserved.</p>
          <p className="italic font-serif text-[#BF7E81]">
            "a little love note to your skin"
          </p>
        </div>
      </div>
    </footer>
  );
}
