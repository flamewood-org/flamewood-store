"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function ContactPage() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		subject: "",
		message: "",
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// TODO: Implement form submission
		alert("Thank you for your message! We'll get back to you soon.");
		setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
	};

	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
			<div className="text-center mb-12">
				<h1 className="text-4xl font-bold text-foreground mb-4">Contact Us</h1>
				<p className="text-text-secondary max-w-2xl mx-auto">
					Have questions about our products or need a custom quote? We&apos;re
					here to help!
				</p>
			</div>

			<div className="grid lg:grid-cols-3 gap-8">
				{/* Contact Information */}
				<div className="lg:col-span-1 space-y-6">
					<div className="bg-surface border border-border rounded-lg p-6">
						<div className="flex items-start space-x-4">
							<Mail className="h-6 w-6 text-primary flex-shrink-0" />
							<div>
								<h3 className="font-semibold text-foreground mb-1">Email</h3>
								<p className="text-text-secondary text-sm">
									support@flamewood.com
								</p>
								<p className="text-text-secondary text-sm">
									sales@flamewood.com
								</p>
							</div>
						</div>
					</div>

					<div className="bg-surface border border-border rounded-lg p-6">
						<div className="flex items-start space-x-4">
							<Phone className="h-6 w-6 text-primary flex-shrink-0" />
							<div>
								<h3 className="font-semibold text-foreground mb-1">Phone</h3>
								<p className="text-text-secondary text-sm">+91 98765 43210</p>
								<p className="text-text-secondary text-sm">
									Mon-Sat, 9 AM - 6 PM IST
								</p>
							</div>
						</div>
					</div>

					<div className="bg-surface border border-border rounded-lg p-6">
						<div className="flex items-start space-x-4">
							<MapPin className="h-6 w-6 text-primary flex-shrink-0" />
							<div>
								<h3 className="font-semibold text-foreground mb-1">Address</h3>
								<p className="text-text-secondary text-sm">
									Flame Wood Headquarters
									<br />
									Kerala, India
									<br />
									PIN: 682001
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Contact Form */}
				<div className="lg:col-span-2">
					<form onSubmit={handleSubmit} className="space-y-6">
						<div className="grid sm:grid-cols-2 gap-4">
							<Input
								label="Name"
								type="text"
								required
								value={formData.name}
								onChange={(e) =>
									setFormData({ ...formData, name: e.target.value })
								}
								placeholder="Your name"
							/>
							<Input
								label="Email"
								type="email"
								required
								value={formData.email}
								onChange={(e) =>
									setFormData({ ...formData, email: e.target.value })
								}
								placeholder="your@email.com"
							/>
						</div>

						<div className="grid sm:grid-cols-2 gap-4">
							<Input
								label="Phone"
								type="tel"
								value={formData.phone}
								onChange={(e) =>
									setFormData({ ...formData, phone: e.target.value })
								}
								placeholder="+91 XXXXX XXXXX"
							/>
							<Input
								label="Subject"
								type="text"
								required
								value={formData.subject}
								onChange={(e) =>
									setFormData({ ...formData, subject: e.target.value })
								}
								placeholder="How can we help?"
							/>
						</div>

						<div>
							<label
								htmlFor="message"
								className="block text-sm font-medium text-foreground mb-1"
							>
								Message
							</label>
							<textarea
								id="message"
								rows={6}
								required
								value={formData.message}
								onChange={(e) =>
									setFormData({ ...formData, message: e.target.value })
								}
								className="w-full px-4 py-2 border border-border rounded-md bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-text-secondary"
								placeholder="Tell us more about your requirements..."
							/>
						</div>

						<Button type="submit" size="lg" className="w-full sm:w-auto">
							<Send className="h-4 w-4 mr-2" />
							Send Message
						</Button>
					</form>
				</div>
			</div>
		</div>
	);
}
