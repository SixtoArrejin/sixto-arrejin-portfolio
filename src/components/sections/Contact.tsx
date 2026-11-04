"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Mail, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { SiWhatsapp } from "react-icons/si";

const socialLinks = [
  {
    num: "01",
    icon: Mail,
    title: "Email",
    label: "arrejinsixto@gmail.com",
    href: "mailto:arrejinsixto@gmail.com",
  },
  {
    num: "02",
    icon: SiWhatsapp,
    title: "WhatsApp",
    label: "+54 379 479-7572",
    href: "https://wa.me/543794797572",
  },
  {
    num: "03",
    icon: LinkedinIcon,
    title: "LinkedIn",
    label: "linkedin.com/in/sixto-arrejin",
    href: "https://linkedin.com/in/sixto-arrejin",
  },
  {
    num: "04",
    icon: GithubIcon,
    title: "GitHub",
    label: "github.com/SixtoArrejin",
    href: "https://github.com/SixtoArrejin",
  },
];

export function Contact() {
  const t = useTranslations("contact");

  return (
    <section className="py-24 sm:py-28" id="contact">
      <div className="max-w-6xl mx-auto px-6">
        {/* Inverted Business-Card Block (dataconale.com inspired) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="rounded-3xl p-8 sm:p-12 lg:p-16"
          style={{
            background: "var(--bg-inverted)",
            color: "var(--text-inverted)",
          }}
        >
          {/* Top Tag & Role Strip */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-8 mb-10 border-b border-current/15 font-mono-tech text-xs">
            <span className="uppercase tracking-[0.14em] opacity-80">
              {t("tag")}
            </span>
            <span className="uppercase tracking-[0.12em] opacity-75">
              {t("card_role")}
            </span>
          </div>

          {/* Main Callout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mb-12">
            <div className="lg:col-span-8">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.035em] leading-[1.04] mb-5">
                {t("title_1")}{" "}
                <span className="font-serif-italic font-normal opacity-90">
                  {t("title_italic")}
                </span>
              </h2>
              <p className="text-base sm:text-lg leading-relaxed max-w-xl opacity-80">
                {t("description")}
              </p>
            </div>

            <div className="lg:col-span-4 flex lg:justify-end">
              <a
                href="mailto:arrejinsixto@gmail.com"
                className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full text-sm font-semibold transition-transform duration-200 hover:-translate-y-0.5 active:scale-95"
                style={{
                  background: "var(--bg-primary)",
                  color: "var(--text-primary)",
                }}
              >
                <Mail size={16} style={{ color: "var(--accent-blue)" }} />
                <span>{t("card_cta")}</span>
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>

          {/* 4-Channel Contact Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
            {socialLinks.map((link) => (
              <a
                key={link.num}
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="p-4 rounded-2xl border border-current/15 hover:border-current/40 transition-all duration-200 flex flex-col justify-between group"
                style={{
                  background: "rgba(128, 128, 128, 0.08)",
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono-tech text-[11px] opacity-65">
                    {link.num} // {link.title}
                  </span>
                  <ArrowUpRight
                    size={15}
                    className="opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                  />
                </div>
                <div className="flex items-center gap-2.5 min-w-0">
                  <link.icon size={16} className="flex-shrink-0 opacity-85" />
                  <span className="text-xs sm:text-sm font-mono-tech truncate">
                    {link.label}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
