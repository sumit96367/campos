import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageTransition from '../components/ui/PageTransition';

const wineDownSections = [
  {
    title: "Gigi's Blend",
    videoId: "Zqzncphhtm4",
    description: "Gigi's Blend is the flagship wine that started the Campos Family Vineyards Give Back Series. A medium-bodied Barbera blend donating proceeds to The Temple Grandin Equine Center for autism awareness.",
    link: "/wines",
  },
  {
    title: "Forget Me Not",
    videoId: "KVwdXuYV1J8",
    description: "An Estate Red Blend (delicate Mourvèdre, Cabernet Franc, and Barbera) supporting care for those with dementia and Alzheimer's disease.",
    link: "/wines",
  },
  {
    title: "Lou",
    videoId: "fgfqbRGEqWQ",
    description: "A 2018 gold medal Zinfandel-Barbera blend honoring baseball legacy and raising funds for ALS CURE Project.",
    link: "/wines",
  },
  {
    title: "Judah",
    videoId: "pUbyCbCJ-vM",
    description: "A 2019 Estate Cabernet Franc inspired by Ric & Michelle's youngest grandson, featuring subtle toasted butterscotch and raspberry notes.",
    link: "/wines",
  },
  {
    title: "Zinfandelta",
    videoId: null,
    image: "https://camposfamilyvineyards.com/wp-content/uploads/2022/09/Zinfandelta-x300-200x474.jpg",
    description: "A groovy, laid-back 2018 vintage Zinfandel celebrating life on the Delta with subtle spice and easy drinking.",
    link: "/wines",
  }
];

