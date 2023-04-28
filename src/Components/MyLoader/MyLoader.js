import React from "react";
import ContentLoader from "react-content-loader";

const MyLoader = (props) => (
  <ContentLoader
    speed={1}
    viewBox="0 0 248 460"
    backgroundColor="#2e2e2e"
    foregroundColor="#1a1a1a"
    {...props}
  >
    <rect x="10%" y="415" rx="0" ry="0" width="80%" height="25" />
    <rect x="0" y="0" rx="8" ry="8" width="100%" height="85%" />
  </ContentLoader>
);

export default MyLoader;
