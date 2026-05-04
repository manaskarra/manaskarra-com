export type Project = {
  title: string;
  description: string;
  year: string;
  stack: readonly string[];
  links: ReadonlyArray<{ label: string; href: string }>;
};

export const projects: readonly Project[] = [
  {
    title: "gitbiz",
    description:
      "LLM-powered discovery of GitHub repos with credible paths to revenue. Reads stars, issues, and contributor signal to surface open-source projects that could plausibly become businesses.",
    year: "apr 2026",
    stack: ["Python", "agentic", "opportunity scoring", "repo analysis"],
    links: [
      { label: "feed", href: "/gitbiz" },
      { label: "github", href: "https://github.com/manaskarra/gitbiz" },
    ],
  },
  {
    title: "verd",
    description:
      "Multi-LLM debate engine. Runs the same question past multiple models, surfaces where they disagree, and returns a higher-confidence answer with its reasoning trail intact.",
    year: "mar 2026",
    stack: ["Python", "multi-model", "llm-as-a-judge", "consensus"],
    links: [
      { label: "github", href: "https://github.com/manaskarra/verd" },
    ],
  },
  {
    title: "RagaXonic",
    description:
      "A 3-layer LSTM that generates polyphonic MIDI by blending Hindustani ragas with Western chord progressions. Trained on MIDI sequences and wrapped in a Gradio UI with temperature and note-count controls.",
    year: "jan 2025",
    stack: ["Python", "TensorFlow", "LSTM", "Gradio"],
    links: [
      { label: "github", href: "https://github.com/manaskarra/RagaXonic-DL" },
    ],
  },
  {
    title: "ANPR",
    description:
      "An OpenCV pipeline that isolates number plates from vehicle images, runs Tesseract OCR on the crop, and logs each read with a timestamp to CSV. Classic computer-vision stack doing unglamorous, useful work.",
    year: "feb 2024",
    stack: ["Python", "OpenCV", "Tesseract", "OCR"],
    links: [
      { label: "github", href: "https://github.com/manaskarra/ANPR-CV" },
    ],
  },
];
