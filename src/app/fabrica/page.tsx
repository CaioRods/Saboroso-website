"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, Rotate3d, Info, Check, Eye } from "lucide-react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactModal from "@/components/ContactModal";
import { useWaveTransition } from "@/components/WaveTransition";

interface SectionInfo {
  title: string;
  subtitle: string;
  desc: string;
  details: string[];
}

const factorySections: Record<string, SectionInfo> = {
  general: {
    title: "Visão Geral da Fábrica",
    subtitle: "Estrutura de Alta Performance",
    desc: "Nossa planta industrial em Lucélia-SP combina a tradição da fermentação lenta com tecnologia de ponta em filtragem, refino e envase automatizado.",
    details: [
      "Capacidade: +10 milhões de litros/ano",
      "Processo de fermentação 100% controlado",
      "Automação alemã de envase e rotulagem",
      "Energia limpa e tratamento integral de efluentes",
    ],
  },
  silos: {
    title: "Silos de Fermentação",
    subtitle: "O Coração da Saboroso",
    desc: "Tanques cilíndricos gigantes de aço inoxidável (AISI 316L) onde o álcool e o mosto de maçã passam pelo processo de acetificação aeróbica controlada.",
    details: [
      "Sensores de temperatura em tempo real",
      "Oxigenação contínua por microdifusores",
      "Ciclo de fermentação otimizado",
      "Isolamento térmico de alta densidade",
    ],
  },
  warehouse: {
    title: "Prédio de Envase e Controle",
    subtitle: "Precisão e Higiene Máxima",
    desc: "Área estéril onde o vinagre é filtrado por membranas de carvão ativado, envasado em garrafas PET sopradas na própria linha, tampado e rotulado automaticamente.",
    details: [
      "Filtros de polimento sub-mícron",
      "Envasadoras rotativas por gravidade",
      "Sopradora de PET integrada à linha",
      "Rastreabilidade por lote a laser",
    ],
  },
  piping: {
    title: "Linhas de Tubulação",
    subtitle: "Transporte Hermético",
    desc: "Tubulações de aço sanitário polido que conectam os silos de armazenamento diretamente às linhas de envase sem qualquer contato com o ar externo.",
    details: [
      "Limpeza automatizada CIP (Clean-in-Place)",
      "Válvulas borboleta pneumáticas",
      "Fluxo laminar livre de sedimentos",
      "Garantia contra contaminação cruzada",
    ],
  },
};

