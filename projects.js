export const projects = [
  {
    slug: "arsenal",
    hidden: true,
    title: "Arsenal",
    status: "2026",
    duration: "2026",
    disciplines: "Identity",
    role: "Designer",
    context: "Arsenal is the first venture capital fund that invests in weapons manufacturing for the United States military. 99% of venture firms won't invest due to ESG concerns and government regulations.",
    hero: { src: "images/arsenal/Group 5.png", alt: "Arsenal" },
    problem:  { body: "Placeholder problem — describe the constraints, questions, or tensions that shaped the work. Replace with real copy.", blocks: [{ type: "placeholder", aspect: "16/9" }] },
    strategy: { body: "Placeholder strategy — outline the approach, references, and decisions that moved the project forward. Replace with real copy.", blocks: [{ type: "placeholders", count: 2, aspect: "1/1" }] },
    solution: { body: "", blocks: [{ type: "placeholder", aspect: "16/9" }] }
  },
  {
    slug: "modulation-station",
    title: "Modulation Station",
    status: "2024",
    duration: "2024",
    disciplines: "Identity",
    role: "Designer",
    context: "Modulation Station is an EDM artist and content creator. He creates music with a cinematic feel that inspires emotional connection.",
    hero: { src: "images/mod/rebelle.png", alt: "Modulation Station — Rebelle" },
    problem:  { body: "Placeholder problem — describe the constraints, questions, or tensions that shaped the work. Replace with real copy.", blocks: [{ type: "image", src: "images/mod/Frame 6.png", alt: "" }] },
    strategy: { body: "Placeholder strategy — outline the approach, references, and decisions that moved the project forward. Replace with real copy.", blocks: [{ type: "image", src: "images/mod/Sound waves.png", alt: "" }, { type: "placeholder", aspect: "1/1" }] },
    solution: { body: "", blocks: [{ type: "placeholder", aspect: "16/9" }] }
  },
  {
    slug: "utopos",
    title: "Utopos",
    status: "2024",
    duration: "2024",
    disciplines: "Book Design, Identity",
    role: "Designer",
    context:
      "Utopos is a digital archive of the past. The long-term goal is to build a visual identity that encapsulates the Art Deco, Streamline Moderne and Nuclear Age design movements.",
    hero: { src: "images/utopos/Utopos_Book.png", alt: "Utopos book" },
    problem: {
      body: "Placeholder problem — describe the constraints, questions, or tensions that shaped the work. Replace with real copy.",
      blocks: [
        { type: "video", src: "images/utopos/Utopos_Files_AI_Harpy_Vid_1.mp4", autoplay: true, muted: true, loop: false },
        { type: "text", body: "Placeholder text — replace with real copy." },
        { type: "twoUp", left: { src: "images/utopos/Frame 54.png", alt: "" }, right: { src: "images/utopos/Frame 55.png", alt: "" } }
      ]
    },
    strategy: {
      body: "Placeholder strategy — outline the approach, references, and decisions that moved the project forward. Replace with real copy.",
      blocks: [
        {
          type: "split",
          left: { src: "images/utopos/Frame 19.png", alt: "" },
          right: {
            media: { src: "images/utopos/loop.gif", alt: "" },
            title: "An archive of the past —",
            body: "Placeholder body — replace with real copy describing the visual approach, references, and how the marks evolve across the system.\n\nSecond paragraph — placeholder for additional context, process notes, or a quote that frames the work."
          }
        },
        { type: "video", src: "images/utopos/utopos_2.MOV", framed: true, autoplay: true, muted: true, loop: true }
      ]
    },
    solution: {
      body:
        "The project began as a collection of generative drawings and grew into a printed volume. Every spread had to feel like a found document — sourced, not designed. Typography is set in Pitch Sans throughout, with extended sections of unjustified body text and full-bleed plates.",
      blocks: [{ type: "placeholder", aspect: "16/9" }]
    }
  }
];
