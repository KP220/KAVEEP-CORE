# KAVEEP-CORE

> The orchestration runtime of the KAVEEP Ecosystem.

---

# Overview

KAVEEP-CORE is the central runtime responsible for coordinating every KAVEEP component.

It does **not** perform domain-specific work.

Instead, it manages:

- Agents
- Policies
- Runtime
- Tasks
- Events
- State
- Reports
- Safety
- Permissions

Every KAVEEP repository communicates through KAVEEP-CORE.

---

# Mission

KAVEEP-CORE exists to make independent AI agents behave as one coherent system while remaining safe, observable, and controllable.

---

# Design Philosophy

The Core should never become an all-powerful executor.

Instead, it should become the safest coordinator possible.

Its responsibilities are:

Observe

↓

Understand

↓

Plan

↓

Coordinate

↓

Verify

↓

Report

↓

Request Approval

Only after explicit approval may another execution component perform any destructive action.

---

# Core Principles

## 1. Separation of Responsibility

Every repository owns one responsibility.

Example

```text
KAVEEP-POLICY
    defines rules

KAVEEP-RO
    verifies information

KAVEEP-SIA
    analyzes the operating system

KAVEEP-CORE
    coordinates everything
```

---

## 2. Safety First

CORE never directly:

- Delete files
- Move files
- Rename files
- Overwrite files
- Modify user data

CORE coordinates.

Execution belongs elsewhere.

---

## 3. Simulation Before Execution

Default workflow

```text
Observe

↓

Analyze

↓

Simulate

↓

Generate Report

↓

User Approval

↓

Execution (External)
```

Unsafe workflow

```text
Observe

↓

Execute Immediately
```

This workflow is forbidden.

---

# Responsibilities

KAVEEP-CORE is responsible for

- Runtime lifecycle
- Agent registration
- Task scheduling
- Event routing
- State management
- Policy loading
- Read-only verification
- Report aggregation
- Error recovery
- Workflow orchestration

---

# Non-Responsibilities

CORE must never

- Scan disks directly
- Clean storage
- Delete files
- Modify Windows
- Change Registry
- Execute scripts
- Bypass Policy
- Ignore RO verification

---

# Runtime Pipeline

```text
User
 │
 ▼
Request
 │
 ▼
Task Builder
 │
 ▼
Policy Validation
 │
 ▼
RO Verification
 │
 ▼
Agent Selection
 │
 ▼
Task Coordination
 │
 ▼
Report Generator
 │
 ▼
Approval Required
 │
 ▼
External Executor
```

KAVEEP-CORE coordinates tasks.

It does not directly execute destructive or system-modifying actions.
