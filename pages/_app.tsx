import React from "react";
import "../styles.scss";

// This _app.tsx is here just to enable the SCSS stylesheets

type AppWithScssProps = {
  Component: React.FC;
  pageProps: object;
};

export default function AppWithScss({
  Component,
  pageProps,
}: AppWithScssProps) {
  return <Component {...pageProps} />;
}
