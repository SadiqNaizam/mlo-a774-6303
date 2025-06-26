import React from 'react';
import { Link } from 'react-router-dom';
import { UtensilsCrossed } from 'lucide-react';

const Footer: React.FC = () => {
  console.log('Footer loaded');
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Company: [
      { label: 'About Us', href: '/#about' },
      { label: 'Contact', href: '/#contact' },
      { label: 'FAQ', href: '/#faq' },
    ],
    Legal: [
      { label: 'Terms of Service', href: '/#terms' },
      { label: 'Privacy Policy', href: '/#privacy' },
    ],
  };

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <UtensilsCrossed className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold text-foreground">FeastFlow</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Your favorite local restaurants, delivered right to your door. Discover, order, and enjoy with FeastFlow.
            </p>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Company</h3>
            <nav className="flex flex-col space-y-2">
              {footerLinks.Company.map((link) => (
                <Link key={link.label} to={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Legal Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Legal</h3>
            <nav className="flex flex-col space-y-2">
              {footerLinks.Legal.map((link) => (
                <Link key={link.label} to={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-muted-foreground/10 pt-8 flex flex-col sm:flex-row items-center justify-between">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} FeastFlow. All rights reserved.
          </p>
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            {/* Placeholder for social media icons if needed */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;