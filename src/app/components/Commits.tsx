import { CommitCard } from "./CommitCard";

export function Commits() {
  const commits = [
    {
      repo: "projeto-alura-plus",
      message: "Imersão front-end ALURA - HTML/CSS",
      sha: "a1b2c3d",
      date: "2026-04-21T12:00:00Z",
      url: "https://github.com/sandbox-systms/projeto-alura-plus",
    },
    {
      repo: "python-uni-basic",
      message: "Automações e IA - Projeto UNIASSELVI",
      sha: "e4f5g6h",
      date: "2026-04-20T15:30:00Z",
      url: "https://github.com/sandbox-systms/python-uni-basic",
    },
    {
      repo: "landing-page-user",
      message: "Landing page pessoal - Portfolio",
      sha: "i7j8k9l",
      date: "2026-04-16T10:00:00Z",
      url: "https://github.com/sandbox-systms/landing-page-user",
    },
    {
      repo: "minilab-computacional",
      message: "Simulador de máquina computacional - JS",
      sha: "m0n1o2p",
      date: "2026-04-13T14:20:00Z",
      url: "https://github.com/sandbox-systms/minilab-computacional",
    },
    {
      repo: "assembly-sh",
      message: "Shell em Assembly Linux x64",
      sha: "q3r4s5t",
      date: "2026-03-25T09:45:00Z",
      url: "https://github.com/sandbox-systms/assembly-sh",
    },
    {
      repo: "microkernel-asm",
      message: "Microkernel - Arquitetura de Computadores",
      sha: "u6v7w8x",
      date: "2026-03-25T08:30:00Z",
      url: "https://github.com/sandbox-systms/microkernel-asm",
    },
    {
      repo: "http_server.asm",
      message: "Servidor HTTP em Assembly puro",
      sha: "y9z0a1b",
      date: "2026-03-16T16:15:00Z",
      url: "https://github.com/sandbox-systms/http_server.asm",
    },
    {
      repo: "avx_vm-v1ba",
      message: "VM com compilador e ISA própria",
      sha: "c2d3e4f",
      date: "2026-03-16T11:40:00Z",
      url: "https://github.com/sandbox-systms/avx_vm-v1ba",
    },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-black via-purple-950/10 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl mb-4 bg-gradient-to-r from-white via-purple-200 to-violet-200 bg-clip-text text-transparent">
            Commits Recentes
          </h2>
          <p className="text-lg sm:text-xl text-purple-300">
            Atividade recente • Commits diários • Front-end,
            Python & Assembly
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {commits.map((commit, index) => (
            <CommitCard
              key={`${commit.sha}-${index}`}
              {...commit}
            />
          ))}
        </div>
      </div>
    </section>
  );
}