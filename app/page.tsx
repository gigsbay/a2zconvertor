export default function Home() {
  const categories = [
    "Image Tools",
    "PDF Tools",
    "Video Tools",
    "Audio Tools",
    "Document Tools",
    "AI Tools",
  ];

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#020617",
        color: "white",
      }}
    >
      {/* NAVBAR */}

      <nav
        style={{
          padding: "20px 40px",
          borderBottom: "1px solid rgba(255,255,255,.08)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>A2ZConvertor</h2>

        <div
          style={{
            display: "flex",
            gap: "25px",
          }}
        >
          <span>Images</span>
          <span>PDF</span>
          <span>Video</span>
          <span>AI</span>
        </div>
      </nav>

      {/* HERO */}

      <section
        style={{
          textAlign: "center",
          padding: "120px 20px",
        }}
      >
        <h1
          style={{
            fontSize: "4rem",
            fontWeight: 800,
            marginBottom: "20px",
          }}
        >
          Convert, Compress & Edit Files Online
        </h1>

        <p
          style={{
            maxWidth: "700px",
            margin: "0 auto 40px",
            color: "#94a3b8",
            fontSize: "1.2rem",
          }}
        >
          Free online tools for images, PDFs,
          videos, audio files and documents.
        </p>

        <input
          placeholder="Search tools..."
          style={{
            width: "100%",
            maxWidth: "700px",
            padding: "18px",
            borderRadius: "16px",
            border: "1px solid rgba(255,255,255,.08)",
            background: "#0f172a",
            color: "white",
          }}
        />
      </section>

      {/* CATEGORIES */}

      <section
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "60px 20px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "40px",
          }}
        >
          Browse Categories
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(250px,1fr))",
            gap: "20px",
          }}
        >
          {categories.map((item) => (
            <div
              key={item}
              style={{
                background: "#0f172a",
                padding: "30px",
                borderRadius: "20px",
                border:
                  "1px solid rgba(255,255,255,.08)",
              }}
            >
              <h3>{item}</h3>

              <p
                style={{
                  color: "#94a3b8",
                }}
              >
                Explore tools
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}

      <footer
        style={{
          textAlign: "center",
          padding: "80px 20px",
          color: "#94a3b8",
        }}
      >
        © 2026 A2ZConvertor
      </footer>
    </main>
  );
}