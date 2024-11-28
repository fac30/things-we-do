import { ReactNode } from 'react';
import Header from '../../ui/layout/ToolkitHeader';
import CategoryBar from '../../ui/CategoryBar/CategoryBar';
import SearchBar from './components/SearchBar';
import CheckBox from './components/SearchBar';

export default function ToolkitLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Header />
      <CategoryBar />
      <SearchBar />
      <CheckBox />
    </div>
  );
}
