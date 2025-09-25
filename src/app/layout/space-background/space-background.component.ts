import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  private constellations: Constellation[] = [];
  private starCount = 130;
  private animationFrameId: number = 0;
  private resizeListener: any;

  ngAfterViewInit(): void {
    this.canvas = this.canvasRef.nativeElement;
    const context = this.canvas.getContext('2d');

    if (!context) {
      console.error('Could not get canvas context');
      return;
    }

    this.ctx = context;
    this.resize();
    this.init();
    this.animate();

    // Handle window resize
    this.resizeListener = () => this.resize();
    window.addEventListener('resize', this.resizeListener);
  }

  ngOnDestroy(): void {
    // Clean up
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    if (this.resizeListener) {
      window.removeEventListener('resize', this.resizeListener);
    }
  }

  private resize(): void {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  private init(): void {
    // Create stars
    this.stars = [];
    for (let i = 0; i < this.starCount; i++) {
      this.stars.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 1.5 + 0.5,
        brightness: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.02 + 0.005,
        angle: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.02 + 0.01,
      });
    }

    // Create constellations
    this.constellations = [];
    for (let i = 0; i < this.starCount; i++) {
      for (let j = i + 1; j < this.starCount; j++) {
        //Probabilidad de conexion
        if (Math.random() < 0.1) {
          this.constellations.push({
            starA: i,
            starB: j,
            opacity: Math.random() * 0.6 + 0.4,
          });
        }
      }
    }
  }

  private update(): void {
    const time = Date.now() * 0.001;

    for (let i = 0; i < this.stars.length; i++) {
      const star = this.stars[i];

      // Gentle floating movement
      star.x += Math.sin(time * star.speed + star.angle) * 0.1;
      star.y += Math.cos(time * star.speed + star.angle) * 0.1;

      // Twinkling effect
      star.brightness = 0.5 + Math.sin(time * star.twinkleSpeed) * 0.3;

      // Boundary checks
      if (star.x < 0) star.x = this.canvas.width;
      if (star.x > this.canvas.width) star.x = 0;
      if (star.y < 0) star.y = this.canvas.height;
      if (star.y > this.canvas.height) star.y = 0;
    }
  }

  private draw(): void {
    // Clear canvas with space background
    this.ctx.fillStyle = '#0a0a1a';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw gradient overlay
    const gradient = this.ctx.createRadialGradient(
      this.canvas.width / 2,
      this.canvas.height / 2,
      0,
      this.canvas.width / 2,
      this.canvas.height / 2,
      Math.max(this.canvas.width, this.canvas.height) / 2
    );
    gradient.addColorStop(0, 'rgba(30, 30, 70, 0.3)');
    gradient.addColorStop(1, 'rgba(10, 10, 30, 0.8)');
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw constellations
    this.ctx.lineWidth = 0.5;
    for (let i = 0; i < this.constellations.length; i++) {
      const conn = this.constellations[i];
      const starA = this.stars[conn.starA];
      const starB = this.stars[conn.starB];

      const distance = Math.sqrt(Math.pow(starA.x - starB.x, 2) + Math.pow(starA.y - starB.y, 2));

      if (distance < 150) {
        this.ctx.beginPath();
        this.ctx.moveTo(starA.x, starA.y);
        this.ctx.lineTo(starB.x, starB.y);
        this.ctx.strokeStyle = `rgba(150, 180, 255, ${conn.opacity * (1 - distance / 150)})`;
        this.ctx.stroke();
      }
    }

    // Draw stars
    for (let i = 0; i < this.stars.length; i++) {
      const star = this.stars[i];
      const alpha = star.brightness;

      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(220, 230, 255, ${alpha})`;
      this.ctx.fill();

      // Glow effect
      const starGradient = this.ctx.createRadialGradient(
        star.x,
        star.y,
        0,
        star.x,
        star.y,
        star.size * 3
      );
      starGradient.addColorStop(0, `rgba(200, 220, 255, ${alpha * 0.3})`);
      starGradient.addColorStop(1, 'rgba(200, 220, 255, 0)');
      this.ctx.fillStyle = starGradient;
      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2);
      this.ctx.fill();
    }
  }

  private animate(): void {
    this.update();
    this.draw();
    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }
}

// Interfaces
interface Star {
  x: number;
  y: number;
  size: number;
  brightness: number;
  speed: number;
  angle: number;
  twinkleSpeed: number;
}

interface Constellation {
  starA: number;
  starB: number;
  opacity: number;
}
