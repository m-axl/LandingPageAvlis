import { ProjectCard } from "./ProjectCard";

export function Projects() {
  const projects = [
    {
      name: "http_server.asm",
      description:
        "Servidor HTTP minimalista em Assembly. Linux x86_x64",
      language: "Assembly",
      stars: 1,
      forks: 0,
      url: "https://github.com/sandbox-systms/http_server.asm",
      topics: [
        "asm",
        "assembly",
        "gcc",
        "http",
        "linux",
        "nasm",
        "server",
        "x86-64",
      ],
    },
    {
      name: "avx_vm-v1ba",
      description:
        "Máquina virtual pequena com compilador e ISA própria.",
      language: "C",
      stars: 1,
      forks: 0,
      url: "https://github.com/sandbox-systms/avx_vm-v1ba",
      topics: [
        "assembly",
        "compiler",
        "engenharia-de-software",
        "linux",
        "software",
        "testing",
        "tools",
        "virtual-machine",
        "vm",
      ],
    },
    {
      name: "microkernel-asm",
      description:
        "Arquitetura de Computadores - Microkernel Básico Explorando Portas Lógicas",
      language: "Assembly",
      stars: 1,
      forks: 0,
      url: "https://github.com/sandbox-systms/microkernel-asm",
      topics: [
        "asm",
        "assembly",
        "c",
        "cpu",
        "engenharia-de-software",
        "estudo",
        "kernel",
        "low-level-programming",
        "minikernel",
        "pesquisa",
      ],
    },
    {
      name: "ASM_taskManager-v.1",
      description:
        "Gerenciador de tarefas, teste e implementação direta em Assembly.",
      language: "Assembly",
      stars: 1,
      forks: 0,
      url: "https://github.com/sandbox-systms/ASM_taskManager-v.1",
      topics: [
        "asmx86",
        "assembly",
        "linux",
        "low-level",
        "manager",
        "montador",
        "software",
      ],
    },
    {
      name: "python-uni-basic",
      description:
        "Projeto de aprendizagem em Python para a universidade Uniasselvi. Usado para automações, backend, script e resolução de problemas.",
      language: "Python",
      stars: 1,
      forks: 0,
      url: "https://github.com/sandbox-systms/python-uni-basic",
      topics: [
        "basic-programming",
        "ia",
        "py",
        "python",
        "university-project",
      ],
    },
    {
      name: "minilab-computacional",
      description: "Projeto acadêmico - Uniasselvi",
      language: "JavaScript",
      stars: 1,
      forks: 0,
      url: "https://github.com/sandbox-systms/minilab-computacional",
      topics: [
        "ads",
        "arquitetura",
        "js",
        "logical-operators",
        "machine",
        "simulator",
        "student",
        "university-project",
      ],
    },
    {
      name: "assembly-sh",
      description:
        "Bash, shell criado usando Assembly em Linux com padrão 64 bits AMD. Bash simples com foco em funcionalidade.",
      language: "Assembly",
      stars: 0,
      forks: 0,
      url: "https://github.com/sandbox-systms/assembly-sh",
      topics: [
        "assembly",
        "bash",
        "c",
        "low-level",
        "shell",
        "university-project",
      ],
    },
    {
      name: "projeto-alura-plus",
      description:
        "Projeto de aprendizagem da imersão front end com a ALURA",
      language: "HTML",
      stars: 0,
      forks: 0,
      url: "https://github.com/sandbox-systms/projeto-alura-plus",
      topics: [
        "alura",
        "css",
        "front-end",
        "html",
        "iniciante",
      ],
    },
    {
      name: "ASM-SysMon",
      description: "Simulador de CPU, Linux (x86-64)",
      language: "Assembly",
      stars: 0,
      forks: 0,
      url: "https://github.com/sandbox-systms/ASM-SysMon",
      topics: [
        "asm",
        "assembly",
        "bash",
        "cpu",
        "debian",
        "gcc",
        "gdb",
        "linux",
        "nasm",
        "nolibc",
        "shell",
      ],
    },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-black via-purple-950/10 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl mb-4 bg-gradient-to-r from-white via-purple-200 to-violet-200 bg-clip-text text-transparent">
            Projetos em Destaque
          </h2>
          <p className="text-lg sm:text-xl text-purple-300">
            15 repositórios públicos • Assembly (53%) • Projetos
            acadêmicos UNIASSELVI
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.name} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}