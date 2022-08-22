import React, { Suspense, LazyExoticComponent } from "react";

const lazyLoad = (Component: LazyExoticComponent<any>) => {
  return (
    <Suspense fallback={<div>loading</div>}>
      <Component />
    </Suspense>
  );
};

export default lazyLoad;
