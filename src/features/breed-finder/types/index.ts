export type BreedFinderMainProps = {
  contentsType: "main" | "result";
  updateContentsType: (val: BreedFinderMainProps["contentsType"]) => void;
};
