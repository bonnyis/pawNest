export interface BreedFinderMainProps {
  contentsType: "main" | "result";
  updateContentsType: (val: BreedFinderMainProps["contentsType"]) => void;
}
export interface BreedFinderResultItem {
  title: string;
  value: number;
}
