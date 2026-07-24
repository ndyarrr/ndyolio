import { useEffect, useState } from "react";
import "./css/navbar.css";
import ThemeToggle from "./ThemeToggle";

export default function TopNav() {
  const [active, setActive] = useState("home");

  const scrollTo = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll("section[id]"));

    const onScroll = () => {
      const middle = window.innerHeight / 2;

      let current = null;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();

        if (rect.top <= middle && rect.bottom >= middle) {
          current = section.id;
        }
      });

      // fallback mentok bawah
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 2
      ) {
        current = "contact";
      }

      if (current) {
        setActive(current);
      }
    };

    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onScroll);

    onScroll(); // init

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);


  return (
    <div className="nav">
      <nav className="top-nav">
        {["home", "about", "project", "contact"].map((id) => (
          <span
            key={id}
            className={active === id ? "active" : ""}
            onClick={() => scrollTo(id)}
          >
            {id.toUpperCase()}
          </span>
        ))}
        <ThemeToggle />
      </nav>
    </div>
  );
}
