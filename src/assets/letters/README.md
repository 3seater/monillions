# Letter Images

Place your letter images in this folder with the following naming convention:

- Lowercase letters: `a.png`, `b.png`, `c.png`, etc.
- Space: `space.png`
- Dollar sign: `dollar.png` or `$.png`
- Numbers: `0.png`, `1.png`, `2.png`, etc.

Then in `src/App.tsx`, import them like this:

```typescript
import letterW from './assets/letters/w.png'
import letterE from './assets/letters/e.png'
import spaceImg from './assets/letters/space.png'
import dollarImg from './assets/letters/dollar.png'
// ... etc for all letters

const letterImages: Record<string, string> = {
  'w': letterW,
  'e': letterE,
  ' ': spaceImg,
  '$': dollarImg,
  // ... add all your letters
}
```

The typewriter will automatically use these images instead of text!

