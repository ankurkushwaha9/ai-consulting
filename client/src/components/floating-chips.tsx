const chips = [
  { label: "Sales", color: "text-cyan-200/80", top: "20%", left: "10%", delay: "0s", duration: "4s" },
  { label: "Customer Success", color: "text-purple-200/80", top: "25%", right: "15%", delay: "1s", duration: "5s" },
  { label: "Marketing", color: "text-pink-200/80", top: "45%", left: "5%", delay: "2.5s", duration: "3.5s" },
  { label: "Product", color: "text-emerald-200/80", top: "50%", right: "8%", delay: "3.5s", duration: "4.5s" },
  { label: "AI Tool Customization", color: "text-blue-200/80", bottom: "20%", left: "15%", delay: "1.5s", duration: "3s" },
  { label: "AI Agents", color: "text-amber-200/80", bottom: "25%", right: "20%", delay: "4s", duration: "5.5s" },
];

export function FloatingChips() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {chips.map((chip, index) => (
        <div
          key={index}
          className="absolute animate-float hidden md:block"
          style={{
            top: chip.top,
            left: chip.left,
            right: chip.right,
            bottom: chip.bottom,
            animationDelay: chip.delay,
            animationDuration: chip.duration,
          }}
        >
          <div className={`px-4 py-2 bg-white/5 backdrop-blur-md rounded-full border border-white/10 text-sm font-medium ${chip.color} shadow-lg`}>
            {chip.label}
          </div>
        </div>
      ))}
    </div>
  );
}
