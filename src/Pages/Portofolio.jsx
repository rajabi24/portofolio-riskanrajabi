import React, { useEffect, useState, useCallback } from "react";
import { supabase } from "../supabase";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TechStackIcon from "../components/TechStackIcon";
import AOS from "aos";
import "aos/dist/aos.css";
import { Award, Boxes, FolderKanban, UserCircle } from "lucide-react";
import { User, MapPin, GraduationCap, Music2, Camera, Code2, Plane, Video } from "lucide-react";


const ToggleButton = ({ onClick, isShowingMore }) => (
  <button onClick={onClick}
    className="px-3 py-1.5 text-slate-300 hover:text-white text-sm font-medium transition-all duration-300 ease-in-out flex items-center gap-2 bg-white/5 hover:bg-white/10 rounded-md border border-white/10 hover:border-white/20 backdrop-blur-sm group relative overflow-hidden">
    <span className="relative z-10 flex items-center gap-2">
      {isShowingMore ? "See Less" : "See More"}
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        className={`transition-transform duration-300 ${isShowingMore ? "group-hover:-translate-y-0.5" : "group-hover:translate-y-0.5"}`}>
        <polyline points={isShowingMore ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}></polyline>
      </svg>
    </span>
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500/50 transition-all duration-300 group-hover:w-full"></span>
  </button>
);

