import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import FadeIn from '../components/FadeIn'
import { useInView } from 'react-intersection-observer'
import ParticleBackground from '../components/PracticleBackground'
import Tilt from 'react-parallax-tilt'
import Typewriter from 'typewriter-effect'
import confetti from 'canvas-confetti'






// ── 1. CLUB HISTORY BAR ───────────────────────────────────────────────────────
const clubStats = [
  { value: '1878', label: 'Founded' },
  { value: '20', label: 'League Titles' },
  { value: '3', label: 'European Cups' },
  { value: '750+', label: 'Goals at Old Trafford this century' },
  { value: '£5', label: 'To enter the draw' },
]
// ── 2. HOW IT WORKS ───────────────────────────────────────────────────────────

// ── Types ────────────────────────────────────────────────────────────────────

interface Prize {
  id: number
  title: string
  description: string
  image: string
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

// ── Confetti ──────────────────────────────────────────────────────────────────

const fireConfetti = () => {
  confetti({ particleCount: 80, angle: 60, spread: 70, origin: { x: 0, y: 0.8 }, colors: ['#DA291C', '#FBE122', '#ffffff'] })
  confetti({ particleCount: 80, angle: 120, spread: 70, origin: { x: 1, y: 0.8 }, colors: ['#DA291C', '#FBE122', '#ffffff'] })
}

// ── Data ──────────────────────────────────────────────────────────────────────

const prizes: Prize[] = [
  { id: 1, title: 'Rashford Signed Shirt', description: 'Win a 2025/26 Manchester United Home Shirt personally signed by Marcus Rashford.', image: '/images/rashford.jpg' },
  { id: 2, title: 'Bruno Fernandes Signed Shirt', description: 'Win a 2025/26 Manchester United Home Shirt personally signed by Bruno Fernandes.', image: '/images/prize-bruno.jpg' },
  { id: 3, title: 'Højlund Signed Shirt', description: 'Win a 2025/26 Manchester United Home Shirt personally signed by Rasmus Højlund.', image: '/images/prize-hojlund.jpg' },
  { id: 4, title: 'Full Squad Signed Shirt', description: 'Win an iconic 2025/26 Manchester United Home Shirt signed by the entire first team squad.', image: '/images/prize-squad.jpg' },
]

// Slides shown in the image carousel
const slides = [
  { image: '/images/hero-bg.jpg', caption: 'Win a signed Manchester United shirt.' },
  { image: '/images/united-squad.jpg', caption: 'Hospitality tickets for a United match.' },
  { image: '/images/team-bg.jpg', caption: 'Support the Manchester United Foundation.' },
]

const subscribeTabs = ['Monthly Subscription', 'Season Pass', 'One-Off Tickets', 'Postal Entry'] as const
type SubscribeTab = typeof subscribeTabs[number]

const tabContent: Record<SubscribeTab, { price: string; desc: string }> = {
  'Monthly Subscription': {
    price: 'From £5/month',
    desc: 'Subscribe monthly and be entered into every draw automatically. Cancel any time.',
  },
  'Season Pass': {
    price: 'From £40/season',
    desc: 'Secure your place for the whole season and get the best value per draw. Limited availability.',
  },
  'One-Off Tickets': {
    price: 'From £5 per ticket',
    desc: 'Purchase a single entry for the next draw without any ongoing commitment.',
  },
  'Postal Entry': {
    price: 'Free',
    desc: 'Enter by post with no purchase necessary. Full details in our Terms & Conditions.',
  },
}

const stats = [
  { value: 2400, suffix: '+', label: 'Winners to date', prefix: '' },
  { value: 50000, suffix: '', label: 'Raised for the Foundation', prefix: '£' },
  { value: 12, suffix: '', label: 'Draws every year', prefix: '' },
  { value: 98, suffix: '%', label: 'Positive feedback', prefix: '' },
]

// ── Hooks ─────────────────────────────────────────────────────────────────────

function useCountdown(target: Date): TimeLeft {
  const calc = (): TimeLeft => {
    const diff = Math.max(0, target.getTime() - Date.now())
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    }
  }
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calc)
  useEffect(() => {
    const id = setInterval(() => setTimeLeft(calc()), 1000)
    return () => clearInterval(id)
  }, [])
  return timeLeft
}

