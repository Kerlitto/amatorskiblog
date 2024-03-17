export function TextInputBox(props) {
  return (
    <div className="input-group">
      <label htmlFor="title" className="label">
        {props.label}
      </label>
      <input type={props.type} name={props.name} id="title" />
    </div>
  );
}

export function TextInputArea(props) {
  return (
    <div className="input-group">
      <label htmlFor="body" className="label">
        {props.label}
      </label>
      <textarea type={props.type} name={props.name} id="body" />
    </div>
  );
}
