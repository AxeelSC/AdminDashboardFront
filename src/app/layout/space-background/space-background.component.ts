import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Star {
  x: number;
  y: number;
  size: number;
  brightness: number;
  speed: number;
  angle: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  isBright: boolean;
}

interface Edge {
  starA: number;
  starB: number;
  opacity: number;
}

@Component({
  selector: 'app-space-background',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './space-background.component.html',
  styleUrl: './space-background.component.scss',
})
export class SpaceBackgroundComponent implements AfterViewInit, OnDestroy {
  @ViewChild('spaceCanvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private stars: Star[] = [];
  private edges: Edge[] = [];
  private starCount = 160;
  private edgeMaxDist = 140;
  private neighborsPerStar = 3;
  private animationFrameId: number = 0;
  private dpr = 1;
  private prefersReducedMotion = false;
  private lastFrame = 0;
  private frameInterval = 1000 / 60;

  private resizeListener: () => void = () => {};

  ngAfterViewInit(): void {
    this.canvas = this.canvasRef.nativeElement;
    const ctx = this.canvas.getContext('2d');
    if (!ctx) {
      console.error('No se pudo obtener el contexto del canvas');
      return;
    }
    this.ctx = ctx;

    this.checkReducedMotion();
    this.setupDPR();
    this.resize(true);
    this.init();
    this.animate();

    this.resizeListener = () => {
      this.setupDPR();
      this.resize(true);
      this.init();
    };
    window.addEventListener('resize', this.resizeListener);
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationFrameId);
    window.removeEventListener('resize', this.resizeListener);
  }

  private checkReducedMotion() {
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.prefersReducedMotion = rm.matches;
    this.frameInterval = this.prefersReducedMotion ? 1000 / 20 : 1000 / 60;
  }

  private setupDPR() {
    this.dpr = Math.min(window.devicePixelRatio || 1, 1.5);
  }

  private resize(force = false): void {
    const width = this.canvas.clientWidth || window.innerWidth;
    const height = this.canvas.clientHeight || window.innerHeight;
    const newW = Math.floor(width * this.dpr);
    const newH = Math.floor(height * this.dpr);

    if (!force && this.canvas.width === newW && this.canvas.height === newH) return;

    this.canvas.width = newW;
    this.canvas.height = newH;
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
  }

  private init(): void {
    // Estrellas, algunas más brillantes y con destello
    const w = this.canvas.width / this.dpr;
    const h = this.canvas.height / this.dpr;
    this.stars = Array.from({ length: this.starCount }, () => {
      const isBright = Math.random() < 0.16;
      const angle = Math.random() * Math.PI * 2;
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        size: isBright ? Math.random() * 1.7 + 1.2 : Math.random() * 1.1 + 0.6,
        brightness: isBright ? 1 : Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.019 + 0.008, // mueven un poco más
        angle,
        twinkleSpeed: isBright ? Math.random() * 1.2 + 0.5 : Math.random() * 0.8 + 0.3,
        twinkleOffset: Math.random() * Math.PI * 2,
        isBright,
      };
    });

