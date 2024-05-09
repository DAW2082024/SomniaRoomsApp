import { create } from 'zustand'
import { SearchFilter } from './model/SearchFilter'

interface AppState {
    searchFilter: SearchFilter
    setSearchFilter: (newFilter: SearchFilter) => void
}

const defaultSearchFilter: SearchFilter = {
    dateRange: { from: new Date() }
}

export const useAppStore = create<AppState>()((set) => ({
    searchFilter: defaultSearchFilter,
    setSearchFilter: (newFilter) => set(() => ({ searchFilter: newFilter }))
}))
