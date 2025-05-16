import HeroSection from "@/components/hero-section"
import DisasterMap from "@/components/disaster-map"
import ActivitySuggestions from "@/components/activity-suggestions"
import LocalChat from "@/components/local-chat"
import StatusBar from "@/components/status-bar"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <StatusBar />
      <HeroSection />

      <main className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          Système de Protection <span className="text-cyan-400">Lyon 2180</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          <div className="lg:col-span-2">
            <DisasterMap />
          </div>
          <div className="space-y-6">
            <ActivitySuggestions />
            <LocalChat />
          </div>
        </div>
      </main>
    </div>
  )
}
