// /pages/index.js - Landing Page (Styled like uploaded image)
export default function Home() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white font-sans">
      <header className="flex justify-between items-center p-6">
        <h1 className="text-xl font-bold">TryFirst</h1>
        <nav className="space-x-4">
          <a href="#" className="hover:underline">How it Works</a>
          <a href="#" className="hover:underline">Brands</a>
          <a href="#" className="hover:underline">Testimonials</a>
          <a href="/login" className="bg-white text-black px-4 py-2 rounded">Join</a>
        </nav>
      </header>

      <section className="text-center py-12 px-4">
        <h2 className="text-4xl md:text-6xl font-bold mb-4">Try It. Feel It. Own It.</h2>
        <p className="text-lg md:text-xl mb-6">India's first verified free samples marketplace. Discover and try new products, sent directly to you—absolutely free.</p>
        <a href="/login" className="bg-blue-600 text-white px-6 py-3 rounded text-lg hover:bg-blue-500 transition">Join Free Sample Drops</a>
      </section>

      <section className="px-6 md:px-12 py-12">
        <h3 className="text-2xl font-semibold mb-4">Latest Free Samples</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {"Bloom Moisturizer|50 ml|skincare,Brew Coffee Bar|51g|snack,Aloe Vera Gel|Herbal co.|wellness,Berry Blast|Granola|nutrition".split(',').map((item, idx) => {
            const [title, subtitle] = item.split('|');
            return (
              <div key={idx} className="bg-white text-black p-4 rounded">
                <div className="h-32 bg-gray-300 mb-2"></div>
                <h4 className="font-semibold">{title}</h4>
                <p className="text-sm">{subtitle}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="px-6 md:px-12 py-8">
        <h3 className="text-xl font-semibold mb-4">Why Brands Work With Us</h3>
        <ul className="grid md:grid-cols-3 gap-4">
          <li>
            <p className="font-bold">🧍 REAL USERS</p>
            <p className="text-sm">Reach verified consumers, not bots or deal hunters</p>
          </li>
          <li>
            <p className="font-bold">📊 ACTIONABLE INSIGHTS</p>
            <p className="text-sm">Understand sampling impact—reports on trials, interests, and referrals</p>
          </li>
          <li>
            <p className="font-bold">💬 AUTHENTIC FEEDBACK</p>
            <p className="text-sm">Collect honest opinions to improve your brand and products</p>
          </li>
        </ul>
      </section>

      <section className="bg-gray-900 text-white px-6 md:px-12 py-8">
        <h3 className="text-xl font-semibold mb-4">What Our Users Are Saying</h3>
        <blockquote className="italic">“Finally, a way to try out new products without wasting money. I've found some favorites already!”<br/> <span className="not-italic font-bold mt-2 block">— Priya S.</span></blockquote>
      </section>
    </div>
  );
}
