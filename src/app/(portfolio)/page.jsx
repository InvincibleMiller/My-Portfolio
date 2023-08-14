// app/page.jsx

import { getHero, getProfile, getProjects } from "@/sanity/sanity.query";

import Bio from "@/components/Bio";
import ContactForm from "@/components/ContactForm";

export default async function Home() {
  const hero = await getHero();
  const profile = await getProfile();
  const projects = await getProjects();

  const longBio = profile.bio.long.map(({ _key, style, text }) => {
    return (
      <p key={_key} className={style}>
        {text}
      </p>
    );
  });

  const projectCards = projects.map(
    ({ _id, shortDescription, stack, title, thumbnail, url }) => {
      return (
        <div className="project-card">
          <a target="_blank" rel="noopener noreferrer" href={url}>
            <img src={thumbnail.image} alt={thumbnail.alt} />
          </a>
          <div className="project-info">
            <span>
              <a target="_blank" rel="noopener noreferrer" href={url}>
                <h3>{title}</h3>
              </a>
              <p>{shortDescription}</p>
            </span>
            <ul className="stack-list">
              {stack.map((tech) => (
                <li>{tech}</li>
              ))}
            </ul>
          </div>
        </div>
      );
    }
  );

  return (
    <main>
      <section className="hero">
        {hero.background && (
          <div
            className="section-background"
            style={{ backgroundImage: `url("${hero.background.image}")` }}
          >
            <img src={hero.background.image} style={{ display: "none" }} />
          </div>
        )}
        <div className="section-wrapper">
          <div className="hero-content">
            <span>
              <h2 className="hero-headline">{hero.headline}</h2>
              <h1 className="hero-hook">{hero.mainHook}</h1>
              {profile.socials && (
                <>
                  <ul className="socials-list">
                    {profile.socials.map((social, i) => {
                      return (
                        <li key={i}>
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={social.link}
                            className="social-link"
                            style={{
                              WebkitMask: `url("${social.image}")`,
                              mask: `url("${social.image}")`,
                            }}
                          >
                            <span style={{ display: "none" }}>
                              <img src={social.image} alt={social.alt} />
                            </span>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </>
              )}
            </span>
            {hero.heroImage && (
              <img src={hero.heroImage.image} alt={hero.heroImage.alt} />
            )}
          </div>
          <div className="cta">
            <a href="/#contact-section" className="cta-btn">
              {hero.cta}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>
      <section className="about" id="about-section">
        <span style={{ display: "none" }}>
          <div className="long-text">{longBio}</div>
        </span>
        <div className="section-wrapper">
          <div className="about-skills">
            <h2 className="about-header">Skills</h2>
            <ul className="stack-list">
              {profile.skills.map((skill) => {
                return <li>{skill}</li>;
              })}
            </ul>
          </div>
          <div className="about-bio">
            <Bio
              pages={[
                <p>{profile.bio.short}</p>,
                <div className="long-text">{longBio}</div>,
              ]}
            />
          </div>
        </div>
      </section>
      <section className="work" id="work-section">
        <div className="section-wrapper">
          <h2 className="section-header">Work</h2>
          <div className="project-grid">{projectCards}</div>
        </div>
      </section>
      <section className="contact" id="contact-section">
        <div className="section-wrapper">
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
