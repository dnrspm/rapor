import type { CSSProperties } from "react";
import { reflectionQuestions } from "@/lib/content";
import styles from "./ReflectionHero.module.css";

type Layer = { id: string; inset: string; maskPosition?: string };

const base = "/assets/hero";
const maskImage = `url(${base}/c2326.svg)`;
const maskSize = "125.03px 195.099px";

/** Layers of "img-hero illustration-reflection", positioned exactly as in Figma. */
const layers: Layer[] = [
  { id: "8a10c", inset: "48.11% 0 32.44% 8.44%" },
  { id: "51473", inset: "0 0 0 3.99%" },
  { id: "f4ae2", inset: "36.13% 29.72% 28.41% 61.29%" },
  { id: "2092b", inset: "4.1% 15.51% 50.32% 64.69%" },
  { id: "12fe3", inset: "41.5% 6.78% 0 59.1%" },
  { id: "3e9b5", inset: "97.95% 35.01% 0 60.29%" },
  { id: "495b0", inset: "46.32% 15.66% 0 58.87%" },
  { id: "efdc4", inset: "3.92% 45.75% 3.38% 19.94%" },
  { id: "c76a9", inset: "6.72% 46.88% 6.18% 21.06%" },
  {
    id: "9e435",
    inset: "57.12% 46.88% 6.18% 21.06%",
    maskPosition: "0px -112.891px",
  },
  {
    id: "7a768",
    inset: "80.15% 46.88% 10.64% 44.95%",
    maskPosition: "-93.156px -164.469px",
  },
  {
    id: "61094",
    inset: "6.72% 46.88% 26.75% 21.06%",
    maskPosition: "-0.008px 0.01px",
  },
  {
    id: "52888",
    inset: "10.35% 41.03% 4.72% 21.06%",
    maskPosition: "0px -8.135px",
  },
  { id: "a39c9", inset: "4.08% 46.88% 3.7% 18.84%" },
  { id: "efcf4", inset: "5.14% 45.66% 73.54% 43.11%" },
];

function layerStyle({ inset, maskPosition }: Layer): CSSProperties {
  if (!maskPosition) return { inset };
  return {
    inset,
    maskImage,
    WebkitMaskImage: maskImage,
    maskSize,
    WebkitMaskSize: maskSize,
    maskPosition,
    WebkitMaskPosition: maskPosition,
    maskRepeat: "no-repeat",
    WebkitMaskRepeat: "no-repeat",
    maskMode: "alpha",
    maskClip: "no-clip",
    WebkitMaskClip: "no-clip",
  };
}

function Illustration() {
  return (
    <div className={styles.illustration} aria-hidden="true">
      {layers.map((layer) => (
        <div key={layer.id} className={styles.layer} style={layerStyle(layer)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${base}/${layer.id}.svg`} alt="" draggable={false} />
        </div>
      ))}
    </div>
  );
}

export function ReflectionHero() {
  return (
    <section className={styles.card} aria-labelledby="reflection-title">
      <Illustration />
      <h2 id="reflection-title" className={styles.title}>
        Mari berhenti dan berpikir sejenak...
      </h2>
      <ul className={styles.dialogue}>
        {reflectionQuestions.map((question) => (
          <li key={question} className={styles.bubble}>
            {question}
          </li>
        ))}
      </ul>
    </section>
  );
}
