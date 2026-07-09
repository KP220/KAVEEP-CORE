import assert from "node:assert/strict";
import test from "node:test";

import {
  CORE_RUNTIME_ROLE,
  CORE_RUNTIME_SAFETY_RULES,
  KAVEEP_CORE_NAME,
  KAVEEP_CORE_VERSION
} from "../src/index.js";

test("KAVEEP-CORE identity is defined", () => {
  assert.equal(KAVEEP_CORE_NAME, "KAVEEP-CORE");
  assert.equal(KAVEEP_CORE_VERSION, "0.1.0");
  assert.equal(CORE_RUNTIME_ROLE, "orchestration-runtime");
});

test("KAVEEP-CORE scaffold preserves safety boundaries", () => {
  assert.equal(CORE_RUNTIME_SAFETY_RULES.executesDestructiveActionsDirectly, false);
  assert.equal(CORE_RUNTIME_SAFETY_RULES.bypassesPolicy, false);
  assert.equal(CORE_RUNTIME_SAFETY_RULES.bypassesReadOnlyVerification, false);
  assert.equal(CORE_RUNTIME_SAFETY_RULES.bypassesApproval, false);
  assert.equal(CORE_RUNTIME_SAFETY_RULES.allowsDirectAgentToAgentCommunication, false);
});
