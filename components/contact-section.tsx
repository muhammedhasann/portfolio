"use client";

import { useState } from "react";
import { motion } from "framer-motion";

//
import emailjs from "@emailjs/browser";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  X, // Icon for X (Twitter)
  Send,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  Rss,
  Zap,
  MessageSquare,
  type LucideIcon, // Import the type for better type-safety
} from "lucide-react";

// =================================================================================
// Professional Best Practice: Component Definitions
// =================================================================================
// By defining ContactBadge *outside* ContactSection, we prevent it from being
// re-created on every render, which is more efficient.
// =================================================================================

/**
 * A futuristic badge component for the section header.
 */
const ContactBadge = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    viewport={{ once: true, amount: 0.8 }}
    className="inline-flex items-center justify-center gap-3 mb-8 px-5 py-2.5 bg-black/50 border border-green-500/30 rounded-full shadow-[0_0_20px_rgba(74,222,128,0.3)]"
  >
    <div className="flex items-center gap-3">
      <MessageCircle className="w-6 h-6 text-green-400" />
      <div className="w-px h-5 bg-green-500/50" />
      <Rss className="w-6 h-6 text-green-400" />
    </div>
    <span className="ml-2 text-sm font-medium text-green-300 tracking-wider uppercase">
      Get In Touch
    </span>
  </motion.div>
);

// =================================================================================
// Data Structures (Cleaned & Improved)
// =================================================================================

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "mohammadhasan22003@gmail.com",
    href: "mailto:mohammadhasan22003@gmail.com",
          ariaLabel: "Send email to mohammadhasan22003@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+90 537 260 03 91",
    href: "tel:+905372600391",
          ariaLabel: "Call +90 537 260 03 91",

  },
  {
    icon: MapPin,
    label: "Location",
    value: "Siirt, Turkey",
    // BEST PRACTICE: Replaced dead "#" link with a functional Google Maps link.
    href: "https://www.google.com/maps/place/Siirt,+Turkey",
          ariaLabel: "View location: Siirt, Turkey",
  },
];

const socialLinks = [
  {
    icon: Github,
    label: "GitHub",
    username: "muhammedhaan",
    href: "https://github.com/muhammedhasann",
          ariaLabel: "Visit GitHub profile: muhammedhaan",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    username: "muhammedhasann",
    href: "https://www.linkedin.com/in/muhammedhaan/",
          ariaLabel: "Visit LinkedIn profile: muhammedhasann",
  },
  {
    icon: X,
    label: "X",
    username: "Muhammed__Hasan",
    href: "https://x.com/Muhammed__Hasan",
          ariaLabel: "Visit X (Twitter) profile: Muhammed__Hasan",
  },
];

// BEST PRACTICE: Refactored to pass the icon component and color string,
// making the data structure consistent and the rendering logic cleaner.
const collaborationAreas: {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  tags: string[];
}[] = [
  {
    title: "Research Collaboration",
    description: "AI applications, quantum computing, and sustainable energy research",
    icon: Zap,
    color: "text-amber-400",
    tags: ["AI", "Quantum Computing", "Clean Energy"],
  },
  {
    title: "Mentorship",
    description: "Guidance in robotics, programming, and engineering projects",
    icon: MessageSquare,
    color: "text-blue-400",
    tags: ["Robotics", "Programming", "Engineering"],
  },
  {
    title: "Project Development",
    description: "Clean technology startups and AI-driven solutions",
    icon: Send,
    color: "text-emerald-400",
    tags: ["Startups", "AI Solutions", "Innovation"],
  },
];

