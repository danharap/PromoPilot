import React, { useState } from 'react';
import {
  Zap, Globe, Calendar, BarChart3, Check, Star,
  ArrowRight, Clock, Shield, Sparkles, ChevronDown
} from 'lucide-react';

const NAV_LINKS = ['Features', 'Pricing', 'Reviews'];

const FEATURES = [
  {
    icon: Calendar,
    title: 'Smart Scheduling',
    description: 'Schedule posts days or weeks in advance. Set it once and let PromoPilot handle the rest — your content goes live exactly when your audience is most active.',
  },
  {
    icon: Globe,
    title: 'Multi-Platform Publishing',
    description: 'Connect Mastodon today, with Instagram, Reddit, and TikTok coming soon. One post, every platform, zero copy-pasting.',
  },
  {
    icon: BarChart3,
    title: 'Performance Analytics',
    description: 'Track reach, engagement, and clicks across every post. Know what content is working and double down on it.',
  },
  {
    icon: Sparkles,
    title: 'AI-Powered Voice',
    description: 'Set your brand tone once. PromoPilot keeps every post on-brand — professional, casual, energetic, or friendly — automatically.',
  },
  {
    icon: Shield,
    title: 'Secure by Default',
    description: 'Your platform credentials are never stored in the browser. All OAuth flows and publishing run server-side so your tokens stay safe.',
  },
  {
    icon: Clock,
    title: 'Campaign Organization',
    description: 'Group posts under campaigns to keep product launches, promotions, and seasonal content organized and easy to manage.',
  },
];

const PLANS = [
  {
    name: 'Starter',
    price: 'Free',
    period: '',
    description: 'Perfect for solo creators getting started.',
    cta: 'Get Started Free',
    highlighted: false,
    features: [
      '1 connected platform',
      '10 scheduled posts / month',
      'Basic analytics',
      'Campaign organization',
      'Email support',
    ],
  },
  {
    name: 'Pro',
    price: '$19',
    period: '/ month',
    description: 'For growing businesses who post consistently.',
    cta: 'Start Pro Trial',
    highlighted: true,
    features: [
      'Up to 5 platforms',
      'Unlimited scheduled posts',
      'Full analytics dashboard',
      'AI brand voice assistant',
      'Campaign management',
      'Priority support',
    ],
  },
  {
    name: 'Agency',
    price: '$49',
    period: '/ month',
    description: 'Manage multiple clients and brands.',
    cta: 'Contact Us',
    highlighted: false,
    features: [
      'Unlimited platforms',
      'Unlimited posts & campaigns',
      'Advanced analytics & exports',
      'Multiple brand profiles',
      'Team collaboration',
      'Dedicated support',
    ],
  },
];

const REVIEWS = [
  {
    name: 'Sarah M.',
    role: 'Founder, Bloom Bakery',
    rating: 5,
    text: "PromoPilot saved me at least 5 hours a week. I used to manually post to three platforms every morning — now I batch everything on Sunday and forget about it.",
  },
  {
    name: 'James T.',
    role: 'Marketing Lead, Crestwood Gym',
    rating: 5,
    text: "The scheduling is dead simple and the campaign view is exactly what I needed to keep our monthly promos organized. Switched from Buffer and haven't looked back.",
  },
  {
    name: 'Priya K.',
    role: 'Freelance Social Strategist',
    rating: 5,
    text: "Love that my client credentials never touch my browser. The server-side publishing model is a huge trust win when you're managing accounts for other people.",
  },
  {
    name: 'Marcus L.',
    role: 'Owner, Ridgeline Coffee',
    rating: 4,
    text: "Clean, fast, no bloat. I tried three other tools before this one and they were all overkill for a small business. PromoPilot is exactly the right size.",
  },
  {
    name: 'Elena R.',
    role: 'Content Creator',
    rating: 5,
    text: "The AI voice setting is subtle but genuinely useful. My posts sound consistent even when I write them in a rush. Solid product.",
  },
  {
    name: 'Tom H.',
    role: 'Co-founder, Stackd Agency',
    rating: 5,
    text: "We manage 12 brand accounts with the Agency plan. The campaign grouping and per-account analytics make client reporting a lot less painful.",
  },
];

