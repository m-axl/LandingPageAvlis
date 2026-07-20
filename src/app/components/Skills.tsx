import {
  Code2,
  Globe,
  Cpu,
  Terminal,
  Cloud,
  Wrench,
  Target,
  Briefcase,
} from "lucide-react";

const skillCategories = [
  {
    title: "Low Level Programming (53%)",
    icon: Cpu,
    skills: [
      "Assembly x86-64",
      "NASM",
      "GCC",
      "System Calls",
      "Kernel Development",
      "CPU Architecture",
      "Memory Management",
    ],
    color: "purple",
  },
  {
    title: "Linguagens de Programação",
    icon: Code2,
    skills: [
      "Assembly",
      "C",
      "Python",
      "JavaScript",
      "HTML5",
      "CSS3",
      "Bash",
      "TypeScript",
    ],
    color: "violet",
  },
  {
    title: "Front-end & Web",
    icon: Globe,
    skills: [
      "React",
      "Tailwind CSS",
      "Motion",
      "Responsive Design",
      "HTML/CSS",
      "UI/UX",
    ],
    color: "indigo",
  },
  {
    title: "Sistemas & Arquitetura",
    icon: Terminal,
    skills: [
      "Linux x86-64",
      "Microkernel",
      "Shell Scripting",
      "Virtual Machines",
      "Compiladores",
      "ISA Design",
    ],
    color: "fuchsia",
  },
  {
    title: "Ferramentas & DevOps",
    icon: Wrench,
    skills: [
      "Git",
      "GitHub",
      "GCC",
      "NASM",
      "Makefile",
      "Docker",
      "VS Code",
      "GDB",
    ],
    color: "violet",
  },
  {
    title: "Projetos Acadêmicos UNIASSELVI",
    icon: Target,
    skills: [
      "Engenharia de Software",
      "Arquitetura de Computadores",
      "Python (IA/Automação)",
      "Simuladores",
      "Clean Code",
    ],
    color: "purple",
  },
];

const colorClasses = {
  purple: "from-purple-600 to-purple-700",
  violet: "from-violet-600 to-violet-700",
  fuchsia: "from-fuchsia-600 to-fuchsia-700",
  indigo: "from-indigo-600 to-indigo-700",
};

export function Skills() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 bg-gradient-to-b from-black via-purple-950/10 to-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl mb-4 bg-gradient-to-r from-white via-purple-200 to-violet-200 bg-clip-text text-transparent">
            Tecnologias & Habilidades
          </h2>
          <p className="text-lg sm:text-xl text-purple-300">
            From Assembly to React: Full Stack com foco em Clean
            Code e Architecture
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-900 to-black border border-purple-500/20 rounded-xl overflow-hidden hover:border-purple-500/40 transition-all hover:shadow-lg hover:shadow-purple-500/20"
              >
                <div
                  className={`bg-gradient-to-r ${colorClasses[category.color as keyof typeof colorClasses]} p-6 text-white`}
                >
                  <Icon className="w-8 h-8 mb-3" />
                  <h3 className="text-lg sm:text-xl">
                    {category.title}
                  </h3>
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map(
                      (skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="bg-purple-900/30 text-purple-200 border border-purple-500/30 px-3 py-1 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ),
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 sm:mt-16 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gradient-to-r from-purple-900/50 via-violet-900/50 to-purple-900/50 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-6 sm:p-8 text-white">
            <h3 className="text-2xl sm:text-3xl mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent flex items-center gap-3">
              <Briefcase className="w-8 h-8 text-purple-400" />
              Perfil Profissional
            </h3>
            <p className="text-base sm:text-lg text-purple-100 leading-relaxed">
              <strong className="text-purple-200">
                Software Engineer
              </strong>{" "}
              especializado em{" "}
              <strong className="text-purple-200">
                programação de baixo nível
              </strong>{" "}
              (53% dos projetos). Expertise em{" "}
              <strong className="text-purple-200">
                Assembly x86-64
              </strong>
              ,{" "}
              <strong className="text-purple-200">
                arquitetura de computadores
              </strong>
              ,
              <strong className="text-purple-200">
                {" "}
                desenvolvimento de kernels
              </strong>{" "}
              e{" "}
              <strong className="text-purple-200">
                sistemas operacionais
              </strong>
              . Projetos acadêmicos na{" "}
              <strong className="text-purple-200">
                UNIASSELVI
              </strong>{" "}
              combinando teoria e prática em engenharia de
              software.
            </p>
          </div>

          <div className="bg-gradient-to-r from-indigo-900/50 via-purple-900/50 to-violet-900/50 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-6 sm:p-8 text-white">
            <h3 className="text-2xl sm:text-3xl mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              🔧 Áreas de Foco
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm sm:text-base text-purple-100">
              <div>• Servidor HTTP em Assembly</div>
              <div>• Microkernel Development</div>
              <div>• Virtual Machines & Compiladores</div>
              <div>• Shell/Bash em Assembly</div>
              <div>• Simulador de CPU</div>
              <div>• Python (IA & Automação)</div>
              <div>• Projetos Front-end (HTML/CSS/JS)</div>
              <div>• Arquitetura de Computadores</div>
              <div>• Clean Code & Architecture</div>
              <div>• Linux System Programming</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}