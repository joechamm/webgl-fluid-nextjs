"use client";

import Image from "next/image";
import { NextPage } from "next";
import Header from "@/components/header";
import Canvas from "@/components/canvas";
import Button from "@/components/button";
import AppConfigSelectItem from "@/components/app-config-select-item";
import AppConfigSelectSection, { AppConfigSelectType, AppConfigSectionProps} from "@/components/app-config-select-section";
import { createSimulation, initializeSimulation, reset, Simulation } from "@/lib/fluid/Simulation";
import { FluidApp, webGLStart } from "@/lib/fluid/app";
import { useState, useEffect, use, useRef, RefObject, useLayoutEffect } from "react";
import { useWebGL } from "@/hooks/useWebGL";
import { toggleBallOn, togglePause, toggleWallsOn } from "@/lib/utils/SimulationStateHandlers";

let cached = global.app;

const Home: NextPage = () => {
  const [sim, setSim] = useState<Simulation | null>();
  const [gl, setGL] = useState<WebGL2RenderingContext | null>();

  const canvasRef: RefObject<HTMLCanvasElement> = useRef<HTMLCanvasElement>(null);
 
  useLayoutEffect(() => {
    try {

      if(!canvasRef.current) {
        throw new Error('Failed to get canvas ref');
      }
      const options = { alpha: true, antialias: false, depth: false, premultipliedAlpha: false };
      
      const gl = canvasRef.current.getContext('webgl2', options) as WebGL2RenderingContext;
      if(!gl) {
        throw new Error('Failed to get WebGL2 context');
      }

      if(!sim) {
        const s = createSimulation(gl as WebGL2RenderingContext);
        if(!s) {
          throw new Error('Failed to create simulation');
        }

        if(!initializeSimulation(s)) {
          throw new Error('Failed to initialize simulation');
        }

        setSim(s);
      }

      cached.canvas = canvasRef.current;
      cached.gl = gl;
      cached.sim = sim as Simulation;

      gl.clearColor(0.0, 0.0, 0.0, 0.0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      
    } catch (error) {
      console.error(error);
    }
  }, [canvasRef, sim]);

  if(!sim) {
    return <div>Loading...</div>;
  }

  let props: AppConfigSectionProps = {
    sim: sim,
    type: [
      AppConfigSelectType.ImpulseConfiguration,
      AppConfigSelectType.SourceConfiguration,
      AppConfigSelectType.MouseConfiguration,
      AppConfigSelectType.CurrentDisplayProgram,
      AppConfigSelectType.InitialVelocityTemperatureConfiguration,
    ],
  };

  return (
    <div>
      <Header>
        <h1>Fluid Simulation</h1>
      </Header>
      <main className="layout-grid">
        <div id="app-container" className="container">
          <div id="top-row" className="top-row">
            <Canvas />
          </div>
          {/* <div id="configurations" className="configurations">
            <AppConfigSelectSection {...props}>
              <div id="App Toggles" className="buttonContainer">
                <label htmlFor="toggle-pause">Pause</label>
                <Button
                  clickHandler={() => {
                    togglePause(sim);
                  }}
                >
                  Pause Simulation
                </Button>
                <br />
                <label htmlFor="toggle-ball">Ball</label>
                <Button
                  clickHandler={() => {
                    toggleBallOn(sim);
                  }}
                >
                  Toggle Ball
                </Button>
                <br />
                <label htmlFor="toggle-walls">Walls</label>
                <Button
                  clickHandler={() => {
                    toggleWallsOn(sim);
                  }}
                >
                  Toggle Walls
                </Button>
              </div>
              <div id="App Buttons" className="buttonContainer">
                <label htmlFor="reset-simulation">Reset</label>
                <Button
                  clickHandler={() => {
                    reset(sim);
                  }}
                >
                  Reset Simulation
                </Button>
              </div>
            </AppConfigSelectSection>
          </div> */}
        </div>
      </main>
    </div>
  );
};

export default Home;

// export default function Home() {
//   return (
//     <main className="flex min-h-screen flex-col items-center justify-between p-24">
//       <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
//         <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
//           Get started by editing&nbsp;
//           <code className="font-mono font-bold">src/app/page.tsx</code>
//         </p>
//         <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
//           <a
//             className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
//             href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             By{" "}
//             <Image
//               src="/vercel.svg"
//               alt="Vercel Logo"
//               className="dark:invert"
//               width={100}
//               height={24}
//               priority
//             />
//           </a>
//         </div>
//       </div>

//       <div className="relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
//         <Image
//           className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
//           src="/next.svg"
//           alt="Next.js Logo"
//           width={180}
//           height={37}
//           priority
//         />
//       </div>

//       <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
//         <a
//           href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2 className="mb-3 text-2xl font-semibold">
//             Docs{" "}
//             <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
//               -&gt;
//             </span>
//           </h2>
//           <p className="m-0 max-w-[30ch] text-sm opacity-50">
//             Find in-depth information about Next.js features and API.
//           </p>
//         </a>

//         <a
//           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2 className="mb-3 text-2xl font-semibold">
//             Learn{" "}
//             <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
//               -&gt;
//             </span>
//           </h2>
//           <p className="m-0 max-w-[30ch] text-sm opacity-50">
//             Learn about Next.js in an interactive course with&nbsp;quizzes!
//           </p>
//         </a>

//         <a
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2 className="mb-3 text-2xl font-semibold">
//             Templates{" "}
//             <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
//               -&gt;
//             </span>
//           </h2>
//           <p className="m-0 max-w-[30ch] text-sm opacity-50">
//             Explore starter templates for Next.js.
//           </p>
//         </a>

//         <a
//           href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2 className="mb-3 text-2xl font-semibold">
//             Deploy{" "}
//             <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
//               -&gt;
//             </span>
//           </h2>
//           <p className="m-0 max-w-[30ch] text-balance text-sm opacity-50">
//             Instantly deploy your Next.js site to a shareable URL with Vercel.
//           </p>
//         </a>
//       </div>
//     </main>
//   );
// }
