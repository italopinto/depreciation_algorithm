import React, { useState } from "react";

export default function Button(props) {

  return (
    <>
      <input
      className="button is-medium is-primary"
      id={props.id}
      type="submit"
      value={props.value}
      onClick={props.onClick}
      />

    </>
  );
}
