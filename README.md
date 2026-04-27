# Alex Morgan — Portfolio

A modern, dark-themed portfolio built with **Next.js 14** and **Tailwind CSS**.

## ✦ Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS v3 with custom design tokens
- **Language**: TypeScript
- **Icons**: Lucide React
- **Images**: Next.js `<Image>` with Unsplash placeholders
- **Fonts**: Cormorant Garamond (display) + DM Sans (body) + DM Mono (code)

---

## 📁 Project Structure

```
portfolio/
├── app/
│   ├── globals.css          # Base styles, custom utilities, font imports
│   ├── layout.tsx           # Root layout with metadata
│   └── page.tsx             # Main page — assembles all sections
│
├── components/
│   ├── sections/
│   │   ├── Hero.tsx         # Hero with headline, CTAs, scroll indicator
│   │   ├── About.tsx        # Bio, portrait, stats grid
│   │   ├── Timeline.tsx     # Placeholder for experience timeline
│   │   ├── Skills.tsx       # Skill bars by category + tool tags
│   │   ├── Projects.tsx     # Featured + grid project cards
│   │   ├── Gallery.tsx      # Masonry-style photo grid
│   │   └── Contact.tsx      # Contact form + info sidebar
│   │
│   └── ui/
│       ├── Navbar.tsx       # Fixed nav with mobile menu
│       ├── Footer.tsx       # Footer with socials
│       └── SectionHeader.tsx # Reusable section label + title
│
├── public/                  # Static assets (add resume.pdf here)
├── tailwind.config.ts       # Custom colors, fonts, bg tokens
├── next.config.mjs          # Image domain whitelist
└── tsconfig.json
```

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 2. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for production

```bash
npm run build
npm start
```

---

## 🎨 Design Tokens (tailwind.config.ts)

| Token | Value | Usage |
|---|---|---|
| `bg-bg-primary` | `#080808` | Page background |
| `bg-bg-secondary` | `#0f0f0f` | Alternate sections |
| `bg-bg-card` | `#131313` | Card backgrounds |
| `accent-gold` | `#C9A84C` | Accents, borders, CTA |
| `text-text-primary` | `#F0EDE8` | Headings, body |
| `text-text-secondary` | `#8a8782` | Subtext, descriptions |
| `text-text-muted` | `#4a4845` | Labels, metadata |

---

## 📌 Sections

| # | Section | Status |
|---|---|---|
| 1 | Hero | ✅ Complete |
| 2 | About | ✅ Complete |
| 3 | Timeline | ⬜ Placeholder (ready to fill) |
| 4 | Skills | ✅ Complete |
| 5 | Projects | ✅ Complete |
| 6 | Gallery | ✅ Complete |
| 7 | Contact | ✅ Complete |

---

## 🔧 Customization

- **Name / Copy**: Edit text directly in each section component
- **Colors**: Change tokens in `tailwind.config.ts`
- **Projects**: Update the `projects` array in `Projects.tsx`
- **Skills**: Update `skillGroups` in `Skills.tsx`
- **Contact Form**: Wire up `handleSubmit` in `Contact.tsx` to Resend, Formspree, or your own API route
- **Resume**: Drop `resume.pdf` in `/public/`

---

## 📦 Deployment

Deploy instantly to Vercel:

```bash
npx vercel
```

Or connect your GitHub repo to [vercel.com](https://vercel.com) for automatic deployments.
