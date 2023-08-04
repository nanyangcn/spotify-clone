import { create } from 'zustand';

interface PlayerStore {
  ids: number[] | string[];
  activeId?: number | string;
  setId: (id: number | string) => void;
  setIds: (ids: number[] | string[]) => void;
  reset: () => void;
}

const usePlayer = create<PlayerStore>((set) => ({
  ids: [],
  activeId: undefined,
  setId: (id) => set({ activeId: id }),
  setIds: (ids) => set({ ids }),
  reset: () => set({
    ids: [],
    activeId: undefined,
  }),
}));

export default usePlayer;
