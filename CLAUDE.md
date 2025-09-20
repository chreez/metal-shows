# Metal Shows Tracker - Claude Code Configuration

## Project Overview
This is an Obsidian vault for tracking metal shows, people met, and band experiences. The vault lives in the `vault/` subdirectory and is gitignored to keep personal data private.

## Architecture

### Directory Structure
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
└── CLAUDE.md              # This file
```

## Key Features

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

## Working with the Vault

### Adding New Features
When enhancing the vault:
1. Maintain the single-entry-point principle (Quick Capture)
2. Keep processing logic in Templater scripts
3. Use Dataview for all queries and dashboards
4. Store personal data only in `vault/` (gitignored)

### Common Operations

#### Process a Show
1. Edit `vault/Quick Capture.md`
2. Add raw notes with [[person names]] in brackets
3. Run the Templater process-show script
4. Review the generated show note

#### Find a Person
1. Open `vault/Dashboards/People Finder.md`
2. Use Dataview queries to search by name, band, or role
3. Click through to person note to see all appearances

#### Update Person Details
1. Navigate to `vault/People/[Name].md`
2. Add band_role, social_handles, or notes
3. Backlinks automatically update

### Testing Changes
When testing vault modifications:
1. Create test entries in Quick Capture
2. Process them to verify extraction logic
3. Check that Dataview queries update correctly
4. Ensure person stubs are created properly

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

## Troubleshooting

### Processing Fails
- Check that Templater is enabled
- Verify the process-show script exists
- Ensure Quick Capture has the correct format

### Missing People
- Verify names are in `[[double brackets]]`
- Check `vault/People/` directory for typos
- Look for duplicate entries with slight variations

### Dataview Not Working
- Ensure Dataview plugin is enabled
- Check that frontmatter formatting is correct
- Verify file paths in queries match structure

## Future Enhancements
Potential improvements while maintaining core architecture:
- Band database with genre/origin tracking
- Venue information and capacity
- Setlist tracking per show
- Photo attachments support
- Social media integration for people
- Ticket stub scanning

Remember: All enhancements should flow through Quick Capture to maintain the single-entry-point principle.