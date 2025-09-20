# process-show

Process raw show notes from Quick Capture into structured show and people notes.

## Usage

```bash
/process-show
```

## What it does

1. Reads the content from `vault/Quick Capture.md`
2. Extracts:
   - Date (defaults to today if not found)
   - Venue name
   - Band names (headliner and openers)
   - People mentioned in [[brackets]]
3. Creates a new show note in `vault/Shows/YYYY-MM-DD - Venue.md`
4. Auto-creates person stub notes in `vault/People/` for any new [[people]]
5. Clears Quick Capture for the next show

## Example Input

In Quick Capture:
```
September 15, 2025
The Underworld
Void Serpent headlined, with Death Ritual and Chaos Theory opening

Met [[Alex]] the drummer from VS, super cool guy. [[Sarah]] was running merch as usual.
Talked to [[Mike the Sound Guy]] about the feedback issues.

Amazing show, pit was insane during the last song!
```

## Example Output

Creates:
- `vault/Shows/2025-09-15 - The Underworld.md` with structured frontmatter
- `vault/People/Alex.md` (if doesn't exist)
- `vault/People/Sarah.md` (if doesn't exist)
- `vault/People/Mike the Sound Guy.md` (if doesn't exist)

## Implementation

The command should:
1. Parse unstructured text intelligently
2. Handle incomplete data gracefully (missing dates, partial info)
3. Preserve the original notes in the Highlights section
4. Create bidirectional links between shows and people
5. Clear Quick Capture after successful processing

## Error Handling

- If no content to process: Show message "No notes to process"
- If date can't be parsed: Default to today's date
- If venue not found: Use "Unknown Venue"
- If file exists: Ask to overwrite or create numbered version