function useCountUp(end: number, duration: number, active: boolean): number {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!active) return
    let start = 0
    const step = end / (duration * 60)
    const timer = setInterval(() => {
      start += step
      if (start >= end) { setCount(end); clearInterval(timer) }
      else { setCount(Math.floor(start)) }
    }, 1000 / 60)
    return () => clearInterval(timer)
  }, [active, end, duration])
  return count
}

// ── Sub-components ────────────────────────────────────────────────────────────

function CountdownBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center min-w-[56px]">
      <div className="bg-black/40 border border-white/20 rounded-lg px-4 py-3 mb-1">
        <span className="text-4xl sm:text-5xl font-bold text-white tabular-nums leading-none">
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span className="text-xs text-white/60 uppercase tracking-widest">{label}</span>
    </div>
  )
}

function PrizeCard({ prize }: { prize: Prize }) {
  return (
    <div className="border-2 border-white/10" style={{ borderRadius: '12px', overflow: 'hidden' }}>
      <Tilt
        tiltMaxAngleX={10} tiltMaxAngleY={10}
        glareEnable glareMaxOpacity={0.15} glareColor="#f3f025"
        glarePosition="all" glareBorderRadius="12px" scale={1.03}
        transitionSpeed={400} style={{ borderRadius: '12px' }}
      >
        <div className="bg-red-800/90 rounded-xl p-5 flex flex-col gap-4 h-full">
          <div className="w-full h-44 rounded-lg overflow-hidden flex items-center justify-center bg-black/20">
            <img src={prize.image} alt={prize.title} className="w-full h-full object-cover" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm">{prize.title}</h3>
            <p className="text-white/75 text-xs mt-1 leading-relaxed">{prize.description}</p>
          </div>
          <div className="mt-auto">
            <Link
              to="/subscribe"
              onClick={fireConfetti}
              className="block text-center bg-utd-gold text-black text-sm font-semibold py-2.5 rounded-lg hover:opacity-90 transition"
            >
              SIGN UP!
            </Link>
          </div>
        </div>
      </Tilt>
    </div>
  )
}

function StatCard({ stat, active, delay }: { stat: typeof stats[0]; active: boolean; delay: number }) {
  const [started, setStarted] = useState(false)
  useEffect(() => {
    if (!active) return
    const t = setTimeout(() => setStarted(true), delay * 1000)
    return () => clearTimeout(t)
  }, [active, delay])
  const count = useCountUp(stat.value, 2, started)
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
      <div className="text-3xl font-bold text-white tabular-nums mb-1">
        {stat.prefix && <span className="text-utd-gold">{stat.prefix}</span>}
        {count.toLocaleString()}
        {stat.suffix && <span className="text-utd-gold">{stat.suffix}</span>}
      </div>
      <p className="text-white/50 text-xs mt-1">{stat.label}</p>
    </div>
  )
}

// ── Image Slider ──────────────────────────────────────────────────────────────

