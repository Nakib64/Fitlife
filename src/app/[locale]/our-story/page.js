"use client"
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { 
  FaDumbbell, 
  FaHeart, 
  FaUsers, 
  FaRocket, 
  FaAward, 
  FaShieldAlt,
  FaLightbulb,
  FaChartLine,
  FaAppleAlt,
  FaBrain,
  FaMedal,
  FaStar,
  FaQuoteLeft,
  FaCheck,
  FaArrowRight,
  FaCrown,
  FaSeedling,
  FaMagic
} from 'react-icons/fa';
import { 
  GiMuscleUp, 
  GiMeal,
  GiMeditation,
  GiHeartPlus,
  GiProgression
} from 'react-icons/gi';
import { 
  IoFitnessSharp,
  IoRestaurantSharp,
  IoStatsChart,
  IoLeafSharp,
  IoSparkles
} from 'react-icons/io5';
import Image from 'next/image';

export default function OurStory() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRefs = useRef([]);

  useEffect(() => {
    setIsVisible(true);
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const trainers = [
    {
      name: "Sarah Chen",
      role: "Head Fitness Coach",
      experience: "8+ years",
      specialty: "Strength Training",
      bio: "Former professional athlete with certifications in personal training and nutrition. Specializes in strength and conditioning.",
      achievements: ["NASM Certified", "Precision Nutrition L1", "500+ Clients Trained"],
      image: "https://i.postimg.cc/50c1m5HF/pexels-kuldeep-singhania-1111658-2105493.jpg"
    },
    {
      name: "Marcus Johnson",
      role: "AI Fitness Specialist",
      experience: "6+ years",
      specialty: "AI Workout Optimization",
      bio: "Combines tech expertise with fitness science to create personalized programs that deliver results.",
      achievements: ["CS Degree Stanford", "ACE Certified", "AI Research Published"],
      image: "https://i.postimg.cc/hvsBgH2J/pexels-marcuschanmedia-17898148.jpg"
    },
    {
      name: "Dr. Elena Rodriguez",
      role: "Nutrition Expert",
      experience: "10+ years",
      specialty: "Sports Nutrition",
      bio: "PhD in Nutritional Science with focus on athletic performance and metabolic optimization.",
      achievements: ["PhD Nutrition", "ISSN Certified", "Research Scientist"],
      image: "https://i.postimg.cc/vBPhshWQ/pexels-thisisengineering-3912953.jpg"
    },
    {
      name: "David Kim",
      role: "Meditation Guide",
      experience: "7+ years",
      specialty: "Mindfulness & Recovery",
      bio: "Certified meditation instructor specializing in athlete mental wellness and performance psychology.",
      achievements: ["Mindfulness Teacher", "Yoga Alliance 500hr", "Sports Psychology"],
      image: "https://i.postimg.cc/qqzLMKLG/pexels-tima-miroshnichenko-5327450.jpg"
    }
  ];

  const whyUsPoints = [
    {
      icon: FaMagic,
      title: "AI-Powered Personalization",
      description: "Advanced machine learning algorithms create workouts and meal plans tailored to your unique physiology, goals, and preferences.",
      features: ["Adaptive Workouts", "Smart Nutrition", "Progress Prediction"]
    },
    {
      icon: GiProgression,
      title: "Real-Time Progress Tracking",
      description: "Comprehensive analytics and visual dashboards that show your journey with actionable insights and recommendations.",
      features: ["Live Analytics", "Performance Metrics", "Goal Tracking"]
    },
    {
      icon: FaShieldAlt,
      title: "Expert-Backed Methodology",
      description: "Every program is designed by certified trainers and validated by sports science research for maximum effectiveness.",
      features: ["Science-Based", "Expert Reviewed", "Safety First"]
    },
    {
      icon: FaCrown,
      title: "Proven Success Stories",
      description: "Join our community of 10,000+ users who have transformed their lives and achieved remarkable results.",
      features: ["95% Success Rate", "Community Support", "Real Transformations"]
    }
  ];

  const missionStats = [
    { number: "50K+", label: "Workouts Generated", icon: GiMuscleUp },
    { number: "25K+", label: "Meal Plans Created", icon: GiMeal },
    { number: "95%", label: "Success Rate", icon: FaAward },
    { number: "10K+", label: "Active Members", icon: FaUsers }
  ];

  const features = [
    {
      icon: IoFitnessSharp,
      title: "AI Workout Generator",
      description: "Personalized exercise routines based on your goals, equipment, and fitness level",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: IoRestaurantSharp,
      title: "Smart Meal Planner",
      description: "Custom nutrition plans with grocery lists and recipe suggestions",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: IoStatsChart,
      title: "Progress Analytics",
      description: "Detailed tracking and insights to monitor your fitness journey",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: IoLeafSharp,
      title: "Meditation Suite",
      description: "Guided sessions for mental wellness and recovery optimization",
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <>
      <Head>
        <title>Our Story - FitLife | AI-Powered Fitness Platform</title>
        <meta name="description" content="Discover FitLife's mission, meet our expert trainers, and learn why we're the leading AI fitness platform" />
      </Head>

      <div className="min-h-screen bg-[#F3F4F7]">
        {/* Hero Section */}
        <section className="relative py-24 lg:py-32 px-6">
          <div className="absolute inset-0 bg-gradient-to-br from-white via-[#F3F4F7] to-purple-50/30"></div>
          <div className="relative max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-sm border border-gray-100 mb-8">
              <IoSparkles className="text-purple-600 text-lg" />
              <span className="text-gray-700 font-medium">AI-Powered Fitness Revolution</span>
            </div>
            
            <h1 className={`text-5xl lg:text-7xl xl:text-8xl font-bold text-gray-900 mb-8 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              Our <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">Story</span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-gray-600 mb-12 leading-relaxed max-w-4xl mx-auto">
              Where cutting-edge artificial intelligence meets world-class fitness expertise to create 
              personalized wellness journeys that actually work.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-16">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 bg-white px-6 py-4 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${feature.color} text-white group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="text-lg" />
                  </div>
                  <span className="text-gray-800 font-semibold">{feature.title}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup" className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 inline-flex items-center gap-2">
                Start Free Trial
                <FaArrowRight className="text-sm" />
              </Link>
              <Link href="/" className="bg-white text-gray-700 px-8 py-4 rounded-2xl font-semibold hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-purple-200">
                Explore Features
              </Link>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section 
          ref={el => sectionRefs.current[0] = el}
          className="py-24 lg:py-32 px-6 opacity-0 transition-all duration-700"
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-20">
              <div>
                <div className="inline-flex items-center gap-3 bg-purple-100 text-purple-700 px-5 py-2.5 rounded-2xl text-sm font-semibold mb-8">
                  <FaLightbulb className="text-purple-600 text-lg" />
                  Our Mission & Vision
                </div>
                <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-8 leading-tight">
                  Revolutionizing <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">Fitness</span> Through Innovation
                </h2>
                <p className="text-lg lg:text-xl text-gray-600 leading-relaxed mb-10">
                  At FitLife, we're committed to making elite-level fitness guidance accessible to everyone. 
                  By fusing artificial intelligence with human expertise, we create dynamic workout plans, 
                  intelligent nutrition strategies, and holistic wellness practices that evolve with you.
                </p>
                
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                  {missionStats.map((stat, index) => (
                    <div key={index} className="text-center bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                      <div className={`w-14 h-14 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center text-white text-xl mx-auto mb-4`}>
                        <stat.icon />
                      </div>
                      <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                      <div className="text-gray-600 text-sm font-medium">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
                    <GiMuscleUp className="text-4xl text-purple-600 mb-4 group-hover:scale-110 transition-transform duration-300" />
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Smart Workouts</h3>
                    <p className="text-gray-600 leading-relaxed">AI-generated routines that adapt to your progress and preferences in real-time.</p>
                  </div>
                  <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
                    <GiMeditation className="text-4xl text-blue-500 mb-4 group-hover:scale-110 transition-transform duration-300" />
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Mindful Recovery</h3>
                    <p className="text-gray-600 leading-relaxed">Guided meditation and breathing exercises for optimal mental wellness.</p>
                  </div>
                </div>
                <div className="space-y-6 mt-12">
                  <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
                    <GiMeal className="text-4xl text-green-500 mb-4 group-hover:scale-110 transition-transform duration-300" />
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Nutrition Intelligence</h3>
                    <p className="text-gray-600 leading-relaxed">Personalized meal plans with smart grocery lists and recipe optimization.</p>
                  </div>
                  <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
                    <FaChartLine className="text-4xl text-orange-500 mb-4 group-hover:scale-110 transition-transform duration-300" />
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Progress Analytics</h3>
                    <p className="text-gray-600 leading-relaxed">Comprehensive tracking with predictive insights and performance metrics.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trainers Section */}
        <section 
          ref={el => sectionRefs.current[1] = el}
          className="py-24 lg:py-32 px-6 bg-white/60 opacity-0 transition-all duration-700"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-3 bg-blue-100 text-blue-700 px-5 py-2.5 rounded-2xl text-sm font-semibold mb-6">
                <FaUsers className="text-blue-600 text-lg" />
                Elite Training Team
              </div>
              <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-6">
                Meet Our <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Experts</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Our team of certified professionals brings together decades of experience in fitness, 
                nutrition, and technology to guide your journey.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {trainers.map((trainer, index) => (
                <div key={index} className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden group hover:transform hover:scale-105">
                  <div className="h-56 bg-gradient-to-br from-purple-500 to-blue-400 relative overflow-hidden">
                    <Image
                        height={400}
                        width={600} 
                      src={trainer.image} 
                      alt={trainer.name}
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    <div className="absolute bottom-6 left-6">
                      <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                        {index === 0 && <FaDumbbell className="text-3xl text-purple-600" />}
                        {index === 1 && <FaBrain className="text-3xl text-blue-500" />}
                        {index === 2 && <FaAppleAlt className="text-3xl text-green-500" />}
                        {index === 3 && <GiMeditation className="text-3xl text-orange-500" />}
                      </div>
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{trainer.name}</h3>
                    <p className="text-purple-600 font-semibold text-lg mb-3">{trainer.role}</p>
                    <div className="flex items-center gap-2 text-gray-500 mb-4">
                      <FaMedal className="text-yellow-500 text-lg" />
                      <span className="font-medium">{trainer.experience} experience</span>
                    </div>
                    <p className="text-gray-600 leading-relaxed mb-6">{trainer.bio}</p>
                    <div className="space-y-2">
                      {trainer.achievements.map((achievement, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-sm text-gray-500">
                          <FaCheck className="text-green-500 text-xs" />
                          {achievement}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Us Section */}
        <section 
          ref={el => sectionRefs.current[2] = el}
          className="py-24 lg:py-32 px-6 opacity-0 transition-all duration-700"
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
              <div>
                <div className="inline-flex items-center gap-3 bg-green-100 text-green-700 px-5 py-2.5 rounded-2xl text-sm font-semibold mb-8">
                  <FaRocket className="text-green-600 text-lg" />
                  Why Choose FitLife
                </div>
                <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-8 leading-tight">
                  The <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">Difference</span> That Delivers Results
                </h2>
                <p className="text-lg lg:text-xl text-gray-600 leading-relaxed mb-12">
                  We combine cutting-edge technology with human expertise to deliver fitness solutions 
                  that traditional programs can't match. Experience the future of personalized wellness.
                </p>
                
                <div className="space-y-8">
                  {whyUsPoints.map((point, index) => (
                    <div key={index} className="flex items-start gap-6 p-6 bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 group">
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center text-white text-2xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <point.icon />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-xl mb-3">{point.title}</h3>
                        <p className="text-gray-600 leading-relaxed mb-4">{point.description}</p>
                        <div className="flex flex-wrap gap-3">
                          {point.features.map((feature, idx) => (
                            <span key={idx} className="bg-purple-50 text-purple-700 px-3 py-1.5 rounded-full text-sm font-medium">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="sticky top-8">
                <div className="bg-gradient-to-br from-purple-600 to-blue-500 rounded-3xl p-10 text-white relative overflow-hidden shadow-2xl">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-16 -translate-x-16"></div>
                  
                  <div className="relative z-10">
                    <FaQuoteLeft className="text-5xl text-white/20 mb-8" />
                    <blockquote className="text-2xl lg:text-3xl font-semibold mb-8 leading-relaxed">
                      "FitLife completely transformed my approach to fitness. The AI recommendations feel like 
                      having a world-class personal trainer available 24/7. I've never been stronger or felt better!"
                    </blockquote>
                    <div className="flex items-center gap-5 mb-8">
                      <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                        <GiHeartPlus className="text-2xl text-white" />
                      </div>
                      <div>
                        <div className="font-bold text-xl">Alex Thompson</div>
                        <div className="text-white/70">Lost 28lbs, Gained 8lbs Muscle</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/20">
                      <div className="text-center">
                        <div className="text-3xl font-bold mb-2">4.9/5</div>
                        <div className="text-white/70 text-sm font-medium">User Rating</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold mb-2">98%</div>
                        <div className="text-white/70 text-sm font-medium">Satisfaction</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold mb-2">24/7</div>
                        <div className="text-white/70 text-sm font-medium">AI Support</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 lg:py-32 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-r from-purple-600 to-blue-500 rounded-4xl p-12 lg:p-16 text-center text-white relative overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-black/5"></div>
              <div className="relative z-10">
                <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-6">
                  Ready to Transform Your Life?
                </h2>
                <p className="text-xl lg:text-2xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
                  Join our community of 10,000+ users who have achieved remarkable results with our 
                  AI-powered fitness platform. Start your journey today.
                </p>
                <div className="flex flex-col sm:flex-row gap-5 justify-center">
                  <Link href="/signup" className="bg-white text-purple-600 px-10 py-5 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                    Start Free Trial - 7 Days
                  </Link>
                  <Link href="/" className="border-2 border-white text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white hover:text-purple-600 transition-all duration-300">
                    Explore All Features
                  </Link>
                </div>
                <p className="text-white/70 text-sm mt-8">
                  No credit card required • Cancel anytime • 24/7 Support
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .rounded-4xl {
          border-radius: 2.5rem;
        }
      `}</style>
    </>
  );
}