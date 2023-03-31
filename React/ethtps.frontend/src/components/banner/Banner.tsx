import React from "react";
import { IBannerConfiguration } from "./IBannerConfiguration";

export function Banner(config: IBannerConfiguration) {
  return (
    <>
      <CompactHeader />
      <div
        style={{
          backgroundColor: config.bgColor,
          borderRadius: 3,
          marginBottom: "5px",
        }}
      >
        <a
          style={{ color: config.fgColor, fontWeight: "bold", fontSize: 15 }}
          href={config.link}
        >
          {config.message}
        </a>
      </div>
    </>
  );
}
