import {
  Github,
  MapPin,
  Users,
  Code,
  GraduationCap,
  Mail,
  Linkedin,
  Instagram,
} from "lucide-react";
import { motion } from "motion/react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-black via-purple-950/30 to-black text-white">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iIzMzMyIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9nPjwvc3ZnPg==')] opacity-10"></div>

      {/* Purple gradient accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-shrink-0">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-violet-600 rounded-full blur-xl opacity-50"></div>
              <img
                src="https://avatars.githubusercontent.com/u/180801265?v=4"
                alt="Manoel Silva (Avlis)"
                className="relative w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 rounded-full border-4 border-purple-500 shadow-2xl"
              />
            </div>
          </div>

          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl mb-4 bg-gradient-to-r from-white via-purple-200 to-violet-200 bg-clip-text text-transparent">
              Manoel (Avlis)
            </h1>

            <p className="text-lg sm:text-xl lg:text-2xl text-purple-200 mb-6 sm:mb-8">
              Software Engineer | Clean Code | Low Level |
              Architecture
            </p>

            <div className="flex flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start mb-6 sm:mb-8">
              <div className="flex items-center gap-2 bg-gradient-to-r from-purple-900/50 to-violet-900/50 backdrop-blur-sm border border-purple-500/30 px-3 sm:px-4 py-2 rounded-lg">
                <MapPin className="w-4 h-4 text-purple-400" />
                <span className="text-sm sm:text-base">
                  São Paulo • Mila Materiais
                </span>
              </div>

              <div className="flex items-center gap-2 bg-gradient-to-r from-purple-900/50 to-violet-900/50 backdrop-blur-sm border border-purple-500/30 px-3 sm:px-4 py-2 rounded-lg">
                <GraduationCap className="w-4 h-4 text-purple-400" />
                <span className="text-sm sm:text-base">
                  UNIASSELVI • Computação
                </span>
              </div>

              <div className="flex items-center gap-2 bg-gradient-to-r from-purple-900/50 to-violet-900/50 backdrop-blur-sm border border-purple-500/30 px-3 sm:px-4 py-2 rounded-lg">
                <Code className="w-4 h-4 text-purple-400" />
                <span className="text-sm sm:text-base">
                  15 repos • 15 followers
                </span>
              </div>
            </div>

            <p className="text-gray-300 mb-6 sm:mb-8 max-w-2xl text-sm sm:text-base leading-relaxed">
              Software Engineer na{" "}
              <strong className="text-purple-300">
                Mila Materiais
              </strong>
              , São Paulo. Especializado em{" "}
              <strong className="text-purple-300">
                clean code
              </strong>
              ,
              <strong className="text-purple-300">
                {" "}
                low level programming
              </strong>{" "}
              e{" "}
              <strong className="text-purple-300">
                arquitetura de software
              </strong>
              . Expertise em{" "}
              <strong className="text-purple-300">
                Assembly x86-64
              </strong>{" "}
              (53% dos projetos),{" "}
              <strong className="text-purple-300">C</strong>,
              <strong className="text-purple-300">
                {" "}
                Python
              </strong>
              ,{" "}
              <strong className="text-purple-300">
                JavaScript
              </strong>{" "}
              e
              <strong className="text-purple-300">
                {" "}
                HTML/CSS
              </strong>
              .
            </p>

            <p className="text-gray-400 mb-8 max-w-2xl text-sm sm:text-base leading-relaxed">
              15 repositórios públicos incluindo{" "}
              <strong className="text-purple-300">
                servidor HTTP em Assembly
              </strong>
              ,
              <strong className="text-purple-300">
                {" "}
                microkernel
              </strong>
              ,{" "}
              <strong className="text-purple-300">
                máquina virtual com compilador próprio
              </strong>
              ,
              <strong className="text-purple-300">
                {" "}
                gerenciador de tarefas
              </strong>{" "}
              e{" "}
              <strong className="text-purple-300">
                simulador de CPU
              </strong>
              . Projetos acadêmicos na{" "}
              <strong className="text-purple-300">
                UNIASSELVI
              </strong>{" "}
              em engenharia de software e arquitetura de
              computadores.
            </p>

            <div className="flex flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start">
              <motion.a
                href="https://github.com/sandbox-systms"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 px-6 py-3 rounded-lg transition-all shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 30px rgba(168, 85, 247, 0.6)",
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <Github className="w-5 h-5" />
                <span className="text-sm sm:text-base">
                  GitHub
                </span>
              </motion.a>

              <motion.a
                href="https://www.linkedin.com/in/manoel-ess-95a430387/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-6 py-3 rounded-lg transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 30px rgba(59, 130, 246, 0.6)",
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <Linkedin className="w-5 h-5" />
                <span className="text-sm sm:text-base">
                  LinkedIn
                </span>
              </motion.a>

              <motion.a
                href="mailto:ghostnether28@gmail.com"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 px-6 py-3 rounded-lg transition-all shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 30px rgba(168, 85, 247, 0.6)",
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <Mail className="w-5 h-5" />
                <span className="text-sm sm:text-base">
                  E-mail
                </span>
              </motion.a>

              <motion.a
                href="https://www.instagram.com/manoel_avlis/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 px-6 py-3 rounded-lg transition-all shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 30px rgba(236, 72, 153, 0.6)",
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <Instagram className="w-5 h-5" />
                <span className="text-sm sm:text-base">
                  Instagram
                </span>
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}