function ImageSlider() {
  const [current, setCurrent] = useState(0)
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)

  const startTimer = () => {
    if (timer.current) clearInterval(timer.current)
    timer.current = setInterval(() => setCurrent(c => (c + 1) % slides.length), 5000)
  }

  useEffect(() => { startTimer(); return () => { if (timer.current) clearInterval(timer.current) } }, [])

  const go = (dir: 1 | -1) => {
    setCurrent(c => (c + dir + slides.length) % slides.length)
    startTimer()
  }

  return (
    <div className="relative w-full overflow-hidden" style={{ height: '380px' }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -60 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <img
            src={slides[current].image}
            alt={slides[current].caption}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <h2 className="text-white text-2xl sm:text-3xl font-bold drop-shadow">
              {slides[current].caption}
            </h2>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Arrows */}
      <button
        onClick={() => go(-1)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-black/40 hover:bg-black/60 border border-white/20 rounded-full flex items-center justify-center text-white text-xl transition"
        aria-label="Previous"
      >❮</button>
      <button
        onClick={() => go(1)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-black/40 hover:bg-black/60 border border-white/20 rounded-full flex items-center justify-center text-white text-xl transition"
        aria-label="Next"
      >❯</button>

      {/* Dots */}
      <div className="absolute bottom-4 right-6 z-10 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => { setCurrent(i); startTimer() }}
            className={`w-2 h-2 rounded-full transition ${i === current ? 'bg-utd-gold' : 'bg-white/40'}`}
          />
        ))}
      </div>
    </div>
  )
}

// ── Marquee strip ─────────────────────────────────────────────────────────────

function MarqueeStrip() {
  const text = 'MANCHESTER UNITED PRIZE DRAW · WIN BIG · GIVE BIGGER · SUPPORT YOUR CLUB · '
  const repeated = text.repeat(6)
  return (
    <div className="bg-utd-gold overflow-hidden py-3 select-none">
      <motion.p
        className="text-black text-xs font-bold tracking-widest uppercase whitespace-nowrap"
        animate={{ x: [0, '-50%'] }}
        transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
      >
        {repeated}{repeated}
      </motion.p>
    </div>
  )
}

// ── Subscribe tabs ────────────────────────────────────────────────────────────

