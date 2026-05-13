import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import FadeIn from '../components/FadeIn'
import { useInView } from 'react-intersection-observer'
import ParticleBackground from '../components/PracticleBackground'
import Tilt from 'react-parallax-tilt'
import Typewriter from 'typewriter-effect'
import confetti from 'canvas-confetti'

// ── Types ────────────────────────────────────────────────────────────────────

interface Prize {
  id: number
  title: string
  description: string
  image: string
  player: string
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

const fireConfetti = () => {
  // Left side burst
  confetti({
    particleCount: 80,
    angle: 60,
    spread: 70,
    origin: { x: 0, y: 0.8 },
    colors: ['#DA291C', '#FBE122', '#ffffff'],
  })
  // Right side burst
  confetti({
    particleCount: 80,
    angle: 120,
    spread: 70,
    origin: { x: 1, y: 0.8 },
    colors: ['#DA291C', '#FBE122', '#ffffff'],
  })
}
// ── Data ─────────────────────────────────────────────────────────────────────

const prizes: Prize[] = [
  {
    id: 1,
    title: "Rashford Signed Shirt",
    description: "Win a 2025/26 Manchester United Home Shirt personally signed by Marcus Rashford.",
    image: "../../public/images/rashford.jpg",
    player: "MR",
  },
  {
    id: 2,
    title: "Bruno Fernandes Signed Shirt",
    description: "Win a 2025/26 Manchester United Home Shirt personally signed by Bruno Fernandes.",
    image: "../../public/images/prize-bruno.jpg",
    player: "BF",
  },
  {
    id: 3,
    title: "Højlund Signed 2025/26 Shirt",
    description: "Win a 2025/26 Manchester United Home Shirt personally signed by Rasmus Højlund.",
    image: "../../public/images/prize-hojlund.jpg",
    player: "RH",
  },
  {
    id: 4,
    title: "Full Squad Signed Shirt",
    description: "Win an iconic 2025/26 Manchester United Home Shirt signed by the first team squad.",
    image: "../../public/images/prize-squad.jpg",
    player: "MU",
  },
]

// ── Countdown hook ────────────────────────────────────────────────────────────

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

// ── Sub-components ────────────────────────────────────────────────────────────

function CountdownBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-4xl font-medium text-white tabular-nums">
        {String(value).padStart(2, '0')}
      </span>
      <span className="text-xs text-white/60 uppercase tracking-widest mt-1">{label}</span>
    </div>
  )
}

function PrizeCard({ prize }: { prize: Prize }) {
  return (
    <div className='border-2' style={{ borderRadius: '12px', overflow: 'hidden' }}>
      <Tilt
        tiltMaxAngleX={12}
        tiltMaxAngleY={12}
        glareEnable={true}
        glareMaxOpacity={0.15}
        glareColor="#f3f025"
        glarePosition="all"
        glareBorderRadius="12px"
        scale={1.04}
        transitionSpeed={400}
        style={{ borderRadius: '12px' }}
      >
        <motion.div
          className="bg-red-700/90 border border-white/10 rounded-xl p-5 flex flex-col gap-4 h-full"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Image area — floats forward in 3D */}
          <motion.div
            className="w-full h-40  rounded-lg flex items-center justify-center"
            style={{ transform: 'translateZ(20px)' }}
          >
        <img src={prize.image} alt={prize.title} className="w-auto h-1/2 md:h-full object-cover rounded-lg" />
          </motion.div>
          {/* Text — sits at mid depth */}
          <motion.div style={{ transform: 'translateZ(10px)' }}>
            <h3 className="text-white font-medium text-sm">{prize.title}</h3>
            <p className="text-white/90 text-xs mt-1 leading-relaxed">
              {prize.description}
            </p>
          </motion.div>

          {/* Button — pops out furthest */}
          <motion.div
            className="mt-auto"
            style={{ transform: 'translateZ(30px)' }}
          >
            <Link
              to="/subscribe"
              className="block text-center bg-utd-red text-white text-sm py-2 rounded-lg hover:opacity-90 transition"
            >
              Sign up to enter
            </Link>
          </motion.div>
        </motion.div>
      </Tilt>
    </div>
  )
}

// ── Stats data ────────────────────────────────────────────────────────────

interface Stat {
  value: number
  suffix: string
  label: string
  prefix?: string
}

