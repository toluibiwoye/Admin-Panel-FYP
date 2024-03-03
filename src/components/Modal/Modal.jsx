
  import React, { memo } from "react";
import { MdClose } from "react-icons/md";

const Modal = ({ children, title, modalCloseClick, modalHeader, classes, page = "" }) => {
  return (
    <div
      style={{
        zIndex: 100000002,
        transform: "translate(-50%, -50%)",
      }}
      className={`modal-holder fixed left-[50 %] top-[50 %] flex h-[100vh] w-full items-center justify-center overflow-auto bg-[#00000099]`}
    >
      <div
        className={`${ page === "ManagePermissionAddRole" ? "w-fit" : "w-[80%]" } rounded-lg bg-white py-5 shadow ${ classes?.modalDialog } `}
      >
        {modalHeader && (
          <div className={`flex justify-between border-b px-5 pb-2`}>
            <h5 className="text-center text-lg font-bold uppercase">{title}</h5>
            <div
              className="modal-close cursor-pointer"
              onClick={modalCloseClick}
            >
              <MdClose className="text-xl" />
            </div>
          </div>
        )}

        <div className="mt-4 px-5">{children}</div>
      </div>
    </div>
  );
};

const ModalMemo = memo(Modal);
export { ModalMemo as Modal };

  