    // Conexiones naturales: vecinos más cercanos
    this.edges = [];
    for (let i = 0; i < this.stars.length; i++) {
      const dists = this.stars.map((star, j) => ({
        index: j,
        dist:
          i === j ? Infinity : (this.stars[i].x - star.x) ** 2 + (this.stars[i].y - star.y) ** 2,
      }));
      dists
        .sort((a, b) => a.dist - b.dist)
        .slice(0, this.neighborsPerStar)
        .forEach((neighbor) => {
          if (neighbor.dist < this.edgeMaxDist * this.edgeMaxDist && i < neighbor.index) {
            this.edges.push({
              starA: i,
              starB: neighbor.index,
              opacity: Math.random() * 0.6 + 0.4,
            });
          }
        });
    }
  }

  private update(time: number): void {
    const t = time * 0.001;
    const w = this.canvas.width / this.dpr;
    const h = this.canvas.height / this.dpr;

    for (const star of this.stars) {
      // Movimiento más notorio
      if (!this.prefersReducedMotion) {
        star.x += Math.sin(t * star.speed + star.angle) * 0.18;
        star.y += Math.cos(t * star.speed + star.angle) * 0.18;
      }

      // Twinkle más fuerte para las brillantes
      star.brightness = star.isBright
        ? 0.7 + Math.sin(t * star.twinkleSpeed + star.twinkleOffset) * 0.6
        : 0.52 + Math.sin(t * star.twinkleSpeed + star.twinkleOffset) * 0.28;

      // Rebota en bordes
      if (star.x < 0) star.x = w;
      if (star.x > w) star.x = 0;
      if (star.y < 0) star.y = h;
      if (star.y > h) star.y = 0;
    }
  }

  private draw(): void {
    const w = this.canvas.width / this.dpr;
    const h = this.canvas.height / this.dpr;
    this.ctx.clearRect(0, 0, w, h);
    this.ctx.fillStyle = '#0a0a1a';
    this.ctx.fillRect(0, 0, w, h);

    const gradient = this.ctx.createRadialGradient(
      w / 2,
      h / 2,
      0,
      w / 2,
      h / 2,
      Math.max(w, h) / 2
    );
    gradient.addColorStop(0, 'rgba(30, 30, 70, 0.3)');
    gradient.addColorStop(1, 'rgba(10, 10, 30, 0.8)');
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, w, h);

    // Constelaciones (edges)
    this.ctx.lineWidth = 0.55;
    for (const edge of this.edges) {
      const starA = this.stars[edge.starA];
      const starB = this.stars[edge.starB];
      const dx = starA.x - starB.x,
        dy = starA.y - starB.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < this.edgeMaxDist) {
        this.ctx.beginPath();
        this.ctx.moveTo(starA.x, starA.y);
        this.ctx.lineTo(starB.x, starB.y);
        this.ctx.strokeStyle = `rgba(150, 180, 255, ${
          edge.opacity * (1 - distance / this.edgeMaxDist)
        })`;
        this.ctx.stroke();
      }
    }

    // Estrellas y destellos
    for (const star of this.stars) {
      const alpha = Math.min(1, Math.max(0, star.brightness));

      // Estrella central
      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(220, 230, 255, ${alpha})`;
      this.ctx.fill();

      // Glow externo
      const glow = this.ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size * 3);
      glow.addColorStop(0, `rgba(200,220,255,${alpha * 0.29})`);
      glow.addColorStop(1, 'rgba(200,220,255,0)');
      this.ctx.fillStyle = glow;
      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2);
      this.ctx.fill();

      // Destello cruzado para brillantes
      if (star.isBright && alpha > 0.72) {
        // La opacidad del destello depende del brillo actual (alpha)
        const flareAlpha = Math.max(0, Math.min(1, (alpha - 0.6) / 0.4));
        if (flareAlpha > 0.05) {
          this.ctx.save();

          // --- Glow del destello (difuso, más grande y translúcido) ---
          this.ctx.globalAlpha = flareAlpha * 0.28;
          this.ctx.strokeStyle = 'rgba(255,255,255,0.8)';
          this.ctx.lineWidth = 2.7 + star.size * 0.33;
          // Vertical glow
          this.ctx.beginPath();
          this.ctx.moveTo(star.x, star.y - star.size * 3.2);
          this.ctx.lineTo(star.x, star.y + star.size * 3.2);
          this.ctx.stroke();
          // Horizontal glow
          this.ctx.beginPath();
          this.ctx.moveTo(star.x - star.size * 3.2, star.y);
          this.ctx.lineTo(star.x + star.size * 3.2, star.y);
          this.ctx.stroke();

          // --- Cruz principal (más fina y definida, encima del glow) ---
          this.ctx.globalAlpha = flareAlpha * 0.6;
          this.ctx.strokeStyle = 'rgba(255,255,255,0.93)';
          this.ctx.lineWidth = 1.14 + star.size * 0.2;
          // Vertical
          this.ctx.beginPath();
          this.ctx.moveTo(star.x, star.y - star.size * 2.5);
          this.ctx.lineTo(star.x, star.y + star.size * 2.5);
          this.ctx.stroke();
          // Horizontal
          this.ctx.beginPath();
          this.ctx.moveTo(star.x - star.size * 2.5, star.y);
          this.ctx.lineTo(star.x + star.size * 2.5, star.y);
          this.ctx.stroke();

          this.ctx.restore();
        }
      }
    }
  }

  private animate = (time: number = 0): void => {
    if (!this.lastFrame || time - this.lastFrame >= this.frameInterval) {
      this.update(time);
      this.draw();
      this.lastFrame = time;
    }
    this.animationFrameId = requestAnimationFrame(this.animate);
  };
}
