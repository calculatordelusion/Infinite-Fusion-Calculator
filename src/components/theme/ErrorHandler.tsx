import { Card } from "@/components/ui/card";
import { config, gameInfo } from "@/config";
import Image from "next/image";
import Link from "next/link";

interface ErrorHandlerProps {
  errorType:
    | "not_found"
    | "sprite_not_found"
    | "invalid_sprite"
    | "server_error"
    | "rate_limit"
    | "maintenance";
  errorMessage?: string;
}

const errorConfig = {
  sprite_not_found: {
    title: "404 Not Found",
    message: "The requested Pokémon or fusion could not be found.",
    image: `${config.cdn.images.fusion}/275.290d.png`,
  },
  not_found: {
    title: "404 Not Found",
    message: "The requested resource could not be found.",
    image: `${config.cdn.images.fusion}/275.290d.png`,
  },
  invalid_sprite: {
    title: "Invalid Sprite",
    message: "The sprite ID provided is invalid or does not exist.",
    image: `${config.cdn.images.fusion}/275.205.png`,
  },
  server_error: {
    title: "500 Server Error",
    message: "An unexpected error occurred. Please try again later.",
    image: `${config.cdn.images.fusion}/435.321a.png`,
  },
  rate_limit: {
    title: "Rate Limit Exceeded",
    message:
      "You've made too many requests. Please try again in a few minutes.",
    image: `${config.cdn.images.fusion}/275.201b.png`,
  },
  maintenance: {
    title: "Site Maintenance",
    message: "We're currently performing maintenance. Please check back soon.",
    image: `${config.cdn.images.fusion}/137.233.png`,
  },
};

const randomImageUrl = () =>
  `${config.cdn.images.base}/${Math.floor(Math.random() * gameInfo.totalPokemons) + 1}.png`;

export const ErrorHandler = ({
  errorType,
  errorMessage,
}: ErrorHandlerProps) => {
  const { title, message, image } = errorConfig[errorType];

  return (
    <div className="flex justify-center items-center p-4 min-h-[80vh]">
      <Card className="bg-card border-2 border-primary/20 w-full max-w-md overflow-hidden">
        <div className="relative bg-gradient-to-b from-primary/5 to-transparent p-8">
          <div className="relative mx-auto mb-8 w-48 h-48">
            <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse" />
            <Image
              src={image || randomImageUrl()}
              alt={title}
              width={200}
              height={200}
              className="z-10 relative mx-auto hover:scale-105 transition-transform duration-300"
              priority
            />
          </div>

          <div className="text-center">
            <h1 className="mb-3 font-bold text-foreground text-3xl">{title}</h1>
            <p className="mb-8 text-muted-foreground text-lg">
              {errorMessage || message}
            </p>

            <Link
              href="/"
              className="inline-flex justify-center items-center bg-primary hover:bg-primary/90 active:bg-primary/95 px-6 py-2.5 rounded-lg font-medium text-primary-foreground transition-colors"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
};
