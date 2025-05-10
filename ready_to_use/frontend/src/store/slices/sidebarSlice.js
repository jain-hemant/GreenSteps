import { createSlice } from '@reduxjs/toolkit';

const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState: {
        isCollapsed: false,
        mobileMenuOpen: false
    },
    reducers: {
        toggleSidebar: (state) => {
            state.isCollapsed = !state.isCollapsed;
        },
        toggleMobileMenu: (state) => {
            state.mobileMenuOpen = !state.mobileMenuOpen;
        },
        setSidebarState: (state, action) => {
            state.isCollapsed = action.payload;
        },
        setMobileMenuState: (state, action) => {
            state.mobileMenuOpen = action.payload;
        }
    },
});

const { toggleSidebar, toggleMobileMenu, setSidebarState, setMobileMenuState } = sidebarSlice.actions;

const selectSidebarCollapsed = (state) => state.sidebar.isCollapsed;
const selectMobileMenuOpen = (state) => state.sidebar.mobileMenuOpen;

export {
    toggleSidebar,
    toggleMobileMenu,
    setSidebarState,
    setMobileMenuState,
    selectSidebarCollapsed,
    selectMobileMenuOpen
};

export default sidebarSlice.reducer;