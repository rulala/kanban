# Human-AI Pair-Programming: A Rough Guide

## Overview

Build a collaborative Kanban board application using AI-assisted development. Work in human-AI pairs, practice effective prompting, and maintain human oversight throughout the process.

## IQRE Process

Follow these four steps consistently throughout the workshop:

1. **Iterate**: Share ideas/request code from AI and develop specifications or features through iteration.
2. **Question**: Review AI output, identify gaps, and refine through follow-up questions.
3. **Review/Create**: Understand generated code/specs. If inspired, create a new, enhanced solution based on AI's output.
4. **Explain**: Present outputs to teammates, emphasising clear foundations and alignment.

## Workshop Phases

### Conception

- **Pair Formation**: Form teams (1 frontend + 1 backend developer)
- **Repository Setup**: Fork and clone workshop repository
- **Specification Development**:
  - Use GENERATE SPECS prompt collaboratively
  - Create `FUNCTIONAL.md`, `ARCHITECTURE.md`, `CLAUDE.md`
  - Use SPEC WRAP-UP prompt

**Output**: Initial documentation pushed to repo

### Environment & Tickets

- **Parallel Setup**:
  - **Frontend Dev**: Use GENERATE TICKETS prompt to create `TICKETS.md`
  - **Backend Dev**: Set up environment, frameworks, folder structure, install libraries
- **Coordination**: Review tickets for dependencies and overlaps

**Output**: Ready-to-code environment with structured tickets

### Implementation

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

**Output**: Incremental feature completion with documented PRs

### Context Management

- Use HISTORY\_[NAME].md for context summaries
- Reset Claude's context window after each ticket
- Maintain clean workspace

**Output**: Archived context for reference, clean workspace

### Presentation

- Demo Kanban board
- Show AI collaboration examples
- Present evolved standards
- Reflect on deliberate architectural decisions

**Output**: 5-minute presentation with examples and demo

## Key Guidelines

### AI Collaboration

- **Explicit Prompting**: Always tell Claude which files to reference (it won't do this automatically)
- **Context Management**: Use CONTEXT RESET prompt to maintain clarity
- **Standards Evolution**: Update `CLAUDE.md` when discovering new patterns

### Team Coordination

- **Sync Regularly**: During designated progress sessions
- **Check Dependencies**: Use DEPENDENCY CHECK prompt when unclear
- **Share Learnings**: Document architectural decisions and standard updates

### Quality Assurance

- **Follow IQRE**: Apply the four steps consistently
- **Review Obsessively**: Use REVIEW prompt religiously
- **Maintain Standards**: Keep `CLAUDE.md` current and concise

## Success Criteria

- Functional Kanban board with task management
- Effective AI collaboration patterns
- Evolved standards documented in `CLAUDE.md`
- Clear architectural decisions

**Remember**: You're the human-in-the-loop. Guide the AI, don't just accept its output.
