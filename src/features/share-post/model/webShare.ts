import type { ShareProps } from "./sharePost.type";

export const handleShare = async ({ title, text, url }: ShareProps) => {
  try {
    if (navigator.share) {
      await navigator.share({
        title,
        text,
        url: url ?? window.location.href,
      });

      return true;
    }

    await navigator.clipboard.writeText(url ?? window.location.href);

    return false;
  } catch (error) {
    console.error(error);

    return false;
  }
};
