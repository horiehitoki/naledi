import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { ArrowRight, Globe, Lock, Zap } from "lucide-react";

export default function Component() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-50 text-gray-800">
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="text-2xl font-bold text-purple-600">
            AT Protocol SNS
          </div>
          <Button
            variant="outline"
            className="border-purple-400 text-purple-600 hover:bg-purple-100"
          >
            Learn More
          </Button>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="text-center mb-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 opacity-75"></div>
          <div className="relative z-10 py-16">
            <h1 className="text-4xl font-extrabold mb-4 text-white">
              Welcome to the Future of Social Networking
            </h1>
            <p className="text-xl text-white mb-8">
              Powered by the Authenticated Transfer Protocol
            </p>
            <Button
              size="lg"
              className="font-semibold bg-white text-purple-600 hover:bg-purple-100"
            >
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>

        <div className="wave-separator mb-16">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 0L48 8.875C96 17.75 192 35.5 288 44.375C384 53.25 480 53.25 576 44.375C672 35.5 768 17.75 864 26.625C960 35.5 1056 71 1152 80C1248 89 1344 71 1392 62.125L1440 53.25V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V0Z"
              fill="url(#paint0_linear)"
            />
            <defs>
              <linearGradient
                id="paint0_linear"
                x1="720"
                y1="0"
                x2="720"
                y2="120"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#C084FC" stopOpacity="0.2" />
                <stop offset="1" stopColor="#C084FC" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <section className="grid gap-8 md:grid-cols-3 mb-16">
          <FeatureCard
            icon={<Globe className="h-8 w-8 text-blue-500" />}
            title="Decentralized"
            description="Connect with users across different providers while maintaining a consistent identity."
            color="bg-blue-100"
          />
          <FeatureCard
            icon={<Lock className="h-8 w-8 text-green-500" />}
            title="Secure"
            description="End-to-end encryption and cryptographic signatures ensure your data remains private and authentic."
            color="bg-green-100"
          />
          <FeatureCard
            icon={<Zap className="h-8 w-8 text-yellow-500" />}
            title="Interoperable"
            description="Seamlessly interact with various applications and services built on the AT Protocol."
            color="bg-yellow-100"
          />
        </section>

        <section className="text-center bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100 rounded-lg p-8 shadow-lg">
          <h2 className="text-3xl font-bold mb-4 text-indigo-800">
            Ready to Join the Network?
          </h2>
          <p className="text-lg text-indigo-700 mb-8">
            Experience a new era of social networking with enhanced privacy,
            control, and interoperability.
          </p>
          <Button
            size="lg"
            className="font-semibold bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Explore AT Protocol
          </Button>
        </section>
      </main>

      <footer className="bg-purple-100 mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-purple-600">
          <p>&copy; 2023 AT Protocol SNS. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description, color }) {
  return (
    <Card
      className={`${color} border-none shadow-lg transition-transform hover:scale-105`}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-800">
          {icon}
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-gray-700">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
