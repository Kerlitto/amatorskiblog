export function SelectAuthor({ users, defaultValues = {} }) {
  return (
    <div className="input-group">
      <label htmlFor="author" className="label">
        Author
      </label>
      <select id="author" name="userId" defaultValue={defaultValues.userId}>
        <option value="">none</option>
        {users.map(users => (
          <option value={users.id} key={users.id}>
            {users.name}
          </option>
        ))}
      </select>
    </div>
  );
}
