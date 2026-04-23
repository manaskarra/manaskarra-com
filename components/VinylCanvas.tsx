"use client";

/**
 * Hybrid vinyl × circuit disc.
 *
 * The vinyl silhouette is kept intact (perfect circular grooves, dark disc).
 * The AI/tech read comes from two subtle details:
 *   1. Three grooves glow in the site accent color — like "lit data tracks"
 *   2. The center label has PCB-style circuit traces (radial spokes + node
 *      dots at the ends), making it look like a chip face instead of a
 *      plain label.
 */

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

// ─── Logo sticker helpers ────────────────────────────────────────────────────

type LogoDef = {
  id: string;
  bg: string;
  fg: string;
  /** polar radius on the disc surface */
  r: number;
  /** polar angle in degrees */
  angleDeg: number;
  /** visual tilt of the sticker in degrees */
  rotateDeg: number;
  /** 3-D square size in world units */
  size3d: number;
  /** SVG viewBox dimension (assumed square) */
  viewBoxSize: number;
  /** true for stroke-only logos (e.g. FL Studio outline bird) */
  useStroke?: boolean;
  /** one or more SVG path `d` strings */
  paths: string[];
};

const LOGO_STICKERS: LogoDef[] = [
  {
    id: "openai",
    bg: "#000000", fg: "#ffffff",
    r: 0.70, angleDeg: 38, rotateDeg: -18,
    size3d: 0.24, viewBoxSize: 24,
    paths: [
      "M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z",
    ],
  },
  {
    id: "claude",
    bg: "#c96442", fg: "#ffffff",
    r: 1.05, angleDeg: 150, rotateDeg: 14,
    size3d: 0.24, viewBoxSize: 24,
    paths: [
      "m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z",
    ],
  },
  {
    id: "cursor",
    bg: "#14111f", fg: "#8a88ff",
    r: 0.78, angleDeg: 250, rotateDeg: -9,
    size3d: 0.24, viewBoxSize: 24,
    paths: [
      "M11.503.131 1.891 5.678a.84.84 0 0 0-.42.726v11.188c0 .3.162.575.42.724l9.609 5.55a1 1 0 0 0 .998 0l9.61-5.55a.84.84 0 0 0 .42-.724V6.404a.84.84 0 0 0-.42-.726L12.497.131a1.01 1.01 0 0 0-.996 0M2.657 6.338h18.55c.263 0 .43.287.297.515L12.23 22.918c-.062.107-.229.064-.229-.06V12.335a.59.59 0 0 0-.295-.51l-9.11-5.257c-.109-.063-.064-.23.061-.23",
    ],
  },
  {
    id: "flstudio",
    bg: "#f56100", fg: "#ffffff",
    r: 1.12, angleDeg: 320, rotateDeg: 9,
    size3d: 0.24, viewBoxSize: 48,
    useStroke: true,
    paths: [
      "m14.8098,16.1949c-1.1893,2.0813-2.3786,5.5501-2.7751,7.6314-1.3875,7.0368.1982,18.2361,3.9644,19.5245,3.8653,1.2884,10.3074-6.0457,13.4789-11.3976,1.3875-2.2795,2.676-6.2439,2.9733-9.1181",
      "m24.6217,11.9332c-.7929-1.3875-2.8742-3.3697-4.8564-3.2706h0c-4.2617.0991-7.8296,3.9644-7.3341,6.7394.3964,1.6849,3.9644.1982,7.8296-.7929",
      "m30.1718,18.8709c1.4866,2.4777,3.1715,5.451,4.559,5.451,2.4777.0991,2.2795-6.5412-.4955-9.6136-1.0902-1.2884-3.7662-1.8831-5.8474-1.2884",
      "m26.5047,12.627c4.8564,1.6849,4.1626,4.4599,3.3697,6.2439-.9911,2.4777-4.1626,5.2528-6.7394,4.4599h0c-2.5768-.7929-4.1626-5.3519-2.4777-9.6136.9911-2.4777,3.3697-1.8831,5.8475-1.0902Z",
      "m32.6495,4.5c-.9911.6938-2.1804,1.784-3.2706,3.2706-1.0902,1.4866-2.3786,3.667-2.8742,4.7572",
    ],
  },
  {
    id: "beatstars",
    bg: "#0d0d0d", fg: "#22c55e",
    r: 0.90, angleDeg: 95, rotateDeg: -5,
    size3d: 0.24, viewBoxSize: 24,
    paths: [
      "m17.217 11.996-3.308 1.079v3.478l-2.052-2.818-3.309 1.079 2.043-2.818-2.043-2.819 3.31 1.08 2.05-2.819v3.487zm0 0v7.277H6.854V4.584h10.363v7.412l4.585-1.49v-7.67L19.135 0H2.198v24h16.92l2.684-2.685v-7.83z",
    ],
  },
];

