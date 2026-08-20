// أنواع إشارات التغذية الراجعة لـ GCU1

export interface FeedbackSignal {
  id: string;
    name: string;
      description: string;
        type: 'analog' | 'digital';
          unit: string;
            nominalValue: number;
              minValue: number;
                maxValue: number;
                  currentValue: number;
                    status: 'normal' | 'warning' | 'fault';
                    }

                    export interface ControlLoop {
                      id: string;
                        name: string;
                          description: string;
                            feedbackSignals: FeedbackSignal[];
                              referenceValue: number;
                                errorSignal: number;
                                  controlOutput: number;
                                    status: 'active' | 'inactive' | 'fault';
                                    }

                                    export interface GCU1State {
                                      voltageRegulationLoop: ControlLoop;
                                        frequencyRegulationLoop: ControlLoop;
                                          differentialProtection: ControlLoop;
                                            overcurrentProtection: ControlLoop;
                                              timestamp: number;
                                              }