import { Fragment } from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { ContactsType, ProfileType } from "../../../../types/types";
import { Input } from "../../../common/FormsControls/FormsControls";

export type PropsTypeProfileEditForm = {
  profile: ProfileType,
}

const ProfileEditForm: React.FC<InjectedFormProps<ProfileType, PropsTypeProfileEditForm> & PropsTypeProfileEditForm>
  = (props) => {
    return (
      <form onSubmit={props.handleSubmit}>
        <ul>
          <li>
            <Field name="fullName" component={Input}
              placeholder={props.profile?.fullName ?? "full name"} />
          </li>
          <li>
            <label >
              <Field name="lookingForAJob" component="input"
                type="checkbox" /> looking for a job? </label>
          </li>
          <li>
            <Field name="lookingForAJobDescription" component={Input}
              placeholder={props.profile?.lookingForAJobDescription ?? "looking for a job description"} />
          </li>
          <li>
            <Field name="aboutMe" component={Input}
              placeholder={props.profile?.aboutMe ?? "about me"} />
          </li>
          <li>
            <h3>Contacts</h3>
            <table>
              <thead></thead>
              <tbody>
                {Object.keys(props.profile.contacts).map(key => {
                  return <Fragment key={key}>
                    <tr >
                      <td style={{ borderWidth: "2px", borderColor: "black", borderStyle: "solid", textAlign: "right" }}>{key}:</td>
                      <td style={{ borderWidth: "2px", borderColor: "red", borderStyle: "solid", }}>
                        <Field name={`contacts.${key}`} component={Input}
                          placeholder={props.profile?.contacts[key as keyof ContactsType] ?? ""} />
                      </td>
                    </tr>
                  </Fragment >
                })}
              </tbody>
            </table>
            {props.error && <div style={{ background: "#b33", }}>{props.error}</div>}
          </li>
          <li>
            <button>sent profile</button>
          </li>
        </ul>
      </form>
    )
  }

export default reduxForm<ProfileType, PropsTypeProfileEditForm>({ form: "profileEditForm", })
  (ProfileEditForm);