function createLogoTexture(def: LogoDef): THREE.CanvasTexture {
  const SIZE = 128;
  const PAD = 18;
  const canvas = document.createElement("canvas");
  canvas.width = SIZE;
  canvas.height = SIZE;
  const ctx = canvas.getContext("2d")!;

  // Rounded-square badge background
  ctx.beginPath();
  if (ctx.roundRect) {
    ctx.roundRect(0, 0, SIZE, SIZE, 14);
  } else {
    ctx.rect(0, 0, SIZE, SIZE);
  }
  ctx.fillStyle = def.bg;
  ctx.fill();

  // Subtle border
  ctx.strokeStyle = "rgba(255,255,255,0.14)";
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Render the SVG logo via Path2D
  const logoSize = SIZE - PAD * 2;
  const scale = logoSize / def.viewBoxSize;

  ctx.save();
  ctx.translate(PAD, PAD);
  ctx.scale(scale, scale);

  if (def.useStroke) {
    ctx.strokeStyle = def.fg;
    ctx.lineWidth = 2.2 / scale;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.fillStyle = "transparent";
    for (const d of def.paths) {
      ctx.stroke(new Path2D(d));
    }
  } else {
    ctx.fillStyle = def.fg;
    for (const d of def.paths) {
      ctx.fill(new Path2D(d));
    }
  }

  ctx.restore();

  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

function Stickers({ y }: { y: number }) {
  const textures = useMemo(() => LOGO_STICKERS.map(createLogoTexture), []);
  return (
    <>
      {LOGO_STICKERS.map((d, i) => {
        const a = (d.angleDeg * Math.PI) / 180;
        const x = Math.cos(a) * d.r;
        const z = Math.sin(a) * d.r;
        const rot = (d.rotateDeg * Math.PI) / 180;
        return (
          <group key={d.id} position={[x, y, z]} rotation={[0, rot, 0]}>
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[d.size3d, d.size3d]} />
              <meshBasicMaterial map={textures[i]} transparent opacity={0.94} />
            </mesh>
          </group>
        );
      })}
    </>
  );
}

const GROOVE_RADII = [0.55, 0.66, 0.77, 0.89, 1.01, 1.12, 1.23, 1.34, 1.46, 1.55];

// Indices that glow in accent — "lit data tracks"
const ACCENT_SET = new Set([2, 5, 8]);

/**
 * Animated neural network on the label face.
 *
 * Each node pulses independently (different phase = asynchronous firing).
 * Tiny bright "signal" spheres travel along every edge from layer to layer,
 * staggered so the forward pass (L1 → L2 → L3) is clearly visible.
 */

// [x, z] layout for the 3-layer network on the XZ plane
const NN_LAYERS: [number, number][][] = [
  [
    [-0.18, -0.10],
    [-0.18, 0],
    [-0.18, 0.10],
  ],
  [
    [-0.04, -0.13],
    [-0.04, -0.04],
    [-0.04, 0.04],
    [-0.04, 0.13],
  ],
  [
    [0.16, -0.07],
    [0.16, 0.07],
  ],
];

// Deterministic phase offsets per node so they all fire at different times
const NN_PHASES = [
  [0.0, 2.1, 4.2],
  [0.8, 1.9, 3.1, 4.7],
  [1.4, 3.3],
];

// Build the full edge list once (module scope = stable reference)
type EdgeDef = {
  ax: number; az: number;
  bx: number; bz: number;
  key: string;
  /** When in the 4s cycle this signal starts its journey */
  signalDelay: number;
};

