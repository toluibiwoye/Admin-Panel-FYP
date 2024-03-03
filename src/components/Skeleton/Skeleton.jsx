
  import React from "react";
import Skeleton from "react-loading-skeleton";

const SkeletonLoader = ({
  className = "",
  count = 5,
  counts = [2, 1, 3, 1, 1],
  circle = false,
}) => {
  return (
    <div
      className={`flex h-fit max-h-screen min-h-fit w-full flex-col gap-5 overflow-hidden p-4 ${ className } `}
    >
      {/* <Skeleton circle width={60} height={60} /> */}
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton
          key={`${ _ }${ index }`}
          count={counts[index] ?? 1}
          height={
            counts[index] && counts[index] > 1
              ? 25
              : index + 1 === count
              ? 25
              : 80
          }
          circle={circle}
          style={{ marginBottom: "0.6rem" }}
        />
      ))}
    </div>
  );
};

export default SkeletonLoader;

{
  /* <Skeleton count={1} height={60} style={{ marginBottom: "0.6rem" }} />
<Skeleton count={3} height={25} style={{ marginBottom: "0.6rem" }} />
<Skeleton count={1} height={80} style={{ marginBottom: "0.6rem" }} />
<Skeleton count={1} height={25} style={{ marginBottom: "0.6rem" }} /> */
}


