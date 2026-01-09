import React from 'react';
import { Phone, MessageCircle, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Footer = () => {
    return (
        <footer className="py-12 border-t bg-background mt-auto">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">B</div>
                            <span className="font-bold text-lg">B Technologies Africa</span>
                        </div>
                        <p className="text-sm text-muted-foreground max-w-xs">
                            Empowering the next generation of network engineers with practical, hands-on training.
                        </p>
                    </div>

                    {/* Contact Section */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg">Need Help?</h3>
                        <p className="text-sm text-muted-foreground">
                            Our support team is available to assist you.
                        </p>
                        <div className="flex flex-col gap-2">
                            <a href="tel:+250791822315" className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
                                <Phone className="w-4 h-4 ml-0.5" />
                                <span>+250 791 822 315</span>
                            </a>
                            <a href="https://wa.me/250791822315" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm hover:text-green-600 transition-colors">
                                <MessageCircle className="w-4 h-4 ml-0.5" />
                                <span>WhatsApp Support</span>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links / Additional Info (Optional) */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg">Office</h3>
                        <p className="text-sm text-muted-foreground">
                            Kigali, Rwanda<br />
                            Remera, Giporoso
                        </p>
                    </div>
                </div>

                <div className="pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} B Technologies Africa. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Privacy Policy</a>
                        <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
