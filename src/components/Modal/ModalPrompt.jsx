
    import React from "react";
import { CloseIcon, DangerIcon } from "Assets/svgs";
import { InteractiveButton } from "Components/InteractiveButton";

// type Props = {
//   closeModalFunction: () => void
//   actionHandler: any
//   message?: string
//   title?: string
//   rejectText?: string
//   acceptText?: string
//   titleClasses?: string
//   messageClasses?: string
// }

const ModalPrompt = ({
  closeModalFunction,
  actionHandler,
  message,
  title,
  messageClasses = "font-normal text-base",
  titleClasses = "text-center font-bold text-lg",
  acceptText = "YES",
  rejectText = "NO",
  loading = false,
  isInfo = false
}) => {
  return (
    <aside
      className="fixed bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center bg-black/50"
    // style={{
    //   backgroundColor: "rgba(0, 0, 0, 0.3)",
    //   zIndex: "1000",
    // }}
    >
      <section className="flex w-auto min-w-[27rem]  flex-col gap-3 rounded-[.5rem] bg-white py-6">
        <div className="flex justify-between px-6">
          <div>
            {/* <DangerIcon className={`h-5 w-5`} /> */}
            {title ? (
              <div className={` ${ titleClasses } `}>
                {title}
              </div>
            ) : null}
            {/* <img src={danger} width={30} height={30} alt='danger' /> */}
          </div>
          <button disabled={loading} onClick={closeModalFunction}>
            <CloseIcon className="w-4 h-4" />
            {/* <img src={Close} width={30} height={30} alt='close' /> */}
          </button>
        </div>

        {message ? (
          <div>
            <div className={`px-6 text-[#525252] ${messageClasses} `}>
              {message}
              {/* <div className='py-3 text-[1rem] leading-[1.75rem] text-[#333333]  '>{message}</div> */}
            </div>
            {!isInfo && <div className={`px-6 text-[#525252] font-normal pt-3 pb-1`}>
              This action cannot be undone.
            </div>}
          </div>
        ) : null}

        <div className="flex justify-between px-6 font-medium leading-[1.5rem] text-[base]">
          <button
            disabled={loading}
            className="flex h-[2.75rem] items-center justify-center rounded-[.5rem] border border-[#d8dae5] text-[#667085] w-full mr-2"
            onClick={closeModalFunction}
          >
            {rejectText?.charAt(0)?.toUpperCase() + rejectText?.slice(1)?.toLowerCase()}
          </button>
          <InteractiveButton
            disabled={loading}
            loading={loading}
            className={`flex items-center justify-center gap-x-5 rounded-[.5rem]  ${ isInfo ? "bg-primaryBlue" : "bg-[#E11D48]" } px-6 text-white w-full ml-2`}
            onClick={actionHandler}
          >
            Yes, {acceptText?.charAt(0)?.toUpperCase() + acceptText?.slice(1)?.toLowerCase()}
          </InteractiveButton>
        </div>
      </section>
    </aside>
  );
};

export default ModalPrompt;

  