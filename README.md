# Agentic Workflows & Human–AI Pair Programming in Real Development

## Table of Contents

- [Workshop](#workshop)
  - [Overview](#overview)
  - [What to Expect](#what-to-expect)
  - [Getting Started](#getting-started)
- [Task](#task)
  - [Overview](#overview-1)
  - [Core Features](#core-features)
  - [Success Criteria](#success-criteria)
- [Human-AI Pair-Programming: A Rough Guide](#human-ai-pair-programming-a-rough-guide)
  - [IQRE Process](#iqre-process)
  - [Workshop Phases](#workshop-phases)
    - [Conception](#conception)
    - [Environment & Tickets](#environment--tickets)
    - [Implementation](#implementation)
    - [Context Management](#context-management)
    - [Presentation](#presentation)
  - [Key Guidelines](#key-guidelines)
    - [AI Collaboration](#ai-collaboration)
    - [Team Coordination](#team-coordination)
    - [Quality Assurance](#quality-assurance)
    - [Success Criteria](#success-criteria-1)

## Workshop

### Overview

In this workshop, you'll work in human-AI pairs to build a Kanban board application using Claude Code as your AI partner. The focus is on practicing effective AI-assisted development, improving prompt hygiene, and fostering human oversight while collaborating with AI.

### What to Expect

You will:

- Collaborate with both human teammates and AI partners.
- Develop a Kanban board application as a team.
- Practice prompt refinement and iterative AI guidance.

The task details are available in [TASK.md](TASK.md).

### Getting Started

Make sure your development environment is set up as outlined in the pre-work materials. Use Claude Code to assist with planning, coding, testing, and documentation.

## Task

### Overview

In this task, you, your teammate and your AI partners will build a collaborative Kanban board application. The goal is to create a local web app where users can manage tasks by adding, updating, and moving them between columns: "To Do", "Doing", and "Done".

### Core Features

1. **Static Board UI**:

- Three columns ("To Do", "Doing", "Done").
- UI components for board layout and task cards.

2. **Live Data Integration**:

- Use a database to store tasks.
- API endpoints for getting and updating tasks.
- UI updates dynamically from the database.

3. **Task Management**:

- Add new tasks via a form.
- Update task status (move between columns).
- Delete tasks.
- Data persistence in the database.

4. **Documentation**:

- Human-edited README and `CLAUDE.md` with project overview and key commands.

We will not be building in authentication or deployment in this project, so you don't have to plan for them.

### Success Criteria

A successful project will:

- Load tasks from the database and display them in the correct columns.
- Allow users to add, move, delete and complete tasks through the UI.

## Human-AI Pair-Programming: A Rough Guide

### IQRE Process

Follow these four steps consistently throughout the workshop:

1. **Iterate**: Share ideas/request code from AI and develop specifications or features through iteration.
2. **Question**: Review AI proposal, identify gaps, and refine through follow-up questions.
3. **Accept**: If AI proposal is acceptable, allow it to generate the code or specs.
4. **Review/Create**: Understand generated code/specs. If inspired, create a new, enhanced solution based on AI's output.
5. **Explain**: Present outputs to teammates, emphasising clear foundations and alignment.

---

### Workshop Phases

#### Conception

- **Pair Formation**: Form teams (1 frontend + 1 backend developer)
- **Repository Setup**: Fork and clone workshop repository
- **Specification Development**:
  - Use GENERATE SPECS prompt collaboratively
  - Create `FUNCTIONAL.md`, `ARCHITECTURE.md`, `CLAUDE.md`
  - Use SPEC WRAP-UP prompt

> **Output**: Initial documentation pushed to repo

#### Environment & Tickets

- **Parallel Setup**:
  - **Frontend Dev**: Use GENERATE TICKETS prompt to create `TICKETS.md`
  - **Backend Dev**: Set up environment, frameworks, folder structure, install libraries
- **Coordination**: Review tickets for dependencies and overlaps

> **Output**: Ready-to-code environment with structured tickets

#### Implementation

Work on individual machines with separate Claude Code instances.

**Per Ticket Process**:

1. Use KICKOFF/REFRESH MEMORY prompt
2. Implement features
3. Use REVIEW prompt after each piece
4. Use CONTEXT RESET after ticket completion

**Between Sessions**:

- Use PROGRESS SYNC prompt
- Coordinate dependencies with teammate
- Update `CLAUDE.md` with learned standards

> **Output**: Incremental feature completion with documented PRs

#### Context Management

- Use `HISTORY\_[NAME].md` for context summaries
- Reset Claude's context window after each ticket
- Maintain clean workspace

> **Output**: Archived context for reference, clean workspace

#### Presentation

- Demo Kanban board
- Show AI collaboration examples
- Present evolved standards
- Reflect on deliberate architectural decisions

> **Output**: 5-minute presentation with examples and demo

---

### Key Guidelines

#### AI Collaboration

- **Explicit Prompting**: Always tell Claude which files to reference (it won't do this automatically)
- **Context Management**: Use CONTEXT RESET prompt to maintain clarity
- **Standards Evolution**: Update `CLAUDE.md` when discovering new patterns

#### Team Coordination

- **Sync Regularly**: During designated progress sessions
- **Check Dependencies**: Use DEPENDENCY CHECK prompt when unclear
- **Share Learnings**: Document architectural decisions and standard updates

#### Quality Assurance

- **Follow IQRE**: Apply the four steps consistently
- **Review Obsessively**: Use REVIEW prompt religiously
- **Maintain Standards**: Keep `CLAUDE.md` current and concise

#### Success Criteria

- Functional Kanban board with task management
- Effective AI collaboration patterns
- Evolved standards documented in `CLAUDE.md`
- Clear architectural decisions

**Remember**: You're the human-in-the-loop. Guide the AI, don't just accept its output.
