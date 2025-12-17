import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  progress: number;
}

export function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-foreground" data-testid="text-progress-label">
          Request completeness
        </span>
        <span className="text-sm font-semibold text-[#00d9ff]" data-testid="text-progress-value">
          {Math.round(progress)}%
        </span>
      </div>
      <div className="relative h-3 bg-white/10 dark:bg-white/5 rounded-full overflow-hidden">
        <div 
          className="absolute inset-y-0 left-0 bg-[#00d9ff] rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
          data-testid="progress-bar-fill"
        />
      </div>
    </div>
  );
}
