import React from "react";

function NoResultSection() {
  return (
    <div className="text-white flex flex-col  min-h-[400px]  items-center p-10 ">
      <img src="Images/icons/no-result.svg" alt="" />
      <h3 className="text-center text-xl py-4 ">Something went wrong</h3>
      <p className="text-center text-base">
        We&apos;re unable to retrive the weather details.Ensure you&apos;ve
        enterec a valid city or try again later.
      </p>
    </div>
  );
}

export default NoResultSection;
