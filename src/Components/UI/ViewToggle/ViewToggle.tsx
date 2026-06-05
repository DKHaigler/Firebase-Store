import "./ViewToggle.css"

type ToggleOption = {
  label: string;
  value: string;
};

type SlidingToggleProps = {
  options: ToggleOption[];
  value: string;
  onChange: (value: string) => void;
};

export const SlidingToggle = ({
  options,
  value,
  onChange,
}: SlidingToggleProps) => {
  const activeIndex = options.findIndex(
    (option) => option.value === value
  );

  return (
    <div
      className="sliding-toggle"
      style={{
        gridTemplateColumns: `repeat(${options.length}, 1fr)`,
      }}
    >
      <div
        className="toggle-slider"
        style={{
          width: `${100 / options.length}%`,
          transform: `translateX(${activeIndex * 100}%)`,
        }}
      />

      {options.map((option) => (
        <button
          key={option.value}
          className="toggle-button"
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};