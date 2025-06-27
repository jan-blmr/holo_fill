import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { TubeGeometry } from "three";

// @ts-ignore
window.THREE = THREE;
// @ts-ignore
window.OrbitControls = OrbitControls;
// @ts-ignore
window.FontLoader = FontLoader;
// @ts-ignore
window.TextGeometry = TextGeometry;
// @ts-ignore
window.TubeGeometry = TubeGeometry; // Expose TubeGeometry for generated code

interface ThreejsViewerProps {
  code: string;
  uploadedImage: HTMLImageElement | null;
}

function stripCodeBlock(code: string): string {
  // Remove triple backticks and optional language tag
  return code.replace(/^```[a-z]*\n?/i, "").replace(/```$/, "");
}

export function ThreejsViewer({ code, uploadedImage }: ThreejsViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.innerHTML = "";
    try {
      const cleanCode = stripCodeBlock(code).replace(
        /TorusBufferGeometry/g,
        "TorusGeometry"
      );
      // eslint-disable-next-line no-new-func
      const runThreeCode = new Function(
        "container",
        "THREE",
        "OrbitControls",
        "uploadedImage",
        cleanCode
      );
      runThreeCode(container, THREE, OrbitControls, uploadedImage);
    } catch (e) {
      container.innerHTML =
        '<div style="color:red">Error rendering Three.js scene</div>';
      // Optionally log error
      console.error(e);
    }
    return () => {
      if (container) container.innerHTML = "";
    };
  }, [code, uploadedImage]);

  return <div ref={containerRef} style={{ width: "100%", height: 384 }} />;
}