const NN_EDGES: EdgeDef[] = NN_LAYERS.flatMap((layer, li) => {
  if (li >= NN_LAYERS.length - 1) return [];
  const nextLayer = NN_LAYERS[li + 1];
  const totalEdges = layer.length * nextLayer.length;
  return layer.flatMap(([ax, az], ai) =>
    nextLayer.map(([bx, bz], bi) => {
      const idx = ai * nextLayer.length + bi;
      // L1→L2 signals spread across 0–1.4 s; L2→L3 follow at 1.8–2.8 s
      const base = li === 0 ? 0 : 1.8;
      const spread = li === 0 ? 1.4 : 1.0;
      return {
        ax, az, bx, bz,
        key: `e-${li}-${ai}-${bi}`,
        signalDelay: base + (idx / totalEdges) * spread,
      };
    })
  );
});

/** A single neuron: pulses its emissive glow with a unique phase. */
function AnimatedNode({
  x, z, y, phase,
}: {
  x: number; z: number; y: number; phase: number;
}) {
  const matRef = useRef<THREE.MeshStandardMaterial>(null!);
  useFrame(({ clock }) => {
    // Sine ranges emissiveIntensity from 0.4 → 2.2
    matRef.current.emissiveIntensity =
      0.4 + ((Math.sin(clock.elapsedTime * 2.8 + phase) + 1) / 2) * 1.8;
  });
  return (
    <mesh position={[x, y, z]}>
      <sphereGeometry args={[0.019, 8, 8]} />
      <meshStandardMaterial
        ref={matRef}
        color="#a8a6ff"
        emissive="#a8a6ff"
        emissiveIntensity={1.0}
      />
    </mesh>
  );
}

/** A bright dot that travels from node A to node B, then disappears until
 *  the next cycle. */
function SignalDot({
  ax, az, bx, bz, y, delay,
}: {
  ax: number; az: number; bx: number; bz: number;
  y: number; delay: number;
}) {
  const PERIOD = 4.2; // full cycle length in seconds
  const TRAVEL = 0.55; // fraction of the period the signal is "on"
  const meshRef = useRef<THREE.Mesh>(null!);
  const matRef = useRef<THREE.MeshStandardMaterial>(null!);

  useFrame(({ clock }) => {
    const t = ((clock.elapsedTime + delay) % PERIOD) / PERIOD;
    if (t > TRAVEL) {
      meshRef.current.visible = false;
      return;
    }
    meshRef.current.visible = true;
    const progress = t / TRAVEL;
    meshRef.current.position.set(
      ax + (bx - ax) * progress,
      y,
      az + (bz - az) * progress
    );
    // Fade in quickly, fade out near the destination
    matRef.current.emissiveIntensity = Math.sin(progress * Math.PI) * 3.5;
  });

  return (
    <mesh ref={meshRef} position={[ax, y, az]}>
      <sphereGeometry args={[0.012, 6, 6]} />
      <meshStandardMaterial
        ref={matRef}
        color="#ffffff"
        emissive="#ffffff"
        emissiveIntensity={2}
      />
    </mesh>
  );
}

function NeuralNet({ y }: { y: number }) {
  return (
    <>
      {/* Static dim edge lines — structural scaffold */}
      {NN_EDGES.map(({ ax, az, bx, bz, key }) => {
        const dx = bx - ax;
        const dz = bz - az;
        const len = Math.sqrt(dx * dx + dz * dz);
        const angle = Math.atan2(dz, dx);
        return (
          <mesh
            key={key}
            position={[(ax + bx) / 2, y, (az + bz) / 2]}
            rotation={[0, -angle, 0]}
          >
            <boxGeometry args={[len, 0.002, 0.004]} />
            <meshStandardMaterial
              color="#6b68fc"
              emissive="#6b68fc"
              emissiveIntensity={0.25}
              transparent
              opacity={0.45}
            />
          </mesh>
        );
      })}

      {/* Pulsing nodes */}
      {NN_LAYERS.map((layer, li) =>
        layer.map(([x, z], ni) => (
          <AnimatedNode
            key={`n-${li}-${ni}`}
            x={x}
            z={z}
            y={y}
            phase={NN_PHASES[li][ni]}
          />
        ))
      )}

      {/* Traveling signal dots */}
      {NN_EDGES.map(({ ax, az, bx, bz, key, signalDelay }) => (
        <SignalDot
          key={`s-${key}`}
          ax={ax}
          az={az}
          bx={bx}
          bz={bz}
          y={y + 0.003}
          delay={signalDelay}
        />
      ))}
    </>
  );
}

