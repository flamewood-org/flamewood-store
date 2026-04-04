import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export const metadata = {
	title: "Contact Us - FlameWood",
	description: "Get in touch with the FlameWood team.",
};

export default function ContactPage() {
	return (
		<div className="bg-background min-h-screen">
			{/* Hero */}
			<div className="bg-foreground text-white py-24 md:py-32 rounded-b-[40px] md:rounded-b-[80px] text-center px-4 relative overflow-hidden">
				<div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none"></div>
				<h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight relative z-10">Get in Touch</h1>
				<p className="text-xl text-white/70 max-w-2xl mx-auto relative z-10">
					Have a question about bulk orders, shipping, or our premium products? We are here to help.
				</p>
			</div>

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-20 relative z-20">
				<div className="grid lg:grid-cols-3 gap-10">
					{/* Contact Info Cards */}
					<div className="lg:col-span-1 space-y-6">
						<div className="bg-white p-8 rounded-3xl border border-border shadow-lg">
							<MapPin className="w-8 h-8 text-primary mb-4" />
							<h3 className="text-xl font-bold mb-2">Our Headquarters</h3>
							<p className="text-text-secondary leading-relaxed">
								Kochi EXZ, Ernakulam<br />
								Kerala, India 682001
							</p>
						</div>
						<div className="bg-white p-8 rounded-3xl border border-border shadow-lg">
							<Phone className="w-8 h-8 text-primary mb-4" />
							<h3 className="text-xl font-bold mb-2">Phone & Email</h3>
							<p className="text-text-secondary leading-relaxed mb-2">
								Contact us directly for fast support.
							</p>
							<a href="tel:+919876543210" className="block font-bold text-foreground hover:text-primary transition-colors">+91 98765 43210</a>
							<a href="mailto:support@flamewood.com" className="block font-bold text-foreground hover:text-primary transition-colors">support@flamewood.com</a>
						</div>
						<div className="bg-white p-8 rounded-3xl border border-border shadow-lg">
							<Clock className="w-8 h-8 text-primary mb-4" />
							<h3 className="text-xl font-bold mb-2">Working Hours</h3>
							<p className="text-text-secondary leading-relaxed">
								Mon-Sat: 9:00 AM - 6:00 PM<br />
								Sunday: Closed
							</p>
						</div>
					</div>

					{/* Contact Form */}
					<div className="lg:col-span-2">
						<div className="bg-white p-10 md:p-14 rounded-3xl border border-border shadow-xl">
							<h2 className="text-3xl font-black mb-8">Send us a message</h2>
							<form className="space-y-6">
								<div className="grid md:grid-cols-2 gap-6">
									<div className="space-y-2">
										<label className="text-sm font-bold uppercase tracking-wider text-text-secondary">First Name</label>
										<Input placeholder="John" className="h-14 bg-surface-alt border-transparent focus:border-primary" />
									</div>
									<div className="space-y-2">
										<label className="text-sm font-bold uppercase tracking-wider text-text-secondary">Last Name</label>
										<Input placeholder="Doe" className="h-14 bg-surface-alt border-transparent focus:border-primary" />
									</div>
								</div>
								<div className="space-y-2">
									<label className="text-sm font-bold uppercase tracking-wider text-text-secondary">Email Address</label>
									<Input type="email" placeholder="john@example.com" className="h-14 bg-surface-alt border-transparent focus:border-primary" />
								</div>
								<div className="space-y-2">
									<label className="text-sm font-bold uppercase tracking-wider text-text-secondary">Message</label>
									<textarea 
										className="w-full rounded-2xl bg-surface-alt border-transparent focus:border-primary focus:ring-1 focus:ring-primary p-4 outline-none transition-all resize-none min-h-[150px]"
										placeholder="How can we help you today?"
									></textarea>
								</div>
								<Button size="lg" className="w-full md:w-auto px-12 h-14 rounded-2xl font-bold shadow-lg shadow-primary/30">
									<Send className="w-5 h-5 mr-3" /> Send Message
								</Button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
