import React from "react"
import { ColorRing } from "react-loader-spinner"

export const Loader = ({ size }) => {
  return (
    <div className="flex justify-center">
      <ColorRing
        visible={true}
        height={size || "140"}
        width={size || "140"}
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={["#685be1", "#330a81", "#a692e7", "#413d7b", "#765fdb"]}
      />
    </div>
  )
}
