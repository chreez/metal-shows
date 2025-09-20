# Metal Shows Tracker - Claude Code Configuration

## Project: Metal Shows Obsidian Tracker

This project tracks metal shows with single-entry data capture.
The Obsidian vault lives in ./vault/ subdirectory (gitignored).

### Directory Structure
- Project root: ~/workspace/metal-shows (git repo)
- Obsidian vault: ~/workspace/metal-shows/vault (gitignored)
- Claude config: Project root (CLAUDE.md, .claude/)

```
/metal-shows/               # Git repository root
├── vault/                  # Obsidian vault (gitignored)
│   ├── Quick Capture.md    # Single entry point for all data
│   ├── Shows/              # Processed show notes (YYYY-MM-DD format)
│   ├── People/             # Auto-created person stubs
│   ├── Dashboards/         # Dataview dashboards
│   └── Templates/          # Obsidian templates
├── docs/                   # Documentation
│   └── spec.md            # Full system specification
├── .claude/                # Claude commands
└── CLAUDE.md              # This file
```

### File Boundaries
- Safe to edit: vault/Shows/, vault/People/, vault/Dashboards/, vault/Quick Capture.md
- Never modify: vault/Templates/, vault/.obsidian/plugins/
- Auto-generated: All files in vault/Shows/ and vault/People/
- Git tracked: CLAUDE.md, .claude/, docs/, README.md
- Git ignored: vault/ (entire directory)

### Key Principles
- Quick Capture.md is the ONLY data entry point
- Never delete Quick Capture.md, only clear its contents
- All people mentioned as [[Name]] create stub notes automatically
- Process shows with single button click
- Dates in YYYY-MM-DD format
- Shows named "[Date] - [Venue].md"
- Vault operations always use vault/ prefix in paths

### Obsidian Plugin APIs
- Templater: Use tp.file.*, tp.date.*, tp.system.*
- Dataview: Use DataviewJS for complex queries
- Both plugins must be enabled for system to work

### Testing Checklist
- [ ] Quick Capture processes correctly
- [ ] People stubs auto-create
- [ ] Dashboards show data
- [ ] Backlinks work for people
- [ ] Clear function preserves template
- [ ] All vault files in vault/ subdirectory
- [ ] No vault data committed to git

### Common Commands
- Process show: Click Templater button in Quick Capture
- Find person: Open People Finder dashboard
- View recent: Open Shows Dashboard
- Check vault: ls vault/

When working on this vault:
1. Always work within vault/ subdirectory
2. Never commit vault/ contents to git
3. Test processing with sample data
4. Ensure Dataview queries update live
5. Check that people backlinks work

## Technical Details

### 1. Quick Capture System
- **Entry Point**: `vault/Quick Capture.md` - The ONLY place where new data enters
- **Processing**: Templater script extracts dates, venues, bands, and [[people]]
- **Auto-clear**: Quick Capture clears after processing for reuse

### 2. Automated Processing
The `process-show` Templater script:
1. Parses unstructured text from Quick Capture
2. Extracts date, venue, and band information
3. Creates formatted show note in `vault/Shows/`
4. Extracts all `[[Person]]` links
5. Creates person stub notes if they don't exist
6. Clears Quick Capture for next use

### 3. People Tracking
- Any `[[Name]]` in brackets creates/links to a person note
- Person notes track: first met date, shows attended, band roles, social handles
- Backlinks automatically show all shows where person appears

## Important Notes

### Privacy
- The `vault/` directory is gitignored
- Only commit project-level configuration files
- Never commit actual show or people data

### Dependencies
Required Obsidian plugins:
- **Templater**: For automation and processing
- **Dataview**: For queries and dashboards

### File Naming
- Shows: `YYYY-MM-DD - Venue Name.md`
- People: `Person Name.md` (exactly as typed in brackets)
- Templates: Keep in `vault/Templates/`