function TabPanel({ children, value, index, ...other }) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`full-width-tabpanel-${index}`} aria-labelledby={`full-width-tab-${index}`} {...other}>
      {value === index && (
        <Box sx={{ p: { xs: 1, sm: 3 } }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const techStacks = [
  { icon: "html.svg", language: "HTML" },
  { icon: "css.svg", language: "CSS" },
  { icon: "javascript.svg", language: "JavaScript" },
  { icon: "vite.svg", language: "Vite" },
  { icon: "nodejs.svg", language: "Node JS" },
  { icon: "pyton.svg", language: "Python" },
  { icon: "c.svg", language: "C" },
  { icon: "mysql.svg", language: "Mysql" },
];

const education = [
  { school: "SDN 01 Lubuk Jering", level: "SD" },
  { school: "Pondok Pesantren Gontor 12", level: "SMP" },
  { school: "MAN 1 Siak", level: "SMA" },
  { school: "Universitas Syiah Kuala", level: "S1" },
];

const musics = [
  { title: "Saturn", artist: "SZA", spotify: "https://open.spotify.com/track/040I32EKLxQrkuxQu1pqvT" },
  { title: "Usik", artist: "Febi Putri", spotify: "https://open.spotify.com/search/Usik%20Feb%20Putri" },
  { title: "Good Days", artist: "SZA", spotify: "https://open.spotify.com/search/Good%20Days%20SZA" },
];

const hobbies = [
  { name: "Fotografi", icon: Camera },
  { name: "Coding", icon: Code2 },
  { name: "Traveling", icon: Plane },
  { name: "Videografi", icon: Video },
];

const SharedCard = ({ img, description }) => (
  <div className="relative group">
    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#1d4ed8] to-[#0ea5e9] rounded-2xl blur opacity-10 group-hover:opacity-30 transition duration-500" />
    <div className="relative bg-white/5 border border-white/12 rounded-2xl overflow-hidden backdrop-blur-sm">
      <div className="aspect-video overflow-hidden">
        <img
          src={img}
          alt="Card"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      {description && (
        <div className="p-4">
          <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
        </div>
      )}
    </div>
  </div>
);

export default function FullWidthTabs() {
  const [value, setValue] = useState(0);
  const [certificates, setCertificates] = useState([]);
  const [projects, setProjects] = useState([]);
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const isMobile = window.innerWidth < 768;
  const initialItems = isMobile ? 4 : 6;

  useEffect(() => { AOS.init({ once: false }); }, []);

  const fetchData = useCallback(async () => {
    try {
      const [certRes, projectRes] = await Promise.all([
        supabase.from("certificates").select("*").order('id', { ascending: false }),
        supabase.from("gallery").select("*").order('id', { ascending: false }),
      ]);
      if (certRes.error) throw certRes.error;
      if (projectRes.error) throw projectRes.error;
      setCertificates(certRes.data || []);
      setProjects(projectRes.data || []);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleChange = (event, newValue) => setValue(newValue);
  const displayedCertificates = showAllCertificates ? certificates : certificates.slice(0, initialItems);
  const displayedProjects = showAllProjects ? projects : projects.slice(0, initialItems);

  return (
    <div className="md:px-[10%] px-[5%] w-full sm:mt-0 mt-[3rem] bg-[#030014] overflow-hidden" id="Portofolio">
      <div className="text-center pb-10" data-aos="fade-up" data-aos-duration="1000">
        <h2 className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#1d4ed8] to-[#0ea5e9]">
          <span style={{
            color: '#1d4ed8',
            backgroundImage: 'linear-gradient(45deg, #1d4ed8 10%, #0ea5e9 93%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Portfolio Showcase
          </span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2">
          Jelajahi perjalanan saya melalui pengalaman dan teknologi yang saya kuasai.
        </p>
      </div>

      <Box sx={{ width: "100%" }}>
        <AppBar position="static" elevation={0} sx={{
          bgcolor: "transparent",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "20px",
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0, left: 0, right: 0, bottom: 0,
            background: "linear-gradient(180deg, rgba(29, 78, 216, 0.03) 0%, rgba(14, 165, 233, 0.03) 100%)",
            backdropFilter: "blur(10px)",
            zIndex: 0,
          },
        }} className="md:px-4">
          <Tabs value={value} onChange={handleChange} textColor="secondary" indicatorColor="secondary" variant="fullWidth"
            sx={{
              minHeight: "70px",
              "& .MuiTab-root": {
                fontSize: { xs: "0.75rem", md: "1rem" },
                fontWeight: "600",
                color: "#94a3b8",
                textTransform: "none",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                padding: "20px 0",
                zIndex: 1,
                margin: "8px",
                borderRadius: "12px",
                "&:hover": { color: "#ffffff", backgroundColor: "rgba(29, 78, 216, 0.1)", transform: "translateY(-2px)" },
                "&.Mui-selected": { color: "#fff", background: "linear-gradient(135deg, rgba(29, 78, 216, 0.2), rgba(14, 165, 233, 0.2))", boxShadow: "0 4px 15px -3px rgba(29, 78, 216, 0.2)" },
              },
              "& .MuiTabs-indicator": { height: 0 },
              "& .MuiTabs-flexContainer": { gap: "8px" },
            }}>
            <Tab icon={<Award className="mb-2 w-5 h-5 transition-all duration-300" />} label="Pengalaman" {...a11yProps(0)} />
            <Tab icon={<FolderKanban className="mb-2 w-5 h-5 transition-all duration-300" />} label="Project" {...a11yProps(1)} />
            <Tab icon={<Boxes className="mb-2 w-5 h-5 transition-all duration-300" />} label="Tech Stack" {...a11yProps(2)} />
            <Tab icon={<UserCircle className="mb-2 w-5 h-5 transition-all duration-300" />} label="About Me" {...a11yProps(3)} />
          </Tabs>
        </AppBar>

        <div>
          {/* TAB PENGALAMAN */}
          <TabPanel value={value} index={0}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
                {displayedCertificates.map((cert, index) => (
                  <div key={cert.id || index}
                    data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}>
                    <SharedCard img={cert.img} description={cert.description} />
                  </div>
                ))}
              </div>
            </div>
            {certificates.length > initialItems && (
              <div className="mt-6 w-full flex justify-start">
                <ToggleButton onClick={() => setShowAllCertificates(prev => !prev)} isShowingMore={showAllCertificates} />
              </div>
            )}
          </TabPanel>

          {/* TAB PROJECT */}
          <TabPanel value={value} index={1}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
                {displayedProjects.length === 0 ? (
                  <div className="col-span-3 text-center py-16 text-gray-500">Belum ada data project.</div>
                ) : (
                  displayedProjects.map((item, index) => (
                    <div key={item.id || index}
                      data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                      data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}>
                      <SharedCard img={item.img} description={item.description} />
                    </div>
                  ))
                )}
              </div>
            </div>
            {projects.length > initialItems && (
              <div className="mt-6 w-full flex justify-start">
                <ToggleButton onClick={() => setShowAllProjects(prev => !prev)} isShowingMore={showAllProjects} />
              </div>
            )}
          </TabPanel>

          {/* TAB TECH STACK */}
          <TabPanel value={value} index={2}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden pb-[5%]">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-8 gap-5">
                {techStacks.map((stack, index) => (
                  <div key={index}
                    data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}>
                    <TechStackIcon TechStackIcon={stack.icon} Language={stack.language} />
                  </div>
                ))}
              </div>
            </div>
          </TabPanel>

          {/* TAB ABOUT ME */}
          <TabPanel value={value} index={3}>
            <div className="relative rounded-2xl overflow-hidden" data-aos="fade-up" data-aos-duration="800">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#1d4ed8] to-[#0ea5e9] rounded-2xl blur opacity-20" />
              <div className="relative bg-gradient-to-b from-[#050a14]/95 to-[#02060e]/98 backdrop-blur-xl border border-white/[0.06] rounded-2xl p-6 sm:p-8">
                <div className="space-y-6">

                  {/* Biodata */}
                  <div data-aos="fade-up" data-aos-duration="800">
                    <p className="text-xs uppercase tracking-widest text-blue-400 mb-3 font-medium flex items-center gap-2">
                      <span className="inline-block w-5 h-0.5 bg-blue-500 rounded-full"></span>
                      Biodata
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {[
                        { icon: User, label: "Nama", value: "Muhammad Riskan Rajabi" },
                        { icon: MapPin, label: "Asal", value: "Siak, Riau" },
                      ].map((item, i) => {
                        const Icon = item.icon;
                        return (
                          <div key={i} className="relative bg-gradient-to-br from-[#1d4ed8]/10 via-transparent to-[#0ea5e9]/10 border border-[#1d4ed8]/40 rounded-2xl p-4 backdrop-blur-md overflow-hidden group hover:border-[#1d4ed8]/70 transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(29,78,216,0.15)] cursor-default flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-blue-500/10 shrink-0 group-hover:bg-blue-500/20 transition-colors duration-300">
                              <Icon size={18} className="text-blue-400" />
                            </div>
                            <div>
                              <p className="text-gray-500 text-[11px] mb-0.5">{item.label}</p>
                              <p className="text-white/80 font-medium text-sm">{item.value}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="border-t border-white/[0.04]" />

                  {/* Pendidikan */}
                  <div data-aos="fade-up" data-aos-duration="1000">
                    <p className="text-xs uppercase tracking-widest text-blue-400 mb-3 font-medium flex items-center gap-2">
                      <span className="inline-block w-5 h-0.5 bg-blue-500 rounded-full"></span>
                      Pendidikan
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5" data-aos="fade-up" data-aos-delay="100">
                      {education.map((item, index) => (
                        <div key={index}
                          className="relative bg-gradient-to-br from-[#1d4ed8]/10 via-transparent to-[#0ea5e9]/10 border border-[#1d4ed8]/40 rounded-2xl p-4 backdrop-blur-md overflow-hidden group hover:border-[#1d4ed8]/70 transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(29,78,216,0.15)] cursor-default flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-gradient-to-br from-[#1d4ed8]/30 to-[#0ea5e9]/30 shrink-0 group-hover:scale-110 transition-all duration-300">
                            <GraduationCap size={16} className="text-blue-300" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-white/80 font-medium text-sm truncate">{item.school}</p>
                            <span className="text-[10px] text-blue-400/80 mt-0.5 inline-block bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/15">{item.level}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-white/[0.04]" />

                  {/* Musik */}
                  <div data-aos="fade-up" data-aos-duration="1200">
                    <p className="text-xs uppercase tracking-widest text-blue-400 mb-3 font-medium flex items-center gap-2">
                      <span className="inline-block w-5 h-0.5 bg-blue-500 rounded-full"></span>
                      Musik Kesukaan
                    </p>
                    <div className="grid grid-cols-3 gap-2.5" data-aos="fade-up" data-aos-delay="100">
                      {musics.map((music, index) => (
                        <a key={index}
                          href={music.spotify}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="relative bg-gradient-to-br from-[#1d4ed8]/10 via-transparent to-[#0ea5e9]/10 border border-[#1d4ed8]/40 rounded-2xl p-4 backdrop-blur-md overflow-hidden group hover:border-[#1d4ed8]/70 transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(29,78,216,0.15)] cursor-pointer flex flex-col items-center text-center gap-2">
                          <div className="w-11 h-11 rounded-full flex items-center justify-center bg-blue-500/10 group-hover:bg-blue-500/20 group-hover:scale-110 transition-all duration-300">
                            <Music2 size={20} className="text-blue-400" />
                          </div>
                          <div>
                            <p className="text-white/80 font-medium text-xs leading-snug">{music.title}</p>
                            <p className="text-gray-500 text-[10px] mt-0.5">{music.artist}</p>
                          </div>
                          <div className="flex items-end gap-0.5 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="w-0.5 bg-blue-400 rounded-full animate-music-1"></div>
                            <div className="w-0.5 bg-blue-400 rounded-full animate-music-2"></div>
                            <div className="w-0.5 bg-blue-400 rounded-full animate-music-3"></div>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-white/[0.04]" />

                  {/* Hobi */}
                  <div data-aos="fade-up" data-aos-duration="1400">
                    <p className="text-xs uppercase tracking-widest text-blue-400 mb-3 font-medium flex items-center gap-2">
                      <span className="inline-block w-5 h-0.5 bg-blue-500 rounded-full"></span>
                      Hobi
                    </p>
                    <div className="grid grid-cols-2 gap-2.5" data-aos="fade-up" data-aos-delay="100">
                      {hobbies.map((hobby, index) => {
                        const Icon = hobby.icon;
                        return (
                          <div key={index}
                            className="relative bg-gradient-to-br from-[#1d4ed8]/10 via-transparent to-[#0ea5e9]/10 border border-[#1d4ed8]/40 rounded-2xl p-4 backdrop-blur-md overflow-hidden group hover:border-[#1d4ed8]/70 transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(29,78,216,0.15)] cursor-default flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-blue-500/10 shrink-0 group-hover:bg-blue-500/20 group-hover:scale-110 transition-all duration-300">
                              <Icon size={20} className="text-blue-400" />
                            </div>
                            <p className="text-white/80 font-medium text-sm">{hobby.name}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>
              </div>
            </div>

            <style>{`
              @keyframes music-1 { 0%, 100% { height: 30%; } 50% { height: 90%; } }
              @keyframes music-2 { 0%, 100% { height: 60%; } 50% { height: 100%; } }
              @keyframes music-3 { 0%, 100% { height: 40%; } 50% { height: 85%; } }
              .animate-music-1 { animation: music-1 0.6s ease-in-out infinite; }
              .animate-music-2 { animation: music-2 0.6s ease-in-out 0.15s infinite; }
              .animate-music-3 { animation: music-3 0.6s ease-in-out 0.3s infinite; }
            `}</style>
          </TabPanel>

        </div>
      </Box>
    </div>
  );
}
