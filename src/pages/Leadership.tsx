import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, Mail, Phone, MapPin, GraduationCap,
  Languages, Award, Building2, Calendar,
} from 'lucide-react';
import { Reveal, SectionHeading } from '@/components/Reveal';

const skills = [
  'Quality Inspection & Control',
  'Procurement & Vendor Negotiation',
  'Supply Chain Optimization & Process Improvement',
  'Strategic Risk Assessment & Data Analysis',
  'Industrial Team Leadership & Customer Relations',
];

const timeline = [
  { company: 'RONAK ROCKS', location: 'Gujarat', position: 'Sector Manager', start: '06/2017', end: '11/2024', focus: 'Procurement of granite slabs as per specified global orders, full-cycle quality control, inspection, and end-to-end dispatch logistics.' },
  { company: 'HARIHAR GRANITES', location: 'Madurai', position: 'Production & Quality Plant Head', start: '04/2011', end: '03/2016', focus: '' },
  { company: 'ARCHEAN GRANITES', location: 'Chengalpattu', position: 'Quality Control Incharge', start: '04/2007', end: '03/2011', focus: '' },
  { company: 'PELICAN GRANITES', location: 'Hosur', position: 'Quality Incharge', start: '04/2003', end: '03/2011', focus: '' },
];

const languages = [
  { name: 'Tamil', level: 'Native / C2 Proficient', proficiency: 100 },
  { name: 'English', level: 'A1 Beginner', proficiency: 20 },
  { name: 'Hindi', level: 'B1 Intermediate', proficiency: 55 },
];

export default function Leadership() {
  return (
    <div className="pt-24 sm:pt-28 pb-16 sm:pb-20 min-h-screen relative bg-slate-50/90 text-slate-800 overflow-hidden">
      {/* Light Ambient Background Glows */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-200/40 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-blue-200/40 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-lux px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto relative z-10">
        <Reveal>
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-cyan-600 transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </Reveal>

        {/* Executive Bio */}
        <Reveal delay={0.05}>
          <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-slate-200/80 shadow-md overflow-hidden mb-10 lg:mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
              {/* Photo Section */}
              <div className="relative bg-gradient-to-br from-cyan-50/50 to-slate-100 p-8 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-slate-200">
                <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-full overflow-hidden border-4 border-cyan-400 shadow-lg shadow-cyan-500/10 bg-white">
                  <img
                    src="/mdimg.jpeg"
                    alt="Javith Akthar - MD & CEO"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback if image extension is .jpg
                      (e.target as HTMLImageElement).src = '/mdimg.jpg';
                    }}
                  />
                </div>
                <div className="mt-5 text-center">
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-cyan-100/80 border border-cyan-200 text-cyan-800 text-xs font-bold uppercase tracking-wider shadow-sm">
                    <Award className="w-3.5 h-3.5 text-cyan-700" /> MD &amp; CEO
                  </span>
                </div>
              </div>

              {/* Info Section */}
              <div className="lg:col-span-2 p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-2.5 mb-2">
                  <span className="w-6 h-0.5 bg-cyan-500 rounded-full" />
                  <span className="text-xs font-bold uppercase tracking-wider text-cyan-700">Executive Leadership</span>
                </div>
                <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-1">
                  JAVITH AKTHAR
                </h1>
                <p className="text-base sm:text-lg text-cyan-600 font-semibold mb-4">
                  Managing Director &amp; Chief Executive Officer
                </p>

                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 mb-6">
                  <MapPin className="w-4 h-4 text-cyan-600 shrink-0" />
                  <span>Hosur - 635109, Tamil Nadu, India</span>
                </div>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6 max-w-2xl">
                  Results-driven natural stone executive with over 20 years of hands-on expertise in granite procurement management, gangsaw plant quality control, and international supply chain logistics.
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a href="mailto:javithjr2015@gmail.com" className="px-5 py-2.5 rounded-xl bg-cyan-500 text-white hover:bg-cyan-600 shadow-md shadow-cyan-500/20 transition text-sm font-semibold flex items-center justify-center gap-2">
                    <Mail className="w-4 h-4" /> Email Directly
                  </a>
                  <a href="tel:+918870380977" className="px-5 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 hover:bg-slate-200 transition text-sm font-semibold flex items-center justify-center gap-2">
                    <Phone className="w-4 h-4 text-cyan-600" /> +91-8870380977
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Core Skills */}
        <Reveal delay={0.1}>
          <SectionHeading eyebrow="Expertise" title="Core Skills & Competencies" center={false} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10 lg:mb-12 mt-6">
            {skills.map((skill, i) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.4, delay: (i % 3) * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-white/80 backdrop-blur-md p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4 group hover:border-cyan-400 hover:shadow-md hover:shadow-cyan-500/10 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-200 flex items-center justify-center shrink-0 group-hover:bg-cyan-500 group-hover:text-white transition-colors duration-300">
                  <Award className="w-5 h-5 text-cyan-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <p className="text-sm font-semibold text-slate-800 leading-snug">{skill}</p>
              </motion.div>
            ))}
          </div>
        </Reveal>

        {/* Career Timeline */}
        <Reveal delay={0.1}>
          <SectionHeading eyebrow="Experience" title="Career Journey" center={false} />
        </Reveal>
        <div className="relative mb-10 lg:mb-12 mt-6">
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 -translate-x-1/2 hidden sm:block" />
          <div className="space-y-6">
            {timeline.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5 }}
                  className={`relative flex items-center gap-4 sm:gap-6 ${
                    isLeft ? 'sm:pr-12' : 'sm:ml-auto sm:pl-12 sm:flex-row-reverse'
                  } sm:w-1/2`}
                >
                  <div className="bg-white/80 backdrop-blur-md p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm flex-1 group hover:border-cyan-400 hover:shadow-md hover:shadow-cyan-500/10 transition-all">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Building2 className="w-4 h-4 text-cyan-600 shrink-0" />
                      <h3 className="font-display text-base sm:text-lg font-bold text-slate-900">{item.company}</h3>
                    </div>
                    <p className="text-xs sm:text-sm text-cyan-700 font-bold mb-2">{item.position}</p>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{item.start} – {item.end}</span>
                      <span className="text-slate-300">|</span>
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{item.location}</span>
                    </div>
                    {item.focus && <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2">{item.focus}</p>}
                  </div>

                  {/* Center Dot */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 hidden sm:flex items-center justify-center z-10">
                    <div className="w-4 h-4 rounded-full bg-cyan-500 ring-4 ring-slate-50 shadow-sm" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Education & Languages */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <Reveal>
            <div className="bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-200 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-cyan-600" />
                </div>
                <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900">Education</h3>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <p className="text-sm font-bold text-slate-900">12th Grade Higher Secondary</p>
                <p className="text-sm text-slate-600 mt-1">ADW Boys Higher Sec. School, Arakkonnam</p>
                <div className="flex items-center gap-2 text-xs text-slate-400 mt-2">
                  <Calendar className="w-3.5 h-3.5" /> Completed: 03/2001
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-200 flex items-center justify-center">
                  <Languages className="w-5 h-5 text-cyan-600" />
                </div>
                <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900">Languages</h3>
              </div>
              <div className="space-y-4">
                {languages.map((lang) => (
                  <div key={lang.name}>
                    <div className="flex items-center justify-between mb-1.5">
                      <p className="text-xs sm:text-sm font-semibold text-slate-800">{lang.name}</p>
                      <p className="text-xs text-slate-500">{lang.level}</p>
                    </div>
                    <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-cyan-500"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${lang.proficiency}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}