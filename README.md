# foo-rum

A modern forum application built with React, TypeScript, and Tailwind CSS.

## Live Demo

🌐 **[View Live Demo](https://foo-rum-sable.vercel.app/#/)**

## Animation System & Challenges

One of the most challenging aspects of this project was implementing smooth, performant animations for modals and alerts. Here's how I tackled the complex animation requirements:

### The Challenge

The application needed sophisticated animations that would:
- Coordinate multiple elements (backdrop, modal/alert, content) with different timing
- Handle enter/exit animations with proper cleanup
- Maintain smooth 60fps performance
- Support keyboard interactions (Escape key)
- Work across different screen sizes
- Provide configurable timing and easing functions

### The Solution: Custom Animation Hooks

I created two specialized custom hooks that handle the complexity:

#### 1. `useModalAnimation` Hook
- **Coordinated Timing**: Manages backdrop fade (1000ms), modal slide (400ms), and content fade (250ms) with staggered delays
- **Smooth Transitions**: Uses `translateY(100vh)` for slide-up effect with custom easing functions
- **Memory Management**: Properly cleans up components after exit animations complete
- **Keyboard Support**: Handles Escape key events with proper event listener management

#### 2. `useAlertAnimation` Hook  
- **Staggered Animation**: Backdrop (300ms), alert bounce (400ms), content fade (200ms) with precise delays
- **Bounce Effect**: Uses `cubic-bezier(0.34, 1.56, 0.64, 1)` for a satisfying bounce on entry
- **Auto-close**: Configurable auto-close with proper cleanup
- **Responsive Design**: Adapts to different screen sizes while maintaining animation quality

### Key Technical Solutions

1. **State Management**: Used `shouldRender` and `hasAnimated` states to control component lifecycle and animation phases
2. **Timing Coordination**: Calculated maximum exit times to ensure components stay rendered until all animations complete
3. **Performance Optimization**: Used `useMemo` for config objects and `useCallback` for event handlers
4. **CSS Transitions**: Leveraged CSS transitions over JavaScript animations for better performance
5. **Event Handling**: Proper cleanup of event listeners and timers to prevent memory leaks

### Animation Configuration

Both hooks support extensive customization:
```typescript
interface AnimationConfig {
  backdropDuration: { enter: number; exit: number };
  backdropDelay: { enter: number; exit: number };
  modalDuration: { enter: number; exit: number };
  modalDelay: { enter: number; exit: number };
  modalTimingFunction: { enter: string; exit: string };
  contentDuration: number;
  contentDelay: { enter: number; exit: number };
}
```

This system provides a robust foundation for smooth, professional animations while maintaining code reusability and performance.

## Getting Started

```bash
npm install
npm run dev
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
