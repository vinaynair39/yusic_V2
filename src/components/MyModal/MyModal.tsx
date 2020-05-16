import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { ReactComponent as LoadMore } from "../../assets/Load more.svg";
import "./MyModal.scss";
import { useSelector } from "react-redux";

Modal.defaultStyles.overlay!.backgroundColor = "rgba(0, 0, 0, 0.7)";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    backgroundColor: "#1b1f26",
    border: "2px solid #ffce9f",
    marginRight: "-50%",
    width: "55vw",
    height: "60vh",
    transform: "translate(-50%, -50%)",
    transition: "transform 1s ease",
    overlay: "transparent",
    borderRadius: "20px",
  },
};

interface MymodalProps {
  open: boolean;
  query: string;
  onRequestClose: () => void;
  onSearch: (query: string, offset: number) => void;
}

const Mymodal: React.FC<MymodalProps> = ({
  children,
  open,
  onRequestClose,
  onSearch,
  query,
}) => {
  const [isOpen, setIsOpen] = useState(open);
  const [offset, setOffset] = useState(1);
  const isLoading = useSelector((state: any) => state.auth.loading);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  Modal.setAppElement("#root");
  return (
    <Modal
      style={customStyles}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Example Modal"
    >
      <div className="MyModal">
        <div className="MyModal__main">{children}</div>
        <div
          className="MyModal__button"
          onClick={() => {
            onSearch(query, offset);
            setOffset(offset + 1);
          }}
        >
          <button
            className=""
            onClick={() => {
              onSearch(query, offset);
              setOffset(offset + 1);
            }}
          >
            <LoadMore />
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default Mymodal;
