import React, { Fragment } from "react";
import { WrappedFieldProps } from "redux-form";
import css from './FormsControls.module.css';


// export const Textarea = (props) => {
export const Textarea: React.FC<WrappedFieldProps> = ({input, meta, ...props }) => {
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

interface Params  { // ????????? WrappedFieldProps
  meta: { error: string, touched: boolean, };
  input: any,
}
type TextareaType = (params: Params) => React.ReactNode;
export const Input: React.FC<Params> = ({input, meta, ...props }) => {
  const hasError = meta.touched && meta.error;
  return (
    <Fragment>
      <input type="text" {...input} {...props} className={hasError ? css.form__error : ""} />
      <span className={css.form__errorTitle}>{hasError && meta.error }</span>
    </Fragment>
  )
}