// =================================================================================
// Main Contact Section Component
// =================================================================================

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    // Type guard to ensure keys are loaded
    if (!serviceID || !templateID || !publicKey) {
      console.error("EmailJS environment variables are not set.");
      setSubmitStatus("error");
      setIsSubmitting(false);
      return;
    }

    try {
      await emailjs.send(serviceID, templateID, formData, publicKey);
      setSubmitStatus('success');
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("EmailJS submission error:", error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      // Reset the button after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
   

    // --- MOCK SUBMISSION (for this environment) ---
    // This part simulates a successful submission so you can test the UI.
    // Please DELETE this mock code when you re-enable the emailjs code above.
    console.log("Form submitted (mock):", formData);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
    setSubmitStatus('success');
    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
    setTimeout(() => setSubmitStatus('idle'), 5000);
    // --- END MOCK SUBMISSION ---
  };

  return (
    <section id="contact" className="py-24 px-4 relative bg-black overflow-hidden">
      {/* Background Layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-green-900/10 to-black z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-900/20 via-transparent to-transparent z-0" />
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,165,0,0.03)_1px,transparent_1px)] bg-[size:30px_30px] z-0"
      />

      {/* Holographic Grid Pattern */}
      <div className="absolute inset-0 opacity-20 z-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f97316' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <ContactBadge />

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold bg-gradient-to-b from-zinc-50 to-green-400 bg-clip-text text-transparent leading-tight mb-4"
          >
            Let’s Build Something Amazing
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-gray-400 max-w-3xl mx-auto"
          >
            Ready to work together on innovative projects? Reach out and let's create
            something amazing.
          </motion.p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-xl p-8 h-full">
              <h3 className="text-2xl font-semibold text-white mb-8 flex items-center gap-3">
                <div className="w-2 h-8 bg-gradient-to-b from-amber-400 to-emerald-400 rounded-full" />
                Contact Information
              </h3>

              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.15 }}
                    viewport={{ once: true }}
                  >
                    <a
                      href={item.href}
                      // If it's a map link, open in a new tab.
                      target={item.label === "Location" ? "_blank" : "_self"}
                      rel="noopener noreferrer"
                      className="flex items-center gap-5 p-4 rounded-lg hover:bg-neutral-800/50 transition-all duration-300 group"
                    >
                      <div className="p-3 bg-neutral-800 rounded-lg group-hover:bg-neutral-700 transition-colors">
                        <item.icon className="w-6 h-6 text-neutral-300 group-hover:text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-neutral-400 mb-1 uppercase tracking-wider">
                          {item.label}
                        </p>
                        <p className="text-white text-lg font-medium">{item.value}</p>
                      </div>
                    </a>
                  </motion.div>
                ))}
              </div>

              {/* Social Links */}
              <div className="mt-12 pt-8 border-t border-neutral-800">
                <h4 className="text-xl font-semibold text-white mb-6">Connect With Me</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      // ACCESSIBILITY FIX: Added descriptive aria-label
                      aria-label={`View my ${social.label} profile at @${social.username}`}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-3 p-3 rounded-lg bg-neutral-800/50 hover:bg-neutral-800 transition-colors border border-neutral-700"
                    >
                      <social.icon className="w-5 h-5 text-neutral-300" />
                      <span className="text-white text-sm">@{social.username}</span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-xl p-8 h-full">
              <h3 className="text-2xl font-semibold text-white mb-8 flex items-center gap-3">
                <div className="w-2 h-8 bg-gradient-to-b from-amber-400 to-emerald-400 rounded-full" />
                Send a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    {/* BEST PRACTICE: Added explicit htmlFor for accessibility */}
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-neutral-300 mb-2"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name" // Added corresponding id
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-neutral-800 border border-neutral-700 text-white placeholder:text-neutral-500 h-12 px-4 rounded-lg focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 transition-all"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-neutral-300 mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email" // Added corresponding id
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-neutral-800 border border-neutral-700 text-white placeholder:text-neutral-500 h-12 px-4 rounded-lg focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/30 transition-all"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-neutral-300 mb-2"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    id="subject" // Added corresponding id
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-neutral-800 border border-neutral-700 text-white placeholder:text-neutral-500 h-12 px-4 rounded-lg focus:border-neutral-300 focus:ring-1 focus:ring-neutral-300/30 transition-all"
                    placeholder="What would you like to discuss?"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-neutral-300 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    name="message"
                    id="message" // Added corresponding id
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full bg-neutral-800 border border-neutral-700 text-white placeholder:text-neutral-500 resize-none rounded-lg p-4 focus:border-neutral-300 focus:ring-1 focus:ring-neutral-300/3D"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <div className="pt-4">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting || submitStatus === "success"}
                    className="w-full bg-gradient-to-r from-neutral-800 to-neutral-900 text-white flex items-center justify-center gap-3 h-14 font-medium rounded-lg border border-neutral-700 hover:border-neutral-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    whileHover={{ scale: isSubmitting ? 1 : 1.01 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.99 }}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : submitStatus === "success" ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        <span>Message Sent!</span>
                      </>
                    ) : submitStatus === "error" ? (
                      <>
                        <AlertCircle className="w-5 h-5 text-red-400" />
                        <span>Failed to Send</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 text-amber-400" />
                        <span>Send Message</span>
                      </>
                    )}
                  </motion.button>
                  {/* This note indicates the form is in simulation mode */}
                  <p className="text-xs text-neutral-600 text-center mt-4">
                    Note: Form submission is simulated in this environment.
                  </p>
                </div>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Collaboration Areas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="text-center mb-10">
            <motion.div
              className="inline-flex items-center bg-neutral-900 border border-neutral-800 text-neutral-300 px-4 py-1.5 mb-4 rounded-full"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <span className="text-sm font-medium tracking-wider">
                COLLABORATION AREAS
              </span>
            </motion.div>
            <h3 className="text-2xl font-semibold text-white mb-2">
              Ways We Can Work Together
            </h3>
            <p className="text-neutral-400 max-w-2xl mx-auto">
              Explore potential areas where we can combine our expertise
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {collaborationAreas.map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-xl p-6 h-full hover:border-neutral-700 transition-colors">
                  <div className="mb-4">
                    {/* BEST PRACTICE: Rendering icon from component ref */}
                    <area.icon className={`w-6 h-6 ${area.color}`} />
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-3">{area.title}</h4>
                  <p className="text-neutral-400 text-sm mb-4">{area.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {area.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 bg-neutral-800 text-neutral-300 text-xs rounded-full border border-neutral-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>




        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-24 pt-12 border-t border-neutral-800"
        >
          <p className="text-neutral-500 text-sm mb-6">
            © {new Date().getFullYear()} Muhammed Hasan. All rights reserved.
          </p>
          <div className="flex justify-center items-center gap-4">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                // ACCESSIBILITY FIX: Added descriptive aria-label
                aria-label={`Visit my ${social.label} profile`}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-3 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-colors border border-neutral-700"
                whileHover={{ scale: 1.1 }}
              >
                <social.icon className="w-5 h-5 text-neutral-300" />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;