import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import clsx from "clsx";
import { HTMLInputTypeAttribute, useState } from "react";

interface InputInterface {
  className?: string;
  name: string;
  type: HTMLInputTypeAttribute;
  min?: string;
  max?: string;
  step?: string;
  value?: number | string;
  label?: string;
  onChange?: () => void;
}

const InputComponent = ({
  label,
  name,
  type,
  className,
  min,
  max,
  step,
  value,
  onChange,
}: InputInterface) => {
  const [hasValue, setHasValue] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    setHasValue(event.currentTarget.value !== "");
  };

  return (
    <div className="relative">
      <input
        type={type === "password" ? (isOpen ? "text" : "password") : type}
        name={name}
        id={name}
        min={min}
        max={max}
        step={step}
        defaultValue={value}
        className={clsx(
          className,
          hasValue ? "border-violet-700" : "border-slate-300",
          "peer border-2 rounded px-2 py-3 w-full"
        )}
        onChange={handleInputChange}
      />
      <label
        className={clsx(
          hasValue || value
            ? "text-violet-700 -translate-y-4 text-sm border-violet-700"
            : "text-black border-white",
          "absolute top-2 left-4 px-2 bg-white border-x-2 transition-all duration-300"
        )}
        htmlFor={name}
      >
        {label ? label : name.charAt(0).toUpperCase() + name.slice(1)}
      </label>
      {type === "password" && (
        <div className="absolute top-1/2 -translate-y-1/2 right-8">
          {isOpen ? (
            <VisibilityOffOutlined onClick={() => setIsOpen(!isOpen)} />
          ) : (
            <VisibilityOutlined onClick={() => setIsOpen(!isOpen)} />
          )}
        </div>
      )}
    </div>
  );
};

export default InputComponent;
