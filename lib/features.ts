import {features} from "@/content/features";

export function isBlogEnabled(): boolean {
  if (process.env.NODE_ENV === "development") {
    return true;
  }

  return features.blog.enabledInProduction;
}
