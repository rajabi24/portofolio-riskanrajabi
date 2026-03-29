import React, { useState, useEffect, useCallback, memo } from "react"
import { Helmet } from "react-helmet-async"
import { Github, Linkedin, Mail, ExternalLink, Instagram, Sparkles } from "lucide-react"
import AOS from 'aos'
import 'aos/dist/aos.css'

const FloatingParticles = memo(() => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 5,
    duration: Math.random() * 10 + 10,
  }));
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-blue-400/20 animate-pulse"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            top: `${p.top}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
});

const StatusBadge = memo(() => (
  <div className="inline-block animate-float lg:mx-0" data-aos="zoom-in" data-aos-delay="400">
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#1d4ed8] to-[#0ea5e9] rounded-full blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
      <div className="relative px-3 sm:px-4 py-2 rounded-full bg-black/40 backdrop-blur-xl border border-white/10">
        <span className="bg-gradient-to-r from-[#1d4ed8] to-[#0ea5e9] text-transparent bg-clip-text sm:text-sm text-[0.7rem] font-medium flex items-center">
          <Sparkles className="sm:w-4 sm:h-4 w-3 h-3 mr-2 text-blue-400" />
          Open to Opportunities
        </span>
      </div>
    </div>
  </div>
));

const MainTitle = memo(() => (
  <div className="space-y-1 sm:space-y-2" data-aos="fade-up" data-aos-delay="600">
    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
      <span className="relative inline-block">
        <span className="absolute -inset-2 bg-gradient-to-r from-[#1d4ed8] to-[#0ea5e9] blur-3xl opacity-40"></span>
        <span className="relative bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent">
          Informatics
        </span>
      </span>
      <br />
      <span className="relative inline-block mt-1 sm:mt-2">
        <span className="absolute -inset-2 bg-gradient-to-r from-[#1d4ed8] to-[#0ea5e9] blur-3xl opacity-40"></span>
        <span className="relative bg-gradient-to-r from-[#1d4ed8] to-[#0ea5e9] bg-clip-text text-transparent">
          Student
        </span>
      </span>
    </h1>
  </div>
));

const CTAButton = memo(({ href, text, icon: Icon }) => (
  <a href={href}>
    <button className="group relative w-[140px] sm:w-[160px]">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#1d4ed8] to-[#0ea5e9] rounded-xl opacity-50 blur-md group-hover:opacity-90 transition-all duration-700"></div>
      <div className="relative h-10 sm:h-11 bg-[#020d1a] backdrop-blur-xl rounded-lg border border-white/10 leading-none overflow-hidden">
        <div className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 bg-gradient-to-r from-[#1d4ed8]/20 to-[#0ea5e9]/20"></div>
        <span className="absolute inset-0 flex items-center justify-center gap-2 text-xs sm:text-sm group-hover:gap-3 transition-all duration-300">
          <span className="bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent font-medium z-10">
            {text}
          </span>
          <Icon className={`w-3 h-3 sm:w-4 sm:h-4 text-gray-200 ${text === 'Contact' ? 'group-hover:translate-x-1' : 'group-hover:rotate-45'} transform transition-all duration-300 z-10`} />
        </span>
      </div>
    </button>
  </a>
));

const SocialLink = memo(({ icon: Icon, link, label }) => (
  <a href={link} target="_blank" rel="noopener noreferrer" aria-label={label}>
    <button className="group relative p-2 sm:p-3" aria-label={label}>
      <div className="absolute inset-0 bg-gradient-to-r from-[#1d4ed8] to-[#0ea5e9] rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
      <div className="relative rounded-xl bg-black/50 backdrop-blur-xl p-1.5 sm:p-2 flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-all duration-300">
        <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-white transition-colors" />
      </div>
    </button>
  </a>
));

const ScrollIndicator = memo(() => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY < 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 sm:gap-2 z-10 transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}>
      <span className="text-[10px] sm:text-xs text-gray-500 tracking-widest uppercase">Scroll</span>
      <div className="w-[1px] h-6 sm:h-10 bg-gradient-to-b from-blue-500 to-transparent animate-pulse" />
    </div>
  );
});

const TYPING_SPEED = 100;
const ERASING_SPEED = 50;
const PAUSE_DURATION = 2000;
const WORDS = ["Software Engineering Student", "GIS & Data Enthusiast", "Tech Explorer"];
const SOCIAL_LINKS = [
  { icon: Github, link: "https://github.com/rajabi24", label: "GitHub Profile" },
  { icon: Linkedin, link: "https://www.linkedin.com/in/muhammad-riskan-rajabi-271a08392", label: "LinkedIn Profile" },
  { icon: Instagram, link: "https://www.instagram.com/rizqan_rajabi?igsh=dG02ZW10NmRnZGZt", label: "Instagram Profile" }
];

