# Mobile Setup Guide - Metal Shows Tracker

## Table of Contents
1. [Obsidian Mobile Setup](#obsidian-mobile-setup)
2. [iOS Shortcuts](#ios-shortcuts)
3. [Android Shortcuts](#android-shortcuts)
4. [Obsidian Sync Setup](#obsidian-sync-setup)
5. [Mobile Workflow](#mobile-workflow)

---

## Obsidian Mobile Setup

### 1. Install Obsidian Mobile
- **iOS**: [App Store](https://apps.apple.com/app/obsidian-connected-notes/id1557175442)
- **Android**: [Google Play](https://play.google.com/store/apps/details?id=md.obsidian)

### 2. Open Your Vault
1. Open Obsidian mobile app
2. Choose "Open folder as vault"
3. Navigate to your synced vault folder
4. Select the `metal-shows/vault` directory

### 3. Enable Required Plugins
1. Go to Settings → Community Plugins
2. Enable:
   - Templater
   - Dataview
3. Configure Templater:
   - Template folder: `Templates`
   - Enable "Trigger on new file creation"

### 4. Set Mobile Dashboard as Homepage
1. Settings → Options → Default view
2. Set "Mobile Dashboard" as startup file

---

## iOS Shortcuts

### Quick Capture Shortcut

Create an iOS Shortcut for rapid show capture:

1. **Open Shortcuts app**
2. **Create new shortcut** with these actions:

```
1. Text Action
   - Add default template:
   "Date: [Today]
    Venue:
    Bands:
    People:
    Notes:"

2. Ask for Input
   - Prompt: "Show details"
   - Default: [Text from step 1]

3. Create Note
   - App: Obsidian
   - Vault: metal-shows
   - Note name: "Quick Capture"
   - Content: [Input from step 2]

4. Open App
   - App: Obsidian
   - Open to: Quick Capture
```

3. **Add to Home Screen**:
   - Name: "🎸 Metal Show"
   - Icon: Music note or guitar

### Voice Capture Shortcut

```
1. Dictate Text
   - Stop listening: After pause

2. Text Action
   - Format with [[brackets]]:
   "Date: [Today]
    Venue: [Detected venue]
    Notes: [Dictated text]"

3. Append to Note
   - Note: Quick Capture
   - Vault: metal-shows
```

### Share Sheet Integration

Add to iOS Share Sheet for saving from other apps:

1. In Shortcuts, edit your Quick Capture shortcut
2. Enable "Show in Share Sheet"
3. Accept types: Text, URLs
4. Now share content directly to Quick Capture

---

## Android Shortcuts

### Quick Capture Widget

Using **Tasker** or **Automate**:

1. **Create Task** "Metal Show Capture":
```xml
A1: Variable Set
    Name: %showdate
    To: %DATE

A2: Input Dialog
    Title: Venue
    Variable: %venue

A3: Input Dialog
    Title: Bands (one per line)
    Variable: %bands

A4: Input Dialog
    Title: People (use [[name]])
    Variable: %people

A5: Write File
    File: Obsidian/metal-shows/vault/Quick Capture.md
    Text:
    Date: %showdate
    Venue: %venue
    Bands: %bands
    People: %people
    Append: On

A6: Launch App
    Package: md.obsidian
    Data: obsidian://open?vault=metal-shows&file=Quick%20Capture
```

2. **Create Widget**:
   - Add Tasker widget to home screen
   - Select "Metal Show Capture" task
   - Choose icon (guitar/music note)

### Using Obsidian URL Schemes

Create home screen shortcuts with URL schemes:

```
New Show:
obsidian://new?vault=metal-shows&file=Quick%20Capture&content=Date:%20%0AVenue:%20%0ABands:%20%0APeople:%20%0ANotes:

Open Dashboard:
obsidian://open?vault=metal-shows&file=Dashboards/Mobile%20Dashboard

Process Show:
obsidian://advanced-uri?vault=metal-shows&commandid=templater-obsidian%3Aprocess-show
```

Add these as Chrome/Firefox bookmarks, then "Add to Home Screen".

---

## Obsidian Sync Setup

### Option 1: Obsidian Sync (Paid)

1. **Purchase Obsidian Sync** ($8/month)
2. **Enable on Desktop**:
   - Settings → Sync
   - Sign in
   - Choose vault to sync
   - Select folders: All except `.obsidian/workspace`

3. **Enable on Mobile**:
   - Settings → Sync
   - Sign in with same account
   - Connect to existing remote vault
   - Turn on sync

### Option 2: iCloud (iOS/Mac)

1. **Move vault to iCloud Drive**:
```bash
mv ~/workspace/metal-shows ~/Library/Mobile\ Documents/iCloud~md~obsidian/Documents/
ln -s ~/Library/Mobile\ Documents/iCloud~md~obsidian/Documents/metal-shows ~/workspace/metal-shows
```

2. **On iOS**:
   - Obsidian will auto-detect vault in iCloud
   - Open "metal-shows" vault

### Option 3: Syncthing (Android/All Platforms)

1. **Install Syncthing**:
   - Desktop: [syncthing.net](https://syncthing.net)
   - Android: [F-Droid](https://f-droid.org/packages/com.nutomic.syncthingandroid/)

2. **Configure**:
```
Desktop:
- Add folder: ~/workspace/metal-shows/vault
- Share with: Android device
- Ignore: .obsidian/workspace, .DS_Store

Android:
- Accept folder share
- Save to: /storage/emulated/0/Obsidian/metal-shows/vault
```

3. **Open in Obsidian Mobile**:
   - Choose "Open folder as vault"
   - Navigate to synced folder

### Option 4: Git (Advanced)

1. **Install Working Copy (iOS) or Termux (Android)**

2. **Clone repository**:
```bash
git clone https://github.com/yourusername/metal-shows.git
```

3. **Setup sparse checkout** (vault only):
```bash
git sparse-checkout init
git sparse-checkout set vault/
```

4. **Create sync script**:
```bash
#!/bin/bash
cd /path/to/metal-shows
git pull
git add vault/
git commit -m "Mobile sync $(date)"
git push
```

---

## Mobile Workflow

### At the Show

1. **Quick Method** (During show):
   - Use phone's default notes app
   - Or voice recorder
   - Focus on names and moments

2. **Shortcut Method** (After show):
   - Tap home screen shortcut
   - Fill in basic details
   - Submit to Quick Capture

### Processing Later

1. **On Mobile**:
   - Open Obsidian
   - Go to Quick Capture
   - Add [[brackets]] to names
   - Tap Process button

2. **Voice Input Tips**:
   - "Open bracket bracket Alex close bracket bracket"
   - Use voice commands for navigation
   - Dictate in short bursts

### Mobile-Optimized Features

#### Quick Capture Mobile
- Large touch targets (min 44x44px)
- Simplified form fields
- Auto-complete for venues
- Date picker defaults to today

#### Mobile Dashboard
- One-tap access to key functions
- Swipe-friendly navigation
- Collapsible sections
- Touch-optimized buttons

### Gesture Controls

**Obsidian Mobile Gestures**:
- **Swipe right**: Navigate back
- **Swipe left**: Navigate forward
- **Pull down**: Command palette
- **Long press link**: Preview
- **Two-finger tap**: Toggle edit/preview

### Keyboard Shortcuts (with external keyboard)

| Action | iOS | Android |
|--------|-----|---------|
| Quick Capture | Cmd+N | Ctrl+N |
| Process Show | Cmd+P → "Process" | Ctrl+P → "Process" |
| Search | Cmd+Shift+F | Ctrl+Shift+F |
| Navigate Back | Cmd+[ | Alt+← |

---

## Troubleshooting

### Sync Issues

**iCloud stuck**:
```bash
# Force sync on Mac
killall bird
# Check sync status
brctl log --wait --shorten
```

**Obsidian Sync conflicts**:
- Check Settings → Sync → View sync log
- Resolve conflicts by choosing version
- Enable "Notify on conflict"

### Plugin Issues

**Templater not working**:
1. Settings → Templater → Template folder
2. Ensure set to "Templates"
3. Restart Obsidian mobile

**Dataview not updating**:
1. Settings → Dataview → Refresh interval
2. Set to 2000ms for mobile
3. Pull to refresh on dashboard

### Performance

**Large vault slowdown**:
1. Settings → Editor → Strict line breaks: OFF
2. Settings → Files → Detect all file extensions: OFF
3. Limit Dataview queries to recent items

**Battery drain**:
1. Disable auto-sync when on cellular
2. Increase sync interval to 10+ minutes
3. Close Obsidian when not in use

---

## Best Practices

### Mobile-First Design
- ✅ Use large buttons (min 44x44px)
- ✅ Single column layouts
- ✅ High contrast colors
- ✅ Minimal typing required
- ✅ Voice input friendly

### Sync Strategy
- Sync before shows (download latest)
- Process immediately after shows
- Sync again once processed
- Keep mobile vault lightweight

### Backup Plan
- Screenshot important info
- Email notes to yourself as backup
- Use platform's native notes as fallback
- Export regularly to markdown files

---

## Quick Reference Card

Save this to your phone:

```
🎸 METAL SHOW CAPTURE

AT SHOW:
- Open shortcut/app
- Voice: "Show at [venue] with [bands]"
- Names: [[First Last]]
- Save draft frequently

AFTER SHOW:
1. Open Quick Capture
2. Add [[brackets]] to names
3. Tap PROCESS
4. Review generated note
5. Sync to cloud

TIPS:
- Date auto-fills today
- Venue auto-completes
- One band per line
- Voice: "bracket Name bracket"
```

---

*Last updated: 2025-09-21*