export default function Fabrica3DPage() {
  const { transitionTo } = useWaveTransition();
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState<SectionInfo>(factorySections.general);
  const [hoveredPart, setHoveredPart] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    // Dimensions
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // Scene & Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#181512"); // Dark brand charcoal
    scene.fog = new THREE.FogExp2("#181512", 0.025);

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(22, 14, 22);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: false,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2.1; // Prevent going underground
    controls.minDistance = 10;
    controls.maxDistance = 50;
    controls.target.set(0, 2, 0);

    // Lighting
    const ambientLight = new THREE.AmbientLight("#403b35", 0.8);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight("#fcecd2", 1.8);
    sunLight.position.set(15, 25, 10);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.bias = -0.0005;
    scene.add(sunLight);

    // Accent Point Lights (Neon Glows)
    const goldLight = new THREE.PointLight("#C5A880", 2, 12);
    goldLight.position.set(-3, 4, 3);
    scene.add(goldLight);

    const redLight = new THREE.PointLight("#7A0C11", 2.5, 12);
    redLight.position.set(4, 3, -2);
    scene.add(redLight);

    // Grid Helper on ground
    const gridHelper = new THREE.GridHelper(60, 60, "#C5A880", "#2c2722");
    gridHelper.position.y = -0.05;
    (gridHelper.material as THREE.Material).opacity = 0.25;
    (gridHelper.material as THREE.Material).transparent = true;
    scene.add(gridHelper);

    // Ground Platform
    const groundGeo = new THREE.BoxGeometry(60, 0.1, 60);
    const groundMat = new THREE.MeshStandardMaterial({
      color: "#1f1b17",
      roughness: 0.8,
      metalness: 0.2,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.position.y = -0.1;
    ground.receiveShadow = true;
    scene.add(ground);

    // Interactive objects array
    const interactiveObjects: THREE.Object3D[] = [];

    // --- FACTORY GEOMETRY BUILDING ---

    // 1. Silos Group (Coração da Fábrica)
    const silosGroup = new THREE.Group();
    silosGroup.name = "silos";
    
    const siloGeo = new THREE.CylinderGeometry(1.6, 1.6, 8, 16);
    const siloMat = new THREE.MeshStandardMaterial({
      color: "#b0b0b0",
      metalness: 0.95,
      roughness: 0.15,
    });

    const domeGeo = new THREE.SphereGeometry(1.6, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2);

    const siloPositions = [
      { x: -7, z: -3 },
      { x: -7, z: 2 },
      { x: -3, z: -3 },
      { x: -3, z: 2 },
    ];

    siloPositions.forEach((pos, idx) => {
      const silo = new THREE.Mesh(siloGeo, siloMat);
      silo.position.set(pos.x, 4, pos.z);
      silo.castShadow = true;
      silo.receiveShadow = true;

      const dome = new THREE.Mesh(domeGeo, siloMat);
      dome.position.set(pos.x, 8, pos.z);
      dome.castShadow = true;
      silosGroup.add(silo, dome);
    });

    scene.add(silosGroup);
    // Add child meshes as interactive reference
    silosGroup.children.forEach(c => {
      c.userData = { section: "silos" };
      interactiveObjects.push(c);
    });

    // 2. Main Building (Glass Warehouse)
    const warehouseGroup = new THREE.Group();
    warehouseGroup.name = "warehouse";

    // Concrete Base
    const baseGeo = new THREE.BoxGeometry(10, 1.2, 12);
    const baseMat = new THREE.MeshStandardMaterial({ color: "#2d2721", roughness: 0.6 });
    const base = new THREE.Mesh(baseGeo, baseMat);
    base.position.set(5, 0.6, 0);
    base.castShadow = true;
    base.receiveShadow = true;
    warehouseGroup.add(base);

    // Frame Pillars
    const pillarGeo = new THREE.BoxGeometry(0.4, 6.8, 0.4);
    const frameMat = new THREE.MeshStandardMaterial({ color: "#181512", metalness: 0.8, roughness: 0.2 });
    
    const pillarCoords = [
      { x: 0.2, z: -5.8 }, { x: 0.2, z: 5.8 },
      { x: 9.8, z: -5.8 }, { x: 9.8, z: 5.8 },
      { x: 5, z: -5.8 }, { x: 5, z: 5.8 }
    ];

    pillarCoords.forEach(c => {
      const pillar = new THREE.Mesh(pillarGeo, frameMat);
      pillar.position.set(c.x + 0.1, 4, c.z);
      pillar.castShadow = true;
      warehouseGroup.add(pillar);
    });

    // Glass Walls
    const wallGeo = new THREE.BoxGeometry(9.6, 5.6, 0.1);
    const glassMat = new THREE.MeshStandardMaterial({
      color: "#c5a880",
      transparent: true,
      opacity: 0.18,
      roughness: 0.1,
      metalness: 0.9,
    });

    const frontWall = new THREE.Mesh(wallGeo, glassMat);
    frontWall.position.set(5, 4, 5.8);
    
    const backWall = new THREE.Mesh(wallGeo, glassMat);
    backWall.position.set(5, 4, -5.8);

    const sideWallGeo = new THREE.BoxGeometry(0.1, 5.6, 11.6);
    const leftWall = new THREE.Mesh(sideWallGeo, glassMat);
    leftWall.position.set(0.2, 4, 0);
    
    const rightWall = new THREE.Mesh(sideWallGeo, glassMat);
    rightWall.position.set(9.8, 4, 0);

    warehouseGroup.add(frontWall, backWall, leftWall, rightWall);

    // Roof
    const roofGeo = new THREE.BoxGeometry(10.6, 0.4, 12.6);
    const roof = new THREE.Mesh(roofGeo, frameMat);
    roof.position.set(5, 6.8, 0);
    roof.castShadow = true;
    warehouseGroup.add(roof);

    // Bottling Line inside (Aesthetic cylinders/conveyor)
    const conveyorGeo = new THREE.BoxGeometry(8, 0.3, 1.2);
    const conveyor = new THREE.Mesh(conveyorGeo, frameMat);
    conveyor.position.set(5, 1.35, 0);
    warehouseGroup.add(conveyor);

    // Animated bottles on bottling line
    const bottlesGroup = new THREE.Group();
    const bottleGeo = new THREE.CylinderGeometry(0.1, 0.1, 0.4, 8);
    const bottleMat = new THREE.MeshStandardMaterial({ color: "#7A0C11", transparent: true, opacity: 0.8 });

    const bottleCount = 8;
    const bottles: THREE.Mesh[] = [];

    for (let i = 0; i < bottleCount; i++) {
      const bottle = new THREE.Mesh(bottleGeo, bottleMat);
      bottle.position.set(1 + i * 1.0, 1.7, 0);
      bottlesGroup.add(bottle);
      bottles.push(bottle);
    }
    warehouseGroup.add(bottlesGroup);

    scene.add(warehouseGroup);
    warehouseGroup.children.forEach(c => {
      c.userData = { section: "warehouse" };
      interactiveObjects.push(c);
    });

    // 3. Interconnecting Pipes
    const pipesGroup = new THREE.Group();
    pipesGroup.name = "piping";

    const pipeMat = new THREE.MeshStandardMaterial({
      color: "#c5a880",
      metalness: 0.9,
      roughness: 0.1,
    });

    // Horizontal pipe 1
    const p1Geo = new THREE.CylinderGeometry(0.18, 0.18, 7.5, 12);
    const p1 = new THREE.Mesh(p1Geo, pipeMat);
    p1.rotation.z = Math.PI / 2;
    p1.position.set(-1.25, 6.2, -0.5);
    p1.castShadow = true;
    pipesGroup.add(p1);

    // Horizontal pipe 2
    const p2 = new THREE.Mesh(p1Geo, pipeMat);
    p2.rotation.z = Math.PI / 2;
    p2.position.set(-1.25, 5, 0.5);
    p2.castShadow = true;
    pipesGroup.add(p2);

    // Vertical connectors
    const vPipeGeo = new THREE.CylinderGeometry(0.15, 0.15, 2.5, 12);
    const v1 = new THREE.Mesh(vPipeGeo, pipeMat);
    v1.position.set(-5, 7, -0.5);
    pipesGroup.add(v1);

    const v2 = new THREE.Mesh(vPipeGeo, pipeMat);
    v2.position.set(-5, 6, 0.5);
    pipesGroup.add(v2);

    scene.add(pipesGroup);
    pipesGroup.children.forEach(c => {
      c.userData = { section: "piping" };
      interactiveObjects.push(c);
    });

    // --- RAYCASTING (HOVER & CLICK DETECTION) ---
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onPointerMove = (event: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(interactiveObjects);

      if (intersects.length > 0) {
        const rootObject = intersects[0].object;
        const section = rootObject.userData.section;
        if (section) {
          setHoveredPart(section);
          document.body.style.cursor = "pointer";
          return;
        }
      }
      setHoveredPart(null);
      document.body.style.cursor = "default";
    };

    const onPointerDown = (event: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(interactiveObjects);

      if (intersects.length > 0) {
        const rootObject = intersects[0].object;
        const section = rootObject.userData.section;
        if (section && factorySections[section]) {
          setSelectedSection(factorySections[section]);
        }
      }
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerdown", onPointerDown);

    // --- RENDER LOOP ---
    let clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Slow idle rotation of the entire factory structure
      scene.rotation.y = elapsedTime * 0.025;

      // Animate bottles conveyor
      bottles.forEach((bottle, i) => {
        // Move along conveyor line (X position)
        bottle.position.x += 0.02;
        // Reset when reaching end of line
        if (bottle.position.x > 8.5) {
          bottle.position.x = 1.0;
        }
        // Add tiny realistic jitter
        bottle.position.y = 1.55 + Math.sin(elapsedTime * 8 + i) * 0.02;
      });

      // Slowly pulse Point Lights for neon effect
      goldLight.intensity = 1.5 + Math.sin(elapsedTime * 2) * 0.5;
      redLight.intensity = 2.0 + Math.cos(elapsedTime * 2.5) * 0.6;

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Window resize handler
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      renderer.dispose();
    };
  }, []);

  return (
    <>
      <Navbar onOpenContact={() => setIsContactOpen(true)} alwaysSolid={true} />

      {/* Header Overlay Panel */}
      <section className="relative h-[25vh] min-h-[180px] w-full flex items-center justify-center bg-saboroso-charcoal overflow-hidden select-none border-b border-saboroso-gold/10">
        <div className="relative z-20 text-center px-4 max-w-3xl mx-auto pt-10">
          <div className="inline-flex items-center gap-2 border border-saboroso-gold/30 rounded-full px-4 py-1 bg-white/5 backdrop-blur-md mb-3">
            <Rotate3d className="w-3.5 h-3.5 text-saboroso-gold animate-spin-slow" />
            <span className="text-[10px] font-semibold tracking-widest text-saboroso-gold uppercase">
              Ambiente 3D Interativo
            </span>
          </div>
          <h1 className="text-3xl font-serif text-white font-bold tracking-wide">
            Conheça Nossa Fábrica
          </h1>
        </div>
      </section>

      {/* 3D Scene Viewport Grid */}
      <main className="min-h-[80vh] bg-saboroso-charcoal grid grid-cols-1 lg:grid-cols-12 relative overflow-hidden select-none border-b border-saboroso-gold/10">
        
        {/* Left Side: Interactive 3D Canvas Box */}
        <div ref={containerRef} className="lg:col-span-8 h-[55vh] lg:h-auto min-h-[400px] relative w-full bg-[#181512] cursor-grab active:cursor-grabbing border-b lg:border-b-0 lg:border-r border-saboroso-gold/10">
          <canvas ref={canvasRef} className="w-full h-full block" />

          {/* Interactive HUD guidelines overlay */}
          <div className="absolute bottom-6 left-6 right-6 pointer-events-none flex flex-wrap gap-4 items-center justify-between text-xs text-white/50 backdrop-blur-sm bg-saboroso-charcoal/40 p-4 rounded-2xl border border-white/5">
            <div className="flex items-center gap-2">
              <Rotate3d className="w-4 h-4 text-saboroso-gold" />
              <span>Arraste para rotacionar | Roda do mouse para dar zoom</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-saboroso-gold" />
              <span>Pressione nas partes da fábrica para inspecionar</span>
            </div>
          </div>

          {/* Hover Status Tag */}
          {hoveredPart && (
            <div className="absolute top-6 left-6 z-20 pointer-events-none bg-saboroso-red text-white text-xs font-bold py-2 px-4 rounded-full shadow-lg border border-saboroso-gold/20 flex items-center gap-2 uppercase tracking-widest">
              <Info className="w-3.5 h-3.5" />
              Inspecionar: {factorySections[hoveredPart]?.title}
            </div>
          )}
        </div>

        {/* Right Side: Information Inspector Panel */}
        <div className="lg:col-span-4 p-6 sm:p-10 flex flex-col justify-between text-left text-white bg-[#151210] relative">
          
          <div>
            {/* Back to Home Button */}
            <button
              onClick={() => transitionTo("/#industria")}
              className="inline-flex items-center gap-2 border border-white/10 hover:border-saboroso-gold/40 bg-white/5 rounded-full px-5 py-2.5 text-[10px] font-bold uppercase tracking-wider transition-all mb-10 hover:-translate-x-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-saboroso-gold" />
              Voltar ao Início
            </button>

            {/* Inspect Panel Header */}
            <div className="mb-6">
              <span className="text-[10px] font-bold text-saboroso-gold tracking-widest uppercase block mb-1">
                {selectedSection.subtitle}
              </span>
              <h2 className="text-2xl font-serif font-bold text-white tracking-wide">
                {selectedSection.title}
              </h2>
            </div>

            {/* Narrative description */}
            <p className="text-white/60 text-sm leading-relaxed font-light mb-8">
              {selectedSection.desc}
            </p>

            {/* Checklist details */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-saboroso-gold uppercase tracking-wider mb-2">
                Especificações Técnicas
              </h3>
              {selectedSection.details.map((detail, idx) => (
                <div key={idx} className="flex gap-3 items-start text-xs font-light text-white/80">
                  <div className="w-4 h-4 rounded-full bg-saboroso-red/25 border border-saboroso-red/45 flex items-center justify-center flex-shrink-0 text-saboroso-gold-light mt-0.5">
                    <Check className="w-2.5 h-2.5" />
                  </div>
                  <span className="leading-relaxed">{detail}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick inspect buttons row at the bottom */}
          <div className="border-t border-white/5 pt-8 mt-12">
            <span className="text-[10px] font-bold text-white/40 tracking-widest uppercase block mb-3">
              Seleção Rápida de Inspeção
            </span>
            <div className="flex flex-wrap gap-2">
              {Object.entries(factorySections).map(([key, section]) => {
                const isActive = selectedSection.title === section.title;
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedSection(section)}
                    className={`px-3.5 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all border cursor-pointer ${
                      isActive
                        ? "bg-saboroso-red border-saboroso-red text-white"
                        : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-saboroso-gold/30 text-white/70"
                    }`}
                  >
                    {section.title.split(" ")[0]}
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </main>

      <Footer />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
}
