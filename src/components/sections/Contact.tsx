"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { SiWhatsapp } from "react-icons/si";


const socialLinks = [
  {
    icon: Mail,
    label: "arrejinsixto@gmail.com",
    href: "mailto:arrejinsixto@gmail.com",
  },
  {
    icon: GithubIcon,
    label: "github.com/SixtoArrejin",
    href: "https://github.com/SixtoArrejin",
  },
  {
    icon: LinkedinIcon,
    label: "linkedin.com/in/sixto-arrejin",
    href: "https://linkedin.com/in/sixto-arrejin",
  },
  {
    icon: SiWhatsapp,
    label: "+54 379 479-7572",
    href: "https://wa.me/543794797572",
  },
];

export function Contact() {
  const t = useTranslations("contact");

  return (
    <section className="py-24" id="contact">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <div className="mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-3xl font-bold mb-2"
            style={{ fontFamily: "var(--font-sora)" }}
          >
            {t("title")}
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="section-divider mb-6 mx-auto" 
          />
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-base mb-12"
            style={{ color: "var(--text-muted)" }}
          >
            {t("description")}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {socialLinks.map((link, idx) => (
            <motion.a
              key={idx}
              href={link.href}
              target={link.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -3, scale: 1.02 }}
              transition={{ duration: 0.7 }}
              className="glass-card p-4 flex items-center gap-4 text-left transition-all"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: "var(--accent-blue)15",
                  border: "1px solid var(--accent-blue)30",
                }}
              >
                <link.icon size={18} style={{ color: "var(--accent-blue)" }} />
              </div>
              <span className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
                {link.label}
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
