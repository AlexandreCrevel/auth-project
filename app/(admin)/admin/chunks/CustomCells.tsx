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