const FAQ = [
  {
    q: 'Which social platforms are supported?',
    a: 'Mastodon is fully supported today including OAuth connection, immediate publishing, and scheduled publishing. Instagram, TikTok, and Reddit are in active development and coming soon.',
  },
  {
    q: 'How does scheduling actually work?',
    a: 'When you schedule a post, it is saved to the database with your chosen date and time. A server-side cron job checks for due posts every minute and publishes them automatically — no browser tab needs to stay open.',
  },
  {
    q: 'Is my account data secure?',
    a: 'Yes. Your social media access tokens are stored encrypted and are only accessed by server-side functions — never your browser. All OAuth flows run server-side through Vercel serverless functions.',
  },
  {
    q: 'Can I try it before paying?',
    a: 'The Starter plan is completely free with no credit card required. You get one platform connection and up to 10 scheduled posts per month.',
  },
  {
    q: 'What happens if a scheduled post fails?',
    a: 'The post status updates to "failed" with an error message shown in the Scheduled Posts view so you know exactly what went wrong and can retry or edit the content.',
  },
];

const StarRow = ({ count }) => (
  <div className="flex space-x-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < count ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`} />
    ))}
  </div>
);

const FaqItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 py-4">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between text-left"
      >
        <span className="font-medium text-gray-900">{q}</span>
        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <p className="mt-3 text-sm text-gray-600 leading-relaxed">{a}</p>}
    </div>
  );
};

