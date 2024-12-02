
import CategoryBar from '../../ui/CategoryBar/CategoryBar';
import SearchBar from './components/SearchBar';
import CheckBox from './components/CheckBox';
import FloatingButton from './components/floatingButton';


export default function ToolkitPage() {
  return (
    <div className="relative h-full">
      {/* Shared Header and CategoryBar */}  
      <CategoryBar />

      {/* Shared SearchBar and CheckBox */}
      <div className="p-4">
        <SearchBar />
        <CheckBox />
      </div>

      {/* Floating Button */}
      <FloatingButton />
    </div>
  );
}