import {
  Github,
  Code2,
  Mail,
  Linkedin,
  Instagram,
} from "lucide-react";
import { motion } from "motion/react";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-black via-purple-950/20 to-black border-t border-purple-500/20">
      {/* Purple gradient accents */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-gradient-to-r from-purple-600 to-violet-600 rounded-lg">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-lg sm:text-xl text-white block">
                  Manoel (Avlis)
                </span>
                <span className="text-xs text-purple-400">
                  @m-axl
                </span>
              </div>
            </div>
            <p className="text-purple-300 text-sm text-center md:text-left">
              Software Engineer | Clean Code
              <br />
              Low Level | Architecture
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col items-center lg:items-start gap-3">
            <h3 className="text-purple-200 font-semibold mb-2">
              Conecte-se
            </h3>
            <motion.a
              href="https://github.com/m-a"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors text-sm"
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="w-4 h-4" />
              github.com/sandbox-systms
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/manoel-ess-95a430387/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors text-sm"
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </motion.a>
            <motion.a
              href="https://www.instagram.com/manoel_avlis/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors text-sm"
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Instagram className="w-4 h-4" />
              @manoel_avlis
            </motion.a>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-center lg:items-start gap-3">
            <h3 className="text-purple-200 font-semibold mb-2">
              Contato
            </h3>
            <motion.a
              href="mailto:ghostnether28@gmail.com"
              className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors text-sm"
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail className="w-4 h-4" />
              ghostnether28@gmail.com
            </motion.a>
            <div className="mt-2 text-sm text-purple-300">
              <p>📍 São Paulo</p>
              <p>🏢 Mila Materiais</p>
              <p>🎓 UNIASSELVI • Computação</p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-purple-500/20 text-center">
          <p className="text-purple-400/70 text-sm">
            Software Engineer • 15 repos • Assembly (53%) •
            Clean Code • Low Level • Architecture
          </p>
        </div>
      </div>
    </footer>
  );
}