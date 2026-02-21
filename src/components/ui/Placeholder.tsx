import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "./Button";

interface PlaceholderProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  action?: {
    label: string;
    href: string;
  };
}

const Placeholder = ({
  title,
  description,
  icon: Icon,
  action,
}: PlaceholderProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center animate-fadeInUp">
      {Icon && (
        <div className="mb-6 p-4 bg-primary/10 rounded-full">
          <Icon className="w-12 h-12 md:w-16 md:h-16 text-primary" />
        </div>
      )}
      <h1 className="font-forum text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
        {title}
      </h1>
      <p className="font-montserrat text-text-muted text-sm md:text-base lg:text-lg max-w-lg mb-8 leading-relaxed">
        {description}
      </p>
      {action && (
        <Link href={action.href}>
          <Button size="lg" className="rounded-full px-8 font-montserrat">
            {action.label}
          </Button>
        </Link>
      )}
    </div>
  );
};

export default Placeholder;
