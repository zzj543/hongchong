import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Company */}
          <div>
            <h3 className="font-heading text-lg font-bold mb-4">
              HongChong <span className="text-accent-light">Glass</span>
            </h3>
            <p className="text-sm text-stone-300 leading-relaxed">
              Xuzhou HongChong International Trading Co., Ltd.
              <br />
              Tongshan Glass Industrial Park, Xuzhou, Jiangsu, China
            </p>
            <p className="mt-3 text-sm text-stone-300">
              Your sourcing partner in China&apos;s largest glass manufacturing hub.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-stone-300">
              <li><Link href="/glass-containers" className="hover:text-white transition-colors">Glass Containers</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/request-quote" className="hover:text-white transition-colors">Request a Quote</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wider mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-stone-300">
              <li>Email: sales@hongchongglass.com</li>
              <li>Tel: +86-XXX-XXXX-XXXX</li>
              <li>
                <Link href="/request-quote" className="btn-accent mt-3 inline-block px-4 py-2 bg-accent text-white rounded text-sm font-medium hover:bg-accent-light transition-colors">
                  Send Inquiry
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-stone-600 text-center text-xs text-stone-400">
          &copy; {new Date().getFullYear()} Xuzhou HongChong International Trading Co., Ltd. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
