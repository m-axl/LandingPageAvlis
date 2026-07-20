import { Star, GitFork, ExternalLink } from "lucide-react";

interface ProjectCardProps {
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  url: string;
  topics?: string[];
}

export function ProjectCard({
  name,
  description,
  language,
  stars,
  forks,
  url,
  topics = [],
}: ProjectCardProps) {
  const languageColors: Record<string, string> = {
    Assembly: "bg-gradient-to-r from-red-500 to-pink-500",
    C: "bg-gradient-to-r from-blue-500 to-cyan-500",
    JavaScript:
      "bg-gradient-to-r from-yellow-500 to-orange-500",
    TypeScript: "bg-gradient-to-r from-blue-500 to-indigo-500",
    Python: "bg-gradient-to-r from-blue-400 to-green-400",
  };

  return (
    <div className="group bg-gradient-to-br from-gray-900 to-black border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/20 transition-all">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-xl flex-1 pr-4">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-300 hover:text-purple-200 hover:underline inline-flex items-center gap-2 group-hover:gap-3 transition-all"
          >
            {name}
            <ExternalLink className="w-4 h-4" />
          </a>
        </h3>
      </div>

      <p className="text-gray-300 mb-4 line-clamp-2 text-sm sm:text-base">
        {description}
      </p>

      {topics.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {topics.slice(0, 4).map((topic) => (
            <span
              key={topic}
              className="text-xs bg-purple-900/30 text-purple-300 border border-purple-500/30 px-2 py-1 rounded-full"
            >
              {topic}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-4 text-sm text-gray-400">
        {language && (
          <div className="flex items-center gap-1.5">
            <span
              className={`w-3 h-3 rounded-full ${languageColors[language] || "bg-gradient-to-r from-gray-400 to-gray-500"}`}
            ></span>
            <span>{language}</span>
          </div>
        )}

        <div className="flex items-center gap-1 text-purple-400">
          <Star className="w-4 h-4" />
          <span>{stars}</span>
        </div>

        <div className="flex items-center gap-1 text-purple-400">
          <GitFork className="w-4 h-4" />
          <span>{forks}</span>
        </div>
      </div>
    </div>
  );
}