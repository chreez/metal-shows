# Metal Shows Tracker - Obsidian Vault Specification

## Product Overview
A streamlined Obsidian vault for tracking metal shows with single-point data entry and automated organization. The system prioritizes low-friction capture during/after shows with intelligent people extraction and relationship mapping.

## Core Architecture

### Project Structure
```
/metal-shows/                     # Git repo root (public)
├── docs/
│   └── spec.md                   # This specification
├── .gitignore                    # Includes /vault
├── CLAUDE.md                     # Claude Code configuration
├── .claude/
│   └── commands/
│       └── process-show.md       # Claude Code commands
└── vault/                        # Obsidian vault (gitignored)
    ├── Templates/
│   ├── Show Template.md          # Auto-applied to processed shows
│   └── Quick Capture Template.md # Minimal template for capture note
├── Shows/
│   └── [YYYY-MM-DD] - [Venue].md # Auto-generated show notes
├── People/
│   └── [[Person Name]].md        # Auto-created stub notes
├── Dashboards/
│   ├── Shows Dashboard.md        # Recent shows + stats
│   └── People Finder.md          # Searchable people directory
├── .claude/
│   └── commands/
│       └── process-show.md       # Claude Code command
├── Quick Capture.md               # SINGLE ENTRY POINT (bookmarked)
├── README.md                      # User workflow guide
└── CLAUDE.md                      # Claude Code configuration
```

## Key Components

### 1. Quick Capture Note (Entry Point)
- **Purpose**: Single, persistent scratchpad for all show data
- **Location**: Vault root (bookmarked for quick access)
- **Features**:
  - Never deleted, only cleared after processing
  - Minimal structure - just write
  - Process button/command at top
  - Mobile and desktop friendly

### 2. Automated Processing System
- **Trigger**: Templater button or command
- **Actions**:
  1. Parse Quick Capture content
  2. Extract date, venue, bands from text
  3. Create timestamped show note in `/Shows/`
  4. Extract all `[[Person Name]]` links
  5. Create stub notes in `/People/` if don't exist
  6. Clear Quick Capture for next use
  7. Open newly created show note for review

### 3. Show Notes Structure
```markdown
---
date: YYYY-MM-DD
venue: "Venue Name"
bands:
  - headliner: "Band Name"
    watched: true
  - opener1: "Band Name"
    watched: false
people_met: ["[[Person1]]", "[[Person2]]"]
tags: [show, metal]
---

# [Date] - [Venue]

## Lineup
- **Headliner**: Band Name ✓
- **Opener 1**: Band Name
- **Opener 2**: Band Name ✓

## People
- [[Person Name]] - Brief note
- [[Another Person]] - Brief note

## Highlights
[Processed notes from Quick Capture]
```

### 4. People Tracking
- **Link Format**: `[[First Name]]` or `[[Nickname]]`
- **Aliases**: Handle variations (e.g., "tall drummer" → [[Void Serpent Drummer]])
- **Auto-creation**: Any `[[Name]]` in show notes creates stub if needed
- **Backlinks**: Automatic connection to all shows where person appears

### 5. Dataview Queries

#### Shows Dashboard
```dataview
TABLE date, venue, headliner, length(people_met) as "People Met"
FROM "Shows"
SORT date DESC
LIMIT 20
```

#### People Finder
```dataview
TABLE band_role, last_seen, social_handles
FROM "People"
WHERE band_role != null OR social_handles != null
SORT file.name ASC
```

#### Recent Encounters
```dataview
LIST
FROM "People"
WHERE file.inlinks
SORT file.mtime DESC
LIMIT 10
```

## Required Plugins
1. **Templater** - For processing automation
2. **Dataview** - For queries and dashboards
3. **Calendar** (optional) - For date-based navigation

## Data Entry Workflow

### At Show (Physical/Mobile)
1. Write notes on paper or phone's default notes app
2. Focus on: People names, band reactions, memorable moments
3. No formatting required

### Post-Show Processing (Desktop)
1. Open Obsidian → Quick Capture (bookmarked)
2. Type/paste raw notes
3. Add `[[brackets]]` around any person names
4. Click "Process Show" button
5. Review generated show note
6. Quick Capture auto-clears for next show

### Finding People Later
1. Open People Finder dashboard
2. Search by name, band, or description
3. Click through to see all their appearances
4. Add social handles or notes as you learn more

## Design Principles
- **Single Entry Point**: All data enters through Quick Capture
- **Progressive Enhancement**: Start with basic text, enhance over time
- **Graceful Degradation**: Works even with messy/incomplete data
- **Relationship First**: People connections are primary, details are secondary
- **Future-Proof**: Can expand to full person profiles later if needed

## Error Handling
- Missing dates default to today
- Unrecognized venue creates new venue tag
- Malformed people links still create notes
- Duplicate show dates append incrementing number

## Success Metrics
- Time from show to processed note: <5 minutes
- Clicks required to process: 3 or less
- People findable by partial name: 100%
- Shows queryable by date/venue/band: 100%