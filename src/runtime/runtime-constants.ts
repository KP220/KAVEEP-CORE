export const KAVEEP_CORE_NAME = "KAVEEP-CORE";
export const KAVEEP_CORE_VERSION = "0.1.0";

export const CORE_RUNTIME_ROLE =
  "orchestration-runtime";

export const CORE_RUNTIME_SAFETY_RULES = Object.freeze({
  executesDestructiveActionsDirectly: false,
  bypassesPolicy: false,
  bypassesReadOnlyVerification: false,
  bypassesApproval: false,
  allowsDirectAgentToAgentCommunication: false
});
