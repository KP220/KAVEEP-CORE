# KAVEEP Shared Schemas

Version

1.0.0

---

# Purpose

This directory contains the canonical machine-readable schemas used throughout the KAVEEP ecosystem.

The schemas in this directory are derived directly from `INTERFACE_SPEC.md`.

While `INTERFACE_SPEC.md` is intended for human readers, the files in this directory are intended for:

- Runtime validation
- API validation
- CI/CD validation
- Code generation
- Contract testing
- AI-assisted development

Every runtime component should validate shared objects against these schemas whenever practical.

---

# Scope

These schemas are shared by:

- KAVEEP-CORE
- KAVEEP-POLICY
- KAVEEP-RO
- KAVEEP-SIA
- Future Plugins
- Future Runtime Services

No repository should define incompatible copies of these schemas.

---

# Design Principles

Every schema must be:

- Versioned
- Deterministic
- Backward Compatible
- Strictly Typed
- Human Readable
- Machine Readable

The schema is the executable representation of the interface contract.

---

# Planned Schemas

The initial schema set includes:

```text
task_request.schema.json

task_response.schema.json

policy_decision.schema.json

verification_result.schema.json

event_message.schema.json

state_snapshot.schema.json

health_report.schema.json

audit_record.schema.json

report_reference.schema.json

error_object.schema.json
```

Additional schemas may be introduced without modifying existing contracts.

---

# Validation Rules

Every schema should define:

- Required fields
- Optional fields
- Allowed data types
- Enumerations
- Object constraints
- Format validation
- Version information

Whenever possible, schemas should reject ambiguous data.

---

# Versioning

Schema versions follow Semantic Versioning.

```text
MAJOR.MINOR.PATCH
```

Example

```text
1.0.0
```

Breaking schema changes require a major version increment.

---

# Compatibility

New schema versions should:

- preserve existing required fields whenever possible
- add optional fields instead of replacing fields
- avoid changing field semantics
- remain compatible with previous runtime versions whenever practical

---

# Repository Rules

Repositories should:

- import shared schemas
- avoid duplicating schemas
- avoid modifying canonical schemas locally

Shared schemas are maintained centrally in KAVEEP-CORE.

---

# Future Improvements

Future versions may support:

- JSON Schema Draft 2020-12
- OpenAPI integration
- Protocol Buffers
- CBOR definitions
- Automatic TypeScript generation
- Automatic Python model generation

---

# Guiding Principle

INTERFACE_SPEC.md defines the contract.

Schemas enforce the contract.

Runtime validates the contract.

Together they ensure consistent communication across the KAVEEP ecosystem.
