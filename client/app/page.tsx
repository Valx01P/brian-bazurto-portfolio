import Nav from "@/components/nav";
import Hero from "@/components/hero";
import ScrollProgress from "@/components/scroll-progress";
import Education from "@/components/sections/education";
import Skills from "@/components/sections/skills";
import Experience from "@/components/sections/experience";
import Projects from "@/components/sections/projects";
import Honors from "@/components/sections/honors";
import Footer from "@/components/footer";
import { ResumeProvider } from "@/components/resume-modal";
import { profile, communities } from "@/lib/data";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: profile.url,
  image: `${profile.url}${profile.image}`,
  jobTitle: "Software Engineer & Community Builder",
  email: `mailto:${profile.email}`,
  description: profile.bio,
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Florida International University",
  },
  sameAs: [
    profile.socials.linkedin,
    profile.socials.github,
    ...communities.map((c) => c.href),
  ],
  knowsAbout: [
    "Software Engineering",
    "Next.js",
    "Artificial Intelligence",
    "Cloud Computing",
    "Mobile Development",
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ScrollProgress />
      <ResumeProvider>
        <Nav />
        <main className="relative z-10 flex-1">
          <Hero />
          <Education />
          <Skills />
          <Experience />
          <Projects />
          <Honors />
        </main>
        <Footer />
      </ResumeProvider>
    </>
  );
}
