import getSongsByTitle from '@/actions/getSongsByTitle';
import Header from '@/components/Header';
import SearchInput from '@/components/SearchInput';
import SearchContent from './components/SearchContent';

interface SearchProps {
  searchParams: {
    title: string;
  }
}

const Search = async ({ searchParams }: SearchProps) => {
  const songs = await getSongsByTitle(searchParams.title);

  return (
    <div className="h-full w-full overflow-hidden overflow-y-auto rounded-lg bg-neutral-900">
      <Header className="from-neutral-900">
        <SearchInput />
      </Header>
      <SearchContent songs={songs} />
    </div>
  );
};

export default Search;
