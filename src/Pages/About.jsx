import React, { useEffect, memo } from "react"
import { ArrowUpRight, Sparkles, Users, BookOpen } from "lucide-react"
import AOS from 'aos'
import 'aos/dist/aos.css'

const Header = memo(() => (
  <div className="text-center lg:mb-8 mb-2 px-[5%]">
    <div className="inline-block relative group">
      <h2 
        className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#1d4ed8] to-[#0ea5e9]" 
        data-aos="zoom-in-up"
        data-aos-duration="600"
      >
        About Me
      </h2>
    </div>
    <p 
      className="mt-2 text-gray-400 max-w-2xl mx-auto text-base sm:text-lg flex items-center justify-center gap-2"
      data-aos="zoom-in-up"
      data-aos-duration="800"
    >
      <Sparkles className="w-5 h-5 text-blue-400" />
      Turning curiosity into digital solutions
      <Sparkles className="w-5 h-5 text-blue-400" />
    </p>
  </div>
));

const ProfileImage = memo(() => (
  <div className="flex justify-end items-center sm:p-12 sm:py-0 sm:pb-0 p-0 py-2 pb-2">
    <div className="relative group" data-aos="fade-up" data-aos-duration="1000">
      <div className="absolute -inset-6 opacity-[25%] z-0 hidden sm:block">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-600 rounded-full blur-2xl animate-spin-slower" />
        <div className="absolute inset-0 bg-gradient-to-l from-sky-500 via-blue-500 to-indigo-600 rounded-full blur-2xl animate-pulse-slow opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-600 via-cyan-500 to-teal-400 rounded-full blur-2xl animate-float opacity-50" />
      </div>
      <div className="relative">
        <div className="w-72 h-72 sm:w-80 sm:h-80 rounded-full overflow-hidden shadow-[0_0_40px_rgba(29,78,216,0.3)] transform transition-all duration-700 group-hover:scale-105">
          <div className="absolute inset-0 border-4 border-white/20 rounded-full z-20 transition-all duration-700 group-hover:border-white/40 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 z-10 transition-opacity duration-700 group-hover:opacity-0 hidden sm:block" />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-500/20 via-transparent to-cyan-500/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 hidden sm:block" />
          <img
            src="/Photo.jpg"
            alt="Profile"
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  </div>
));

const OrganizationCard = memo(({ icon: Icon, title, role, year, color }) => (
  <div className="relative bg-gradient-to-br from-[#1d4ed8]/5 via-transparent to-[#0ea5e9]/5 border border-[#1d4ed8]/30 rounded-2xl p-4 backdrop-blur-md shadow-2xl overflow-hidden group hover:border-[#1d4ed8]/60 transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 cursor-pointer">
    {/* Glow sudut kanan atas */}
    <div className="absolute top-2 right-4 w-16 h-16 bg-gradient-to-r from-[#1d4ed8]/20 to-[#0ea5e9]/20 rounded-full blur-xl" />
    {/* Glow sudut kiri bawah */}
    <div className="absolute -bottom-4 -left-2 w-12 h-12 bg-gradient-to-r from-[#0ea5e9]/20 to-[#1d4ed8]/20 rounded-full blur-lg" />
    {/* Glow hover */}
    <div className="absolute -inset-1 bg-gradient-to-r from-[#1d4ed8] to-[#0ea5e9] rounded-2xl blur-md opacity-0 group-hover:opacity-20 transition-all duration-500 -z-10" />

    <div className="relative z-10 flex items-start gap-4">
      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-500/20 shrink-0 group-hover:bg-blue-500/40 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
        <Icon className="w-5 h-5 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
      </div>
      <div>
        <p className="text-white font-semibold text-sm group-hover:text-blue-200 transition-colors duration-300">{role}</p>
        <p className="text-gray-400 text-xs mt-0.5 group-hover:text-gray-300 transition-colors duration-300">{title}</p>
        <span className="text-[11px] text-blue-400 mt-1 inline-block">{year}</span>
      </div>
    </div>
  </div>
));

