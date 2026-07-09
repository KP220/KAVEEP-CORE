# KAVEEP Platform Contracts

Version

1.0.0

---

# Purpose

KAVEEP-CORE owns the shared platform schemas used to keep KAVEEP repositories interoperable.

These contracts define shared object shapes only. They do not define runtime behavior, orchestration code, storage engines, transport mechanisms, or private data inspection.

---

# Contract Files

The common platform contract set is:

```text
schemas/common-report.schema.json
schemas/audit.schema.json
schemas/session.schema.json
schemas/agent.schema.json
schemas/evidence.schema.json
schemas/policy.schema.json
```

Each downstream repository should reference these canonical schemas from KAVEEP-CORE instead of defining incompatible local copies.

---

# Shared Safety Rules

All KAVEEP repositories must preserve these rules:

- Use camelCase fields.
- Treat audit and history records as append-only.
- Treat insufficient evidence as `UNVERIFIED`, never `TRUE` or `FALSE`.
- Treat silence as no approval.
- Use `NO_ACTION` as the default state when no explicit approved action exists.
- Keep private data out of shared references unless a policy explicitly permits it.
- Preserve evidence, policy, session, and audit references needed to explain a result.

---

# Common Report Contract

`schemas/common-report.schema.json` is the base report envelope for all KAVEEP modules.

Every module-specific report should include the common report fields:

- `reportId`
- `sessionId`
- `generatedAt`
- `module`
- `moduleVersion`
- `status`
- `riskLevel`
- `evidenceRefs`
- `policyRefs`
- `auditRefs`
- `warnings`
- `errors`
- `metadata`

Module repositories may define module-specific report schemas by composing or extending the common report contract, but they must not redefine these fields with conflicting semantics.

---

# KAVEEP-SIA Usage

KAVEEP-SIA should use CORE schemas when producing analysis reports.

Expected usage:

- Use `common-report.schema.json` as the report envelope.
- Set `module` to `KAVEEP-SIA`.
- Use `sessionId` to link the report to the KCP session.
- Add evidence references through `evidenceRefs`, not by embedding private evidence payloads.
- Add applicable policy references through `policyRefs`.
- Add append-only audit record identifiers through `auditRefs`.
- Set `status` to `UNVERIFIED` when evidence is missing, incomplete, conflicting, or insufficient.
- Set `status` to `NO_ACTION` when no approved action exists.

SIA may maintain its own analytical result schema, but the shared report envelope must remain compatible with CORE.

---

# KAVEEP-RO Usage

KAVEEP-RO should use the shared evidence, session, audit, and report contracts to record verification outcomes.

Expected usage:

- Represent evidence through `evidence.schema.json`.
- Use `verificationStatus` values from evidence references.
- Return `UNVERIFIED` when verification cannot be completed.
- Do not convert uncertainty into a positive or negative truth claim.
- Preserve all audit trail references needed to reproduce the verification path.

---

# KAVEEP-POLICY Usage

KAVEEP-POLICY should use `policy.schema.json` for policy references and decisions that are attached to reports, sessions, audits, and agent passports.

Expected usage:

- Use `policyId` and `policyVersion` to identify the exact rule source.
- Use `decision` values of `ALLOW`, `DENY`, `REQUIRE_APPROVAL`, or `NO_ACTION`.
- Treat missing approval as `NO_ACTION` or `REQUIRE_APPROVAL`, never implicit `ALLOW`.
- Include `reason`, `riskLevel`, and `evaluatedAt` whenever a policy is evaluated.

---

# KAVEEP-COMMAND-CENTER Usage

KAVEEP-COMMAND-CENTER should use CORE schemas to display, compare, and route platform state without mutating source records.

Expected usage:

- Display common reports from all modules using the same envelope.
- Link sessions through `session.schema.json`.
- Link agents through `agent.schema.json`.
- Display audit records as append-only history.
- Require explicit approval before any action that changes state.
- Default unresolved or unattended requests to `NO_ACTION`.

---

# Future Agent Usage

Future agents should adopt these schemas before introducing new shared objects.

Expected usage:

- Publish an `agent.schema.json` passport before participating in cross-repository workflows.
- Attach all claims to evidence references when possible.
- Attach policy references when a claim or action depends on a policy decision.
- Emit audit records for important decisions, denials, failures, approvals, and no-action outcomes.
- Keep module-specific fields in module-owned schemas and shared fields in CORE-owned schemas.

---

# Extension Model

Repositories may add local schemas for module-specific data.

Compatible extension patterns:

- Compose CORE schemas with JSON Schema `allOf`.
- Store module-specific fields under a module-owned object.
- Use `metadata` only for non-critical annotations.
- Add optional fields in later compatible schema versions.

Incompatible patterns:

- Renaming shared fields locally.
- Changing enum meanings locally.
- Treating missing data as approval.
- Treating missing evidence as true or false.
- Rewriting or deleting audit/history records.

---

# Guiding Principle

CORE defines shared contracts.

Modules produce domain-specific data.

Policy decides allowed action.

Audit preserves history.

Evidence supports claims.
