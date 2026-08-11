import React from "react";

export default function Link({ to, href, children, ...rest }) {
  return React.createElement("a", { href: to || href, ...rest }, children);
}
