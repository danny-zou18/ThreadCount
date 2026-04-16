# Feature: Outfit Builder & Try-On

**Status**: In Progress
**Priority**: P1
**Domain**: Outfit Builder (`src/features/outfit-builder/`)
**Last Updated**: 2026-04-15

## User Story

As a user, I want to combine items from my wardrobe into outfits and generate an AI image of myself wearing that outfit so I can visualize how it looks on me.

## Acceptance Criteria

### Build Outfits

- [x] Canvas displays garment slots in a flatlay arrangement (top → bottom → shoes, plus optional accessories)
- [x] User can add items from wardrobe to canvas slots
- [x] Garment images scale dynamically to fit viewport
- [x] User can browse wardrobe items per category and select one for each slot
- [x] User can remove items from canvas
- [x] User can swap items by selecting a different one from the same category

### Generate AI Try-On

- [x] "Generate" button visible when at least one item is placed on the canvas
- [x] User clicks generate to create an AI image of themselves wearing the outfit
- [x] Loading state shown during generation (may take 10-30+ seconds)
- [x] Generated image displayed alongside the outfit canvas
- [x] User can regenerate with the same outfit

### Save & Manage

- [x] User can name and save an outfit
- [ ] User can save a generated image to "Previous Looks" (not implemented)
- [ ] Saved outfits viewable in a gallery (available via wardrobe panel "Saved" tab, but not dedicated page)
- [ ] Previous Looks gallery viewable (not implemented)
- [ ] User can delete saved outfits and previous looks (outfits can be deleted, previous looks not implemented)

### Style-Based Generation

- [ ] User can select from a list of styles (casual, formal, streetwear, etc.)
- [ ] System generates an outfit suggestion in that style
- [ ] User sees AI image of themselves in the generated outfit

## Pages

| Route             | Component         | Description                               | Status |
| ----------------- | ----------------- | ----------------------------------------- | ------ |
| `/outfit-builder` | OutfitBuilderPage | Canvas + wardrobe panel + generate button | Active |
| `/outfits`        | SavedOutfitsPage  | Gallery of saved outfits                  | Not wired to router |
| `/previous-looks` | PreviousLooksPage | Gallery of saved AI-generated images      | Not wired to router |

**Note**: Saved outfits can be viewed in the "Saved" tab of the WardrobePanel in the outfit builder.

## Design References

- Backend endpoints: `GET /outfits`, `POST /outfits`, `PUT /outfits/:id`, `DELETE /outfits/:id`
- Backend endpoints: `POST /outfits/generate-thumbnail`, `POST /outfits/upload`
- Backend endpoints: `POST /try-on/generate`, `GET /try-on/history`, `DELETE /try-on/history/:id`
- AI generation happens entirely on backend; frontend submits request and polls/waits for result

## Technical Notes

- Generation is async — backend may return a job ID that frontend polls
- Consider WebSocket for real-time progress updates
- Large generated images — may need progressive loading

## Out of Scope (for now)

- Drag and drop positioning — future enhancement
- Outfit sharing — future enhancement
- Outfit calendar/scheduling — future enhancement
- Real-time / live try-on — future enhancement
- Video try-on — future enhancement
- Style-based AI generation — future enhancement
