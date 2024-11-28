import { ReactNode } from 'react';
import Header from '../../ui/layout/ToolkitHeader';
import CategoryBar from '../../ui/CategoryBar/CategoryBar';
import SearchBar from '../../ui/shared/SearchBar';

export default function ToolkitLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Header />
      <CategoryBar />
      <SearchBar />
      <div>
        {/* Add other components here */}
        <p>Additional content can be added below the search bar.</p>
      </div>
    </div>
  );
}
