# Mobile Testing Checklist

## Pre-Testing Setup
- [ ] Obsidian Mobile installed (iOS/Android)
- [ ] Vault synced to mobile device
- [ ] Templater plugin enabled
- [ ] Dataview plugin enabled
- [ ] Mobile Dashboard set as homepage

## Core Functionality Tests

### 1. Quick Capture - Mobile
- [ ] **Open Quick Capture**
  - [ ] Loads within 2 seconds
  - [ ] Process button visible without scrolling
  - [ ] Tips section displays correctly

- [ ] **Text Entry**
  - [ ] Keyboard appears when tapping text area
  - [ ] Auto-capitalization works
  - [ ] Voice input accessible
  - [ ] Can type [[brackets]] easily

- [ ] **Processing**
  - [ ] Process button is touch-friendly (min 44x44px)
  - [ ] Processing completes without errors
  - [ ] Show note created in Shows/ folder
  - [ ] People stubs created in People/ folder
  - [ ] Quick Capture clears after processing

### 2. Mobile Dashboard
- [ ] **Layout**
  - [ ] All buttons are touch-friendly
  - [ ] No horizontal scrolling required
  - [ ] Stats display correctly
  - [ ] Recent shows list readable

- [ ] **Navigation**
  - [ ] NEW SHOW button works
  - [ ] Links to other dashboards work
  - [ ] Browse Shows/People buttons work
  - [ ] Help section accessible

- [ ] **Dataview Queries**
  - [ ] Stats calculate correctly
  - [ ] Recent shows update
  - [ ] People list updates
  - [ ] No query errors

### 3. Show Notes
- [ ] **Creation**
  - [ ] Correct filename (YYYY-MM-DD - Venue)
  - [ ] Frontmatter formatted properly
  - [ ] People links created
  - [ ] Content preserved from Quick Capture

- [ ] **Viewing**
  - [ ] Readable on mobile screen
  - [ ] Links clickable with touch
  - [ ] Can scroll through entire note
  - [ ] Backlinks show correctly

### 4. People Notes
- [ ] **Auto-Creation**
  - [ ] Stub notes created for [[names]]
  - [ ] Correct filename (exact as typed)
  - [ ] Frontmatter includes first_met date
  - [ ] Shows attended list updates

- [ ] **Navigation**
  - [ ] Can tap to open person note
  - [ ] Backlinks to shows work
  - [ ] Can edit on mobile

## Platform-Specific Tests

### iOS
- [ ] **Shortcuts**
  - [ ] Home screen shortcut opens app
  - [ ] Quick Capture shortcut works
  - [ ] Share sheet integration works
  - [ ] Voice shortcuts function

- [ ] **Gestures**
  - [ ] Swipe to navigate back/forward
  - [ ] Pull to refresh works
  - [ ] Long press to preview
  - [ ] Pinch to zoom (if needed)

### Android
- [ ] **Widgets**
  - [ ] Quick Capture widget works
  - [ ] Opens correct vault
  - [ ] Tasker integration (if set up)

- [ ] **Navigation**
  - [ ] Back button behavior correct
  - [ ] App switcher preserves state
  - [ ] Share to Obsidian works

## Sync Testing
- [ ] **Before Show**
  - [ ] Pull latest changes
  - [ ] Verify vault is up-to-date
  - [ ] No sync conflicts

- [ ] **After Processing**
  - [ ] Changes sync to cloud
  - [ ] Desktop sees new notes
  - [ ] No duplicate files created

- [ ] **Conflict Resolution**
  - [ ] Conflicts detected properly
  - [ ] Can choose version to keep
  - [ ] No data loss

## Performance Tests
- [ ] **Speed**
  - [ ] Vault opens in <5 seconds
  - [ ] Quick Capture loads in <2 seconds
  - [ ] Processing completes in <3 seconds
  - [ ] Navigation is responsive

- [ ] **Battery**
  - [ ] No excessive battery drain
  - [ ] Sync doesn't run constantly
  - [ ] App sleeps when backgrounded

- [ ] **Storage**
  - [ ] Vault size reasonable (<100MB)
  - [ ] Cache cleared periodically
  - [ ] No duplicate files accumulating

## Edge Cases
- [ ] **No Network**
  - [ ] Can still create notes
  - [ ] Processing works offline
  - [ ] Syncs when connection restored

- [ ] **Large Shows**
  - [ ] Many people (10+) process correctly
  - [ ] Long notes don't break layout
  - [ ] Multiple bands handled properly

- [ ] **Special Characters**
  - [ ] Names with apostrophes work (O'Brien)
  - [ ] Venues with & work (Rock & Roll Hotel)
  - [ ] International characters supported

- [ ] **Duplicates**
  - [ ] Same date shows get numbered (2)
  - [ ] Duplicate people not recreated
  - [ ] Handles name variations

## Voice Input Testing
- [ ] **Dictation**
  - [ ] "bracket bracket Name" → [[Name]]
  - [ ] Punctuation recognized
  - [ ] Band names understood
  - [ ] Can dictate full notes

- [ ] **Commands**
  - [ ] "New line" creates line break
  - [ ] "Period" adds punctuation
  - [ ] Names capitalized correctly

## Accessibility
- [ ] **Visual**
  - [ ] Text readable at default size
  - [ ] Sufficient color contrast
  - [ ] Buttons clearly defined
  - [ ] Focus indicators visible

- [ ] **Motor**
  - [ ] Touch targets ≥44x44px
  - [ ] No precision gestures required
  - [ ] Adequate spacing between buttons
  - [ ] No time-limited actions

- [ ] **Screen Reader** (if applicable)
  - [ ] Buttons have labels
  - [ ] Navigation makes sense
  - [ ] Form fields labeled

## Recovery Testing
- [ ] **Crash Recovery**
  - [ ] Unsaved notes preserved
  - [ ] Can recover from process failure
  - [ ] Vault not corrupted

- [ ] **Backup**
  - [ ] Export to markdown works
  - [ ] Can email notes
  - [ ] Screenshots as fallback

## Final Verification
- [ ] **Complete Workflow**
  1. [ ] Open Mobile Dashboard
  2. [ ] Tap NEW SHOW
  3. [ ] Enter show details
  4. [ ] Add [[people names]]
  5. [ ] Process successfully
  6. [ ] Verify show note created
  7. [ ] Check people stubs created
  8. [ ] Navigate to show note
  9. [ ] Navigate to person note
  10. [ ] Return to dashboard
  11. [ ] Verify stats updated
  12. [ ] Sync to desktop

## Sign-off
- [ ] Tested on: iPhone / iPad / Android Phone / Android Tablet
- [ ] OS Version: ________________
- [ ] Obsidian Version: ________________
- [ ] Test Date: ________________
- [ ] Tested By: ________________

## Issues Found
Document any issues discovered during testing:

1. Issue: ________________
   - Device: ________________
   - Steps to reproduce: ________________
   - Severity: Low / Medium / High

2. Issue: ________________
   - Device: ________________
   - Steps to reproduce: ________________
   - Severity: Low / Medium / High

---

**Overall Result**: ⬜ PASS / ⬜ FAIL

**Notes**:
_____________________________________
_____________________________________
_____________________________________