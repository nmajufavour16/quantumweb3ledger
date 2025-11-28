'use client';
import { useCountAnimation } from '../../hooks/useCountAnimation';

export default function Mission() {
  const stats = [
    { number: "10000", label: "Active Users", prefix: "" },
    { number: "2", label: "Assets Tracked", prefix: "$" },
    { number: "99.9", label: "Uptime", suffix: "%" }
  ];

  const values = [
    {
      title: "Innovation",
      description: "Continuously pushing the boundaries of what's possible in crypto management."
    },
    {
      title: "Transparency",
      description: "Building trust through clear communication and open practices."
    },
    {
      title: "Security",
      description: "Protecting our users' assets with industry-leading security measures."
    },
    {
      title: "Accessibility",
      description: "Making crypto management accessible to everyone, everywhere."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-8 text-black">Our Mission</h1>
          <p className="text-xl text-gray-600 leading-relaxed mb-12">
            We're on a mission to democratize cryptocurrency management through innovative technology and transparent solutions. Our platform empowers traders and investors to make informed decisions with confidence.
          </p>
          
          <div className="grid grid-cols-3 gap-8 mt-16">
            {stats.map((stat, i) => {
              const count = useCountAnimation(stat.number);
              return (
                <div key={i} className="text-center">
                  <div className="text-4xl font-bold text-black mb-2">
                    {stat.prefix}
                    {count.toLocaleString()}{stat.number == 2 ? 'B+' : stat.number == 10000 ? '+':''}
                    {stat.suffix}
                  </div>
                  <div className="text-gray-500">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center mb-16">Our Core Values</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={index} className="p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
