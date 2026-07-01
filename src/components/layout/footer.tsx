import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-brand-bg pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6 hover:opacity-80 transition-opacity">
              <Image 
                src="/raylinr_light.png" 
                alt="raylinr Logo" 
                width={40} 
                height={40} 
                style={{ width: 'auto', height: 'auto' }}
                className="h-10 w-auto object-contain dark:hidden"
              />
              <Image 
                src="/raylinr_dark.png" 
                alt="raylinr Logo" 
                width={40} 
                height={40} 
                style={{ width: 'auto', height: 'auto' }}
                className="h-10 w-auto object-contain hidden dark:block"
              />
              <span className="text-2xl font-bold tracking-tight text-brand-text-primary">
                rayl<span className="text-brand-accent">i</span>nr
              </span>
            </Link>
            <p className="text-brand-text-secondary text-sm max-w-sm mb-6">
              Catch risky contract changes before you sign. AI-powered redlining and risk detection for B2B SaaS teams.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-brand-text-secondary hover:text-brand-text-primary transition-colors text-sm font-medium">Twitter</a>
              <a href="#" className="text-brand-text-secondary hover:text-brand-text-primary transition-colors text-sm font-medium">LinkedIn</a>
              <a href="#" className="text-brand-text-secondary hover:text-brand-text-primary transition-colors text-sm font-medium">GitHub</a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-brand-text-primary mb-4">Product</h3>
            <ul className="space-y-3 text-sm text-brand-text-secondary">
              <li><Link href="#features" className="hover:text-brand-text-primary transition-colors">Features</Link></li>
              <li><Link href="#how-it-works" className="hover:text-brand-text-primary transition-colors">How it works</Link></li>
              <li><Link href="#demo" className="hover:text-brand-text-primary transition-colors">Interactive Demo</Link></li>
              <li><Link href="#waitlist" className="hover:text-brand-text-primary transition-colors">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-brand-text-primary mb-4">Company</h3>
            <ul className="space-y-3 text-sm text-brand-text-secondary">
              <li><a href="#" className="hover:text-brand-text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-brand-text-primary transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-brand-text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-brand-text-primary transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-brand-text-secondary text-sm">
            &copy; {new Date().getFullYear()} raylinr. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-brand-text-secondary">
            <span className="w-2 h-2 rounded-full bg-brand-success"></span>
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  );
}
