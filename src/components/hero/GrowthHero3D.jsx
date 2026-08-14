import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { ArrowRight, Sparkles, ChevronDown, Compass, Box, Layers } from 'lucide-react';
import { GROARCHE_DATA } from '../../data/groarcheData';

export default function GrowthHero3D({ onOpenLeadGen, currentStageIndex, setStoryStage }) {
  const mountRef = useRef(null);
  const [scrollDepth, setScrollDepth] = useState(0);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    // Scene, Camera, Renderer setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x060911, 0.02);

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 0, 18);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Multi-point Lighting System
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const mainGoldLight = new THREE.PointLight(0xd4af37, 6, 80);
    mainGoldLight.position.set(0, 0, 10);
    scene.add(mainGoldLight);

    const warmAccentLight = new THREE.PointLight(0xf59e0b, 4, 70);
    warmAccentLight.position.set(10, 10, 6);
    scene.add(warmAccentLight);

    const coolDepthLight = new THREE.PointLight(0x38bdf8, 2.5, 60);
    coolDepthLight.position.set(-10, -10, -6);
    scene.add(coolDepthLight);

    // WOW MOMENT 1 — 3D KINETIC SCULPTURE (Brushed Gold + Frosted Glass + Black Metallic Assembling Geometry)
    const kineticGroup = new THREE.Group();

    // Core Icosahedron Seed (Brushed Gold Wireframe)
    const seedGeo = new THREE.IcosahedronGeometry(1.8, 1);
    const seedMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      emissive: 0x92400e,
      emissiveIntensity: 0.9,
      roughness: 0.2,
      metalness: 0.85,
      wireframe: true
    });
    const seedMesh = new THREE.Mesh(seedGeo, seedMat);
    kineticGroup.add(seedMesh);

    // Middle Frosted Glass Dodecahedron
    const glassGeo = new THREE.DodecahedronGeometry(2.8, 0);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xfef08a,
      transmission: 0.85,
      opacity: 0.75,
      transparent: true,
      roughness: 0.1,
      ior: 1.5,
      wireframe: true
    });
    const glassMesh = new THREE.Mesh(glassGeo, glassMat);
    kineticGroup.add(glassMesh);

    // Outer Brushed Gold Octahedron Frame
    const octaGeo = new THREE.OctahedronGeometry(3.8, 0);
    const octaMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      emissive: 0xb45309,
      emissiveIntensity: 0.6,
      wireframe: true,
      transparent: true,
      opacity: 0.65
    });
    const octaMesh = new THREE.Mesh(octaGeo, octaMat);
    kineticGroup.add(octaMesh);

    // Outer 3D Torus Rings
    const ring1Geo = new THREE.TorusGeometry(3.5, 0.04, 16, 100);
    const ring1Mat = new THREE.MeshBasicMaterial({ color: 0xd4af37, transparent: true, opacity: 0.75 });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    kineticGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(4.8, 0.025, 16, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.5 });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    kineticGroup.add(ring2);

    scene.add(kineticGroup);

    // Gold Particle Cloud Matrix Floating All Over Page Height
    const particleCount = 600;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 40;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 40;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xd4af37,
      size: 0.18,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // Mouse Interaction Parallax & Camera Scroll Z-Movement
    let targetX = 0;
    let targetY = 0;
    let clock = new THREE.Clock();
    let reqId;

    const handleMouseMove = (event) => {
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;
      targetX = (event.clientX - windowHalfX) * 0.0014;
      targetY = (event.clientY - windowHalfY) * 0.0014;
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrollDepth(scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Camera Z-Axis Journey on Mouse & Scroll
      const zOffset = Math.min(window.scrollY * 0.008, 10);
      camera.position.x += (targetX * 7 - camera.position.x) * 0.05;
      camera.position.y += (-targetY * 7 - camera.position.y) * 0.05;
      camera.position.z = 18 - zOffset;
      camera.lookAt(0, 0, 0);

      // Kinetic Sculpture Assemblage Rotations
      seedMesh.rotation.y = elapsedTime * 0.45;
      seedMesh.rotation.x = elapsedTime * 0.3;

      glassMesh.rotation.y = -elapsedTime * 0.25;
      glassMesh.rotation.z = elapsedTime * 0.2;

      octaMesh.rotation.y = elapsedTime * 0.15;
      octaMesh.rotation.x = -elapsedTime * 0.2;

      ring1.rotation.z = -elapsedTime * 0.45;
      ring2.rotation.x = elapsedTime * 0.35;
      particleSystem.rotation.y = elapsedTime * 0.08;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const heroSequenceKeys = Object.keys(GROARCHE_DATA.heroSequence);
  const currentKey = heroSequenceKeys[currentStageIndex] || heroSequenceKeys[0];
  const activeStage = GROARCHE_DATA.heroSequence[currentKey];

  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-16 flex items-center overflow-hidden bg-transparent perspective-2000">
      
      {/* 3D WebGL Canvas Container Fixed to Viewport Background */}
      <div ref={mountRef} className="fixed inset-0 z-0 opacity-90 pointer-events-none" />

      {/* Background 3D Ambient Light Orbs */}
      <div className="fixed top-1/4 left-10 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none floating-3d-orb z-0" />
      <div className="fixed bottom-10 right-10 w-[500px] h-[500px] bg-yellow-500/10 rounded-full blur-[160px] pointer-events-none floating-3d-orb z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Content & 3D Dimensional Tagline */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold tracking-wide shadow-lg shadow-amber-500/10">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Facilitation-Driven Human Performance Consultancy</span>
            </div>

            {/* Main Brand Title */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] font-sans">
              GroArche <br />
              <span className="text-gradient-gold glow-text-gold">Learning Solutions</span>
            </h1>

            {/* 3D DIMENSIONAL TYPOGRAPHY MOMENT: Realizing Potential. Delivering Performance. */}
            <div className="space-y-1 typography-z-depth" style={{ transform: `translateZ(${Math.min(scrollDepth * 0.05, 30)}px)` }}>
              <div className="text-xl sm:text-3xl font-extrabold text-amber-400 tracking-wide glow-text-gold">
                Realizing Potential.
              </div>
              <div className="text-lg sm:text-2xl font-bold text-white tracking-wide opacity-90">
                Delivering Performance.
              </div>
            </div>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
              {GROARCHE_DATA.company.heroSubheadline}
            </p>

            {/* Magnetic 3D Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenLeadGen}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-600 text-slate-950 font-bold text-sm tracking-wide shadow-2xl shadow-amber-500/30 flex items-center gap-3 group shine-sweep magnetic-3d-btn"
              >
                <span>Explore the GroArche Way</span>
                <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#contact"
                className="px-8 py-4 rounded-full bg-[#0b0f19]/80 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-amber-500/40 font-semibold text-sm transition-all duration-300 flex items-center gap-2 shadow-lg magnetic-3d-btn"
              >
                <span>Start Your Journey</span>
              </a>
            </div>

          </div>

          {/* Right Column: 3D Stage Card */}
          <div className="lg:col-span-5">
            <div className="glass-panel-3d rounded-3xl p-6 sm:p-8 border border-amber-500/40 shadow-2xl relative card-3d-tilt glow-gold-3d">
              
              <div className="flex items-center justify-between pb-6 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-md">
                    <Compass className="w-5 h-5 animate-spin-slow" />
                  </div>
                  <div>
                    <h3 className="text-xs uppercase font-bold tracking-widest text-amber-400">
                      The Human Growth Motif
                    </h3>
                    <p className="text-sm font-semibold text-white">Stage 0{currentStageIndex + 1} / 05</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 bg-[#060911]/80 px-3 py-1.5 rounded-full border border-amber-500/30 text-xs text-amber-400 font-bold">
                  <Box className="w-3.5 h-3.5 text-amber-400" />
                  <span>3D Kinetic</span>
                </div>
              </div>

              {/* Active Stage Content */}
              <div className="py-6 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Stage {currentStageIndex + 1}: {activeStage.title}
                </div>
                <h4 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                  "{activeStage.subtitle}"
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {activeStage.desc}
                </p>
              </div>

              {/* Stage Pills */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-1.5">
                {heroSequenceKeys.map((k, i) => (
                  <button
                    key={k}
                    onClick={() => setStoryStage(i)}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      i === currentStageIndex
                        ? 'bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/40 scale-105'
                        : 'bg-[#060911]/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                    }`}
                  >
                    0{i + 1}
                  </button>
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400 text-xs animate-bounce pointer-events-none">
        <span>Scroll to Travel Through 3D Studio</span>
        <ChevronDown className="w-4 h-4 text-amber-400" />
      </div>

    </section>
  );
}
