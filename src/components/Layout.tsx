import React, { useState } from 'react';
import { Sidebar } from './Sidebar';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Use Context or simple prop drilling for this small app
  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <Sidebar 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <main className="flex-1 h-screen overflow-y-auto relative">
        {/* Pass search props to children using cloneElement, hacky but works for this structure, or better yet, we just render children and let Home handle its own state, but instructions say Home uses sidebar state. Let's make Layout provide context or just clone. Actually, let's just make Home fetch from a global store or we can hoist state to App.tsx */}
        {children}
      </main>
    </div>
  );
};
