import { IResult } from "../api";
import ClickedModal from "./ClickedModal";
import Loader from "./common/styled/Loader";

interface IClickedSearchModalProps {
  data: IResult;
  isLoading: boolean;
  closeModal: () => void;
}

const ClickedSearchModal = ({
  data,
  isLoading,
  closeModal,
}: IClickedSearchModalProps) => {
  return (
    <>
      {isLoading ? (
        <Loader>Loding . . .</Loader>
      ) : (
        <ClickedModal clickedItem={data!} closeModal={closeModal} />
      )}
    </>
  );
};

export default ClickedSearchModal;
