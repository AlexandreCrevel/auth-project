import { Button } from '@/components/ui/button';
import { useState } from 'react';

export const RoleSelect = ({
  id,
  role,
  onChangeRole,
}: {
  id: string;
  role: string;
  onChangeRole: (id: string, newRole: string) => void;
}) => {
  const [selectedRole, setSelectedRole] = useState(role);

  const handleChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newRole = event.target.value;
    setSelectedRole(newRole);
    onChangeRole(id, newRole);
  };

  return (
    <select
      value={selectedRole}
      onChange={handleChange}
      className='border p-1'
      aria-label={`Role select for user ${id}`}
    >
      <option value='user'>User</option>
      <option value='admin'>Admin</option>
    </select>
  );
};

export const FunctionsCells = ({
  rowID,
  onDelete,
}: {
  rowID: string;
  onDelete: (id: string) => void;
}) => {
  return (
    <div className='flex flex-row justify-start gap-2'>
      <Button variant={'ghost'} onClick={() => onDelete(rowID)}>
        Delete
      </Button>
    </div>
  );
};

export const EditableCell = ({
  id,
  value,
  field,
  onSave,
}: {
  id: string;
  value: string;
  field: string;
  onSave: (id: string, newValue: string, field: string) => void;
}) => {
  const [editValue, setEditValue] = useState(value);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(event.target.value);
  };

  const handleSave = () => {
    onSave(id, editValue, field);
    setIsEditing(false);
  };

  return (
    <div className='flex items-center'>
      <input
        type='text'
        value={editValue}
        onChange={handleChange}
        className='border p-1 flex-grow'
        disabled={!isEditing}
        placeholder='Enter new value'
      />
      {isEditing ? (
        <Button onClick={handleSave} className='ml-2'>
          Save
        </Button>
      ) : (
        <Button onClick={() => setIsEditing(true)} className='ml-2'>
          Edit
        </Button>
      )}
    </div>
  );
};