const Landing = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold">PromoPilot</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map(link => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={onGetStarted}
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={onGetStarted}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Get Started Free
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-24 text-center">
        <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1.5 rounded-full mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI-Powered Social Media Management</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
          Promote smarter,<br />
          <span className="text-blue-600">not harder.</span>
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
          PromoPilot helps small businesses schedule, publish, and track social media content
          from one clean dashboard — so you can spend less time posting and more time running your business.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={onGetStarted}
            className="flex items-center space-x-2 px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors text-base"
          >
            <span>Start for Free</span>
            <ArrowRight className="w-5 h-5" />
          </button>
          <a
            href="#features"
            className="px-8 py-4 border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors text-base"
          >
            See how it works
          </a>
        </div>
        <p className="text-sm text-gray-400 mt-4">No credit card required · Free plan available</p>

        {/* Mock dashboard preview */}
        <div className="mt-16 rounded-2xl border border-gray-200 shadow-2xl overflow-hidden">
          <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
            <div className="ml-4 flex-1 bg-white rounded-md px-4 py-1 text-xs text-gray-400 text-left max-w-xs">
              promo-pilot-five.vercel.app
            </div>
          </div>
          <div className="bg-white p-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
            {[
              { label: 'Scheduled Posts', value: '12', sub: 'Ready to publish' },
              { label: 'Published Posts', value: '48', sub: 'Total published' },
              { label: 'Total Posts', value: '60', sub: 'In your account' },
              { label: 'Platforms', value: '1', sub: 'Mastodon active' },
            ].map(s => (
              <div key={s.label} className="bg-gray-50 rounded-xl p-4">
                <p className="text-2xl font-bold text-gray-900">{s.value}</p>
                <p className="text-sm font-medium text-gray-700 mt-1">{s.label}</p>
                <p className="text-xs text-gray-400">{s.sub}</p>
              </div>
            ))}
          </div>
          <div className="bg-white px-6 pb-6">
            <div className="border border-gray-100 rounded-xl overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700">Upcoming Posts</div>
              {[
                { platform: 'Mastodon', content: 'Summer sale starts tomorrow — 20% off everything in store!', time: 'Today at 9:00 AM', status: 'Scheduled' },
                { platform: 'Mastodon', content: 'Behind the scenes: how we source our ingredients locally 🌿', time: 'Tomorrow at 2:00 PM', status: 'Scheduled' },
                { platform: 'Mastodon', content: 'New menu items dropping this Friday. Stay tuned!', time: 'Fri at 11:00 AM', status: 'Scheduled' },
              ].map((p, i) => (
                <div key={i} className="flex items-center px-4 py-3 border-t border-gray-100 text-sm">
                  <div className="w-7 h-7 bg-purple-100 rounded flex items-center justify-center mr-3 flex-shrink-0">
                    <Globe className="w-3.5 h-3.5 text-purple-600" />
                  </div>
                  <p className="flex-1 text-gray-700 truncate">{p.content}</p>
                  <span className="ml-4 text-xs text-gray-400 flex-shrink-0 hidden md:block">{p.time}</span>
                  <span className="ml-3 px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs rounded-full flex-shrink-0">{p.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-gray-50 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Everything you need to grow</h2>
            <p className="text-lg text-gray-500 max-w-xl mx-auto">
              A focused set of tools built specifically for small businesses — no enterprise bloat, no learning curve.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{f.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Simple, honest pricing</h2>
            <p className="text-lg text-gray-500">Start free. Upgrade when you need more.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-8 border flex flex-col ${
                  plan.highlighted
                    ? 'bg-blue-600 border-blue-600 text-white shadow-2xl scale-105'
                    : 'bg-white border-gray-200 shadow-sm'
                }`}
              >
                <div className="mb-6">
                  {plan.highlighted && (
                    <span className="inline-block bg-white text-blue-600 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                      Most Popular
                    </span>
                  )}
                  <h3 className={`text-xl font-bold mb-1 ${plan.highlighted ? 'text-white' : 'text-gray-900'}`}>
                    {plan.name}
                  </h3>
                  <p className={`text-sm mb-4 ${plan.highlighted ? 'text-blue-100' : 'text-gray-500'}`}>
                    {plan.description}
                  </p>
                  <div className="flex items-end">
                    <span className={`text-4xl font-bold ${plan.highlighted ? 'text-white' : 'text-gray-900'}`}>
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className={`ml-1 mb-1 text-sm ${plan.highlighted ? 'text-blue-200' : 'text-gray-400'}`}>
                        {plan.period}
                      </span>
                    )}
                  </div>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-start space-x-2 text-sm">
                      <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.highlighted ? 'text-blue-200' : 'text-green-500'}`} />
                      <span className={plan.highlighted ? 'text-blue-100' : 'text-gray-600'}>{feat}</span>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={onGetStarted}
                  className={`w-full py-3 rounded-xl font-semibold text-sm transition-colors ${
                    plan.highlighted
                      ? 'bg-white text-blue-600 hover:bg-blue-50'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="bg-gray-50 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Loved by small businesses</h2>
            <p className="text-lg text-gray-500">Real results from real teams.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {REVIEWS.map((r) => (
              <div key={r.name} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col">
                <StarRow count={r.rating} />
                <p className="text-sm text-gray-600 leading-relaxed mt-4 flex-1">"{r.text}"</p>
                <div className="mt-5 pt-4 border-t border-gray-100">
                  <p className="font-semibold text-gray-900 text-sm">{r.name}</p>
                  <p className="text-xs text-gray-400">{r.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently asked questions</h2>
          </div>
          <div>
            {FAQ.map((item) => (
              <FaqItem key={item.q} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to take your social presence seriously?
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            Join businesses who are saving hours every week with PromoPilot.
          </p>
          <button
            type="button"
            onClick={onGetStarted}
            className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors text-base"
          >
            <span>Get Started Free</span>
            <ArrowRight className="w-5 h-5" />
          </button>
          <p className="text-blue-200 text-sm mt-4">No credit card required</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold text-gray-900">PromoPilot</span>
          </div>
          <p className="text-sm text-gray-400">© {new Date().getFullYear()} PromoPilot. Built with Supabase and Vercel.</p>
          <button
            type="button"
            onClick={onGetStarted}
            className="text-sm text-blue-600 hover:underline"
          >
            Sign in →
          </button>
        </div>
      </footer>

    </div>
  );
};

export default Landing;
