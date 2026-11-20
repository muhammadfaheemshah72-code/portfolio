import { useState } from 'react'
import content from './data/content.json'

function App() {
  const { hero, projects } = content
  const [activeFilter, setActiveFilter] = useState("All")

  // Categories nikalne ke liye
  const categories = ["All", ...new Set(projects.map(p => p.category))]

  // Filter logic
  const filteredProjects = activeFilter === "All" 
    ? projects 
    : projects.filter(p => p.category === activeFilter)

  return (
    <div className="min-h-screen font-sans selection:bg-blue-500 selection:text-white">
      
      {/* NAVBAR */}
      <nav className="flex justify-between items-center p-6 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          {hero.name.split(' ')[0]}.
        </h1>
        <div className="space-x-6 hidden md:block text-sm font-medium">
          <a href="#about" className="hover:text-blue-400 transition">About</a>
          <a href="#projects" className="hover:text-blue-400 transition">Projects</a>
          <a href={`mailto:${hero.email}`} className="hover:text-blue-400 transition">Contact</a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header id="about" className="max-w-4xl mx-auto text-center pt-24 pb-20 px-6">
        <h2 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
          Hi, I'm <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">{hero.name}</span>
        </h2>
        <p className="text-xl md:text-2xl text-slate-400 mb-8 font-light">{hero.tagline}</p>
        <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">{hero.bio}</p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a href={hero.linkedin} target="_blank" rel="noreferrer" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition shadow-lg shadow-blue-500/30">
            LinkedIn Profile
          </a>
          <a href="#projects" className="border border-slate-600 hover:border-blue-400 hover:text-blue-400 text-white px-8 py-3 rounded-lg font-medium transition">
            View My Work
          </a>
        </div>
      </header>

      {/* PROJECTS SECTION */}
      <section id="projects" className="max-w-6xl mx-auto py-20 px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 border-b border-slate-700 pb-4">
          <h3 className="text-3xl font-bold">My Projects</h3>
          <p className="text-slate-400 text-sm mt-2 md:mt-0">A selection of my recent work</p>
        </div>
        
        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-3 mb-10">
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                activeFilter === cat ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map(project => (
            <div key={project.id} className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 hover:border-blue-500/50 transition duration-300 group hover:-translate-y-2 shadow-xl">
              <div className="h-48 overflow-hidden relative">
                <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition z-10"></div>
                <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              </div>
              <div className="p-6">
                <h4 className="text-xl font-bold mb-2">{project.title}</h4>
                <p className="text-slate-400 text-sm mb-4 line-clamp-3">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map(t => (
                    <span key={t} className="text-xs bg-slate-900 text-blue-400 px-2 py-1 rounded-md border border-slate-700">{t}</span>
                  ))}
                </div>
                <div className="flex gap-4 text-sm font-semibold">
                  {project.github && <a href={project.github} target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300 transition">GitHub Repo ↗</a>}
                  {project.live && <a href={project.live} target="_blank" rel="noreferrer" className="text-green-400 hover:text-green-300 transition">Live Demo ↗</a>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-10 border-t border-slate-800 text-slate-500 mt-10">
        <p>© {new Date().getFullYear()} {hero.name}. Built with React & Tailwind CSS.</p>
      </footer>
    </div>
  )
}

export default App