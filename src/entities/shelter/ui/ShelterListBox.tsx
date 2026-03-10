import ShelterListItem from "./ShelterListItem";
const ShelterListBox = () => {
  return (
    <div className="flex flex-col gap-3">
      <ShelterListItem />
      <ShelterListItem />
      <ShelterListItem />
      {/* <ShelterListItem />
      <ShelterListItem /> */}
    </div>
  );
};

export default ShelterListBox;
