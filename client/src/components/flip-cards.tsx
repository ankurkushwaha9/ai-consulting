import { useState } from "react";
import { X, Check } from "lucide-react";

const weakExample = {
  front: {
    title: "Weak Request Example",
    content: `"I need an AI tool for my team."

That's it - no context, no specifics, no success criteria.`
  },
  back: {
    title: "Why This Fails",
    points: [
      "No business problem defined",
      "Missing inputs and data sources",
      "No constraints or timeline",
      "Undefined success criteria",
      "Impossible to scope or prioritize"
    ]
  }
};

const strongExample = {
  front: {
    title: "Strong Request Example",
    content: `"Our sales team spends 4+ hours daily on lead qualification. We need an AI tool that scores leads based on CRM data, with 85% accuracy, deployed within Q2."

Clear, actionable, measurable.`
  },
  back: {
    title: "Why This Works",
    points: [
      "Clear business problem with metrics",
      "Specific data source (CRM)",
      "Defined success criteria (85% accuracy)",
      "Timeline constraint (Q2)",
      "Easy to scope and prioritize"
    ]
  }
};

interface FlipCardProps {
  type: "weak" | "strong";
  example: typeof weakExample;
}

function FlipCard({ type, example }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const isWeak = type === "weak";

  return (
    <div 
      className="flip-card h-80 w-full cursor-pointer"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
      data-testid={`card-flip-${type}`}
    >
      <div 
        className={`flip-card-inner ${isFlipped ? 'flipped' : ''}`}
        style={{
          transformStyle: 'preserve-3d',
          transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        <div 
          className="flip-card-front absolute w-full h-full rounded-xl p-6 shadow-md border"
          style={{ 
            backfaceVisibility: 'hidden',
            backgroundColor: 'white',
            borderColor: isWeak ? '#fca5a5' : '#86efac',
          }}
        >
          <div className="flex items-center gap-2 mb-4">
            {isWeak ? (
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                <X className="w-5 h-5 text-red-500" />
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <Check className="w-5 h-5 text-green-500" />
              </div>
            )}
            <h3 className={`font-semibold text-lg ${isWeak ? 'text-red-700' : 'text-green-700'}`}>
              {example.front.title}
            </h3>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
            {example.front.content}
          </p>
          <p className="absolute bottom-4 left-6 text-xs text-gray-400">
            Hover to learn more
          </p>
        </div>

        <div 
          className="flip-card-back absolute w-full h-full rounded-xl p-6 shadow-md flex flex-col justify-center"
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            backgroundColor: '#1a2942',
            borderColor: isWeak ? '#fca5a5' : '#86efac',
            border: '1px solid',
          }}
        >
          <h3 className={`font-semibold text-lg mb-4 ${isWeak ? 'text-red-300' : 'text-green-300'}`}>
            {example.back.title}
          </h3>
          <ul className="space-y-2">
            {example.back.points.map((point, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-white/80">
                {isWeak ? (
                  <X className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                ) : (
                  <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                )}
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function FlipCards() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="text-comparison-title">
            What Makes a Great AI Request?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Hover over the cards to understand the difference between weak and strong AI requests.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <FlipCard type="weak" example={weakExample} />
          <FlipCard type="strong" example={strongExample} />
        </div>
      </div>
    </section>
  );
}
