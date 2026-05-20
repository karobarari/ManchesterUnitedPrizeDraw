import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import FadeIn from '../components/FadeIn'
import { useInView } from 'react-intersection-observer'
import ParticleBackground from '../components/PracticleBackground'
import Tilt from 'react-parallax-tilt'
import Typewriter from 'typewriter-effect'

// ── Shared display class ─────────────────────────────────────────────────────
const DISPLAY = 'font-[Barlow_Condensed] font-extrabold uppercase tracking-tight'

// ── Data ─────────────────────────────────────────────────────────────────────

const clubStats = [
  { value: '1878', label: 'Founded' },
  { value: '20', label: 'League Titles' },
  { value: '3', label: 'European Cups' },
  { value: '750+', label: 'Goals at Old Trafford this century' },
  { value: '£5', label: 'To enter the draw' },
]

interface Prize {
  id: number
  title: string
  description: string
  image: string
  tag: string
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

const prizes: Prize[] = [
  { id: 1, tag: 'Signed Shirt',  title: 'Rashford Signed Shirt',         description: 'Win a 2025/26 home shirt personally signed by Marcus Rashford.', image: '/images/rashford.jpg' },
  { id: 2, tag: 'Signed Shirt',  title: 'Bruno Fernandes Signed Shirt',  description: 'Win a 2025/26 home shirt personally signed by Bruno Fernandes.',  image: '/images/prize-bruno.jpg' },
  { id: 3, tag: 'Signed Shirt',  title: 'Højlund Signed Shirt',          description: 'Win a 2025/26 home shirt personally signed by Rasmus Højlund.',  image: '/images/prize-hojlund.jpg' },
  { id: 4, tag: 'Squad Signed',  title: 'Full Squad Signed Shirt',       description: 'Win an iconic 2025/26 home shirt signed by the entire first team.', image: '/images/prize-squad.jpg' },
]

const slides = [
  { image: '/images/hero-bg.jpg',     caption: 'Win a signed shirt.' },
  { image: '/images/united-squad.jpg', caption: 'Hospitality tickets for a matchday.' },
  { image: '/images/team-bg.jpg',     caption: 'Support the Foundation.' },
]

const subscribeTabs = ['Monthly Subscription', 'Season Pass', 'One-Off Tickets', 'Postal Entry'] as const
type SubscribeTab = typeof subscribeTabs[number]

const tabContent: Record<SubscribeTab, { price: string; desc: string }> = {
  'Monthly Subscription': { price: 'From £5/month',     desc: 'Subscribe monthly and be entered into every draw automatically. Cancel any time.' },
  'Season Pass':          { price: 'From £40/season',   desc: 'Secure your place for the whole season and get the best value per draw. Limited availability.' },
  'One-Off Tickets':      { price: 'From £5 per ticket', desc: 'Purchase a single entry for the next draw without any ongoing commitment.' },
  'Postal Entry':         { price: 'Free',              desc: 'Enter by post with no purchase necessary. Full details in our Terms & Conditions.' },
}

const stats = [
  { value: 2400,  suffix: '+', prefix: '',  label: 'Winners to date' },
  { value: 50000, suffix: '',  prefix: '£', label: 'Raised for the Foundation' },
  { value: 12,    suffix: '',  prefix: '',  label: 'Draws every year' },
  { value: 98,    suffix: '%', prefix: '',  label: 'Positive feedback' },
]

// ── Hooks ────────────────────────────────────────────────────────────────────

function useCountdown(target: Date): TimeLeft {
  const calc = (): TimeLeft => {
    const diff = Math.max(0, target.getTime() - Date.now())
    return {
      days:    Math.floor(diff / 86400000),
      hours:   Math.floor((diff % 86400000) / 3600000),
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

// ── Sub-components ───────────────────────────────────────────────────────────

function CountdownBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center flex-1 min-w-0 sm:flex-initial sm:min-w-[64px]">
      <div className="w-full sm:w-auto bg-white/10 backdrop-blur-sm border-l-2 border-utd-red px-2 sm:px-4 py-2 sm:py-3 mb-2">
        <span className={`${DISPLAY} text-3xl sm:text-4xl md:text-5xl text-white tabular-nums leading-none text-center block`}>
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span className="text-[9px] sm:text-[10px] text-white/70 uppercase tracking-[0.2em]">{label}</span>
    </div>
  )
}

function PrizeCard({ prize }: { prize: Prize }) {
  return (
    <Tilt
      tiltMaxAngleX={5} tiltMaxAngleY={5}
      glareEnable glareMaxOpacity={0.08} glareColor="#000000"
      glarePosition="all" scale={1.02}
      transitionSpeed={500}
    >
      <article className="group relative bg-white border border-gray-200 hover:border-utd-red hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
          <img
            src={prize.image}
            alt={prize.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          {/* Red tag */}
          <span className={`${DISPLAY} absolute top-3 left-3 bg-utd-red text-white text-[10px] tracking-[0.2em] px-2.5 py-1`}>
            {prize.tag}
          </span>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-5 flex flex-col gap-3 flex-1">
          <h3 className={`${DISPLAY} text-gray-900 text-lg sm:text-xl leading-tight group-hover:text-utd-red transition-colors`}>
            {prize.title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed flex-1">
            {prize.description}
          </p>

          <Link
            to="/subscribe"
            className={`${DISPLAY} mt-2 inline-flex items-center justify-center bg-utd-red text-white text-sm tracking-wider px-5 py-3 hover:bg-[#A8201A] transition-colors`}
          >
            Enter the draw →
          </Link>
        </div>
      </article>
    </Tilt>
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
    <div className="relative bg-white border border-gray-200 border-t-2 border-t-utd-red p-5 sm:p-7 text-center hover:shadow-md transition-shadow">
      <div className={`${DISPLAY} text-3xl sm:text-4xl text-gray-900 tabular-nums mb-2`}>
        {stat.prefix}{count.toLocaleString()}{stat.suffix}
      </div>
      <p className="text-gray-500 text-[10px] sm:text-[11px] uppercase tracking-[0.15em] leading-tight">{stat.label}</p>
    </div>
  )
}

// ── Image Slider ─────────────────────────────────────────────────────────────

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
    <div className="relative w-full overflow-hidden bg-black h-[260px] sm:h-[340px] md:h-[420px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0"
        >
          <img src={slides[current].image} alt={slides[current].caption} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 md:p-10 max-w-7xl mx-auto">
            <div className="h-0.5 w-10 sm:w-12 bg-utd-red mb-3 sm:mb-4" />
            <h2 className={`${DISPLAY} text-white text-2xl sm:text-3xl md:text-5xl leading-none max-w-lg`}>
              {slides[current].caption}
            </h2>
          </div>
        </motion.div>
      </AnimatePresence>

      <button
        onClick={() => go(-1)}
        className="absolute left-2 sm:left-5 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-11 sm:h-11 bg-black/50 hover:bg-utd-red border border-white/20 hover:border-utd-red flex items-center justify-center text-white text-base sm:text-lg transition"
        aria-label="Previous"
      >❮</button>
      <button
        onClick={() => go(1)}
        className="absolute right-2 sm:right-5 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-11 sm:h-11 bg-black/50 hover:bg-utd-red border border-white/20 hover:border-utd-red flex items-center justify-center text-white text-base sm:text-lg transition"
        aria-label="Next"
      >❯</button>

      <div className="absolute bottom-3 sm:bottom-5 right-4 sm:right-8 z-10 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => { setCurrent(i); startTimer() }}
            className={`h-1 transition-all ${i === current ? 'w-6 sm:w-8 bg-utd-red' : 'w-3 sm:w-4 bg-white/40'}`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

// ── Marquee ──────────────────────────────────────────────────────────────────

function MarqueeStrip() {
  const text = 'PRIZE DRAW · WIN BIG · GIVE BIGGER · SUPPORT THE FOUNDATION · '
  const repeated = text.repeat(6)
  return (
    <div className="bg-utd-gold overflow-hidden py-3 sm:py-3.5 select-none">
      <motion.p
        className={`${DISPLAY} text-black text-xs sm:text-sm tracking-[0.25em] whitespace-nowrap`}
        animate={{ x: [0, '-50%'] }}
        transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
      >
        {repeated}{repeated}
      </motion.p>
    </div>
  )
}

// ── Subscribe section ────────────────────────────────────────────────────────

function SubscribeSection() {
  const [activeTab, setActiveTab] = useState<SubscribeTab>('Monthly Subscription')
  const content = tabContent[activeTab]

  return (
    <section id="subscribe" className="bg-gray-100 py-12 sm:py-16 md:py-20 px-4">
      <FadeIn>
        <div className="max-w-6xl mx-auto mb-8 sm:mb-12 text-center">
          <p className="text-utd-red text-[10px] sm:text-[11px] uppercase tracking-[0.3em] mb-3 font-semibold">
            Making a difference through
          </p>
          <h2 className={`${DISPLAY} text-gray-900 text-3xl sm:text-4xl md:text-5xl leading-none mb-3`}>
            The Pride of <span className="text-utd-red">the Club</span>
          </h2>
          <div className="h-0.5 w-16 bg-utd-red mx-auto" />
        </div>
      </FadeIn>

      {/* Tabs — horizontally scrollable on mobile to keep underline aligned */}
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-start sm:justify-center mb-8 border-b border-gray-200 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
          {subscribeTabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`${DISPLAY} shrink-0 whitespace-nowrap px-4 sm:px-5 py-3 text-xs tracking-widest border-b-2 transition-colors -mb-px ${
                activeTab === tab
                  ? 'border-utd-red text-gray-900'
                  : 'border-transparent text-gray-400 hover:text-gray-700'
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
            className="bg-gray-50 border-l-4 border-utd-red p-6 sm:p-8 md:p-10 text-center"
          >
            <p className={`${DISPLAY} text-utd-red text-2xl sm:text-3xl mb-4`}>{content.price}</p>
            <p className="text-gray-700 text-sm leading-relaxed mb-8 max-w-md mx-auto">
              {content.desc}
            </p>
            <Link
              to="/subscribe"
              className={`${DISPLAY} inline-block bg-utd-red text-white px-8 sm:px-10 py-3 sm:py-3.5 text-sm tracking-widest hover:bg-[#A8201A] transition-colors`}
            >
              Sign Up Here
            </Link>
          </motion.div>
        </AnimatePresence>

        {/* Promo video */}
        <div className="mt-8 sm:mt-12 overflow-hidden border border-gray-200 shadow-sm">
          <video className="w-full" controls poster="/images/hero-bg.jpg">
            <source src="../../../public/video/promo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  )
}

// ── Stats section ────────────────────────────────────────────────────────────

function StatsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 })
  return (
    <section ref={ref} className="bg-gray-50 py-12 sm:py-16 md:py-20 px-4">
      <FadeIn>
        <div className="max-w-6xl mx-auto text-center mb-8 sm:mb-12">
          <p className="text-utd-red text-[10px] sm:text-[11px] uppercase tracking-[0.3em] mb-3 font-semibold">By the numbers</p>
          <h2 className={`${DISPLAY} text-gray-900 text-2xl sm:text-3xl md:text-4xl leading-none`}>
            The prize draw <span className="text-utd-red">in numbers</span>
          </h2>
        </div>
      </FadeIn>
      <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((stat, i) => (
          <FadeIn key={stat.label} delay={i * 0.1}>
            <StatCard stat={stat} active={inView} delay={i * 0.15} />
          </FadeIn>
        ))}
      </div>
    </section>
  )
}

// ── Main page ────────────────────────────────────────────────────────────────

export default function Home() {
  const drawDate = new Date('2026-06-13T13:00:00')
  const timeLeft = useCountdown(drawDate)

  return (
    <div className="bg-white text-gray-900 font-[Inter] min-h-screen overflow-x-hidden">

      {/* ─── HERO (dark) ──────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden min-h-[88vh] flex items-center"
        style={{
          backgroundImage: 'url(/images/hero-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <ParticleBackground />

        <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-utd-red hidden md:block" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-10 w-full py-16 sm:py-20">
          <div className="max-w-2xl">
            <FadeIn delay={0.1}>
              <p className="text-utd-gold text-[10px] sm:text-[11px] uppercase tracking-[0.3em] sm:tracking-[0.4em] mb-4 sm:mb-5 flex items-center gap-3">
                <span className="h-px w-6 sm:w-8 bg-utd-gold" />
                Official Prize Draw
              </p>
              <h1 className={`${DISPLAY} text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-[0.9] mb-4`}>
                Win<br />
                <span className="text-utd-red">Big.</span> Give Bigger.
              </h1>
              <div className="text-white/80 text-base sm:text-lg md:text-xl font-light mb-8 sm:mb-10 min-h-[2rem] max-w-lg">
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
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-white/60 text-[10px] uppercase tracking-[0.3em] mb-3">Next draw closes in</p>
              <div className="flex gap-2 sm:gap-3 md:gap-5 mb-8 sm:mb-10 max-w-md">
                <CountdownBlock value={timeLeft.days}    label="Days" />
                <CountdownBlock value={timeLeft.hours}   label="Hours" />
                <CountdownBlock value={timeLeft.minutes} label="Mins" />
                <CountdownBlock value={timeLeft.seconds} label="Secs" />
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                <Link
                  to="/subscribe"
                  className={`${DISPLAY} inline-flex items-center justify-center gap-2 bg-utd-red text-white px-6 sm:px-8 py-3.5 sm:py-4 text-sm tracking-widest hover:bg-[#A8201A] transition-colors`}
                >
                  Enter the draw →
                </Link>
                <a
                  href="#prizes"
                  className={`${DISPLAY} inline-flex items-center justify-center border border-white/40 hover:border-white hover:bg-white/10 text-white px-6 sm:px-8 py-3.5 sm:py-4 text-sm tracking-widest transition-colors`}
                >
                  See prizes
                </a>
              </div>
            </FadeIn>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 h-1 w-24 sm:w-32 bg-utd-gold" />
      </section>

      {/* ─── Image slider (dark) ──────────────────────────────────────────── */}
      <FadeIn>
        <ImageSlider />
      </FadeIn>

      {/* ─── Marquee (gold) ───────────────────────────────────────────────── */}
      <MarqueeStrip />

      {/* ─── Club stats bar (DARK) ────────────────────────────────────────── */}
      <div className="bg-gray-900 border-b border-white/10 py-8 sm:py-10 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center sm:justify-between gap-x-6 gap-y-6">
          {clubStats.map((s, i) => (
            <div key={i} className="flex flex-col items-center text-center min-w-[80px] sm:min-w-0">
              <span className={`${DISPLAY} text-utd-red text-3xl sm:text-4xl leading-none`}>
                {s.value}
              </span>
              <span className="text-white/60 text-[10px] uppercase tracking-[0.2em] mt-2 max-w-[110px] leading-tight">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Prizes section ───────────────────────────────────────────────── */}
      <section id="prizes" className="bg-gray-100 py-12 sm:py-16 md:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-12 pb-6 border-b border-gray-200">
              <div>
                <p className="text-utd-red text-[10px] sm:text-[11px] uppercase tracking-[0.3em] mb-3 font-semibold">Win prizes</p>
                <h2 className={`${DISPLAY} text-gray-900 text-3xl sm:text-4xl md:text-5xl leading-none`}>
                  In the <span className="text-utd-red">next draw</span>
                </h2>
              </div>
              <p className="text-gray-500 text-sm max-w-xs">
                Winners announced soon after the draw has taken place.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {prizes.map((prize, i) => (
              <FadeIn key={prize.id} delay={i * 0.1} direction="up">
                <PrizeCard prize={prize} />
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <p className="text-center text-gray-500 text-xs mt-8 sm:mt-10">
              For full details of the prizes, please see our{' '}
              <Link to="/prizes" className="text-utd-red hover:underline underline-offset-2 font-semibold">
                Prize Terms & Conditions
              </Link>.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ─── Rashford quote (dark image) ──────────────────────────────────── */}
      <section className="relative overflow-hidden border-t-2 border-utd-red min-h-[380px] sm:min-h-[440px] md:min-h-[480px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/images/rashford.jpg)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/40 sm:to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 flex items-center min-h-[380px] sm:min-h-[440px] md:min-h-[480px]">
          <FadeIn direction="left">
            <div className="max-w-xl">
              <span className="text-utd-red text-6xl sm:text-7xl md:text-8xl font-serif leading-none select-none block">"</span>
              <p className="text-white text-base sm:text-xl md:text-2xl font-light leading-relaxed -mt-4 sm:-mt-6 mb-6 sm:mb-8">
                What families are going through now, I've once had to go through that — and it's very difficult to find a way out. It's very important for me to help people who are struggling.
              </p>
              <div className="flex items-center gap-3 sm:gap-4 pt-4 border-t border-white/20">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-utd-red flex items-center justify-center text-white shrink-0">
                  <span className={`${DISPLAY} text-base sm:text-lg`}>MR</span>
                </div>
                <div>
                  <p className={`${DISPLAY} text-white text-sm sm:text-base`}>Marcus Rashford MBE</p>
                  <p className="text-white/60 text-[10px] sm:text-xs uppercase tracking-widest mt-0.5">Foundation Ambassador</p>
                </div>
              </div>
              <p className="text-white/50 text-xs mt-4 sm:mt-5 italic">
                Your subscription directly funds the Foundation's community programmes.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── Subscribe section ────────────────────────────────────────────── */}
      <SubscribeSection />

      {/* ─── About / Foundation (dark image) ──────────────────────────────── */}
      <section
        id="about"
        className="relative py-16 sm:py-20 md:py-24 px-4 overflow-hidden"
        style={{
          backgroundImage: 'url(/images/team-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/70" />
        <FadeIn>
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <p className="text-utd-gold text-[10px] sm:text-[11px] uppercase tracking-[0.3em] mb-4">
              About the Foundation
            </p>
            <h2 className={`${DISPLAY} text-white text-3xl sm:text-4xl md:text-5xl mb-2 leading-[0.95]`}>
              More than<br />
              <span className="text-utd-red">a prize draw</span>
            </h2>
            <div className="h-0.5 w-16 bg-utd-red mx-auto my-5 sm:my-6" />
            <p className="text-white/90 text-sm sm:text-base leading-relaxed mb-4">
              The Foundation uses the power of football to reach people and communities that many other programmes struggle to reach.
            </p>
            <p className="text-white/70 text-sm leading-relaxed mb-8 sm:mb-10">
              Its work focuses on Learning & Education, Health & Healthy Behaviours,
              Safe Spaces & Places, and Movement & Activity. Your support helps fund
              projects across Greater Manchester — Breakfast Clubs, mentoring,
              and support for families and vulnerable people.
            </p>
            <Link
              to="/subscribe"
              className={`${DISPLAY} inline-block bg-utd-red text-white px-8 sm:px-10 py-3.5 sm:py-4 text-sm tracking-widest hover:bg-[#A8201A] transition-colors`}
            >
              Sign Up Here
            </Link>
          </div>
        </FadeIn>
      </section>

      {/* ─── Stats (LIGHT GREY) ───────────────────────────────────────────── */}
      <StatsSection />

      {/* ─── Newsletter (WHITE with red border) ───────────────────────────── */}
      <section className="bg-white border-t-4 border-utd-red py-12 sm:py-14 md:py-16 px-4">
        <FadeIn>
          <div className="max-w-xl mx-auto text-center">
            <p className="text-utd-red text-[10px] sm:text-[11px] uppercase tracking-[0.3em] mb-3 font-semibold">Stay in the loop</p>
            <h3 className={`${DISPLAY} text-gray-900 text-2xl sm:text-3xl md:text-4xl leading-none mb-4`}>
              Be first to <span className="text-utd-red">hear</span>
            </h3>
            <p className="text-gray-600 text-sm mb-6 sm:mb-8">
              Drop your email below and we'll notify you before each draw goes live.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 max-w-md mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-white border border-gray-300 px-5 py-3.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-utd-red transition-colors"
              />
              <button className={`${DISPLAY} w-full sm:w-auto bg-utd-red hover:bg-[#A8201A] text-white text-sm tracking-widest px-7 py-3.5 sm:py-0 transition-colors`}>
                Register
              </button>
            </div>
          </div>
        </FadeIn>
      </section>

    </div>
  )
}