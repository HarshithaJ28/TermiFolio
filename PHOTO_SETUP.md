# 📸 How to Add Your Photo to TermiFolio

## Quick Setup Guide

### Option 1: Using a Local Photo (Recommended)

1. **Add your photo to the public folder:**
   ```
   terminal-portfolio/
   └── public/
       └── images/
           └── profile.jpg  // <-- Add your photo here
   ```

2. **Update the InteractiveHero component:**
   Open `components/InteractiveHero.tsx` and find line ~193:
   ```tsx
   <TerminalPhoto 
     photoUrl="/images/profile.jpg"  // <-- Uncomment and update this line
     alt="Harshitha Profile"
     className="w-80"
   />
   ```

### Option 2: Using an External URL

Simply update the `photoUrl` prop with your image URL:
```tsx
<TerminalPhoto 
  photoUrl="https://your-image-hosting-service.com/your-photo.jpg"
  alt="Harshitha Profile"
  className="w-80"
/>
```

## 🎨 Photo Requirements & Tips

### Technical Requirements:
- **Format:** JPG, PNG, or WebP
- **Size:** 400x400px (square) recommended
- **File size:** Under 500KB for best performance
- **Quality:** High resolution for crisp display

### Style Recommendations:
- **Professional headshot** or coding setup
- **Good lighting** - the terminal effects work best with well-lit photos
- **Clear background** or blurred background
- **Facing forward** - works best with the scanning effects

### Terminal Theme Integration:
The photo will automatically get:
- ✅ **Matrix-style scanning lines**
- ✅ **Terminal window frame**
- ✅ **Corner brackets overlay**
- ✅ **Glitch effects on hover**
- ✅ **Status indicators**
- ✅ **Cyberpunk color grading**

## 🖼️ Photo Ideas That Work Great:

1. **Professional headshot** with a tech background
2. **Coding setup** - you at your desk with monitors
3. **Conference speaking** photo
4. **Black and white** professional photo (gets colored by terminal effects)
5. **Studio-style** photo with clean background

## 🔧 Customization Options:

You can modify the `TerminalPhoto` component to:
- Change the terminal window title
- Adjust scanning line speed
- Modify color schemes
- Add custom status messages
- Change the size/aspect ratio

## 🚀 Advanced: Multiple Photos

For a dynamic experience, you could modify the component to cycle through multiple photos:

```tsx
const photos = [
  "/images/profile-1.jpg",
  "/images/profile-2.jpg", 
  "/images/coding-setup.jpg"
];

// Add rotation logic in TerminalPhoto component
```

## 📝 Notes:

- If no photo is provided, a themed placeholder will show
- The photo gets automatic terminal-style effects applied
- All effects are CSS/Canvas based - no external dependencies
- Photo loads asynchronously with smooth animations

---

**Ready to make it yours?** Add your photo and watch the terminal come alive! 🚀