const organizations = [
  {
    icon: Users,
    role: "Ketua OSIS",
    title: "MAN 1 Siak",
    year: "2024",
    color: "from-[#1d4ed8] to-[#0ea5e9]",
  },
  {
    icon: BookOpen,
    role: "Ketua Forum Pelajar Muslim",
    title: "Kerohanian Islam Siak",
    year: "2024",
    color: "from-[#0ea5e9] to-[#1d4ed8]",
  },
  {
    icon: Users,
    role: "Anggota Divisi Sosial Masyarakat",
    title: "Himpunan Mahasiswa Informatika USK",
    year: "2025 — Sekarang",
    color: "from-[#1d4ed8] to-[#0ea5e9]",
  },
];

const AboutPage = () => {
  useEffect(() => {
    const initAOS = () => { AOS.init({ once: false }); };
    initAOS();
    let resizeTimer;
    const handleResize = () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(initAOS, 250); };
    window.addEventListener('resize', handleResize);
    return () => { window.removeEventListener('resize', handleResize); clearTimeout(resizeTimer); };
  }, []);

  return (
    <div className="h-auto pb-[10%] text-white overflow-hidden px-[5%] sm:px-[5%] lg:px-[10%] mt-0" id="About">
      <Header />
      <div className="w-full mx-auto pt-8 sm:pt-12 relative">

        {/* Atas: teks kiri + foto kanan */}
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="space-y-6 text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold" data-aos="fade-right" data-aos-duration="1000">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1d4ed8] to-[#0ea5e9]">
                Hello, I'm
              </span>
              <span className="block mt-2 text-gray-200" data-aos="fade-right" data-aos-duration="1300">
                Muhammad Riskan Rajabi
              </span>
            </h2>

            <p className="text-base sm:text-lg lg:text-xl text-gray-400 leading-relaxed text-justify"
              data-aos="fade-right" data-aos-duration="1500">
              Saya adalah mahasiswa Informatika di Universitas Syiah Kuala yang tertarik pada Software Engineering, GIS, dan Data. Saya senang membangun solusi digital yang fungsional dan berdampak nyata, serta terus belajar teknologi baru untuk berkembang.
            </p>

            <p className="text-base sm:text-lg lg:text-xl text-gray-400 leading-relaxed text-justify"
              data-aos="fade-right" data-aos-duration="1600">
              Selain dunia teknologi, saya juga aktif dalam kegiatan organisasi dan kepemimpinan. Pengalaman sebagai Ketua OSIS dan Ketua Forum Pelajar Muslim mengajarkan saya arti tanggung jawab, kolaborasi, dan bagaimana memimpin dengan hati.
            </p>

            {/* Quote box */}
            <div className="relative bg-gradient-to-br from-[#1d4ed8]/5 via-transparent to-[#0ea5e9]/5 border border-[#1d4ed8]/30 rounded-2xl p-4 my-6 backdrop-blur-md shadow-2xl overflow-hidden"
              data-aos="fade-up" data-aos-duration="1700">
              <div className="absolute top-2 right-4 w-16 h-16 bg-gradient-to-r from-[#1d4ed8]/20 to-[#0ea5e9]/20 rounded-full blur-xl" />
              <div className="absolute -bottom-4 -left-2 w-12 h-12 bg-gradient-to-r from-[#0ea5e9]/20 to-[#1d4ed8]/20 rounded-full blur-lg" />
              <div className="absolute top-3 left-4 text-[#1d4ed8] opacity-30">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                </svg>
              </div>
              <blockquote className="text-gray-300 text-center lg:text-left italic font-medium text-sm relative z-10 pl-6">
                "Bukan seberapa cepat kamu belajar, tapi seberapa konsisten kamu melakukannya."
              </blockquote>
            </div>
          </div>
          <ProfileImage />
        </div>

        {/* Bawah: organisasi full width 3 kolom */}
        <div className="mt-10" data-aos="fade-up" data-aos-duration="1800">
          <p className="text-sm uppercase tracking-widest text-blue-400 mb-3 font-medium">Organisasi & Pengalaman</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {organizations.map((org, i) => (
              <OrganizationCard key={i} {...org} />
            ))}
          </div>
        </div>

      </div>

      <style jsx>{`
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
        @keyframes spin-slower { to { transform: rotate(360deg); } }
        .animate-pulse-slow { animation: pulse 3s infinite; }
        .animate-spin-slower { animation: spin-slower 8s linear infinite; }
      `}</style>
    </div>
  );
};

export default memo(AboutPage);