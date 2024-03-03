
  import { useEffect, useRef } from 'react'

const ModalSidebar = (
  {
    customMinWidthInTw = "min-w-[30%]",
    isModalActive = false,
    closeModalFn = () => { },
    children
  }
) => {

  const modalRef = useRef()

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        closeModalFn();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isModalActive && modalRef) {
      modalRef.current.focus();
    }
  }, [isModalActive]);

  return (
    <div
      id="modal"
      aria-hidden="false"
      autoFocus
      className={`transition-all ${
    isModalActive ? "-translate-x-0 flex" : "translate-x-full hidden"
  } z-50 bg-[#292828d2] overflow-x-hidden overflow-y-auto fixed h-screen w-screen md: h-full top-4 left-0 right-0 md: inset-0 justify-center items-center`}
    >
      <div className="relative overflow-hidden !max-w-[35%] min-h-[100vh] px-4 h-full">
        {/* Modal Content */}
        <div ref={modalRef} autoFocus className={`${ customMinWidthInTw } fixed right-0 z-[9999] bg-white py-1 rounded-md border min-h-[100vh]  overflow-y-auto block items-center text-center shadow-xl transition-all ${ isModalActive ? "-translate-x-0" : "translate-x-full hidden" }`}>
          {/* <div className="absolute flex justify-center items-center top-4 right-3 font-semibold cursor-pointer p-2 h-[25px] w-[25px] text-[#1d1d1d] border border-[#1d1d1d] rounded-lg shadow-md" onClick={() => closeModalFn()}>&#x2715;</div> */}
          {children}
        </div>
      </div>
    </div>
  )
}

export default ModalSidebar

  