const Home = () => {
  const [text, setText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [wordIndex, setWordIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const initAOS = () => { AOS.init({ once: true, offset: 10 }); };
    initAOS();
    window.addEventListener('resize', initAOS);
    return () => window.removeEventListener('resize', initAOS);
  }, []);

  useEffect(() => {
    setIsLoaded(true);
    return () => setIsLoaded(false);
  }, []);

  const handleTyping = useCallback(() => {
    if (isTyping) {
      if (charIndex < WORDS[wordIndex].length) {
        setText(prev => prev + WORDS[wordIndex][charIndex]);
        setCharIndex(prev => prev + 1);
      } else {
        setTimeout(() => setIsTyping(false), PAUSE_DURATION);
      }
    } else {
      if (charIndex > 0) {
        setText(prev => prev.slice(0, -1));
        setCharIndex(prev => prev - 1);
      } else {
        setWordIndex(prev => (prev + 1) % WORDS.length);
        setIsTyping(true);
      }
    }
  }, [charIndex, isTyping, wordIndex]);

  useEffect(() => {
    const timeout = setTimeout(handleTyping, isTyping ? TYPING_SPEED : ERASING_SPEED);
    return () => clearTimeout(timeout);
  }, [handleTyping]);

  return (
    <>
      <Helmet>
        <title>Muhammad Riskan Rajabi — Informatics Student</title>
        <meta name="description" content="Website portofolio Muhammad Riskan Rajabi, mahasiswa Informatika Universitas Syiah Kuala yang tertarik di bidang Software Engineering, GIS, dan Data." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://riskanrajabi.com" />
        <meta property="og:title" content="Muhammad Riskan Rajabi — Informatics Student" />
        <meta property="og:description" content="Website portofolio Muhammad Riskan Rajabi, mahasiswa Informatika USK." />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="bg-[#020d1a] overflow-x-hidden px-[5%] sm:px-[5%] lg:px-[10%]" id="Home">
        <FloatingParticles />
        <div className={`relative z-10 transition-all duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
          <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 py-16 sm:py-20 lg:py-24 min-h-screen">

              {/* Left Column - TEKS (di ATAS di mobile) */}
              <div className="w-full lg:w-1/2 space-y-4 sm:space-y-6 text-center lg:text-left order-1 lg:order-1"
                data-aos="fade-right" data-aos-delay="200">
                
                <div className="flex justify-center lg:justify-start">
                  <StatusBadge />
                </div>
                
                <MainTitle />

                {/* Typing Effect */}
                <div className="h-7 sm:h-8 flex items-center justify-center lg:justify-start" data-aos="fade-up" data-aos-delay="800">
                  <span className="text-base sm:text-xl md:text-2xl bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent font-light">
                    {text}
                  </span>
                  <span className="w-[2px] sm:w-[3px] h-4 sm:h-6 bg-gradient-to-t from-[#1d4ed8] to-[#0ea5e9] ml-1 animate-blink"></span>
                </div>

                {/* Description */}
                <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light"
                  data-aos="fade-up" data-aos-delay="1050">
                  Saya memiliki ketertarikan mendalam dalam pengolahan dan analisis data — mengubah raw data menjadi insight yang bermakna. Saya percaya data adalah kunci untuk membuat keputusan yang lebih baik dan solusi yang lebih tepat sasaran.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-row gap-3 justify-center lg:justify-start" data-aos="fade-up" data-aos-delay="1400">
                  <CTAButton href="#ConnectWithMe" text="Connect" icon={Mail} />
                  <CTAButton href="#Contact" text="Contact" icon={Mail} />
                </div>

                {/* Social Links */}
                <div className="flex gap-3 sm:gap-4 justify-center lg:justify-start" data-aos="fade-up" data-aos-delay="1600">
                  {SOCIAL_LINKS.map((social, index) => (
                    <SocialLink key={index} {...social} />
                  ))}
                </div>
              </div>

              {/* Right Column - VIDEO (di BAWAH di mobile) */}
              <div className="w-full lg:w-1/2 flex items-center justify-center order-2 lg:order-2 mt-6 lg:mt-0"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                data-aos="fade-left" data-aos-delay="600">
                
                <div className="w-full max-w-md sm:max-w-lg lg:max-w-full">
                  <iframe
                    src="https://www.youtube.com/embed/p11brMVdhrg?autoplay=1&mute=1&loop=1&playlist=p11brMVdhrg&controls=0&showinfo=0&rel=0"
                    className={`w-full h-[200px] sm:h-[280px] md:h-[320px] lg:h-[400px] rounded-2xl transition-all duration-500 ${isHovering ? "scale-[98%] lg:scale-[95%] rotate-1" : "scale-100 lg:scale-[98%]"}`}
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    title="YouTube video"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <ScrollIndicator />
      </div>
    </>
  );
};

export default memo(Home);