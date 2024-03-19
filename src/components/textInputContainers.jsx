export function TextInputBox({ label, type, name, defaultValues = {} }) {
  return (
    <div className="input-group">
      <label htmlFor="title" className="label">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id="title"
        defaultValue={defaultValues.title}
      />
    </div>
  );
}

export function TextInputArea({ label, type, name, defaultValues = {} }) {
  return (
    <div className="input-group">
      <label htmlFor="body" className="label">
        {label}
      </label>
      <textarea
        type={type}
        name={name}
        id="body"
        defaultValue={defaultValues.body}
      />
    </div>
  );
}
