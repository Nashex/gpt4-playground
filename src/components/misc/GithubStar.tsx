import Link from "next/link";
import { BsGithub } from "react-icons/bs";

type Props = {};

export default function GithubStar({}: Props) {
  return (
    <div className="flex flex-col items-center text-primary">
      If you liked this project, please consider starring it on Github!
      <Link
        className="duration-800 mt-4 flex items-center gap-x-3 rounded-full border border-white bg-secondary px-4 py-2 text-primary"
        href="https://github.com/Nashex/gpt4-playground"
      >
        Star Me! <BsGithub className="text-3xl" />
      </Link>
    </div>
  );
}
