import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-foreground text-white">
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-4">OSCE Master</h3>
                <p className="text-white/70 leading-relaxed">
                  Empowering international nurses to succeed in their NHS OSCE exams 
                  with AI-powered preparation tools and personalised learning.
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center text-white/70">
                  <Mail className="h-4 w-4 mr-3" />
                  <span>support@oscemaster.co.uk</span>
                </div>
                <div className="flex items-center text-white/70">
                  <Phone className="h-4 w-4 mr-3" />
                  <span>+44 20 7946 0958</span>
                </div>
                <div className="flex items-center text-white/70">
                  <MapPin className="h-4 w-4 mr-3" />
                  <span>London, United Kingdom</span>
                </div>
              </div>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-semibold mb-6">Resources</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">OSCE Study Guide</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">NHS Guidelines</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Practice Scenarios</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Success Stories</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Help Centre</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-semibold mb-6">Legal</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Refund Policy</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Accessibility</a></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="font-semibold mb-6">Stay Updated</h4>
              <p className="text-white/70 mb-4">
                Get OSCE tips, study resources, and success stories delivered to your inbox.
              </p>
              
              <div className="space-y-3">
                <div className="flex">
                  <input 
                    type="email" 
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 rounded-l-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <Button className="bg-primary hover:bg-primary-dark px-6 py-2 rounded-r-lg rounded-l-none">
                    Subscribe
                  </Button>
                </div>
                <p className="text-xs text-white/50">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4 mt-6">
                <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-white/70 text-sm">
            © 2024 OSCE Master. All rights reserved. Helping international nurses succeed in the NHS.
          </div>
          
          <div className="flex items-center space-x-6 text-sm text-white/70">
            <span>🇬🇧 Proudly supporting NHS values</span>
            <div className="flex items-center space-x-1">
              <span>Made with</span>
              <span className="text-red-400">❤️</span>
              <span>for nurses worldwide</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
