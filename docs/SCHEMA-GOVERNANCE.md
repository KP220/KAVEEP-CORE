# KAVEEP Schema Governance

Version

1.0.0

---

# Purpose

This document defines how KAVEEP shared schemas are versioned, changed, named, reviewed, and constrained for safety.

The governance rules apply to shared schemas in KAVEEP-CORE and to any downstream repository that references or extends them.

---

# Versioning

Shared schemas use Semantic Versioning.

```text
MAJOR.MINOR.PATCH
```

Version meanings:

- `MAJOR`: breaking changes.
- `MINOR`: backward-compatible additions.
- `PATCH`: clarifications, documentation fixes, or non-breaking constraint corrections.

Every shared object should include a `schemaVersion` field when the schema represents a reusable platform object.

---

# Backward Compatibility

Compatible changes:

- Adding optional fields.
- Adding optional metadata fields.
- Adding documentation.
- Adding new schemas that do not alter existing schemas.
- Tightening documentation without changing machine-readable behavior.

Potentially breaking changes:

- Removing fields.
- Renaming fields.
- Changing field types.
- Changing enum meanings.
- Adding required fields.
- Making optional fields required.
- Reinterpreting `UNVERIFIED`, `NO_ACTION`, or approval semantics.

Breaking changes require a new major version and a migration note.

---

# Naming Rules

Field names must use camelCase.

Schema files must use lowercase kebab-case with the `.schema.json` suffix.

Examples:

```text
common-report.schema.json
audit.schema.json
session.schema.json
agent.schema.json
evidence.schema.json
policy.schema.json
```

Identifiers should be explicit and stable:

- Use `reportId` for reports.
- Use `sessionId` for sessions.
- Use `auditId` for audit records.
- Use `agentId` for agent identities.
- Use `evidenceId` for evidence references.
- Use `policyId` for policy references.

Do not introduce aliases for shared identifiers unless a migration explicitly requires them.

---

# Safety Constraints

All schema changes must preserve these safety constraints:

- Insufficient evidence becomes `UNVERIFIED`, never `TRUE` or `FALSE`.
- Silence is never approval.
- Default state is `NO_ACTION`.
- Audit and history records are append-only.
- Private data must not be required by shared schemas.
- Shared schemas should reference evidence, policy, and audit records rather than embedding sensitive payloads.
- Destructive actions must not be implied by schema defaults.
- Policy approval must be explicit and traceable.

---

# Append-Only Records

Audit and history records must never be edited in place to change meaning.

Corrections must be represented by appending a new record that references the earlier record.

Recommended correction pattern:

- Keep the original record unchanged.
- Add a new audit record.
- Set `previousAuditId` when relevant.
- Explain the correction in `metadata`.
- Link any supporting evidence through `evidenceRefs`.

---

# Evidence Rules

Evidence references should identify evidence without exposing private payloads by default.

Evidence status values:

- `VERIFIED`: evidence was checked and supports the referenced claim.
- `UNVERIFIED`: evidence is missing, incomplete, inaccessible, conflicting, or not checked.
- `REJECTED`: evidence was checked and found invalid for the referenced claim.

When evidence is insufficient, downstream reports and decisions must not infer truth or falsehood.

---

# Approval Rules

Approval must be explicit.

Allowed policy decisions:

- `ALLOW`
- `DENY`
- `REQUIRE_APPROVAL`
- `NO_ACTION`

Missing approval, expired approval, ambiguous approval, or unattended requests must resolve to `NO_ACTION` or `REQUIRE_APPROVAL`.

No schema default may create action permission.

---

# Review Rules

Schema changes should be reviewed for:

- Cross-repository compatibility.
- Enum semantics.
- Evidence and audit traceability.
- Privacy exposure.
- Backward compatibility.
- Whether runtime behavior is being accidentally introduced into a contract-only schema.

Runtime implementations belong in module repositories or runtime source files, not in shared schema governance.

---

# Deprecation

Deprecated fields may remain during a compatibility window.

Deprecation requirements:

- Mark the field as deprecated in schema documentation.
- Provide the replacement field when one exists.
- Keep the original meaning unchanged.
- Remove only in a major version.

---

# Guiding Principle

Schemas define what can be exchanged.

They do not grant permission, prove truth, or authorize action by themselves.
