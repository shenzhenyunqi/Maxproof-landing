import { motion } from "motion/react";
import { useState } from "react";

export default function Home() {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    setErrorMessage('');

    const form = e.target as HTMLFormElement;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value;

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        setFormStatus('success');
        form.reset();
        setTimeout(() => setFormStatus('idle'), 5000);
      } else {
        const data = await response.json();
        setFormStatus('error');
        setErrorMessage(data.error || 'Failed to send message. Please try again.');
        setTimeout(() => setFormStatus('idle'), 5000);
      }
    } catch (error) {
      setFormStatus('error');
      setErrorMessage('A network error occurred. Please try again.');
      setTimeout(() => setFormStatus('idle'), 5000);
    }
  };

  return (
    <main className="flex-grow pt-28 pb-20 lg:pt-36 lg:pb-24 overflow-hidden bg-hero-soft-gradient dark:bg-hero-soft-gradient-dark">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-100/40 dark:bg-blue-900/10 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/4 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-100/40 dark:bg-purple-900/10 blur-[100px] rounded-full -translate-x-1/3 translate-y-1/4 pointer-events-none"></div>
      
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-[48%] text-center lg:text-left"
          >
            <div className="inline-flex items-center space-x-2 mb-8 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-full px-3 py-1 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse"></span>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-300">Built for Shopify</span>
            </div>
            <h1 className="text-5xl lg:text-[4rem] font-extrabold font-display leading-[1.1] mb-8 text-gray-900 dark:text-white tracking-tight">
              Transform Your Store with <span className="relative inline-block px-3 py-1 text-gradient-interactive bg-blue-50/50 dark:bg-blue-900/20 rounded-full mx-1 backdrop-blur-sm border border-blue-100/50 dark:border-blue-800/30">Interactive</span> Video Commerce
            </h1>
            <p className="text-lg lg:text-xl text-muted-light dark:text-muted-dark mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium">
              Turn passive viewers into active buyers. Deploy high-impact, shoppable videos that drive engagement and maximize revenue on every page.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a href="#contact" className="w-full sm:w-auto px-8 py-4 bg-primary text-white text-lg font-semibold rounded-xl hover:bg-primary-hover hover:scale-[1.02] transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center">
                Get Started Free
                <span className="material-icons-round ml-2 text-xl">arrow_forward</span>
              </a>
            </div>
            <div className="mt-8 flex items-center justify-center lg:justify-start space-x-6 text-sm font-medium text-gray-500 dark:text-gray-400">
              <div className="flex items-center">
                <span className="material-icons-round text-accent-green text-lg mr-2">check_circle</span>
                <span>Setup in 5 minutes</span>
              </div>
              <div className="flex items-center">
                <span className="material-icons-round text-accent-green text-lg mr-2">check_circle</span>
                <span>No coding required</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-[52%] relative perspective-1000"
          >
            <div className="relative bg-white dark:bg-card-dark rounded-3xl shadow-soft border border-white/50 dark:border-white/10 p-4 lg:p-6 overflow-hidden">
              <div className="flex items-center justify-between mb-6 border-b border-gray-100 dark:border-gray-800 pb-4">
                <div className="flex space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-gray-200 dark:bg-gray-600"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-gray-200 dark:bg-gray-600"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-gray-200 dark:bg-gray-600"></div>
                </div>
                <div className="h-2 w-24 bg-gray-100 dark:bg-gray-800 rounded-full mx-auto"></div>
                <div className="w-10"></div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="hidden sm:block w-[35%] space-y-4 pt-4 opacity-50 blur-[0.5px]">
                  <img alt="Hina Supplement Product Shot" className="rounded-xl w-full h-auto object-cover aspect-[3/4] shadow-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwa6rEWXFO9Coj0d02s2odkGfxunoVKfgdrR3qt6O5pD--U5X2Kfxe29eaKyWdJtnz5WuCo1YLwR2iRwMrkDXws7UELyC3vi5hRZzhkxVripFoIJL0NIgsmfPl6tm7DqLtDUY8BTLtBVhMVA-lJWnjNdNaEfzMnUHAR4FRA52N82_Y-0SrGB42B6hVnogqzi1hWm_RYPVvxkLAQjHM1AfoVpTODIAVdhW7X83bPG2OvGp0dyDaK7tF3dgzzr9UlrypiyVT1TWb6g"/>
                  <div className="space-y-3 px-1">
                    <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-1/2"></div>
                  </div>
                </div>
                <div className="w-full sm:w-[65%] relative z-10 -mt-2 sm:-mt-8 shadow-2xl rounded-2xl">
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[9/16] bg-black ring-1 ring-black/5 dark:ring-white/10">
                    <img alt="Hina Supplement Video Thumbnail" className="w-full h-full object-cover opacity-90" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwa6rEWXFO9Coj0d02s2odkGfxunoVKfgdrR3qt6O5pD--U5X2Kfxe29eaKyWdJtnz5WuCo1YLwR2iRwMrkDXws7UELyC3vi5hRZzhkxVripFoIJL0NIgsmfPl6tm7DqLtDUY8BTLtBVhMVA-lJWnjNdNaEfzMnUHAR4FRA52N82_Y-0SrGB42B6hVnogqzi1hWm_RYPVvxkLAQjHM1AfoVpTODIAVdhW7X83bPG2OvGp0dyDaK7tF3dgzzr9UlrypiyVT1TWb6g"/>
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 shadow-lg">
                        <span className="material-icons-round text-white text-4xl">play_arrow</span>
                      </div>
                    </div>
                    <div className="absolute bottom-6 left-4 right-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md p-3 rounded-xl flex items-center gap-3 shadow-lg border border-white/20">
                      <img alt="Hina Supplement Small Thumb" className="w-12 h-12 rounded-lg object-cover shadow-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwa6rEWXFO9Coj0d02s2odkGfxunoVKfgdrR3qt6O5pD--U5X2Kfxe29eaKyWdJtnz5WuCo1YLwR2iRwMrkDXws7UELyC3vi5hRZzhkxVripFoIJL0NIgsmfPl6tm7DqLtDUY8BTLtBVhMVA-lJWnjNdNaEfzMnUHAR4FRA52N82_Y-0SrGB42B6hVnogqzi1hWm_RYPVvxkLAQjHM1AfoVpTODIAVdhW7X83bPG2OvGp0dyDaK7tF3dgzzr9UlrypiyVT1TWb6g"/>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-gray-900 dark:text-white truncate">Hina Supplement</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">$29.00</p>
                      </div>
                      <button className="bg-black dark:bg-white text-white dark:text-black text-xs px-4 py-2 rounded-lg font-bold hover:opacity-80 transition-opacity">Shop</button>
                    </div>
                  </div>
                  <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    className="absolute -right-6 top-16 bg-white dark:bg-card-dark p-4 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                        <span className="material-icons-round text-green-600 dark:text-green-400 text-sm">trending_up</span>
                      </div>
                      <div>
                        <span className="block text-xs text-muted-light dark:text-muted-dark">Conversion</span>
                        <span className="block text-sm font-bold text-gray-900 dark:text-white">+24%</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* How it works section */}
      <section id="how-it-works" className="py-20 lg:py-32 bg-background-light dark:bg-background-dark">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold font-display text-gray-900 dark:text-white mb-4">Launch shoppable videos in 3 simple steps</h2>
            <p className="text-muted-light dark:text-muted-dark text-lg">No coding required. Get up and running before your coffee gets cold.</p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent z-0"></div>
            
            {[
              { step: '01', icon: 'cloud_upload', title: 'Import Media', desc: 'Connect your social accounts or upload files directly. We auto-optimize everything.' },
              { step: '02', icon: 'local_offer', title: 'Tag Products', desc: 'Select products from your Shopify catalog. Instantly make your videos shoppable with a single click.' },
              { step: '03', icon: 'code', title: 'Embed Anywhere', desc: 'Place the widget on your home page, product pages, or landing pages with one click.' }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="relative z-10 flex flex-col items-center text-center group"
              >
                <div className="w-24 h-24 bg-white dark:bg-card-dark rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 flex items-center justify-center mb-6 group-hover:border-primary transition-colors duration-300">
                  <span className="material-icons-round text-4xl text-primary">{item.icon}</span>
                </div>
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-surface-light dark:bg-surface-dark px-2 text-sm font-bold text-muted-light dark:text-muted-dark">STEP {item.step}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-muted-light dark:text-muted-dark">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features section */}
      <section id="features" className="py-20 bg-surface-light dark:bg-surface-dark overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <span className="text-primary font-semibold tracking-wider uppercase text-sm">Features</span>
            <h2 className="text-3xl lg:text-4xl font-bold font-display text-gray-900 dark:text-white mt-2">Everything you need to sell more</h2>
          </motion.div>
          
          <div className="grid lg:grid-cols-2 gap-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card-light dark:bg-card-dark rounded-3xl p-8 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-card-hover transition-all duration-300 relative overflow-hidden group"
            >
              <div className="relative z-10">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-6">
                  <span className="material-icons-round text-primary text-2xl">speed</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Blazing Fast Speed</h3>
                <p className="text-muted-light dark:text-muted-dark mb-6">Our lightweight player loads asynchronously, ensuring your Core Web Vitals stay green and your customers stay happy.</p>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <span className="material-icons-round text-green-500 text-base mr-2">check</span> Zero impact on load time
                  </li>
                  <li className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <span className="material-icons-round text-green-500 text-base mr-2">check</span> Optimized for mobile
                  </li>
                </ul>
              </div>
              <div className="absolute right-0 bottom-0 w-48 h-48 bg-gradient-to-tl from-primary/10 to-transparent rounded-tl-full"></div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-card-light dark:bg-card-dark rounded-3xl p-8 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-card-hover transition-all duration-300 relative overflow-hidden group"
            >
              <div className="relative z-10">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mb-6">
                  <span className="material-icons-round text-purple-500 text-2xl">touch_app</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Social-like Interface</h3>
                <p className="text-muted-light dark:text-muted-dark mb-6">Give your customers the familiar swipe-up experience they love from social platforms. Reduce friction and increase dwell time.</p>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <span className="material-icons-round text-green-500 text-base mr-2">check</span> Vertical full-screen mode
                  </li>
                  <li className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <span className="material-icons-round text-green-500 text-base mr-2">check</span> Picture-in-picture support
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 bg-gray-900 dark:bg-black rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden border border-gray-800"
            >
              <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
                <div>
                  <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center mb-6">
                    <span className="material-icons-round text-green-400 text-2xl">analytics</span>
                  </div>
                  <h3 className="text-3xl font-bold mb-4">Track every dollar</h3>
                  <p className="text-gray-400 mb-8">Stop guessing which videos work. Our comprehensive analytics dashboard shows you exactly which content drives revenue.</p>
                </div>
                <div className="relative">
                  <div className="bg-gray-800/80 backdrop-blur border border-gray-700 rounded-xl p-6 shadow-2xl">
                    <div className="flex justify-between items-center mb-6">
                      <h4 className="font-semibold text-gray-200">Video Performance</h4>
                      <span className="text-xs bg-gray-700 px-2 py-1 rounded text-gray-300">Last 30 Days</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-gray-700/50 p-4 rounded-lg">
                        <p className="text-xs text-gray-400 mb-1">Total Revenue</p>
                        <p className="text-xl font-bold text-white">$12,450</p>
                        <p className="text-xs text-green-400 mt-1 flex items-center"><span className="material-icons-round text-[10px] mr-1">arrow_upward</span> 12%</p>
                      </div>
                      <div className="bg-gray-700/50 p-4 rounded-lg">
                        <p className="text-xs text-gray-400 mb-1">Conversion Rate</p>
                        <p className="text-xl font-bold text-white">4.8%</p>
                        <p className="text-xs text-green-400 mt-1 flex items-center"><span className="material-icons-round text-[10px] mr-1">arrow_upward</span> 0.5%</p>
                      </div>
                    </div>
                    <div className="h-24 flex items-end gap-2 px-2">
                      <motion.div initial={{ height: 0 }} whileInView={{ height: '33%' }} className="w-1/6 bg-blue-500/30 rounded-t hover:bg-blue-500/60 transition-colors"></motion.div>
                      <motion.div initial={{ height: 0 }} whileInView={{ height: '50%' }} transition={{ delay: 0.1 }} className="w-1/6 bg-blue-500/30 rounded-t hover:bg-blue-500/60 transition-colors"></motion.div>
                      <motion.div initial={{ height: 0 }} whileInView={{ height: '66%' }} transition={{ delay: 0.2 }} className="w-1/6 bg-blue-500/30 rounded-t hover:bg-blue-500/60 transition-colors"></motion.div>
                      <motion.div initial={{ height: 0 }} whileInView={{ height: '50%' }} transition={{ delay: 0.3 }} className="w-1/6 bg-blue-500/30 rounded-t hover:bg-blue-500/60 transition-colors"></motion.div>
                      <motion.div initial={{ height: 0 }} whileInView={{ height: '75%' }} transition={{ delay: 0.4 }} className="w-1/6 bg-blue-500/30 rounded-t hover:bg-blue-500/60 transition-colors"></motion.div>
                      <motion.div initial={{ height: 0 }} whileInView={{ height: '100%' }} transition={{ delay: 0.5 }} className="w-1/6 bg-primary rounded-t shadow-[0_0_15px_rgba(59,130,246,0.5)]"></motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing section */}
      <section id="pricing" className="py-20 lg:py-32 bg-background-light dark:bg-background-dark relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-50 pointer-events-none"></div>
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-extrabold font-display text-gray-900 dark:text-white mb-10">Ready to transform your store?</h2>
            
            <div className="bg-card-light dark:bg-card-dark p-8 lg:p-10 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-800 max-w-xl mx-auto transform hover:-translate-y-2 transition-transform duration-300">
              <div className="flex items-center justify-center mb-8">
                <span className="text-5xl font-bold text-gray-900 dark:text-white">$0</span>
                <div className="ml-3 text-left">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">Free Plan</p>
                  <p className="text-xs text-muted-light dark:text-muted-dark">Forever free for up to 500 views</p>
                </div>
              </div>
              <ul className="text-left space-y-4 mb-8 max-w-xs mx-auto">
                {['Unlimited Video Views', 'Unlimited Video Uploads', 'Product Tagging', 'Real-time Analytics'].map((feature, i) => (
                  <li key={i} className="flex items-center text-gray-600 dark:text-gray-300">
                    <span className="material-icons-round text-green-500 mr-3">check</span> {feature}
                  </li>
                ))}
              </ul>
              <a href="#contact" className="block w-full py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover hover:shadow-lg hover:scale-[1.02] transition-all transform duration-200">
                Get Maxproof Now
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact section */}
      <section id="contact" className="pt-24 pb-0 bg-transparent">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 max-w-4xl mx-auto text-center"
          >
            <span className="text-primary font-semibold tracking-wider uppercase text-sm">SUPPORT</span>
            <h2 className="text-3xl lg:text-4xl font-bold font-display text-gray-900 dark:text-white mt-2">Get in Touch</h2>
            <p className="text-muted-light dark:text-muted-dark text-lg mt-4 max-w-2xl mx-auto">Questions about our enterprise plans or need a custom solution? We're here to help.</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-card-light dark:bg-card-dark rounded-3xl p-8 lg:p-12 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-card-hover transition-all duration-300 max-w-4xl mx-auto"
          >
            <form className="space-y-6" onSubmit={handleContactSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Full Name *</label>
                  <input type="text" id="name" required placeholder="John Doe" className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-primary focus:border-primary transition-shadow duration-200" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Email *</label>
                  <input type="email" id="email" required placeholder="john@example.com" className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-primary focus:border-primary transition-shadow duration-200" />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Message *</label>
                <textarea id="message" required rows={4} placeholder="How can we help you?" className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-primary focus:border-primary transition-shadow duration-200 resize-none"></textarea>
              </div>
              
              {formStatus === 'error' && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm font-medium flex items-center">
                  <span className="material-icons-round mr-2">error_outline</span>
                  {errorMessage}
                </div>
              )}
              
              <div>
                <button 
                  type="submit" 
                  disabled={formStatus === 'submitting' || formStatus === 'success'}
                  className={`w-full py-4 text-white font-bold text-lg rounded-xl shadow-lg transition-all transform duration-200 flex items-center justify-center ${
                    formStatus === 'success' 
                      ? 'bg-green-500 hover:bg-green-600 shadow-green-500/20' 
                      : formStatus === 'error'
                      ? 'bg-red-500 hover:bg-red-600 shadow-red-500/20'
                      : 'bg-primary hover:bg-primary-hover shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5'
                  } ${formStatus === 'submitting' ? 'opacity-80 cursor-not-allowed' : ''}`}
                >
                  {(formStatus === 'idle' || formStatus === 'error') && 'Send Message'}
                  {formStatus === 'submitting' && (
                    <>
                      <span className="material-icons-round animate-spin mr-2">autorenew</span>
                      Sending...
                    </>
                  )}
                  {formStatus === 'success' && (
                    <>
                      <span className="material-icons-round mr-2">check_circle</span>
                      Message Sent!
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
