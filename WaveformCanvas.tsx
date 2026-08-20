import React, { useRef, useEffect } from 'react';

interface WaveformCanvasProps {
  amplitude: number;
    frequency: number;
      time: number;
        title: string;
          color?: string;
          }

          export const WaveformCanvas: React.FC<WaveformCanvasProps> = ({ 
            amplitude, frequency, time, title, color = '#3b82f6' 
            }) => {
              const canvasRef = useRef<HTMLCanvasElement>(null);

                useEffect(() => {
                    const canvas = canvasRef.current;
                        if (!canvas) return;
                            const ctx = canvas.getContext('2d');
                                if (!ctx) return;

                                    const width = canvas.width;
                                        const height = canvas.height;
                                            const centerY = height / 2;
                                                const scaleX = width / (4 * Math.PI); // عرض دورتين كاملتين
                                                    const scaleY = (height / 2) * 0.8; // هامش أمان 80%

                                                        ctx.clearRect(0, 0, width, height);

                                                            // رسم شبكة الخلفية
                                                                ctx.strokeStyle = '#e2e8f0';
                                                                    ctx.lineWidth = 1;
                                                                        ctx.beginPath();
                                                                            ctx.moveTo(0, centerY);
                                                                                ctx.lineTo(width, centerY);
                                                                                    ctx.stroke();

                                                                                        // رسم الموجة ثلاثية الأطوار
                                                                                            const phases = [0, (2 * Math.PI) / 3, (4 * Math.PI) / 3];
                                                                                                const colors = [color, '#ef4444', '#eab308']; // أزرق، أحمر، أصفر

                                                                                                    phases.forEach((phase, index) => {
                                                                                                          ctx.strokeStyle = colors[index];
                                                                                                                ctx.lineWidth = 2;
                                                                                                                      ctx.beginPath();
                                                                                                                            for (let x = 0; x < width; x++) {
                                                                                                                                    const t = (x / scaleX) + time;
                                                                                                                                            const y = centerY - scaleY * Math.sin(2 * Math.PI * frequency * t + phase) * (amplitude / 115);
                                                                                                                                                    if (x === 0) ctx.moveTo(x, y);
                                                                                                                                                            else ctx.lineTo(x, y);
                                                                                                                                                                  }
                                                                                                                                                                        ctx.stroke();
                                                                                                                                                                            });

                                                                                                                                                                              }, [amplitude, frequency, time, title, color]);

                                                                                                                                                                                return (
                                                                                                                                                                                    <div className="bg-white rounded-lg shadow p-4 border border-slate-200">
                                                                                                                                                                                          <h3 className="text-sm font-semibold text-slate-700 mb-2">{title}</h3>
                                                                                                                                                                                                <canvas 
                                                                                                                                                                                                        ref={canvasRef} 
                                                                                                                                                                                                                width={400} 
                                                                                                                                                                                                                        height={150} 
                                                                                                                                                                                                                                className="w-full h-auto"
                                                                                                                                                                                                                                      />
                                                                                                                                                                                                                                          </div>
                                                                                                                                                                                                                                            );
                                                                                                                                                                                                                                            };