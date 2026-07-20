import { GitCommit, ExternalLink } from "lucide-react";

interface CommitCardProps {
  repo: string;
  message: string;
  sha: string;
  date: string;
  url: string;
}

export function CommitCard({
  repo,
  message,
  sha,
  date,
  url,
}: CommitCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date);
  };

  return (
    <div className="group bg-gradient-to-br from-gray-900 to-black border border-purple-500/20 rounded-lg p-4 sm:p-5 hover:border-purple-500/40 hover:shadow-lg hover:shadow-purple-500/20 transition-all">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-1">
          <div className="p-1.5 bg-purple-900/30 rounded-md border border-purple-500/30">
            <GitCommit className="w-4 h-4 text-purple-400" />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="text-sm text-purple-300 font-medium">
              {repo}
            </span>
            <span className="text-xs text-purple-400/70 font-mono bg-purple-900/20 px-2 py-0.5 rounded border border-purple-500/20">
              {sha}
            </span>
          </div>

          <p className="text-gray-200 mb-3 line-clamp-2 text-sm sm:text-base">
            {message}
          </p>

          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs text-purple-400/70">
              {formatDate(date)}
            </span>

            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-purple-400 hover:text-purple-300 inline-flex items-center gap-1 group-hover:gap-2 transition-all"
            >
              Ver commit
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}