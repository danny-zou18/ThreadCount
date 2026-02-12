# Image Processing Quick Reference

## Processing Workflow

```
┌─────────────────┐
│  User uploads   │
│  flatlay photo  │
└────────┬────────┘
         │
         ▼
┌─────────────────────────┐
│  Validate file size     │
│  (Max 10MB upload)      │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│  Remove Background      │
│  - AI model (medium)    │
│  - Preserves garment    │
│  - Creates transparency │
│  ⏱ 3-8 seconds          │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│  Compress Image         │
│  - Reduce to 500KB      │
│  - Resize to 1024px     │
│  - Keep PNG format      │
│  ⏱ 0.5-2 seconds        │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│  Convert to Data URL    │
│  - Base64 encoding      │
│  - Ready for storage    │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│  Save to Database       │
│  - Store with metadata  │
│  - Show in wardrobe     │
└─────────────────────────┘
```

## File Size Impact

### Example: 100 Users, 50 Items Each

| Scenario | Storage Used | Monthly Bandwidth | Monthly Cost* |
|----------|-------------|-------------------|---------------|
| **No Optimization** | 15 GB | 150 GB | $18.39 |
| **With Optimization** | 2.5 GB | 25 GB | $3.07 |
| **Savings** | **83%** | **83%** | **$15.32/mo** |

*Based on Firebase pricing: $0.026/GB storage + $0.12/GB bandwidth

### Annual Savings
- 10,000 users: **$18,384/year**
- 50,000 users: **$91,920/year**
- 100,000 users: **$183,840/year**

## Configuration Options

### Current Settings (Balanced)
```typescript
{
  maxSizeMB: 0.5,           // Target: 500KB
  maxWidthOrHeight: 1024,   // Max dimension
  fileType: 'image/png',    // Preserves transparency
  bgRemovalModel: 'medium'  // Balanced quality/speed
}
```

### High Quality (for premium users)
```typescript
{
  maxSizeMB: 1.0,           // Target: 1MB
  maxWidthOrHeight: 1920,   // Full HD
  fileType: 'image/png',
  bgRemovalModel: 'large'   // Best quality
}
```

### Mobile Optimized (for apps)
```typescript
{
  maxSizeMB: 0.3,           // Target: 300KB
  maxWidthOrHeight: 800,    // Smaller
  fileType: 'image/png',
  bgRemovalModel: 'small'   // Faster
}
```

## Performance Benchmarks

| Operation | Time | Notes |
|-----------|------|-------|
| Upload | < 1s | Depends on connection |
| Background Removal | 3-8s | Depends on image size |
| Compression | 0.5-2s | Uses web workers |
| **Total** | **4-10s** | **Average user experience** |

## Storage Capacity Calculator

### At 500KB per image:
- **1 GB** = ~2,000 images
- **5 GB** (free tier) = ~10,000 images
- **100 GB** = ~200,000 images

### At 3MB per image (unoptimized):
- **1 GB** = ~333 images
- **5 GB** (free tier) = ~1,666 images
- **100 GB** = ~33,333 images

## Best Practices

### ✅ Do:
- Take photos in good lighting
- Use solid, contrasting background
- Center the garment in frame
- Keep garment flat and unwrinkled
- Take photo from directly above

### ❌ Don't:
- Use flash (creates harsh shadows)
- Photograph on patterned surfaces
- Include other objects in frame
- Take photos at angles
- Use extremely low resolution

## Troubleshooting

### "Failed to process image"
- **Check**: Internet connection (background removal requires download)
- **Try**: Smaller image or different format
- **Reason**: Processing timeout or WebAssembly issue

### "File size must be less than 10MB"
- **Check**: Original file size
- **Try**: Resize image before upload
- **Tip**: Modern phones can take 5-8MB photos

### Background not fully removed
- **Check**: Garment contrast with background
- **Try**: Retake with better lighting
- **Note**: Complex patterns may confuse AI

### Processing takes too long
- **Check**: Image dimensions (smaller = faster)
- **Try**: Reduce resolution before upload
- **Note**: Model: small = fast, large = slow

## API Reference

### Main Function
```typescript
processGarmentImage(file: File, options?: ProcessImageOptions)
  : Promise<{ dataUrl: string; originalSize: number; finalSize: number }>
```

### Helper Functions
```typescript
formatFileSize(bytes: number): string
getCompressionRatio(original: number, final: number): string
blobToDataURL(blob: Blob): Promise<string>
```

## Browser Support

| Browser | Support | Notes |
|---------|---------|-------|
| Chrome 90+ | ✅ Full | Best performance |
| Firefox 88+ | ✅ Full | Good performance |
| Safari 14+ | ✅ Full | Requires Big Sur+ |
| Edge 90+ | ✅ Full | Chromium-based |
| Mobile Safari | ✅ Full | iOS 14.5+ |
| Mobile Chrome | ✅ Full | Android 8+ |
| IE 11 | ❌ None | No WebAssembly |

## Security Considerations

### Client-Side Processing
- ✅ Images never leave user's device during processing
- ✅ No server-side processing = no data exposure
- ✅ User controls when/what to upload

### Data Privacy
- Only final processed image is stored
- Original photo not retained
- No EXIF data (location, etc.) preserved
- User can delete items anytime

## Future Optimizations

1. **Progressive Loading**: Show low-res preview while processing
2. **Caching**: Store processed images in IndexedDB
3. **Batch Processing**: Process multiple images at once
4. **WebP Support**: Further reduce file sizes (30-40%)
5. **Service Worker**: Offline processing capability
6. **AVIF Format**: Next-gen format (50% smaller than JPEG)

## Cost Comparison

### 1 Year, 10,000 Active Users (avg 30 items each)

#### Without Optimization
- Storage: 900 GB × $0.026/GB = $23.40/month
- Bandwidth: 9 TB × $0.12/GB = $1,080/month
- **Total: $1,103.40/month = $13,240.80/year**

#### With Optimization
- Storage: 150 GB × $0.026/GB = $3.90/month
- Bandwidth: 1.5 TB × $0.12/GB = $180/month
- **Total: $183.90/month = $2,206.80/year**

#### **Savings: $11,034/year (83% reduction)**

---

**Last Updated**: February 2026  
**Maintained By**: Development Team  
**Questions?** See [ADD_ITEM_FEATURE.md](ADD_ITEM_FEATURE.md) for detailed documentation