const AmyGPage = () => {
  const [showFullBio, setShowFullBio] = useState(false);

  return (
    <PageTransition>
      <Helmet>
        <title>Amy G. - Brand Ambassador | Campos Family Vineyards</title>
        <meta name="description" content="Meet Amy Gutierrez (Amy G.), Brand Ambassador for Campos Family Vineyards. Tour our estate and explore Wine Down video series with Amy G." />
      </Helmet>

      {/* Hero */}
      <div className="relative pt-20 min-h-[50vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/assets/images/Campos-5-scaled.jpg)' }} />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-charcoal/20" />
        </div>
        <div className="relative z-10 section-container pb-20 text-center mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="eyebrow text-gold block mb-4">Brand Ambassador</span>
            <h1 className="heading-hero text-cream mb-0 mx-auto">Meet Amy G.</h1>
          </motion.div>
        </div>
      </div>

      {/* Meet Amy G Section */}
      <section className="section-py bg-cream">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center max-w-6xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="md:col-span-5"
            >
              <div className="relative rounded-lg overflow-hidden shadow-2xl border-4 border-gold/30">
                <img 
                  src="https://camposfamilyvineyards.com/wp-content/uploads/2022/09/AmyG.jpg" 
                  alt="Amy Gutierrez (Amy G.) - Brand Ambassador" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="md:col-span-7"
            >
              <span className="eyebrow text-gold block mb-2">Welcome</span>
              <h2 className="heading-section text-charcoal mb-6">Meet Amy G.</h2>
              <div className="w-16 h-0.5 bg-gold mb-6"></div>
              
              <div className="prose prose-lg text-charcoal/80 font-sans space-y-4">
                <p className="font-serif text-xl text-charcoal italic leading-relaxed">
                  "The best word I can use to describe Campos Family Vineyards is authentic. From the moment I met the owners, Ric and Michelle, I was hooked on their passion."
                </p>
                <p>
                  We are so proud and excited to welcome <strong>Amy Gutierrez (aka Amy G.)</strong>, an award-winning producer, reporter and host, as our Brand Ambassador for Campos Family Vineyards. Amy brings more than 25 years of experience in broadcast television, virtual event hosting and social media.
                </p>
                
                {showFullBio && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-4 pt-2">
                    <p>
                      An eight-time Emmy-winning producer and reporter who covered Major League Baseball's San Francisco Giants, Amy has been their team ambassador since 2008. As a broadcaster, she has also covered the Oakland A's, Golden State Warriors, San Jose Sharks, Raiders, and 49ers.
                    </p>
                    <p>
                      We feel fortunate to have Amy representing Campos Family Vineyards to help us tell the stories behind our wines, our work in the community, and our vineyard home in Contra Costa County.
                    </p>
                    <p>
                      A busy media professional, Amy is a national correspondent for MLB Network and a best-selling author of children's books including <em>Smarty Marty's Got Game</em>. She describes herself as a "storyteller at heart."
                    </p>
                  </motion.div>
                )}

                <div className="pt-4">
                  <button 
                    onClick={() => setShowFullBio(!showFullBio)}
                    className="btn-secondary text-sm py-2 px-6"
                  >
                    {showFullBio ? 'Show Less' : 'Learn More'}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tour Video Section */}
      <section className="section-py bg-ivory border-t border-gold/10">
        <div className="section-container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="eyebrow text-gold block mb-2">Video Tour</span>
            <h2 className="heading-section text-charcoal mb-4">Tour Campos Family Vineyards with Amy G.</h2>
            <div className="w-24 h-0.5 bg-gold mx-auto mb-6"></div>
            <p className="text-charcoal/70 font-sans leading-relaxed">
              Corporate meetings, training sessions or retreats — enjoy our 8,000 square foot indoor event center, or outdoor picnic areas, baseball field, and bocce court!
            </p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-4xl mx-auto shadow-2xl rounded-xl overflow-hidden bg-charcoal aspect-video relative"
            style={{ paddingBottom: '56.25%' }}
          >
            <iframe 
              title="Tour Campos Family Vineyards with Amy G." 
              src="https://www.youtube.com/embed/guyMNYydE94?rel=0"
              frameBorder="0" 
              allowFullScreen="allowfullscreen" 
              loading="lazy"
              className="absolute top-0 left-0 w-full h-full"
            ></iframe>
          </motion.div>
        </div>
      </section>

      {/* Wine Down Section */}
      <section className="section-py bg-cream border-t border-gold/10">
        <div className="section-container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="eyebrow text-gold block mb-2">Video Series</span>
            <h2 className="heading-section text-charcoal mb-6">Wine Down with Amy G.</h2>
            <div className="w-24 h-0.5 bg-gold mx-auto mb-8"></div>
            <p className="text-charcoal/70 font-sans leading-relaxed">
              Join us as Amy G. explores some of our favorite Campos Family Vineyards wines. 
              Discover the stories behind our signature blends and single-varietal wines, 
              from Gigi's Blend to our Zinfandelta.
            </p>
          </div>

          <div className="space-y-24">
            {wineDownSections.map((section, index) => (
              <motion.div 
                key={section.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className={`flex flex-col md:flex-row items-center gap-10 lg:gap-16 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="w-full md:w-1/2">
                  {section.videoId ? (
                    <div className="aspect-w-16 aspect-h-9 w-full shadow-2xl rounded-lg overflow-hidden bg-charcoal relative" style={{ paddingBottom: '56.25%' }}>
                      <iframe 
                        title={`YouTube video player - ${section.title}`} 
                        src={`https://www.youtube.com/embed/${section.videoId}?rel=0`}
                        frameBorder="0" 
                        allowFullScreen="allowfullscreen" 
                        loading="lazy"
                        className="absolute top-0 left-0 w-full h-full"
                      ></iframe>
                    </div>
                  ) : (
                    <div className="flex justify-center">
                      <img src={section.image} alt={section.title} className="h-80 object-contain rounded shadow-lg" />
                    </div>
                  )}
                </div>
                <div className="w-full md:w-1/2 text-center md:text-left">
                  <h3 className="font-serif text-3xl text-charcoal mb-4">{section.title}</h3>
                  <p className="text-charcoal/70 font-sans leading-relaxed mb-6">{section.description}</p>
                  <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                    <Link to={section.link} className="btn-primary">
                      Shop Here
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Virtual Tour Section */}
      <section className="section-py bg-ivory border-t border-gold/10">
        <div className="section-container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="heading-section text-charcoal mb-4">Take a Virtual Tour of our Venue!</h2>
            <h4 className="font-sans text-lg text-charcoal/70 tracking-wide">Click & Drag Your Mouse/Cursor In The Map Below</h4>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-5xl mx-auto rounded-xl shadow-2xl overflow-hidden bg-charcoal border border-gold/20"
          >
            <iframe 
              src="https://www.google.com/maps/embed?pb=!4v1622812558413!6m8!1m7!1sCAoSLEFGMVFpcE1NNUlwaGkyUUlCMmJpMWdvM3U5RU9IVWFPZDhzVk1KVC01S1ds!2m2!1d37.876998014208!2d-121.63227042995!3f92.87522871645784!4f-6.7750556514345845!5f0.4000000000000002" 
              width="100%" 
              height="500" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy"
              title="Virtual Tour Map"
            ></iframe>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
};

export default AmyGPage;
