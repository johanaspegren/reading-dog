import React, { useState } from 'react';
import { User } from '../types';
import { UserCircle, Plus, X } from 'lucide-react';

interface UserProfileProps {
  users: User[];
  selectedUser: User | null;
  onSelectUser: (user: User | null) => void;
  onAddUser: (user: User) => void;
  onDeleteUser: (id: number) => void;
}

const UserProfile: React.FC<UserProfileProps> = ({
  users,
  selectedUser,
  onSelectUser,
  onAddUser,
  onDeleteUser,
}) => {
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserAge, setNewUserAge] = useState('');

  const handleAddUser = () => {
    if (newUserName && newUserAge) {
      const newUser: User = {
        id: Date.now(),
        name: newUserName,
        age: parseInt(newUserAge, 10),
        createdAt: new Date().toISOString(),
      };
      onAddUser(newUser);
      setNewUserName('');
      setNewUserAge('');
      setIsAddingUser(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">User Profile</h2>
      
      {isAddingUser ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Age</label>
            <input
              type="number"
              value={newUserAge}
              onChange={(e) => setNewUserAge(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter age"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleAddUser}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Add User
            </button>
            <button
              onClick={() => setIsAddingUser(false)}
              className="text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {users.length === 0 ? (
            <p className="text-gray-500 text-center">No users yet</p>
          ) : (
            <div className="grid gap-3">
              {users.map((user) => (
                <div
                  key={user.id}
                  className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${
                    selectedUser?.id === user.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div
                    className="flex items-center gap-3 flex-grow cursor-pointer"
                    onClick={() => onSelectUser(selectedUser?.id === user.id ? null : user)}
                  >
                    <UserCircle className="h-8 w-8 text-gray-400" />
                    <div>
                      <h3 className="font-medium">{user.name}</h3>
                      <p className="text-sm text-gray-500">Age: {user.age}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => onDeleteUser(user.id)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
          
          <button
            onClick={() => setIsAddingUser(true)}
            className="flex items-center gap-2 text-blue-500 hover:text-blue-600"
          >
            <Plus className="h-4 w-4" />
            Add New User
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;