const stats: Stat[] = [
  { value: 2400,  suffix: '+', label: 'Winners to date'            },
  { value: 50000, suffix: '',  label: 'Raised for the Foundation', prefix: '£' },
  { value: 12,    suffix: '',  label: 'Draws every year'           },
  { value: 98,    suffix: '%', label: 'Positive feedback'          },
]
// ── Stats component ───────────────────────────────────────────────────────

function useCountUp(end: number, duration: number, active: boolean): number {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!active) return
    let start = 0
    const step = end / (duration * 60)
    const timer = setInterval(() => {
      start += step
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 1000 / 60)
    return () => clearInterval(timer)
  }, [active, end, duration])

  return count
}

// ── Stats data ────────────────────────────────────────────────────────────


// ── Single stat card ──────────────────────────────────────────────────────

function StatCard({ stat, active, delay }: { stat: Stat; active: boolean; delay: number }) {
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (!active) return
    const t = setTimeout(() => setStarted(true), delay * 1000)
    return () => clearTimeout(t)
  }, [active, delay])

  const count = useCountUp(stat.value, 2, started)

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
      <div className="text-3xl font-medium text-white tabular-nums mb-1">
        {stat.prefix && <span className="text-utd-gold">{stat.prefix}</span>}
        {count.toLocaleString()}
        {stat.suffix && <span className="text-utd-gold">{stat.suffix}</span>}
      </div>
      <p className="text-white/50 text-xs mt-1">{stat.label}</p>
    </div>
  )
}

// ── Stats section ─────────────────────────────────────────────────────────

function StatsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 })

  return (
    <section ref={ref} className="border-t border-white/10 py-16 px-4">
      <FadeIn>
        <p className="text-center text-utd-gold text-xs uppercase tracking-widest mb-2">
          By the numbers
        </p>
        <h2 className="text-center text-xl font-medium text-white mb-10">
          The prize draw in numbers
        </h2>
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
  const drawDate = new Date('2026-05-13T13:14:00')
  const timeLeft = useCountdown(drawDate)

  return (
    <div className=" bg-white/20 text-white">
<div
/>
      {/* ── Hero — staggered children ── */}
      <section
        className="border-b border-white/10 py-20 px-4 text-center"
        style={{ 
  position: 'relative', 
  overflow: 'hidden',
  backgroundImage: 'url(../../public/images/hero-bg.jpg)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
}}
      >
        {/* Particles sit behind everything */}
        <ParticleBackground />

        {/* Content sits above pa rticles */}
        <div className="relative z-10">
          <FadeIn delay={0}>
            <p className="rounded-md text-utd-gold bg-red-600/60 inline-block px-4 py-2 max-w-sm text-xl uppercase tracking-widest">
              Manchester United Foundation
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
  <h1 className="text-4xl sm:text-5xl m-5 font-medium mb-4">
    <Typewriter
      options={{
        strings: [
          'Win a signed Rashford shirt.',
          'Win a signed Bruno shirt.',
          'Win a signed Højlund shirt.',
          'Win a squad signed shirt.',
          'Support your club.',
        ],
        autoStart: true,
        loop: true,
        delay: 50,
        deleteSpeed: 30,
      }}
    />
  </h1>
</FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-white text-base bg-white/30 border border-white/20 rounded-lg p-4  max-w-md mx-auto mb-8">
              Subscribe from just £5/month. Every entry helps the Manchester United
              Foundation deliver life-changing work across Greater Manchester.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <Link
  to="/subscribe"
  onClick={fireConfetti}
  className="inline-block bg-utd-red text-white px-8 py-3 rounded-lg text-sm font-medium hover:opacity-90 transition"
>
  Sign up here
</Link>
          </FadeIn>
        </div>
      </section>

       {/* ── Foundation section — fade up ── */}
      <section className="bg-white/5 border-t border-white/10 py-16 px-4" style={{ 
  position: 'relative', 
  overflow: 'hidden',
  backgroundImage: 'url(../../public/images/team-bg.jpg)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
}}>
        <FadeIn>
          <div className=" max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-medium mb-4">Manchester United Foundation</h2>
            <p className="text-white text-sm bg-black/30 border border-white/20 rounded-lg p-4 leading-relaxed mb-8">
              The Manchester United Foundation uses the power of football to inspire
              and unite young people across Greater Manchester. Every subscription
              helps fund programmes built around three pillars — healthy lives,
              healthy futures, and healthy communities.
            </p>
            <Link
              to="/subscribe"
 onClick={fireConfetti}
  className="inline-block bg-utd-red text-white px-8 py-3 rounded-lg text-sm font-medium hover:opacity-90 transition"
            >
              Join from £5/month
            </Link>
          </div>
        </FadeIn>
      </section>

      {/* ── Countdown — slide in from below ── */}
      <section className="bg-utd-red py-10 px-4">
        <FadeIn direction="up">
          <p className="text-center text-white/70 text-xs uppercase tracking-widest mb-6">
            Next draw in
          </p>
          <div className="flex justify-center gap-8 sm:gap-14">
            <CountdownBlock value={timeLeft.days}    label="Days" />
            <CountdownBlock value={timeLeft.hours}   label="Hours" />
            <CountdownBlock value={timeLeft.minutes} label="Mins" />
            <CountdownBlock value={timeLeft.seconds} label="Secs" />
          </div>
        </FadeIn>
      </section>

      {/* ── Featured prize — slide in from left ── */}
      <section className="py-16 px-4 max-w-7xl mx-auto" style={{ 
  position: 'relative', 
  backgroundImage: 'url(../../public/images/united-squad.jpg)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
}}>
        <FadeIn direction="left">
          <div className="bg-black/20 flex flex-col sm:flex-row gap-5 items-center bg-white/5 border border-white/10 rounded-2xl p-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="w-48 h-48 shrink-0 bg-utd-red/20 rounded-xl flex items-center justify-center cursor-pointer"
            >
              <img src="../../public/images/united-kit.jpg" alt="manchester united shirt" className="w-full h-full object-cover rounded-xl" />
            </motion.div>
            <div className="flex-1">
              <h2 className="text-2xl font-medium mt-2 mb-3">
                Manchester United Squad Signed Shirt
              </h2>
              <p className="text-white/80 text-sm leading-relaxed mb-6">
                Win an iconic 2025/26 Manchester United Home Shirt, personally signed
                by the entire Men's First Team. A must-have piece of club history for
                any true Red.
              </p>
              <Link
                to="/subscribe"
 onClick={fireConfetti}
  className="inline-block bg-utd-red text-white px-8 py-3 rounded-lg text-sm font-medium hover:opacity-90 transition"
              >
                Sign up to win
              </Link>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ── Prize grid — staggered cards ── */}
      <section className="pb-16 px-4 max-w-7xl mx-auto">
  <FadeIn>
    <h2 className="text-xl font-medium mt-5 mb-2">Prizes in the next draw</h2>
    <p className="text-white/50 text-sm mb-6">
      Winners announced shortly after each draw takes place.
    </p>
  </FadeIn>

  {/* Scrollable cards */}
  <div
    id="prize-scroll"
    className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
  >
    {prizes.map((prize, i) => (
      <FadeIn key={prize.id} delay={i * 0.1} direction="up">
        <div className="snap-start shrink-0 w-72">
          <PrizeCard prize={prize} />
        </div>
      </FadeIn>
    ))}
  </div>

  {/* Centred arrow buttons below cards */}
  <div className="flex gap-3 justify-center mt-6">
    <button
      onClick={() => {
        document.getElementById('prize-scroll')!.scrollBy({ left: -300, behavior: 'smooth' })
      }}
      className="w-10 h-10 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition flex items-center justify-center text-white/60 hover:text-white text-lg"
    >
      ‹
    </button>
    <button
      onClick={() => {
        document.getElementById('prize-scroll')!.scrollBy({ left: 300, behavior: 'smooth' })
      }}
      className="w-10 h-10 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition flex items-center justify-center text-white/60 hover:text-white text-lg"
    >
      ›
    </button>
  </div>
</section>
      <StatsSection />

     

      {/* ── Newsletter — fade up ── */}
      <section className="border-t border-white/10 py-10 px-4">
        <FadeIn>
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-base font-medium mb-2">Be first to hear about new draws</h3>
            <p className="text-white/50 text-sm mb-5">
              Drop your email below and we'll notify you before each draw goes live.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-utd-red"
              />
              <button className="bg-utd-red text-white text-sm px-5 py-2.5 rounded-lg hover:opacity-90 transition shrink-0">
                Register
              </button>
            </div>
          </div>
        </FadeIn>
      </section>

    </div>
  )
}