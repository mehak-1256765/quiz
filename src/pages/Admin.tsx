// src/pages/Admin.tsx
// src/pages/Admin.tsx
import React from 'react';
import AdminPanel from '../components/AdminPanel';
import { Question } from '../components/type';

const Admin: React.FC = () => {
  return (
    <div>
      <AdminPanel questions={[]} setQuestions={function (_value: React.SetStateAction<Question[]>): void {
        throw new Error('Function not implemented.');
      } } />
    </div>
  );
};

export default Admin;

