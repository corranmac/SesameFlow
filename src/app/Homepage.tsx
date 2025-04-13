import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <section className="m-5 h-[80vh] gap-10 bg-white text-gray-900 py-24 text-center shadow-md flex items-center justify-center flex-col">
      <div>
        <h1 className="text-5xl font-serif font-semibold mb-6 text-gray-900 ">Sesame Flow</h1>
        <h4 className="text-xl font-light text-gray-700 opacity-90">
          <span>Open, FAIR & modern research flows</span> 
        </h4>
        {/* Call-to-Action Button */}
        <div className="mt-12">
          <Link
            to="/flow"
            className="px-6 py-3 text-lg font-medium text-white bg-gray-900 rounded-md shadow-md hover:bg-gray-700 transition"
          >
            Get Started
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Homepage;
