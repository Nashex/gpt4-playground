import Link from "next/link";
import { BsGithub } from 'react-icons/bs';

type Props = {};

export default function GithubStar({}: Props) {
  return (
    <div className="text-primary flex flex-col items-center">
      If you liked this project, please consider starring it on Github!
      <Link
        className="duration-800 py-2 text-primary flex items-center gap-x-3 bg-secondary rounded-full px-4 border border-white mt-4"
        href="https://github.com/Nashex/gpt4-playground"
      >
          Star Me! <BsGithub className="text-3xl" />
      </Link>
    </div>
  );
}
