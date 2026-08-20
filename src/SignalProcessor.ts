import { FeedbackSignal } from '../types/gcu1.types';

export class SignalProcessor {
  // Calculate RMS value from instantaneous values
    static calculateRMS(values: number[]): number {
        const sum = values.reduce((acc, val) => acc + val * val, 0);
            return Math.sqrt(sum / values.length);
              }

                // Generate sinusoidal waveform
                  static generateSineWave(amplitude: number, frequency: number, time: number, phase: number = 0): number {
                      return amplitude * Math.sin(2 * Math.PI * frequency * time + phase);
                        }

                          // Generate three-phase voltages
                            static generateThreePhaseVoltages(amplitude: number, frequency: number, time: number): { a: number; b: number; c: number } {
                                return {
                                      a: this.generateSineWave(amplitude, frequency, time, 0),
                                            b: this.generateSineWave(amplitude, frequency, time, -2 * Math.PI / 3),
                                                  c: this.generateSineWave(amplitude, frequency, time, -4 * Math.PI / 3)
                                                      };
                                                        }

                                                          // Calculate phase imbalance
                                                            static calculatePhaseImbalance(signals: FeedbackSignal[]): number {
                                                                if (signals.length < 3) return 0;
                                                                    
                                                                        const values = signals.map(s => s.currentValue);
                                                                            const avg = values.reduce((a, b) => a + b, 0) / values.length;
                                                                                const maxDeviation = Math.max(...values.map(v => Math.abs(v - avg)));
                                                                                    
                                                                                        return (maxDeviation / avg) * 100; // Percentage
                                                                                          }

                                                                                            // Low-pass filter (simple moving average)
                                                                                              static lowPassFilter(values: number[], windowSize: number = 10): number {
                                                                                                  const recent = values.slice(-windowSize);
                                                                                                      return recent.reduce((a, b) => a + b, 0) / recent.length;
                                                                                                        }

                                                                                                          // Check if signal is within limits
                                                                                                            static checkSignalLimits(signal: FeedbackSignal): 'normal' | 'warning' | 'fault' {
                                                                                                                const deviation = Math.abs(signal.currentValue - signal.nominalValue);
                                                                                                                    const range = signal.maxValue - signal.minValue;
                                                                                                                        
                                                                                                                            if (deviation > range * 0.8) return 'fault';
                                                                                                                                if (deviation > range * 0.6) return 'warning';
                                                                                                                                    return 'normal';
                                                                                                                                      }

                                                                                                                                        // Convert PMG frequency to output frequency
                                                                                                                                          static pmgToOutputFrequency(pmgFreq: number): number {
                                                                                                                                              // PMG frequency is related to output frequency by gear ratio
                                                                                                                                                  // For A320: PMG at 1681.3 Hz corresponds to 400 Hz output
                                                                                                                                                      return (pmgFreq / 1681.3) * 400;
                                                                                                                                                        }
                                                                                                                                                        }