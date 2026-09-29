import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const WineCard = ({ product }) => {
  const { name, category, price, slug, images } = product;
  const imageUrl = images && images.length > 0 ? images[0].url : null;
  const imageAlt = images && images.length > 0 ? images[0].alt : name;

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group flex flex-col h-full bg-cream border border-charcoal/5 shadow-sm hover:shadow-xl transition-shadow duration-500 rounded-sm overflow-hidden"
    >
      <Link to={`/wines/${slug}`} className="block relative aspect-[3/4] bg-ivory overflow-hidden flex items-center justify-center">
        {/* Subtle overlay on hover */}
        <div className="absolute inset-0 bg-charcoal/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
        
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={imageAlt}
            className="w-[85%] h-[85%] object-contain transform group-hover:scale-105 transition-transform duration-700 ease-out drop-shadow-md"
            loading="lazy"
          />
        ) : (
          <svg className="w-12 h-16 text-gold/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.8} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1 1 .3 2.7-1.1 2.7H3.9c-1.4 0-2.1-1.7-1.1-2.7L4.2 15.3" />
          </svg>
        )}

        {/* Hover CTA */}
        <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-20 flex justify-center">
          <span className="bg-charcoal text-cream font-sans text-xs tracking-widest uppercase px-8 py-3 shadow-elegant-sm hover:bg-gold transition-colors">
            View Details
          </span>
        </div>
      </Link>
      
      <div className="p-6 text-center flex flex-col flex-1 bg-cream relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-[1px] bg-gold/30"></div>
        {category && (
          <p className="eyebrow text-[10px] mb-3 text-gold">{category}</p>
        )}
        <h3 className="font-serif text-xl text-charcoal mb-4 leading-snug group-hover:text-gold transition-colors duration-300">
          <Link to={`/wines/${slug}`}>{name}</Link>
        </h3>
        <p className="font-sans text-sm tracking-widest text-charcoal/70 mt-auto">
          ${Number(price).toFixed(2)}
        </p>
      </div>
    </motion.div>
  );
};

export default WineCard;
