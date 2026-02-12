# ThreadCount Demo - Digital Wardrobe Application

A modern digital wardrobe and outfit builder application that helps users organize their clothing and create outfits.

This is a code bundle for Seamless Demo. The original project is available at https://www.figma.com/design/ujQ8lM2LPk9DmvAeWSBh3C/Seamless-Demo.

## Features

### 🎨 Outfit Builder
- Dynamic, responsive canvas that fits perfectly in viewport
- Drag items from wardrobe to create flatlay-style outfits
- Support for multiple layers (tops, outerwear, accessories)
- Real-time preview and arrangement
- Save and share outfit combinations

### 👔 Digital Wardrobe
- Add items by photographing garments in flatlay style
- **Automatic background removal** using AI
- **Smart image compression** (90%+ size reduction)
- Organize by category, color, season, and tags
- Search and filter capabilities

### 📸 Smart Image Processing
- AI-powered background removal
- Automatic image optimization for storage
- File size reduction from ~3-5MB to ~300-500KB
- Transparent PNG output for clean compositing
- See detailed docs: [docs/ADD_ITEM_FEATURE.md](docs/ADD_ITEM_FEATURE.md)

## Running the code

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to the local development URL (typically http://localhost:5173)

## Technology Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Motion** (Framer Motion) - Animations
- **@imgly/background-removal** - AI background removal
- **browser-image-compression** - Image optimization
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library

## Project Structure

```
src/
├── components/
│   ├── layout/          # App layout components
│   ├── outfit/          # Outfit builder components
│   ├── wardrobe/        # Wardrobe management components
│   └── ui/              # Reusable UI components
├── pages/               # Main page components
├── data/                # Mock data and types
├── utils/               # Utility functions
└── styles/              # Global styles

docs/                    # Documentation
```

## Key Features Documentation

- [Add Item Feature](docs/ADD_ITEM_FEATURE.md) - Detailed documentation on image processing, file size optimization, and storage considerations

## Development Notes

### Image Processing
The app uses client-side image processing to:
- Remove backgrounds from garment photos
- Compress images for optimal storage
- Maintain transparency for outfit compositing

See [utils/imageProcessing.ts](src/utils/imageProcessing.ts) for configuration options.

### Storage Considerations
- Default: 500KB max per image
- 1024px max dimension
- PNG format (preserves transparency)
- Can store ~2000 images in 1GB vs ~200 unoptimized
- 90% reduction in bandwidth costs

## Contributing

This is a demo project. For production use, consider:
- Adding backend API for data persistence
- Implementing user authentication
- Setting up cloud storage (Firebase, S3, etc.)
- Adding more advanced features (outfit recommendations, try-on, etc.)

## License

See original Figma project for licensing details.
