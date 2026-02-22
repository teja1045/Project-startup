import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Code, Rocket, Shield, ArrowRight, CheckCircle2 } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Landing = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${API}/services`);
        if (response.data && response.data.length > 0) {
          setServices(response.data);
        } else {
          const defaultServices = [
            {
              name: 'Development',
              description: 'Full-stack development with modern frameworks and best practices',
              features: ['React & Node.js', 'API Development', 'Database Design', 'Cloud Integration'],
              icon: 'Code'
            },
            {
              name: 'Deployment',
              description: 'Seamless deployment and CI/CD pipeline setup for your applications',
              features: ['Cloud Setup', 'CI/CD Pipelines', 'Docker & Kubernetes', 'Monitoring'],
              icon: 'Rocket'
            },
            {
              name: 'QA',
              description: 'Comprehensive quality assurance and testing services',
              features: ['Automated Testing', 'Manual Testing', 'Performance Testing', 'Security Audits'],
              icon: 'Shield'
            }
          ];
          setServices(defaultServices);
        }
      } catch (error) {
        console.error('Error fetching services:', error);
        const defaultServices = [
          {
            name: 'Development',
            description: 'Full-stack development with modern frameworks and best practices',
            features: ['React & Node.js', 'API Development', 'Database Design', 'Cloud Integration'],
            icon: 'Code'
          },
          {
            name: 'Deployment',
            description: 'Seamless deployment and CI/CD pipeline setup for your applications',
            features: ['Cloud Setup', 'CI/CD Pipelines', 'Docker & Kubernetes', 'Monitoring'],
            icon: 'Rocket'
          },
          {
            name: 'QA',
            description: 'Comprehensive quality assurance and testing services',
            features: ['Automated Testing', 'Manual Testing', 'Performance Testing', 'Security Audits'],
            icon: 'Shield'
          }
        ];
        setServices(defaultServices);
      }
    };
    fetchServices();
  }, []);

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Code':
        return <Code className="w-8 h-8" />;
      case 'Rocket':
        return <Rocket className="w-8 h-8" />;
      case 'Shield':
        return <Shield className="w-8 h-8" />;
      default:
        return <Code className="w-8 h-8" />;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="nav-glass fixed top-0 left-0 right-0 z-50" data-testid="main-navigation">
        <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] rounded-lg" />
            <h1 className="text-xl font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>NSSolutions</h1>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#services" className="text-sm hover:text-[#6366f1] transition-colors" data-testid="nav-services-link">Services</a>
            <a href="#process" className="text-sm hover:text-[#6366f1] transition-colors" data-testid="nav-process-link">Process</a>
          </div>
          <button
            onClick={() => navigate('/quote')}
            className="btn-primary px-6 py-2.5 rounded-full font-medium text-sm"
            data-testid="nav-quote-button"
          >
            Get Quote
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-8 overflow-hidden" data-testid="hero-section">
        <div className="hero-glow" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
              style={{ fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.02em' }}
              data-testid="hero-title"
            >
              Engineering the <span className="gradient-text">Future</span>
            </h1>
            <p className="text-lg sm:text-xl text-[#94a3b8] mb-10 max-w-2xl mx-auto" data-testid="hero-subtitle">
              Full-stack development, seamless deployment, and rigorous QA. We build what's next.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => navigate('/quote')}
                className="btn-primary px-8 py-4 rounded-full font-semibold text-base flex items-center gap-2"
                data-testid="hero-quote-button"
              >
                Request Quote <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => navigate('/consultation')}
                className="btn-outline px-8 py-4 rounded-full font-semibold text-base"
                data-testid="hero-consultation-button"
              >
                Book Consultation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-8" data-testid="services-section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className="text-4xl sm:text-5xl font-bold mb-4"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              data-testid="services-title"
            >
              Our Services
            </h2>
            <p className="text-lg text-[#94a3b8]" data-testid="services-subtitle">Elite engineering solutions for modern challenges</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="service-card rounded-2xl p-8"
                data-testid={`service-card-${service.name.toLowerCase()}`}
              >
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center mb-6">
                  {getIcon(service.icon)}
                </div>
                <h3
                  className="text-2xl font-bold mb-3"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                  data-testid={`service-title-${service.name.toLowerCase()}`}
                >
                  {service.name}
                </h3>
                <p className="text-[#94a3b8] mb-6" data-testid={`service-description-${service.name.toLowerCase()}`}>{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm" data-testid={`service-feature-${service.name.toLowerCase()}-${idx}`}>
                      <CheckCircle2 className="w-5 h-5 text-[#6366f1] flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-20 px-8 bg-[#0A0A0A]" data-testid="process-section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className="text-4xl sm:text-5xl font-bold mb-4"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              data-testid="process-title"
            >
              How We Work
            </h2>
            <p className="text-lg text-[#94a3b8]" data-testid="process-subtitle">A proven methodology for exceptional results</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Discovery', desc: 'Understanding your needs and goals' },
              { step: '02', title: 'Planning', desc: 'Strategic roadmap and architecture' },
              { step: '03', title: 'Execution', desc: 'Agile development and testing' },
              { step: '04', title: 'Delivery', desc: 'Deployment and ongoing support' }
            ].map((item, index) => (
              <div key={index} className="text-center" data-testid={`process-step-${index + 1}`}>
                <div className="text-5xl font-bold text-[#6366f1] mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  {item.title}
                </h3>
                <p className="text-[#94a3b8] text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-8" data-testid="cta-section">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-4xl sm:text-5xl font-bold mb-6"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            data-testid="cta-title"
          >
            Ready to Start Your Project?
          </h2>
          <p className="text-lg text-[#94a3b8] mb-10" data-testid="cta-subtitle">
            Get a detailed quote or book a free consultation with our experts
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate('/quote')}
              className="btn-primary px-8 py-4 rounded-full font-semibold text-base"
              data-testid="cta-quote-button"
            >
              Request Quote
            </button>
            <button
              onClick={() => navigate('/consultation')}
              className="btn-outline px-8 py-4 rounded-full font-semibold text-base"
              data-testid="cta-consultation-button"
            >
              Book Consultation
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#27272a] py-8 px-8" data-testid="footer">
        <div className="max-w-7xl mx-auto text-center text-[#94a3b8] text-sm">
          <p>© 2024 DevServices. Engineering Excellence.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;