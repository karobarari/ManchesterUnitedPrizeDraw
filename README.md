# Man Utd Prize Draw

A React + TypeScript homepage for a Manchester United Foundation prize draw site. Built with Vite, Tailwind CSS, and a suite of visual effect libraries to create a premium, branded experience.

---

## Tech stack

| Tool | Purpose |
|---|---|
| Vite | Build tool and dev server |
| React 18 | UI framework |
| TypeScript | Type safety throughout |
| Tailwind CSS v3 | Utility-first styling |
| React Router | Client-side routing |

---

## Getting started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

The dev server runs at `http://localhost:5173`.

---

## Project structure

```
src/
├── components/
│   ├── Layout.tsx           # Navbar + Footer wrapper
│   ├── Navbar.tsx           # Red bar nav with gold CTA
│   ├── Footer.tsx           # Dark footer with badge links
│   ├── FadeIn.tsx           # Reusable Framer Motion scroll wrapper
│   └── ParticleBackground.tsx  # tsParticles football hero background
├── pages/
│   ├── Home.tsx             # Main homepage — all sections
│   ├── Login.tsx            # Login form with validation
│   ├── Subscribe.tsx        # Plan selector + sign-up form
│   └── Account.tsx          # User dashboard
├── index.css                # Tailwind directives + scrollbar styles
└── main.tsx                 # App entry point with BrowserRouter
public/
└── images/
    └── hero-bg.jpg          # Hero background image
```

---

## Brand tokens

Defined in `tailwind.config.js` and available as Tailwind classes throughout:

```js
colors: {
  utd: {
    red:   '#DA291C',   // bg-utd-red, text-utd-red
    gold:  '#FBE122',   // bg-utd-gold, text-utd-gold
    black: '#1A1A1A',   // bg-utd-black, text-utd-black
  }
}
```

---

## Homepage sections

The homepage (`src/pages/Home.tsx`) is built from six stacked sections:

**Hero** — Full-width player background image (Cunha) with a dark gradient overlay, gold subtitle, animated headline, subtext, and a Sign up CTA. Floating football particles drift across the background.

**Countdown** — Live countdown timer to the next draw date built with a custom `useCountdown` hook. Updates every second. Change the target date here:
```tsx
const drawDate = new Date('2025-06-01T20:00:00')
```

**Featured prize** — Highlighted card for the top prize (squad signed shirt) with a large image placeholder and CTA.

**Prize grid** — Horizontally scrollable row of prize cards with left/right arrow navigation. Each card has a 3D tilt effect and gold glare on hover.

**Stats** — Four animated count-up stat cards that fire when scrolled into view. Update the values in the `stats` array:
```tsx
const stats: Stat[] = [
  { value: 2400,  suffix: '+', label: 'Winners to date'             },
  { value: 50000, suffix: '',  label: 'Raised for the Foundation', prefix: '£' },
  { value: 12,    suffix: '',  label: 'Draws every year'            },
  { value: 98,    suffix: '%', label: 'Positive feedback'           },
]
```

**Foundation** — Charity mission copy with a join CTA.

**Newsletter** — Email capture strip at the bottom of the page.

---

## Visual effects

### Framer Motion — scroll animations
`npm i framer-motion`

Every section fades and slides in as it enters the viewport using the reusable `<FadeIn>` component. Key values to tune in `FadeIn.tsx`:

| Prop | Default | Effect |
|---|---|---|
| `duration` | `0.6` | How long the animation takes in seconds |
| `delay` | `0` | Delay before animation starts |
| `direction` | `'up'` | Slide direction — up, down, left, right |
| `margin` | `'-80px'` | How early the animation triggers |

### tsParticles — football background
`npm i @tsparticles/react @tsparticles/engine @tsparticles/slim`

Faint ⚽ emojis drift and spin slowly across the hero section. Key values to tune in `ParticleBackground.tsx`:

| Prop | Default | Effect |
|---|---|---|
| `number.value` | `18` | How many footballs on screen |
| `opacity.value.max` | `0.2` | How visible the footballs are |
| `move.speed.max` | `1.2` | How fast they drift |
| `rotate.animation.speed` | `3` | How fast they spin |

