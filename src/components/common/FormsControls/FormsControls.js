import React from "react";
import css from './FormsControls.module.css';

// export const Textarea = (props) => {
export const Textarea = ({ input, meta, ...props }) => {
  const hasError = meta.touched && meta.error;
  return (
    <div className={css.form}>
      {/* <textarea className={css.form__error} {...props.input} {...props} > */}
      <textarea {...input} {...props} className={hasError ? css.form__error : ""} >
      </textarea>
      <span className={css.form__errorTitle}>{hasError && meta.error }</span>
    </div>
  );
}

export const Input = ({input, meta, ...props }) => {
  const hasError = meta.touched && meta.error;
  return (
    <div>
      <input type="text" {...input} {...props} className={hasError ? css.form__error : ""} />
      <span className={css.form__errorTitle}>{hasError && meta.error }</span>
    </div>
  )
}

