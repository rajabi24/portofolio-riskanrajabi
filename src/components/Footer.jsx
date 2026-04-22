const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full bg-gray-900 border-t border-gray-700 mt-auto z-40">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center">
          <hr className="w-full max-w-sm mx-auto my-4 border-gray-600" />
          <span className="text-sm text-gray-400">
            © {currentYear} 
            <a href="#Home" className="font-medium hover:underline text-white ml-1">
              Riskan Rajabi™
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};
export default Footer;