function HybridDisc() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state, delta) => {
    const g = groupRef.current;
    const t = state.clock.elapsedTime;

    // Spinning-coin wobble: tilt vector precesses around Y axis.
    // sin/cos at the same frequency traces a circle → the disc tilts and
    // rotates that tilt direction slowly, exactly like a coin settling.
    const TILT      = 0.26 + Math.sin(t * 0.12) * 0.04; // subtle nod
    const PRECESS   = 0.38; // how fast the tilt direction rotates (rad/s)
    const SPIN      = 1.1;  // disc self-spin speed (rad/s)

    const wobbleX = Math.sin(t * PRECESS) * TILT;
    const wobbleZ = Math.cos(t * PRECESS) * TILT;

    // Lerp toward wobble target + mouse offset
    g.rotation.x = THREE.MathUtils.lerp(
      g.rotation.x,
      wobbleX + state.mouse.y * 0.10,
      0.05
    );
    g.rotation.z = THREE.MathUtils.lerp(
      g.rotation.z,
      wobbleZ - state.mouse.x * 0.08,
      0.05
    );

    // Fast self-spin (like a coin just dropped)
    g.rotation.y += delta * SPIN;

    // Gentle vertical float
    g.position.y = Math.sin(t * 0.55) * 0.07;
  });

  return (
    <group ref={groupRef}>
      {/* ── Main disc ── */}
      <mesh>
        <cylinderGeometry args={[1.6, 1.6, 0.048, 128]} />
        <meshStandardMaterial
          color="#0b0b12"
          metalness={0.55}
          roughness={0.12}
        />
      </mesh>

      {/* ── Groove rings — top face ── */}
      {GROOVE_RADII.map((r, i) => {
        const accent = ACCENT_SET.has(i);
        return (
          <mesh key={`gt-${i}`} position={[0, 0.026, 0]}>
            <torusGeometry args={[r, 0.006, 6, 128]} />
            <meshStandardMaterial
              color={accent ? "#4a47f5" : "#0f0f1a"}
              emissive={accent ? "#3734eb" : "#000000"}
              emissiveIntensity={accent ? 0.6 : 0}
              roughness={0.55}
            />
          </mesh>
        );
      })}

      {/* ── Groove rings — bottom face ── */}
      {GROOVE_RADII.map((r, i) => (
        <mesh key={`gb-${i}`} position={[0, -0.026, 0]}>
          <torusGeometry args={[r, 0.006, 6, 128]} />
          <meshStandardMaterial color="#0f0f1a" roughness={0.55} />
        </mesh>
      ))}

      {/* ── Center label ── */}
      <mesh position={[0, 0.029, 0]}>
        <cylinderGeometry args={[0.37, 0.37, 0.014, 64]} />
        <meshStandardMaterial
          color="#3734eb"
          roughness={0.32}
          metalness={0.2}
          emissive="#2420c0"
          emissiveIntensity={0.3}
        />
      </mesh>
      <mesh position={[0, -0.029, 0]}>
        <cylinderGeometry args={[0.37, 0.37, 0.014, 64]} />
        <meshStandardMaterial
          color="#3734eb"
          roughness={0.32}
          metalness={0.2}
          emissive="#2420c0"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* ── Neural network diagram on label face ── */}
      <NeuralNet y={0.038} />

      {/* ── Brand stickers on disc surface ── */}
      <Stickers y={0.032} />

      {/* ── Spindle hole ── */}
      <mesh>
        <cylinderGeometry args={[0.048, 0.048, 0.1, 32]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
    </group>
  );
}

export default function VinylCanvas({ className }: { className?: string }) {
  return (
    <Canvas
      className={className}
      camera={{ position: [0, 2.2, 4.5], fov: 36 }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 2]}
      aria-hidden="true"
    >
      <ambientLight intensity={0.45} color="#e0e0ff" />
      <pointLight position={[4, 5, 3]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-2.5, -3, 1]} intensity={1.0} color="#6b68fc" />
      <HybridDisc />
    </Canvas>
  );
}