### react-parallax-tilt — 3D card tilt
`npm i react-parallax-tilt`

Prize cards tilt in 3D on hover with a gold glare effect. Key values to tune in `PrizeCard`:

| Prop | Default | Effect |
|---|---|---|
| `tiltMaxAngleX/Y` | `12` | Max tilt in degrees |
| `glareMaxOpacity` | `0.15` | Brightness of gold glare |
| `scale` | `1.04` | How much card grows on hover |
| `transitionSpeed` | `400` | Snap-back speed in ms |

### Typewriter effect — hero headline
`npm i typewriter-effect`

Cycles through prize strings in the hero h1. Key values to tune in `Home.tsx`:

| Prop | Default | Effect |
|---|---|---|
| `delay` | `50` | Ms between each character typed |
| `deleteSpeed` | `30` | Ms between each character deleted |
| `loop` | `true` | Whether it cycles forever |

Add or remove strings from the `strings` array to change what cycles through.

### canvas-confetti — sign up celebration
`npm i canvas-confetti`
`npm i --save-dev @types/canvas-confetti`

Fires a red and gold confetti burst when the Sign up button is clicked. Key values to tune in the `fireConfetti` function:

| Prop | Default | Effect |
|---|---|---|
| `particleCount` | `80` | Number of confetti pieces per burst |
| `spread` | `70` | Spread angle in degrees |
| `colors` | `['#DA291C', '#FBE122', '#ffffff']` | Confetti colours |
| `scalar` | `1.2` | Size of each piece |

### Animated stats — custom hook
Built with a custom `useCountUp` hook — no external library. Fires when the stats section scrolls into view using `react-intersection-observer`.

`npm i react-intersection-observer`

| Value | Default | Effect |
|---|---|---|
| `duration` | `2` | Seconds to count from 0 to target |
| `threshold` | `0.3` | % of section visible before firing |
| `delay` | `i * 0.15` | Stagger between each card |

---

## Pages

| Route | File | Description |
|---|---|---|
| `/` | `Home.tsx` | Main homepage |
| `/login` | `Login.tsx` | Email + password login with validation |
| `/subscribe` | `Subscribe.tsx` | Plan selector (£5 / £10 / £25) + sign-up form |
| `/account` | `Account.tsx` | Subscription status and draw history |

---

## Updating prizes

Edit the `prizes` array near the top of `Home.tsx`:

```tsx
const prizes: Prize[] = [
  {
    id: 1,
    title: 'Rashford Signed 2025/26 Home Shirt',
    description: 'Win a 2025/26 Manchester United Home Shirt personally signed by Marcus Rashford.',
    image: '/images/prize-rashford.jpg',  // add real image to public/images/
    player: 'MR',                          // initials shown as placeholder
  },
  // add more prizes here
]
```

Replace the `player` initials placeholder with a real `<img>` tag once you have product photography.

---

## Subscription plans

Edit the `plans` array in `Subscribe.tsx`:

```tsx
const plans: Plan[] = [
  { id: 'basic',   amount: 5,  label: 'Supporter',  perks: [...] },
  { id: 'plus',    amount: 10, label: 'Red Devil',   perks: [...], popular: true },
  { id: 'premium', amount: 25, label: 'Legend',      perks: [...] },
]
```

Payment processing (Stripe) is not yet wired up — the form currently simulates a successful submission after 800ms.

---

## Next steps

- [ ] Connect newsletter form to an email provider (Mailchimp, ConvertKit)
- [ ] Integrate Stripe for subscription payments
- [ ] Wire login and sign-up forms to a real backend / auth provider
- [ ] Replace prize card image placeholders with real photography
- [ ] Add protected routes to guard the `/account` page
- [ ] SEO meta tags and Open Graph image
- [ ] Deploy to Vercel or Netlify

---

## Notes

This project was built as a design prototype for the homepage only. The auth pages (Login, Subscribe, Account) are UI complete but not connected to any backend. All API calls are currently mocked with a timeout.
