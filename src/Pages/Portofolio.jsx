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
import { Award, Boxes, Images } from "lucide-react";

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
  { icon: "tailwind.svg", language: "Tailwind CSS" },
  { icon: "reactjs.svg", language: "ReactJS" },
  { icon: "vite.svg", language: "Vite" },
  { icon: "nodejs.svg", language: "Node JS" },
  { icon: "bootstrap.svg", language: "Bootstrap" },
  { icon: "firebase.svg", language: "Firebase" },
  { icon: "MUI.svg", language: "Material UI" },
  { icon: "vercel.svg", language: "Vercel" },
  { icon: "SweetAlert.svg", language: "SweetAlert2" },
];

const ExperienceCard = ({ img, description }) => (
  <div className="relative group rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm hover:border-blue-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
    <div className="aspect-video overflow-hidden">
      <img src={img} alt="Experience" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
    </div>
    {description && (
      <div className="p-4">
        <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
      </div>
    )}
  </div>
);

const GalleryCard = ({ img, description }) => (
  <div className="relative group rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm hover:border-blue-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
    <div className="aspect-square overflow-hidden">
      <img src={img} alt="Gallery" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
    </div>
    {description && (
      <div className="p-3">
        <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
      </div>
    )}
  </div>
);

export default function FullWidthTabs() {
  const [value, setValue] = useState(0);
  const [certificates, setCertificates] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const [showAllGallery, setShowAllGallery] = useState(false);
  const isMobile = window.innerWidth < 768;
  const initialItems = isMobile ? 4 : 6;

  useEffect(() => { AOS.init({ once: false }); }, []);

  const fetchData = useCallback(async () => {
    try {
      const [certRes, galleryRes] = await Promise.all([
        supabase.from("certificates").select("*").order('id', { ascending: false }),
        supabase.from("gallery").select("*").order('id', { ascending: false }),
      ]);
      if (certRes.error) throw certRes.error;
      if (galleryRes.error) throw galleryRes.error;
      setCertificates(certRes.data || []);
      setGallery(galleryRes.data || []);
      localStorage.setItem("certificates", JSON.stringify(certRes.data || []));
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  }, []);

  useEffect(() => {
    const cached = localStorage.getItem('certificates');
    if (cached) setCertificates(JSON.parse(cached));
    fetchData();
  }, [fetchData]);

  const handleChange = (event, newValue) => setValue(newValue);
  const displayedCertificates = showAllCertificates ? certificates : certificates.slice(0, initialItems);
  const displayedGallery = showAllGallery ? gallery : gallery.slice(0, initialItems);

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
                fontSize: { xs: "0.9rem", md: "1rem" },
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
            <Tab icon={<Images className="mb-2 w-5 h-5 transition-all duration-300" />} label="Gallery" {...a11yProps(1)} />
            <Tab icon={<Boxes className="mb-2 w-5 h-5 transition-all duration-300" />} label="Tech Stack" {...a11yProps(2)} />
          </Tabs>
        </AppBar>

        <div>
          <TabPanel value={value} index={0}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
                {displayedCertificates.map((cert, index) => (
                  <div key={cert.id || index}
                    data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}>
                    <ExperienceCard img={cert.img} description={cert.description} />
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

          <TabPanel value={value} index={1}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
                {displayedGallery.length === 0 ? (
                  <div className="col-span-4 text-center py-16 text-gray-500">Belum ada foto gallery.</div>
                ) : (
                  displayedGallery.map((item, index) => (
                    <div key={item.id || index}
                      data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                      data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}>
                      <GalleryCard img={item.img} description={item.description} />
                    </div>
                  ))
                )}
              </div>
            </div>
            {gallery.length > initialItems && (
              <div className="mt-6 w-full flex justify-start">
                <ToggleButton onClick={() => setShowAllGallery(prev => !prev)} isShowingMore={showAllGallery} />
              </div>
            )}
          </TabPanel>

          <TabPanel value={value} index={2}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden pb-[5%]">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 lg:gap-8 gap-5">
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
        </div>

      </Box>
    </div>
  );
}