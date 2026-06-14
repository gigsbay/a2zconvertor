export default function Home() {
  return (
    <main>

      {/* HERO */}

      <section
        style={{
          padding: "120px 20px",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "4rem",
            fontWeight: "bold",
            marginBottom: "20px",
          }}
        >
          Convert, Compress & Edit Files Online
        </h1>

        <p
          style={{
            fontSize: "1.2rem",
            maxWidth: "800px",
            margin: "0 auto 40px",
            opacity: 0.8,
          }}
        >
          Free online tools for images, PDFs, videos,
          audio files and documents.
        </p>

        <input
          placeholder="Search tools..."
          style={{
            width: "100%",
            maxWidth: "700px",
            padding: "18px",
            borderRadius: "14px",
            border: "1px solid #333",
            background: "#111827",
            color: "white",
            fontSize: "1rem",
          }}
        />
      </section>

      {/* CATEGORIES */}

      <section
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "80px 20px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "40px",
            fontSize: "2rem",
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
          {[
            "Image Tools",
            "PDF Tools",
            "Video Tools",
            "Audio Tools",
            "Document Tools",
            "AI Tools",
          ].map((item) => (
            <div
              key={item}
              style={{
                background: "#0f172a",
                padding: "30px",
                borderRadius: "16px",
                border: "1px solid rgba(255,255,255,.08)",
              }}
            >
              <h3>{item}</h3>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}