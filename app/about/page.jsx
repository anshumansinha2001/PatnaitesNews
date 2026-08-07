import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export const metadata = {
  title: "About",
  description:
    "Patnaites Media — established in 2016 by Maalanch Yadav, a leading social media and news hub from Patna, Bihar with a 3 lakh+ community and 10M+ monthly reach.",
  alternates: { canonical: "/about" },
};

const stats = [
  { value: "2016", label: "Serving since" },
  { value: "3 Lakh+", label: "Community across platforms" },
  { value: "10M+", label: "Monthly reach" },
  { value: "Patna", label: "Rooted in Bihar" },
];

const services = [
  {
    group: "For Promotion",
    items: [
      "Brand Promotion",
      "Content Creation",
      "Product Photography",
      "Social Media Handling",
    ],
  },
  {
    group: "For Marketing",
    items: [
      "Content Marketing",
      "Influencer Marketing",
      "Social Media Marketing",
    ],
  },
];

const collaborations = [
  { name: "IIT Patna", role: "Social Media Influencer", when: "Apr 2023" },
  { name: "Kia Motors", role: "Brand Collaboration", when: "Jun 2023" },
  { name: "TVS Motor Company", role: "Brand Collaboration", when: "Dec 2023" },
  { name: "Shree Hari Jewellers", role: "Brand Promotion", when: "Oct 2023" },
  {
    name: "Amity University Patna",
    role: "Social Media Influencer",
    when: "Mar 2024",
  },
];

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="border-b border-gray-200 bg-gradient-to-b from-gray-50 to-white">
          <div className="mx-auto max-w-content px-5 py-16 text-center md:px-8 md:py-24">
            <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-muted">
              Colours of Bihar
            </span>
            <h1 className="mx-auto mt-6 max-w-3xl font-serif text-4xl font-bold leading-[1.1] tracking-tight text-ink sm:text-5xl md:text-6xl">
              About <span className="text-accent">Patnaites Media</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base text-muted sm:text-lg">
              Established in 2016 by Maalanch Yadav, Patnaites is a leading
              social media and news hub in Patna, Bihar. With a family of over 3
              lakh across Facebook, Instagram and YouTube and a monthly reach
              well beyond 10 million, we bring the stories, culture and voice of
              Bihar to a growing audience.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="mx-auto max-w-content px-5 py-14 md:px-8">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-gray-200 bg-white p-6 text-center"
              >
                <p className="font-serif text-3xl font-bold text-ink md:text-4xl">
                  {s.value}
                </p>
                <p className="mt-2 text-sm text-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Story */}
        <section className="mx-auto max-w-3xl px-5 pb-14 md:px-8">
          <h2 className="font-serif text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Our story
          </h2>
          <div className="mt-5 space-y-4 text-base leading-relaxed text-muted">
            <p>
              What began in 2016 as a passion for capturing the everyday
              colours of Bihar has grown into one of Patna&apos;s most
              recognised digital platforms. From local happenings to national
              headlines, our mission has stayed the same — to keep Patnaites
              informed with reporting that is clear, fast and trustworthy.
            </p>
            <p>
              Alongside news, Patnaites works with brands and institutions to
              tell their stories through creative content, photography and
              social-first campaigns — pairing local reach with genuine
              community trust.
            </p>
          </div>
        </section>

        {/* Services */}
        <section className="border-t border-gray-200 bg-gray-50">
          <div className="mx-auto max-w-content px-5 py-16 md:px-8">
            <h2 className="text-center font-serif text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              What we do
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-muted">
              A full range of social media and marketing services for brands
              across Bihar and beyond.
            </p>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {services.map((s) => (
                <div
                  key={s.group}
                  className="rounded-2xl border border-gray-200 bg-white p-7"
                >
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-accent">
                    {s.group}
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {s.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-3 text-ink"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Collaborations */}
        <section className="mx-auto max-w-content px-5 py-16 md:px-8">
          <h2 className="text-center font-serif text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Brands &amp; institutions we&apos;ve worked with
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {collaborations.map((c) => (
              <div
                key={c.name}
                className="flex items-start justify-between gap-4 rounded-xl border border-gray-200 bg-white p-5"
              >
                <div>
                  <p className="font-semibold text-ink">{c.name}</p>
                  <p className="mt-1 text-sm text-muted">{c.role}</p>
                </div>
                <span className="whitespace-nowrap text-xs text-muted">
                  {c.when}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-gray-200 bg-ink text-white">
          <div className="mx-auto flex max-w-content flex-col items-center gap-6 px-5 py-16 text-center md:px-8">
            <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl">
              Work with Patnaites
            </h2>
            <p className="max-w-xl text-gray-300">
              Looking for brand promotions, advertisements or a media partner?
              Our team is ready to help you reach Bihar&apos;s most engaged
              audience.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
            >
              Get in touch <FiArrowRight />
            </Link>
          </div>
        </section>
      </main>

      <ScrollToTop />
      <Footer />
    </div>
  );
}
