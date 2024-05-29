import { changeUserRole } from '@/app/actions/admin';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

export const RoleSelect = ({ id, role }: { id: string; role: string }) => {
  const [selectedRole, setSelectedRole] = useState(role);

  const handleChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newRole = event.target.value;
    setSelectedRole(newRole);
    const changeRole = await changeUserRole(id, newRole);
    if (changeRole) {
      toast.success(`${id} role changed to ${newRole}`);
    } else {
      toast.error(`Failed to change user ${id} role`);
    }
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
