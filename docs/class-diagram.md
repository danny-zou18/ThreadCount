# UML Class Diagrams - Seamless Fashion App

This document contains 5 separate UML class diagrams organized by domain area.

## Diagrams

1. [User Management](./diagrams/01-user-management.md) - Authentication, Profile, Avatar
2. [Wardrobe Domain](./diagrams/02-wardrobe-domain.md) - Wardrobe items, DTOs, AI analysis
3. [Outfit Domain](./diagrams/03-outfit-domain.md) - Outfits, try-on, outfit builder state
4. [AI Services](./diagrams/04-ai-services.md) - BaseModel, Settings, FalClient, GeminiClient, ThumbnailGenerator
5. [API Infrastructure](./diagrams/05-api-infrastructure.md) - ApiClient, SupabaseClient

## Quick Reference

### Abstract Classes

| Class | Description |
|-------|-------------|
| **BaseModel** | Defines standard interface for all AI models |

### Core Domain Classes

| Class | Diagram | Description |
|-------|---------|-------------|
| **User** | 1 | Authenticated user entity |
| **Profile** | 1 | User profile with preferences |
| **Avatar** | 1, 4 | User's AI-generated avatar |
| **WardrobeItem** | 2 | Clothing item in user's wardrobe |
| **Outfit** | 3 | User-created outfit |
| **OutfitItem** | 3 | Item displayed on outfit canvas |
| **TryOnResult** | 3, 4 | AI-generated try-on image |

### Service Classes

| Class | Diagram | Description |
|-------|---------|-------------|
| **Settings** | 4 | Configuration singleton |
| **FalClient** | 4 | AI image generation & background removal |
| **GeminiClient** | 4 | Image analysis |
| **ThumbnailGenerator** | 4 | Outfit thumbnail generation |
| **ApiClient** | 5 | HTTP client for backend API |
| **SupabaseClient** | 5 | Database & storage client |

### DTOs by Domain

| Domain | Classes | Diagram |
|--------|---------|---------|
| Wardrobe | WardrobeItemRequest, WardrobeItemResponse, UpdateWardrobeItem | 2 |
| Outfit | OutfitCreate, OutfitUpdate, GenerateThumbnailRequest | 3 |
| Avatar | GenerateAvatarRequest | 4 |
| Try-On | TryOnRequest, TryOnItem | 4 |
| Image Processing | RemoveBackgroundRequest, RemoveBackgroundResponse | 4 |

### State Management

| Store | Diagram | Manages |
|-------|---------|---------|
| AuthState | 1 | User authentication |
| WardrobeState | 2 | Wardrobe items |
| OutfitBuilderState | 3 | Outfits and try-on |
