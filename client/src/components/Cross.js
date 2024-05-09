import * as React from "react"
import "../styles/cross.css"

const Cross = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    width={12}
        height={12}
        className=""
    fill="red"
    viewBox="0 0 1792 1792"
    {...props}
  >
    <path d="m1082.2 896.6 410.2-410c51.5-51.5 51.5-134.6 0-186.1s-134.6-51.5-186.1 0l-410.2 410L486 300.4c-51.5-51.5-134.6-51.5-186.1 0s-51.5 134.6 0 186.1l410.2 410-410.2 410c-51.5 51.5-51.5 134.6 0 186.1 51.6 51.5 135 51.5 186.1 0l410.2-410 410.2 410c51.5 51.5 134.6 51.5 186.1 0 51.1-51.5 51.1-134.6-.5-186.2l-409.8-409.8z" />
  </svg>
)
export default Cross
