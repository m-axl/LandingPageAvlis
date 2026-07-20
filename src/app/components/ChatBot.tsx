import { useState, useRef, useEffect } from "react";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Olá! 👋 Sou o assistente virtual do Manoel. Como posso ajudar?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Respostas automáticas do bot
  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();

    // Saudações
    if (message.match(/^(oi|olá|ola|hey|hello|hi)/)) {
      return "Olá! 👋 Estou aqui para responder suas perguntas sobre o Manoel e seus projetos. O que você gostaria de saber?";
    }

    // Sobre o Manoel
    if (
      message.includes("quem") ||
      message.includes("sobre") ||
      message.includes("você")
    ) {
      return "O Manoel (Avlis) é Software Engineer na Mila Materiais, São Paulo. Foco em Clean Code, Low Level e Architecture. Estuda Computação na UNIASSELVI. 15 repositórios públicos com Assembly (53%), C, Python, JavaScript e projetos front-end. 💻";
    }

    // Tecnologias
    if (
      message.includes("tecnologia") ||
      message.includes("linguagem") ||
      message.includes("stack")
    ) {
      return "Stack: Assembly x86-64 (53% dos repos), C, Python, JavaScript, HTML/CSS, React, TypeScript. Ferramentas: Linux, Git, Docker, GCC, NASM, VS Code. Especialização em low level, sistemas operacionais e arquitetura de computadores. 🚀";
    }

    // Projetos
    if (
      message.includes("projeto") ||
      message.includes("repositório") ||
      message.includes("github")
    ) {
      return "15 repositórios públicos! Destaques: http_server.asm (servidor HTTP em Assembly), microkernel-asm, avx_vm (VM com compilador), ASM_taskManager, assembly-sh, python-uni-basic (IA/automação), minilab-computacional (simulador), projeto-alura-plus (front-end). Veja no GitHub! 📦";
    }

    // Contato
    if (
      message.includes("contato") ||
      message.includes("email") ||
      message.includes("e-mail")
    ) {
      return "Você pode entrar em contato através do e-mail: ghostnether28@gmail.com 📧\nOu pelo LinkedIn e Instagram (links disponíveis no site)!";
    }

    // Formação
    if (
      message.includes("faculdade") ||
      message.includes("universidade") ||
      message.includes("formação") ||
      message.includes("estudo")
    ) {
      return "Estudante de Computação na UNIASSELVI com diversos projetos acadêmicos: microkernel-asm, assembly-sh, python-uni-basic, minilab-computacional. Foco em arquitetura de computadores, engenharia de software e sistemas operacionais. 🎓";
    }

    // Empresa/Trabalho
    if (
      message.includes("empresa") ||
      message.includes("trabalho") ||
      message.includes("emprego") ||
      message.includes("mila")
    ) {
      return "Software Engineer na Mila Materiais, São Paulo. Foco em clean code, low level programming e arquitetura de software. Disponível para novas oportunidades! 💼";
    }

    // Áreas de interesse
    if (
      message.includes("interesse") ||
      message.includes("foco") ||
      message.includes("especialidade")
    ) {
      return "As áreas de interesse incluem: Engenharia de Software, Automação & APIs, Tráfego Pago, Docker, Cloud Computing, Oracle SQL, Front-end, Linux, Estruturas de Dados e Baixo Nível. 🎯";
    }

    // Assembly
    if (
      message.includes("assembly") ||
      message.includes("asm")
    ) {
      return "O Manoel tem forte interesse em programação de baixo nível! Vários projetos utilizam Assembly, como o taskManager e o http_server. É uma área de especialização dele! ⚡";
    }

    // Automação
    if (
      message.includes("automação") ||
      message.includes("automatizar")
    ) {
      return "Automação é uma das áreas de foco! O Manoel trabalha com scripts, APIs e soluções para otimizar processos e aumentar a eficiência. 🤖";
    }

    // Cloud/Docker
    if (
      message.includes("docker") ||
      message.includes("cloud") ||
      message.includes("container")
    ) {
      return "Sim! O Manoel trabalha com Docker para containerização e está evoluindo em Cloud Computing e infraestrutura moderna. ☁️";
    }

    // Help
    if (message.includes("ajuda") || message.includes("help")) {
      return "Posso responder sobre:\n• Quem é o Manoel\n• Empresa e localização\n• Tecnologias e stack\n• Projetos no GitHub\n• Formação acadêmica (UNIASSELVI)\n• Áreas de expertise\n• Contato\n\nO que você gostaria de saber? 🤔";
    }

    // Default
    return "Interessante! Para informações mais específicas, você pode entrar em contato diretamente pelo e-mail ghostnether28@gmail.com ou explorar os projetos no GitHub. 😊";
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simula delay de digitação do bot
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputValue),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);

    /* 
    TODO: Integração com API Python
    Para conectar com um backend Python (FastAPI, Flask, etc):
    
    const response = await fetch('YOUR_API_ENDPOINT/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: inputValue })
    });
    const data = await response.json();
    const botResponse: Message = {
      id: (Date.now() + 1).toString(),
      text: data.response,
      sender: 'bot',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, botResponse]);
    setIsTyping(false);
    */
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white p-4 rounded-full shadow-2xl shadow-purple-500/50 transition-all flex items-center gap-2"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
              boxShadow: [
                "0 0 20px rgba(168, 85, 247, 0.5)",
                "0 0 40px rgba(168, 85, 247, 0.8)",
                "0 0 20px rgba(168, 85, 247, 0.5)",
              ],
            }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{
              scale: 1.1,
              rotate: [0, -10, 10, 0],
              transition: { rotate: { duration: 0.3 } },
            }}
            whileTap={{ scale: 0.9 }}
            transition={{
              duration: 0.3,
              boxShadow: { duration: 2, repeat: Infinity },
            }}
          >
            <MessageCircle className="w-6 h-6" />
            <span className="hidden sm:inline text-sm font-medium pr-2">
              Fale comigo
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-6 right-6 z-50 w-[90vw] sm:w-96 h-[600px] bg-gradient-to-br from-gray-900 to-black border-2 border-purple-500/30 rounded-2xl shadow-2xl shadow-purple-500/20 flex flex-col overflow-hidden"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{
              duration: 0.3,
              type: "spring",
              stiffness: 300,
              damping: 25,
            }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-violet-600 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-full">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">
                    Assistente IA
                  </h3>
                  <p className="text-purple-100 text-xs">
                    Online agora
                  </p>
                </div>
              </div>
              <motion.button
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-2 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.sender === "bot" && (
                    <div className="bg-gradient-to-br from-purple-600 to-violet-600 p-2 rounded-full h-8 w-8 flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] p-3 rounded-2xl ${
                      message.sender === "user"
                        ? "bg-gradient-to-r from-purple-600 to-violet-600 text-white rounded-br-none"
                        : "bg-gray-800 border border-purple-500/30 text-purple-100 rounded-bl-none"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">
                      {message.text}
                    </p>
                    <p className="text-xs opacity-60 mt-1">
                      {message.timestamp.toLocaleTimeString(
                        "pt-BR",
                        { hour: "2-digit", minute: "2-digit" },
                      )}
                    </p>
                  </div>
                  {message.sender === "user" && (
                    <div className="bg-gradient-to-br from-purple-400 to-violet-400 p-2 rounded-full h-8 w-8 flex-shrink-0">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-2 justify-start">
                  <div className="bg-gradient-to-br from-purple-600 to-violet-600 p-2 rounded-full h-8 w-8 flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-gray-800 border border-purple-500/30 p-3 rounded-2xl rounded-bl-none">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-gradient-to-r from-gray-900 to-black border-t border-purple-500/30">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) =>
                    setInputValue(e.target.value)
                  }
                  onKeyPress={handleKeyPress}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 bg-gray-800 border border-purple-500/30 text-white placeholder-purple-300/50 px-4 py-3 rounded-xl focus:outline-none focus:border-purple-500 transition-colors"
                />
                <motion.button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 rounded-xl transition-all shadow-lg shadow-purple-500/30"
                  whileHover={
                    inputValue.trim()
                      ? {
                          scale: 1.05,
                          boxShadow:
                            "0 0 20px rgba(168, 85, 247, 0.8)",
                        }
                      : {}
                  }
                  whileTap={
                    inputValue.trim() ? { scale: 0.95 } : {}
                  }
                  animate={
                    inputValue.trim()
                      ? {
                          boxShadow: [
                            "0 0 10px rgba(168, 85, 247, 0.3)",
                            "0 0 20px rgba(168, 85, 247, 0.6)",
                            "0 0 10px rgba(168, 85, 247, 0.3)",
                          ],
                        }
                      : {}
                  }
                  transition={{
                    boxShadow: {
                      duration: 1.5,
                      repeat: Infinity,
                    },
                  }}
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>
              <p className="text-xs text-purple-400/60 mt-2 text-center">
                Powered by IA • Pressione Enter para enviar
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}