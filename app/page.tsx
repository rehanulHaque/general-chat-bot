
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Navbar */}
      <nav className="w-full flex items-center justify-between px-6 py-4 bg-white/80 shadow-sm sticky top-0 z-10">
        <span className="text-2xl font-bold text-blue-600 flex items-center gap-2">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-blue-500"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" /><path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
          General Purpose Bot
        </span>
        <Link href="/auth"><Button variant="outline">Sign In</Button></Link>
      </nav>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-16">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">Your All-in-One <span className="text-blue-600">AI Chatbot</span></h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mb-8">Chat, brainstorm, and get things done with a simple, elegant, and powerful AI assistant. Secure, fast, and always available for you and your team.</p>
        <Link href="/chat">
          <Button size="lg" className="px-8 py-4 text-lg font-semibold shadow-md">Start Chatting</Button>
        </Link>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white/60">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          <div className="flex flex-col items-center text-center gap-3">
            <div className="bg-blue-100 text-blue-600 rounded-full p-3 mb-2">
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            </div>
            <h3 className="font-bold text-lg">Instant Answers</h3>
            <p className="text-gray-500">Get quick, accurate responses to any question, any time.</p>
          </div>
          <div className="flex flex-col items-center text-center gap-3">
            <div className="bg-blue-100 text-blue-600 rounded-full p-3 mb-2">
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            </div>
            <h3 className="font-bold text-lg">Multiple Models</h3>
            <p className="text-gray-500">Switch between top AI models for the best results.</p>
          </div>
          <div className="flex flex-col items-center text-center gap-3">
            <div className="bg-blue-100 text-blue-600 rounded-full p-3 mb-2">
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 11V7a5 5 0 1110 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            </div>
            <h3 className="font-bold text-lg">Private & Secure</h3>
            <p className="text-gray-500">Your data stays private and secure, always.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 flex flex-col items-center bg-gradient-to-r from-blue-100 to-blue-50">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900">Ready to get started?</h2>
        <p className="text-gray-600 mb-6">Sign up now and experience the future of AI chat.</p>
        <Link href="/auth">
          <Button size="lg" className="px-8 py-4 text-lg font-semibold shadow-md">Get Started</Button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 bg-white/80 border-t text-center text-gray-500 text-sm mt-auto">
        &copy; {new Date().getFullYear()} General Purpose Bot. All rights reserved.
      </footer>
    </div>
  );
}
