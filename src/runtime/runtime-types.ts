export type RuntimeState =
  | "BOOTING"
  | "READY"
  | "RUNNING"
  | "PAUSED"
  | "RECOVERING"
  | "SHUTTING_DOWN"
  | "STOPPED"
  | "ERROR";

export interface RuntimeContext {
  runtimeId: string;
  runtimeVersion: string;
  sessionId: string;
  state: RuntimeState;
  startedAt?: string;
  metadata?: Record<string, unknown>;
}

export interface RuntimeService {
  readonly name: string;
  initialize(): Promise<void>;
  start(): Promise<void>;
  stop(): Promise<void>;
  health(): Promise<"UNKNOWN" | "STARTING" | "HEALTHY" | "DEGRADED" | "UNHEALTHY" | "RECOVERING" | "STOPPED">;
  version(): string;
}