function SubscribeSection() {
  const [activeTab, setActiveTab] = useState<SubscribeTab>('Monthly Subscription')
  const content = tabContent[activeTab]

  return (
    <section id="subscribe" className="border-t border-white/10 py-16 px-4">
      <FadeIn>
        <p className="text-center text-utd-gold text-xs uppercase tracking-widest mb-2">
          Making a difference through
        </p>
        <h2 className="text-center text-2xl sm:text-3xl font-bold text-white mb-2">
          The Pride of the Club
        </h2>
        <p className="text-center text-white/50 text-sm mb-10 max-w-xl mx-auto">
          Manchester United Foundation Prize Draw
        </p>
      </FadeIn>

      {/* Tabs */}
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {subscribeTabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-xs font-semibold border transition ${activeTab === tab
                ? 'bg-utd-red border-utd-red text-white'
                : 'bg-white/5 border-white/10 text-white/60 hover:border-white/30'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center"
          >
            <p className="text-utd-gold text-2xl font-bold mb-3">{content.price}</p>
            <p className="text-white/70 text-sm leading-relaxed mb-6 max-w-md mx-auto">{content.desc}</p>
            <Link
              to="/subscribe"
              onClick={fireConfetti}
              className="inline-block bg-utd-red text-white px-8 py-3 rounded-lg text-sm font-semibold hover:opacity-90 transition"
            >
              Sign Up Here!
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Promo video */}
      <div className="max-w-3xl mx-auto mt-12 rounded-2xl overflow-hidden border border-white/10">
        <video
          className="w-full"
          controls
          poster="/images/hero-bg.jpg"
        >
          <source src="/video/promo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  )
}

// ── Stats section ─────────────────────────────────────────────────────────────

function StatsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 })
  return (
    <section ref={ref} className="border-t border-white/10 py-16 px-4">
      <FadeIn>
        <p className="text-center text-utd-gold text-xs uppercase tracking-widest mb-2">By the numbers</p>
        <h2 className="text-center text-xl font-bold text-white mb-10">The prize draw in numbers</h2>
      </FadeIn>
      <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <FadeIn key={stat.label} delay={i * 0.1}>
            <StatCard stat={stat} active={inView} delay={i * 0.15} />
          </FadeIn>
        ))}
      </div>
    </section>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function Home() {
  const drawDate = new Date('2026-06-13T13:00:00')
  const timeLeft = useCountdown(drawDate)

  return (
    <div className="bg-white/20 text-white">

      {/* ── HERO ── */}
      <section
        className="overflow-hidden py-20 px-4 text-top relative flex flex-col items-center justify-center text-center px-4"
        style={{
          backgroundImage: 'url(/images/hero-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center ',
     
        }}
      >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/55" />
      <ParticleBackground />

      <div className="relative z-10">
        <FadeIn delay={0.1}>
          <h1 className="text-5xl sm:text-6xl font-extrabold text-white mb-2 leading-tight tracking-tight">
            WIN PRIZES
          </h1>
          <h2 className="text-xl sm:text-2xl font-light text-white/80 mb-6 min-h-[2rem]">
            <Typewriter
              options={{
                strings: [
                  'Win a signed Rashford shirt.',
                  'Win a signed Bruno shirt.',
                  'Win a signed Højlund shirt.',
                  'Win a squad signed shirt.',
                ],
                autoStart: true, loop: true, delay: 50, deleteSpeed: 30,
              }}
            />
          </h2>
        </FadeIn>

        {/* Countdown inside hero */}
        <FadeIn delay={0.2}>
          <p className="text-white/60 text-xs uppercase tracking-widest mb-4">Next Draw</p>
          <div className="flex justify-center gap-4 sm:gap-8 mb-8">
            <CountdownBlock value={timeLeft.days} label="Days" />
            <span className="text-white/40 text-4xl font-light self-start mt-3">:</span>
            <CountdownBlock value={timeLeft.hours} label="Hours" />
            <span className="text-white/40 text-4xl font-light self-start mt-3">:</span>
            <CountdownBlock value={timeLeft.minutes} label="Mins" />
            <span className="text-white/40 text-4xl font-light self-start mt-3">:</span>
            <CountdownBlock value={timeLeft.seconds} label="Secs" />
          </div>
        </FadeIn>

        <FadeIn delay={0.3}>
          <Link
            to="/subscribe"
            onClick={fireConfetti}
            className="inline-block bg-utd-red text-white px-10 py-3.5 rounded-lg text-sm font-bold hover:opacity-90 transition uppercase tracking-wide"
          >
            Sign Up Here!
          </Link>
        </FadeIn>
      </div>
    </section>


      {/* ── Image slider ── */ }
  <FadeIn>
    <ImageSlider />
  </FadeIn>

  {/* ── Marquee ── */ }
      <MarqueeStrip />
      <div className="bg-black/60 border-y border-white/10 py-6 px-4 overflow-x-auto">
        <div className="flex justify-center gap-8 sm:gap-16 min-w-max mx-auto">
          {clubStats.map((s, i) => (
            <div key={i} className="flex flex-col items-center text-center shrink-0">
              <span className="text-utd-gold text-2xl sm:text-3xl font-extrabold tracking-tight leading-none">
                {s.value}
              </span>
              <span className="text-white/50 text-[10px] uppercase tracking-widest mt-1 max-w-[90px] leading-tight">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
  {/* ── Prizes section ── */ }
  <section id="prizes" className=" bg-red-600 py-16 px-4">
    {/* Red banner header — just like the reference */}
    <div className="bg-utd-red py-6 px-4 text-center mb-10 -mx-4">
      <FadeIn>
        <p className="text-utd-gold text-xs uppercase tracking-widest font-semibold mb-1">
          WIN PRIZES
        </p>
        <h2 className="text-white text-2xl sm:text-3xl font-extrabold uppercase tracking-wide">
          In The Next Draw!
        </h2>
        <p className="text-white/70 text-xs mt-2">
          Winners announced soon after the draw has taken place.
        </p>
      </FadeIn>
    </div>

    {/* Prize cards grid */}
    <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {prizes.map((prize, i) => (
        <FadeIn key={prize.id} delay={i * 0.1} direction="up">
          <PrizeCard prize={prize} />
        </FadeIn>
      ))}
    </div>
    <section className="relative overflow-hidden border-t border-white/10" style={{ minHeight: '420px' }}>
      {/* Background player image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/images/rashford.jpg)' }}
      />
      {/* Gradient overlay — left to right */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-20 flex items-center">
        <FadeIn direction="left">
          <div className="max-w-lg">
            {/* Quote mark */}
            <span className="text-utd-gold text-7xl font-serif leading-none select-none">"</span>
            <p className="text-white text-xl sm:text-2xl font-light leading-relaxed -mt-4 mb-6">
              What families are going through now, I've once had to go through that — and it's very difficult to find a way out. It's very important for me to help people who are struggling. Whether the outcome changes or doesn't change            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-utd-red flex items-center justify-center text-white font-bold text-sm shrink-0">
                MR
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Marcus Rashford MBE</p>
                <p className="text-white/50 text-xs">Manchester United & Foundation ambassador</p>
              </div>
            </div>
            <p className="text-white/40 text-xs mt-4 italic">
              Your subscription directly funds the Foundation's community programmes.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
    <FadeIn>
      <p className="text-center text-white/40 text-xs mt-8">
        For full details of the prizes, please see our{' '}
        <Link to="/prizes" className="text-utd-gold underline underline-offset-2">
          Prize Terms & Conditions
        </Link>
        .
      </p>
    </FadeIn>
  </section>

  {/* ── Subscribe section with tabs + video ── */ }
  <SubscribeSection />

  {/* ── About / Foundation section ── */ }
  <section
    id="about"
    className="relative border-t border-white/10 py-20 px-4 overflow-hidden"
    style={{
      backgroundImage: 'url(/images/team-bg.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  >
    <div className="absolute inset-0 bg-black/65" />
    <FadeIn>
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <p className="text-utd-gold text-xs uppercase tracking-widest font-semibold mb-3">
          Manchester United Foundation Prize Draw
        </p>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6 leading-tight">
          Manchester United Foundation<br />
          <span className="text-utd-gold">Prize Draw</span>
        </h2>
        <p className="text-white/80 text-sm leading-relaxed mb-4">
          The Manchester United Foundation uses the power of the United badge to reach people
          and communities that many other programmes struggle to reach.
        </p>
        <p className="text-white/70 text-sm leading-relaxed mb-8">
          Its work focuses on Learning & Education, Health & Healthy Behaviours,
          Safe Spaces & Places, and Movement & Activity across communities.
          Your support helps fund projects across Greater Manchester,
          from Breakfast Clubs and mentoring programmes to support for families and vulnerable people.
        </p>
        <Link
          to="/subscribe"
          onClick={fireConfetti}
          className="inline-block bg-utd-red text-white px-10 py-3.5 rounded-lg text-sm font-bold hover:opacity-90 transition uppercase tracking-wide"
        >
          Sign Up Here!
        </Link>
      </div>
    </FadeIn>
  </section>

  {/* ── Stats ── */ }
  <StatsSection />

  {/* ── Newsletter ── */ }
  <section className="border-t border-white/10 py-12 px-4">
    <FadeIn>
      <div className="max-w-md mx-auto text-center">
        <h3 className="text-base font-bold mb-2">Be first to hear about new draws</h3>
        <p className="text-white/50 text-sm mb-5">
          Drop your email below and we'll notify you before each draw goes live.
        </p>
        <div className="flex gap-2">
          <input
            type="email"
            placeholder="your@email.com"
            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-utd-red"
          />
          <button className="bg-utd-red text-white text-sm px-5 py-2.5 rounded-lg hover:opacity-90 transition shrink-0 font-semibold">
            Register
          </button>
        </div>
      </div>
    </FadeIn>
  </section>

    </div >
  )
}